import React, { useState, useEffect } from 'react';

const RoleBasedAccessControl = () => {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'users', 'roles', 'permissions', 'sessions'
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [userModal, setUserModal] = useState(false);
  const [roleModal, setRoleModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Role definitions with granular permissions
  const [roleDefinitions, setRoleDefinitions] = useState({
    'super-admin': {
      name: 'Super Administrator',
      description: 'Complete system access and management',
      level: 1,
      permissions: {
        // System Management
        'system.admin': true,
        'system.config': true,
        'system.backup': true,
        'system.logs': true,
        
        // User Management
        'users.create': true,
        'users.read': true,
        'users.update': true,
        'users.delete': true,
        'users.roles': true,
        
        // Role Management
        'roles.create': true,
        'roles.read': true,
        'roles.update': true,
        'roles.delete': true,
        'roles.assign': true,
        
        // Chamber Management
        'chambers.create': true,
        'chambers.read': true,
        'chambers.update': true,
        'chambers.delete': true,
        'chambers.schedule': true,
        'chambers.maintenance': true,
        
        // Booking Management
        'bookings.create': true,
        'bookings.read': true,
        'bookings.update': true,
        'bookings.delete': true,
        'bookings.approve': true,
        'bookings.all': true,
        
        // Workflow Management
        'workflows.create': true,
        'workflows.read': true,
        'workflows.update': true,
        'workflows.delete': true,
        'workflows.approve': true,
        'workflows.all': true,
        
        // Document Management
        'documents.create': true,
        'documents.read': true,
        'documents.update': true,
        'documents.delete': true,
        'documents.approve': true,
        'documents.all': true,
        'documents.audit': true,
        
        // Test Results
        'results.create': true,
        'results.read': true,
        'results.update': true,
        'results.delete': true,
        'results.approve': true,
        'results.all': true,
        'results.share': true,
        
        // Reports & Analytics
        'reports.create': true,
        'reports.read': true,
        'reports.export': true,
        'analytics.access': true
      },
      maxSessions: 5,
      sessionTimeout: 480, // 8 hours
      ipRestrictions: [],
      mfaRequired: true
    },
    
    'manufacturer': {
      name: 'Manufacturer',
      description: 'Device manufacturer with limited access to own data only',
      level: 4,
      permissions: {
        // Own Bookings Only
        'bookings.create': true,
        'bookings.read': 'own',
        'bookings.update': 'own',
        'bookings.delete': false,
        
        // Own Workflows Only
        'workflows.read': 'own',
        'workflows.update': false,
        
        // Own Documents Only
        'documents.read': 'own',
        'documents.create': false,
        
        // Own Test Results Only
        'results.read': 'own',
        'results.create': false,
        
        // Limited Reports
        'reports.read': 'own',
        'reports.export': 'own',
        
        // Chamber Availability (Read Only)
        'chambers.read': 'availability',
        
        // No System Access
        'system.admin': false,
        'users.create': false,
        'users.read': false,
        'users.update': 'self',
        'roles.read': false
      },
      maxSessions: 2,
      sessionTimeout: 240, // 4 hours
      ipRestrictions: [],
      mfaRequired: false
    },
    
    'sterilization-provider': {
      name: 'Sterilization Provider',
      description: 'Sterilization service provider with chamber and job management access',
      level: 3,
      permissions: {
        // Chamber Management
        'chambers.read': true,
        'chambers.update': 'assigned',
        'chambers.schedule': true,
        'chambers.maintenance': true,
        
        // Booking Management (Assigned Jobs)
        'bookings.read': 'assigned',
        'bookings.update': 'assigned',
        'bookings.approve': 'assigned',
        
        // Workflow Management (Assigned)
        'workflows.read': 'assigned',
        'workflows.update': 'assigned',
        
        // Document Access (Related to Jobs)
        'documents.read': 'job-related',
        'documents.create': 'job-related',
        'documents.update': 'job-related',
        
        // Test Results (Job Related)
        'results.read': 'job-related',
        
        // Reports (Own Operations)
        'reports.read': 'operational',
        'reports.export': 'operational',
        
        // Limited User Management
        'users.update': 'self',
        
        // No System Access
        'system.admin': false,
        'users.create': false,
        'roles.read': false
      },
      maxSessions: 3,
      sessionTimeout: 360, // 6 hours
      ipRestrictions: [],
      mfaRequired: true
    },
    
    'laboratory': {
      name: 'Laboratory',
      description: 'Testing laboratory with test result upload and analysis access',
      level: 3,
      permissions: {
        // Test Results Management
        'results.create': true,
        'results.read': 'assigned',
        'results.update': 'assigned',
        'results.approve': 'assigned',
        'results.share': 'assigned',
        
        // Workflow Access (Testing Phase)
        'workflows.read': 'testing-assigned',
        'workflows.update': 'testing-assigned',
        
        // Document Management (Test Related)
        'documents.read': 'test-related',
        'documents.create': 'test-related',
        'documents.update': 'test-related',
        
        // Sample Management
        'samples.create': true,
        'samples.read': 'assigned',
        'samples.update': 'assigned',
        
        // Reports (Test Results)
        'reports.create': 'test-reports',
        'reports.read': 'test-reports',
        'reports.export': 'test-reports',
        
        // Templates
        'templates.read': true,
        'templates.use': true,
        
        // Limited User Management
        'users.update': 'self',
        
        // No Chamber Access
        'chambers.read': false,
        'bookings.create': false,
        
        // No System Access
        'system.admin': false,
        'users.create': false,
        'roles.read': false
      },
      maxSessions: 3,
      sessionTimeout: 360, // 6 hours
      ipRestrictions: [],
      mfaRequired: true
    },
    
    'qa-manager': {
      name: 'QA Manager',
      description: 'Quality Assurance Manager with approval and oversight capabilities',
      level: 2,
      permissions: {
        // Approval Authority
        'bookings.approve': true,
        'workflows.approve': true,
        'documents.approve': true,
        'results.approve': true,
        
        // Read Access to Most Data
        'bookings.read': true,
        'workflows.read': true,
        'documents.read': true,
        'results.read': true,
        'chambers.read': true,
        
        // Update Capabilities
        'bookings.update': true,
        'workflows.update': true,
        'documents.update': true,
        'results.update': true,
        
        // Document Management
        'documents.create': true,
        'documents.audit': true,
        
        // Reports & Analytics
        'reports.create': true,
        'reports.read': true,
        'reports.export': true,
        'analytics.access': true,
        
        // User Management (Limited)
        'users.read': true,
        'users.update': 'department',
        'roles.read': true,
        
        // No System Admin
        'system.admin': false,
        'users.create': false,
        'users.delete': false,
        'roles.create': false
      },
      maxSessions: 3,
      sessionTimeout: 420, // 7 hours
      ipRestrictions: [],
      mfaRequired: true
    },
    
    'operator': {
      name: 'Operator',
      description: 'System operator with day-to-day operational access',
      level: 4,
      permissions: {
        // Basic Operations
        'bookings.create': true,
        'bookings.read': true,
        'bookings.update': 'assigned',
        
        // Workflow Management
        'workflows.read': true,
        'workflows.update': 'assigned',
        
        // Chamber Operations
        'chambers.read': true,
        'chambers.update': 'operational',
        
        // Document Access
        'documents.read': 'operational',
        'documents.create': 'operational',
        
        // Basic Reports
        'reports.read': 'operational',
        
        // Limited User Management
        'users.update': 'self',
        
        // No Admin Functions
        'system.admin': false,
        'users.create': false,
        'roles.read': false,
        'documents.approve': false,
        'results.approve': false
      },
      maxSessions: 2,
      sessionTimeout: 300, // 5 hours
      ipRestrictions: [],
      mfaRequired: false
    },
    
    'auditor': {
      name: 'Auditor',
      description: 'External auditor with read-only access to audit trails and documents',
      level: 5,
      permissions: {
        // Read-Only Access
        'documents.read': 'audit',
        'documents.audit': true,
        'workflows.read': 'audit',
        'results.read': 'audit',
        'bookings.read': 'audit',
        
        // Audit Reports
        'reports.read': 'audit',
        'reports.export': 'audit',
        'analytics.access': 'audit',
        
        // System Logs
        'system.logs': 'read',
        
        // No Modification Rights
        'bookings.create': false,
        'workflows.update': false,
        'documents.create': false,
        'results.create': false,
        
        // No User Management
        'users.create': false,
        'users.read': false,
        'users.update': 'self',
        'roles.read': false,
        
        // No System Admin
        'system.admin': false
      },
      maxSessions: 1,
      sessionTimeout: 180, // 3 hours
      ipRestrictions: ['audit'],
      mfaRequired: true
    }
  });

  // User accounts with role assignments
  const [users, setUsers] = useState([
    {
      id: 'user-001',
      username: 'admin',
      email: 'admin@sterixsystem.com',
      firstName: 'System',
      lastName: 'Administrator',
      role: 'super-admin',
      department: 'IT',
      company: 'STERIX System',
      status: 'active',
      createdDate: '2025-01-01T00:00:00Z',
      lastLogin: '2025-09-29T08:30:00Z',
      loginCount: 245,
      mfaEnabled: true,
      emailVerified: true,
      passwordLastChanged: '2025-09-01T10:00:00Z',
      accountLocked: false,
      failedLoginAttempts: 0,
      sessionCount: 1,
      ipWhitelist: [],
      preferences: {
        theme: 'light',
        notifications: true,
        language: 'en'
      },
      permissions: roleDefinitions['super-admin'].permissions,
      dataAccess: {
        companies: ['all'],
        departments: ['all'],
        workflows: ['all']
      }
    },
    {
      id: 'user-002',
      username: 'medtech_qa',
      email: 'qa@medtech.com',
      firstName: 'John',
      lastName: 'Smith',
      role: 'manufacturer',
      department: 'Quality Assurance',
      company: 'MedTech Corporation',
      status: 'active',
      createdDate: '2025-02-15T10:00:00Z',
      lastLogin: '2025-09-28T14:20:00Z',
      loginCount: 89,
      mfaEnabled: false,
      emailVerified: true,
      passwordLastChanged: '2025-08-15T09:00:00Z',
      accountLocked: false,
      failedLoginAttempts: 0,
      sessionCount: 1,
      ipWhitelist: ['203.45.67.89'],
      preferences: {
        theme: 'light',
        notifications: true,
        language: 'en'
      },
      permissions: roleDefinitions['manufacturer'].permissions,
      dataAccess: {
        companies: ['MedTech Corporation'],
        departments: ['Quality Assurance'],
        workflows: ['WF-2025-001']
      }
    },
    {
      id: 'user-003',
      username: 'sterilpro_ops',
      email: 'operations@steripro.com',
      firstName: 'Sarah',
      lastName: 'Johnson',
      role: 'sterilization-provider',
      department: 'Operations',
      company: 'Sterilization Pro',
      status: 'active',
      createdDate: '2025-01-20T12:00:00Z',
      lastLogin: '2025-09-29T07:45:00Z',
      loginCount: 156,
      mfaEnabled: true,
      emailVerified: true,
      passwordLastChanged: '2025-09-15T11:00:00Z',
      accountLocked: false,
      failedLoginAttempts: 0,
      sessionCount: 2,
      ipWhitelist: ['192.168.1.0/24'],
      preferences: {
        theme: 'dark',
        notifications: true,
        language: 'en'
      },
      permissions: roleDefinitions['sterilization-provider'].permissions,
      dataAccess: {
        companies: ['all'],
        departments: ['Operations'],
        workflows: ['assigned'],
        chambers: ['1', '2', '3', '4']
      }
    },
    {
      id: 'user-004',
      username: 'accutest_lab',
      email: 'results@accutest.com',
      firstName: 'Dr. Emily',
      lastName: 'Chen',
      role: 'laboratory',
      department: 'Laboratory',
      company: 'AccuTest Laboratories',
      status: 'active',
      createdDate: '2025-03-01T08:00:00Z',
      lastLogin: '2025-09-29T09:15:00Z',
      loginCount: 134,
      mfaEnabled: true,
      emailVerified: true,
      passwordLastChanged: '2025-09-10T16:00:00Z',
      accountLocked: false,
      failedLoginAttempts: 0,
      sessionCount: 1,
      ipWhitelist: ['198.51.100.0/24'],
      preferences: {
        theme: 'light',
        notifications: true,
        language: 'en'
      },
      permissions: roleDefinitions['laboratory'].permissions,
      dataAccess: {
        companies: ['all'],
        departments: ['Laboratory'],
        workflows: ['testing-assigned'],
        testTypes: ['bioburden', 'sterility', 'residue']
      }
    },
    {
      id: 'user-005',
      username: 'qa_manager',
      email: 'qa.manager@sterixsystem.com',
      firstName: 'Michael',
      lastName: 'Wilson',
      role: 'qa-manager',
      department: 'Quality Assurance',
      company: 'STERIX System',
      status: 'active',
      createdDate: '2025-01-10T09:00:00Z',
      lastLogin: '2025-09-29T08:00:00Z',
      loginCount: 198,
      mfaEnabled: true,
      emailVerified: true,
      passwordLastChanged: '2025-08-20T14:00:00Z',
      accountLocked: false,
      failedLoginAttempts: 0,
      sessionCount: 1,
      ipWhitelist: [],
      preferences: {
        theme: 'light',
        notifications: true,
        language: 'en'
      },
      permissions: roleDefinitions['qa-manager'].permissions,
      dataAccess: {
        companies: ['all'],
        departments: ['Quality Assurance', 'Operations'],
        workflows: ['all']
      }
    },
    {
      id: 'user-006',
      username: 'operator_1',
      email: 'operator1@sterixsystem.com',
      firstName: 'Lisa',
      lastName: 'Brown',
      role: 'operator',
      department: 'Operations',
      company: 'STERIX System',
      status: 'active',
      createdDate: '2025-02-01T10:00:00Z',
      lastLogin: '2025-09-28T16:30:00Z',
      loginCount: 167,
      mfaEnabled: false,
      emailVerified: true,
      passwordLastChanged: '2025-08-01T10:00:00Z',
      accountLocked: false,
      failedLoginAttempts: 0,
      sessionCount: 1,
      ipWhitelist: ['192.168.1.0/24'],
      preferences: {
        theme: 'light',
        notifications: true,
        language: 'en'
      },
      permissions: roleDefinitions['operator'].permissions,
      dataAccess: {
        companies: ['STERIX System'],
        departments: ['Operations'],
        workflows: ['assigned']
      }
    },
    {
      id: 'user-007',
      username: 'external_auditor',
      email: 'auditor@compliance.gov',
      firstName: 'David',
      lastName: 'Martinez',
      role: 'auditor',
      department: 'Compliance',
      company: 'Regulatory Authority',
      status: 'active',
      createdDate: '2025-09-01T12:00:00Z',
      lastLogin: '2025-09-27T13:00:00Z',
      loginCount: 12,
      mfaEnabled: true,
      emailVerified: true,
      passwordLastChanged: '2025-09-01T12:00:00Z',
      accountLocked: false,
      failedLoginAttempts: 0,
      sessionCount: 0,
      ipWhitelist: ['203.0.113.0/24'],
      preferences: {
        theme: 'light',
        notifications: false,
        language: 'en'
      },
      permissions: roleDefinitions['auditor'].permissions,
      dataAccess: {
        companies: ['audit-scope'],
        departments: ['all'],
        workflows: ['audit-assigned']
      }
    }
  ]);

  // Active sessions tracking
  const [activeSessions, setActiveSessions] = useState([
    {
      sessionId: 'sess-001',
      userId: 'user-001',
      username: 'admin',
      role: 'super-admin',
      loginTime: '2025-09-29T08:30:00Z',
      lastActivity: '2025-09-29T10:45:00Z',
      ipAddress: '192.168.1.100',
      userAgent: 'Chrome 118.0.0.0 Windows',
      location: 'Office Network',
      status: 'active'
    },
    {
      sessionId: 'sess-002',
      userId: 'user-003',
      username: 'sterilpro_ops',
      role: 'sterilization-provider',
      loginTime: '2025-09-29T07:45:00Z',
      lastActivity: '2025-09-29T10:40:00Z',
      ipAddress: '192.168.1.25',
      userAgent: 'Firefox 119.0 Windows',
      location: 'Operations Floor',
      status: 'active'
    },
    {
      sessionId: 'sess-003',
      userId: 'user-004',
      username: 'accutest_lab',
      role: 'laboratory',
      loginTime: '2025-09-29T09:15:00Z',
      lastActivity: '2025-09-29T10:35:00Z',
      ipAddress: '198.51.100.15',
      userAgent: 'Chrome 118.0.0.0 Windows',
      location: 'Lab Network',
      status: 'active'
    }
  ]);

  // Security events log
  const [securityEvents, setSecurityEvents] = useState([
    {
      id: 'event-001',
      type: 'login-success',
      userId: 'user-004',
      username: 'accutest_lab',
      timestamp: '2025-09-29T09:15:00Z',
      ipAddress: '198.51.100.15',
      details: 'Successful login with MFA',
      severity: 'info'
    },
    {
      id: 'event-002',
      type: 'permission-denied',
      userId: 'user-002',
      username: 'medtech_qa',
      timestamp: '2025-09-29T08:45:00Z',
      ipAddress: '203.45.67.89',
      details: 'Attempted to access unauthorized workflow WF-2025-002',
      severity: 'warning'
    },
    {
      id: 'event-003',
      type: 'password-change',
      userId: 'user-003',
      username: 'sterilpro_ops',
      timestamp: '2025-09-15T11:00:00Z',
      ipAddress: '192.168.1.25',
      details: 'Password changed successfully',
      severity: 'info'
    },
    {
      id: 'event-004',
      type: 'failed-login',
      userId: 'unknown',
      username: 'admin',
      timestamp: '2025-09-28T23:45:00Z',
      ipAddress: '45.67.89.10',
      details: 'Failed login attempt - incorrect password',
      severity: 'warning'
    },
    {
      id: 'event-005',
      type: 'role-change',
      userId: 'user-006',
      username: 'operator_1',
      timestamp: '2025-09-20T14:30:00Z',
      ipAddress: '192.168.1.100',
      details: 'Role changed from viewer to operator by admin',
      severity: 'info'
    }
  ]);

  // Filter users based on search and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = !searchTerm || 
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Get role badge color
  const getRoleColor = (roleKey) => {
    const colors = {
      'super-admin': '#ff0000',
      'qa-manager': '#ff6600',
      'sterilization-provider': '#0088ff',
      'laboratory': '#00aa00',
      'manufacturer': '#9900ff',
      'operator': '#666666',
      'auditor': '#ff9900'
    };
    return colors[roleKey] || '#666666';
  };

  // Get status color
  const getStatusColor = (status) => {
    const colors = {
      'active': '#00aa00',
      'inactive': '#ffaa00',
      'locked': '#ff0000',
      'suspended': '#ff6600'
    };
    return colors[status] || '#666666';
  };

  // Check if permission is granted
  const hasPermission = (userPermissions, permission) => {
    const value = userPermissions[permission];
    return value === true || (typeof value === 'string' && value !== 'false');
  };

  // Get permission scope
  const getPermissionScope = (userPermissions, permission) => {
    const value = userPermissions[permission];
    if (value === true) return 'Full';
    if (typeof value === 'string') return value;
    return 'None';
  };

  // Format last activity time
  const formatLastActivity = (timestamp) => {
    const now = new Date();
    const activity = new Date(timestamp);
    const diffMinutes = Math.floor((now - activity) / (1000 * 60));
    
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`;
    return `${Math.floor(diffMinutes / 1440)}d ago`;
  };

  // Current user context (simulated as admin)
  const [currentUser] = useState({
    id: 'user-001',
    role: 'super-admin',
    permissions: roleDefinitions['super-admin'].permissions
  });

  return (
    <div className="role-based-access-control">
      {/* Header */}
      <div className="rbac-header">
        <div className="rbac-title-section">
          <h1>🔐 Role-Based Access Control</h1>
          <p>Comprehensive security and access management system</p>
        </div>
        
        <div className="rbac-controls">
          <div className="security-status">
            <span className="active-users">👥 {activeSessions.length} active</span>
            <span className="security-level">🛡️ High Security</span>
          </div>
          
          {hasPermission(currentUser.permissions, 'users.create') && (
            <button 
              className="add-user-btn"
              onClick={() => setUserModal(true)}
            >
              👤 Add User
            </button>
          )}
          
          {hasPermission(currentUser.permissions, 'roles.create') && (
            <button 
              className="add-role-btn"
              onClick={() => setRoleModal(true)}
            >
              🏷️ Add Role
            </button>
          )}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="rbac-navigation">
        <button 
          className={`nav-tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          📊 Security Overview
        </button>
        <button 
          className={`nav-tab ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          👥 User Management
        </button>
        <button 
          className={`nav-tab ${activeTab === 'roles' ? 'active' : ''}`}
          onClick={() => setActiveTab('roles')}
        >
          🏷️ Role Management
        </button>
        <button 
          className={`nav-tab ${activeTab === 'permissions' ? 'active' : ''}`}
          onClick={() => setActiveTab('permissions')}
        >
          🔑 Permission Matrix
        </button>
        <button 
          className={`nav-tab ${activeTab === 'sessions' ? 'active' : ''}`}
          onClick={() => setActiveTab('sessions')}
        >
          🖥️ Active Sessions
        </button>
      </div>

      {/* Security Overview Tab */}
      {activeTab === 'overview' && (
        <div className="security-overview">
          {/* Key Metrics */}
          <div className="security-metrics">
            <div className="metric-card">
              <div className="metric-icon">👥</div>
              <div className="metric-content">
                <h3>Total Users</h3>
                <div className="metric-value">{users.length}</div>
                <div className="metric-change">+2 this month</div>
              </div>
            </div>
            
            <div className="metric-card">
              <div className="metric-icon">🟢</div>
              <div className="metric-content">
                <h3>Active Users</h3>
                <div className="metric-value">
                  {users.filter(u => u.status === 'active').length}
                </div>
                <div className="metric-change">96% active rate</div>
              </div>
            </div>
            
            <div className="metric-card">
              <div className="metric-icon">🖥️</div>
              <div className="metric-content">
                <h3>Active Sessions</h3>
                <div className="metric-value">{activeSessions.length}</div>
                <div className="metric-change">Peak: 8 sessions</div>
              </div>
            </div>
            
            <div className="metric-card">
              <div className="metric-icon">🛡️</div>
              <div className="metric-content">
                <h3>MFA Enabled</h3>
                <div className="metric-value">
                  {users.filter(u => u.mfaEnabled).length}/{users.length}
                </div>
                <div className="metric-change">
                  {Math.round((users.filter(u => u.mfaEnabled).length / users.length) * 100)}% coverage
                </div>
              </div>
            </div>
          </div>

          {/* Role Distribution */}
          <div className="role-distribution">
            <h3>Role Distribution</h3>
            <div className="role-chart">
              {Object.entries(roleDefinitions).map(([roleKey, role]) => {
                const userCount = users.filter(u => u.role === roleKey).length;
                const percentage = (userCount / users.length) * 100;
                
                return (
                  <div key={roleKey} className="role-bar">
                    <div className="role-info">
                      <span className="role-name">{role.name}</span>
                      <span className="role-count">({userCount})</span>
                    </div>
                    <div className="role-progress">
                      <div 
                        className="role-fill"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: getRoleColor(roleKey)
                        }}
                      ></div>
                    </div>
                    <span className="role-percentage">{percentage.toFixed(0)}%</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Security Events */}
          <div className="recent-security-events">
            <h3>Recent Security Events</h3>
            <div className="events-list">
              {securityEvents.slice(0, 10).map(event => (
                <div key={event.id} className={`event-item ${event.severity}`}>
                  <div className="event-icon">
                    {event.type === 'login-success' ? '✅' :
                     event.type === 'failed-login' ? '❌' :
                     event.type === 'permission-denied' ? '⚠️' :
                     event.type === 'password-change' ? '🔐' :
                     event.type === 'role-change' ? '🏷️' : '📋'}
                  </div>
                  
                  <div className="event-content">
                    <div className="event-header">
                      <strong>{event.username || 'Unknown'}</strong>
                      <span className="event-time">
                        {formatLastActivity(event.timestamp)}
                      </span>
                    </div>
                    <div className="event-details">{event.details}</div>
                    <div className="event-meta">
                      <span>IP: {event.ipAddress}</span>
                      <span className={`severity ${event.severity}`}>
                        {event.severity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Company Access Overview */}
          <div className="company-access-overview">
            <h3>Company Data Access</h3>
            <div className="access-matrix">
              {['MedTech Corporation', 'BioMed Solutions Ltd', 'Precision Medical', 'STERIX System'].map(company => (
                <div key={company} className="company-access">
                  <h4>{company}</h4>
                  <div className="access-users">
                    {users.filter(u => 
                      u.dataAccess.companies.includes('all') || 
                      u.dataAccess.companies.includes(company) ||
                      u.company === company
                    ).map(user => (
                      <div key={user.id} className="access-user">
                        <span className="user-name">{user.firstName} {user.lastName}</span>
                        <span 
                          className="user-role"
                          style={{ color: getRoleColor(user.role) }}
                        >
                          {roleDefinitions[user.role]?.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* User Management Tab */}
      {activeTab === 'users' && (
        <div className="user-management">
          {/* Filters */}
          <div className="user-filters">
            <div className="filter-group">
              <label>Search:</label>
              <input 
                type="text"
                placeholder="Search users by name, email, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="filter-group">
              <label>Role:</label>
              <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
                <option value="all">All Roles</option>
                {Object.entries(roleDefinitions).map(([key, role]) => (
                  <option key={key} value={key}>{role.name}</option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label>Status:</label>
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="locked">Locked</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>

          {/* Users Grid */}
          <div className="users-grid">
            {filteredUsers.map(user => (
              <div 
                key={user.id} 
                className={`user-card ${user.status}`}
                onClick={() => setSelectedUser(user)}
              >
                <div className="user-header">
                  <div className="user-avatar">
                    {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                  </div>
                  <div className="user-basic-info">
                    <h4>{user.firstName} {user.lastName}</h4>
                    <p>{user.email}</p>
                    <span className="username">@{user.username}</span>
                  </div>
                </div>
                
                <div className="user-details">
                  <div className="detail-row">
                    <span>Role:</span>
                    <span 
                      className="role-badge"
                      style={{ backgroundColor: getRoleColor(user.role) }}
                    >
                      {roleDefinitions[user.role]?.name}
                    </span>
                  </div>
                  
                  <div className="detail-row">
                    <span>Company:</span>
                    <span>{user.company}</span>
                  </div>
                  
                  <div className="detail-row">
                    <span>Department:</span>
                    <span>{user.department}</span>
                  </div>
                  
                  <div className="detail-row">
                    <span>Status:</span>
                    <span 
                      className="status-badge"
                      style={{ color: getStatusColor(user.status) }}
                    >
                      {user.status}
                    </span>
                  </div>
                  
                  <div className="detail-row">
                    <span>Last Login:</span>
                    <span>{formatLastActivity(user.lastLogin)}</span>
                  </div>
                </div>
                
                <div className="user-security">
                  <div className="security-indicators">
                    <span className={`mfa-indicator ${user.mfaEnabled ? 'enabled' : 'disabled'}`}>
                      🛡️ MFA {user.mfaEnabled ? 'On' : 'Off'}
                    </span>
                    <span className="session-count">
                      🖥️ {user.sessionCount} session{user.sessionCount !== 1 ? 's' : ''}
                    </span>
                    <span className="login-count">
                      📊 {user.loginCount} logins
                    </span>
                  </div>
                  
                  {user.failedLoginAttempts > 0 && (
                    <div className="failed-attempts">
                      ⚠️ {user.failedLoginAttempts} failed attempt{user.failedLoginAttempts !== 1 ? 's' : ''}
                    </div>
                  )}
                </div>
                
                <div className="user-actions">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedUser(user);
                      setUserModal(true);
                    }}
                    disabled={!hasPermission(currentUser.permissions, 'users.update')}
                  >
                    ✏️ Edit
                  </button>
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      // Reset password logic
                    }}
                    disabled={!hasPermission(currentUser.permissions, 'users.update')}
                  >
                    🔄 Reset Password
                  </button>
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      // Toggle status logic
                    }}
                    disabled={!hasPermission(currentUser.permissions, 'users.update')}
                  >
                    {user.status === 'active' ? '⏸️ Suspend' : '▶️ Activate'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Role Management Tab */}
      {activeTab === 'roles' && (
        <div className="role-management">
          <div className="roles-grid">
            {Object.entries(roleDefinitions).map(([roleKey, role]) => {
              const userCount = users.filter(u => u.role === roleKey).length;
              const permissionCount = Object.values(role.permissions).filter(p => p === true).length;
              
              return (
                <div 
                  key={roleKey} 
                  className="role-card"
                  onClick={() => setSelectedRole({key: roleKey, ...role})}
                >
                  <div className="role-header">
                    <h4>{role.name}</h4>
                    <span 
                      className="role-level"
                      style={{ backgroundColor: getRoleColor(roleKey) }}
                    >
                      Level {role.level}
                    </span>
                  </div>
                  
                  <div className="role-description">
                    <p>{role.description}</p>
                  </div>
                  
                  <div className="role-stats">
                    <div className="stat-item">
                      <span className="stat-label">Users:</span>
                      <span className="stat-value">{userCount}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Permissions:</span>
                      <span className="stat-value">{permissionCount}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Max Sessions:</span>
                      <span className="stat-value">{role.maxSessions}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Session Timeout:</span>
                      <span className="stat-value">{role.sessionTimeout}m</span>
                    </div>
                  </div>
                  
                  <div className="role-security">
                    <div className="security-item">
                      <span>🛡️ MFA Required:</span>
                      <span>{role.mfaRequired ? 'Yes' : 'No'}</span>
                    </div>
                    {role.ipRestrictions.length > 0 && (
                      <div className="security-item">
                        <span>🌐 IP Restrictions:</span>
                        <span>{role.ipRestrictions.length} rule{role.ipRestrictions.length !== 1 ? 's' : ''}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="role-actions">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedRole({key: roleKey, ...role});
                      }}
                    >
                      👁️ View Details
                    </button>
                    
                    {hasPermission(currentUser.permissions, 'roles.update') && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRole({key: roleKey, ...role});
                          setRoleModal(true);
                        }}
                      >
                        ✏️ Edit
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Permission Matrix Tab */}
      {activeTab === 'permissions' && (
        <div className="permission-matrix">
          <h3>Permission Matrix</h3>
          
          <div className="matrix-container">
            <div className="matrix-table">
              <div className="matrix-header">
                <div className="permission-column">Permission</div>
                {Object.entries(roleDefinitions).map(([roleKey, role]) => (
                  <div 
                    key={roleKey} 
                    className="role-column"
                    style={{ backgroundColor: getRoleColor(roleKey) }}
                  >
                    {role.name}
                  </div>
                ))}
              </div>
              
              <div className="matrix-body">
                {Object.keys(roleDefinitions['super-admin'].permissions).map(permission => (
                  <div key={permission} className="matrix-row">
                    <div className="permission-name">{permission}</div>
                    {Object.entries(roleDefinitions).map(([roleKey, role]) => (
                      <div key={roleKey} className="permission-cell">
                        <span className={`permission-indicator ${hasPermission(role.permissions, permission) ? 'granted' : 'denied'}`}>
                          {hasPermission(role.permissions, permission) ? '✅' : '❌'}
                        </span>
                        <span className="permission-scope">
                          {getPermissionScope(role.permissions, permission)}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Active Sessions Tab */}
      {activeTab === 'sessions' && (
        <div className="active-sessions">
          <h3>Active User Sessions</h3>
          
          <div className="sessions-list">
            {activeSessions.map(session => {
              const user = users.find(u => u.id === session.userId);
              
              return (
                <div key={session.sessionId} className="session-item">
                  <div className="session-user">
                    <div className="user-avatar">
                      {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                    </div>
                    <div className="user-info">
                      <strong>{user?.firstName} {user?.lastName}</strong>
                      <span>@{session.username}</span>
                      <span 
                        className="role-badge"
                        style={{ backgroundColor: getRoleColor(session.role) }}
                      >
                        {roleDefinitions[session.role]?.name}
                      </span>
                    </div>
                  </div>
                  
                  <div className="session-details">
                    <div className="detail-item">
                      <strong>Login Time:</strong>
                      {new Date(session.loginTime).toLocaleString()}
                    </div>
                    <div className="detail-item">
                      <strong>Last Activity:</strong>
                      {formatLastActivity(session.lastActivity)}
                    </div>
                    <div className="detail-item">
                      <strong>IP Address:</strong>
                      {session.ipAddress}
                    </div>
                    <div className="detail-item">
                      <strong>Location:</strong>
                      {session.location}
                    </div>
                    <div className="detail-item">
                      <strong>User Agent:</strong>
                      {session.userAgent}
                    </div>
                  </div>
                  
                  <div className="session-status">
                    <span className={`status-indicator ${session.status}`}>
                      {session.status}
                    </span>
                  </div>
                  
                  <div className="session-actions">
                    {hasPermission(currentUser.permissions, 'system.admin') && (
                      <button 
                        onClick={() => {
                          // Terminate session logic
                          setActiveSessions(prev => 
                            prev.filter(s => s.sessionId !== session.sessionId)
                          );
                        }}
                        className="terminate-btn"
                      >
                        🚫 Terminate
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* User Detail Modal */}
      {selectedUser && !userModal && (
        <div className="modal-overlay">
          <div className="user-detail-modal">
            <div className="modal-header">
              <h3>👤 User Details - {selectedUser.firstName} {selectedUser.lastName}</h3>
              <button 
                className="close-btn"
                onClick={() => setSelectedUser(null)}
              >
                ✕
              </button>
            </div>
            
            <div className="modal-content">
              <div className="detail-sections">
                <div className="detail-section">
                  <h4>Basic Information</h4>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <strong>User ID:</strong> {selectedUser.id}
                    </div>
                    <div className="detail-item">
                      <strong>Username:</strong> {selectedUser.username}
                    </div>
                    <div className="detail-item">
                      <strong>Email:</strong> {selectedUser.email}
                    </div>
                    <div className="detail-item">
                      <strong>Name:</strong> {selectedUser.firstName} {selectedUser.lastName}
                    </div>
                    <div className="detail-item">
                      <strong>Company:</strong> {selectedUser.company}
                    </div>
                    <div className="detail-item">
                      <strong>Department:</strong> {selectedUser.department}
                    </div>
                  </div>
                </div>
                
                <div className="detail-section">
                  <h4>Role & Permissions</h4>
                  <div className="role-info">
                    <span 
                      className="role-badge large"
                      style={{ backgroundColor: getRoleColor(selectedUser.role) }}
                    >
                      {roleDefinitions[selectedUser.role]?.name}
                    </span>
                    <p>{roleDefinitions[selectedUser.role]?.description}</p>
                  </div>
                  
                  <div className="permissions-summary">
                    <h5>Key Permissions:</h5>
                    <div className="permission-list">
                      {Object.entries(selectedUser.permissions)
                        .filter(([_, value]) => value === true)
                        .slice(0, 10)
                        .map(([permission]) => (
                          <span key={permission} className="permission-tag">
                            {permission}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
                
                <div className="detail-section">
                  <h4>Security Settings</h4>
                  <div className="security-grid">
                    <div className="security-item">
                      <strong>MFA Enabled:</strong>
                      <span className={selectedUser.mfaEnabled ? 'enabled' : 'disabled'}>
                        {selectedUser.mfaEnabled ? '✅ Yes' : '❌ No'}
                      </span>
                    </div>
                    <div className="security-item">
                      <strong>Email Verified:</strong>
                      <span className={selectedUser.emailVerified ? 'verified' : 'unverified'}>
                        {selectedUser.emailVerified ? '✅ Verified' : '❌ Unverified'}
                      </span>
                    </div>
                    <div className="security-item">
                      <strong>Account Status:</strong>
                      <span style={{ color: getStatusColor(selectedUser.status) }}>
                        {selectedUser.status}
                      </span>
                    </div>
                    <div className="security-item">
                      <strong>Account Locked:</strong>
                      <span className={selectedUser.accountLocked ? 'locked' : 'unlocked'}>
                        {selectedUser.accountLocked ? '🔒 Yes' : '🔓 No'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="detail-section">
                  <h4>Data Access Scope</h4>
                  <div className="access-scope">
                    <div className="scope-item">
                      <strong>Companies:</strong>
                      <span>{selectedUser.dataAccess.companies.join(', ')}</span>
                    </div>
                    <div className="scope-item">
                      <strong>Departments:</strong>
                      <span>{selectedUser.dataAccess.departments.join(', ')}</span>
                    </div>
                    <div className="scope-item">
                      <strong>Workflows:</strong>
                      <span>{selectedUser.dataAccess.workflows.join(', ')}</span>
                    </div>
                  </div>
                </div>
                
                <div className="detail-section">
                  <h4>Activity Summary</h4>
                  <div className="activity-stats">
                    <div className="stat-item">
                      <strong>Created:</strong>
                      {new Date(selectedUser.createdDate).toLocaleDateString()}
                    </div>
                    <div className="stat-item">
                      <strong>Last Login:</strong>
                      {new Date(selectedUser.lastLogin).toLocaleString()}
                    </div>
                    <div className="stat-item">
                      <strong>Total Logins:</strong>
                      {selectedUser.loginCount}
                    </div>
                    <div className="stat-item">
                      <strong>Failed Attempts:</strong>
                      {selectedUser.failedLoginAttempts}
                    </div>
                    <div className="stat-item">
                      <strong>Active Sessions:</strong>
                      {selectedUser.sessionCount}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Role Detail Modal */}
      {selectedRole && !roleModal && (
        <div className="modal-overlay">
          <div className="role-detail-modal">
            <div className="modal-header">
              <h3>🏷️ Role Details - {selectedRole.name}</h3>
              <button 
                className="close-btn"
                onClick={() => setSelectedRole(null)}
              >
                ✕
              </button>
            </div>
            
            <div className="modal-content">
              <div className="role-overview">
                <div className="role-info">
                  <h4>{selectedRole.name}</h4>
                  <p>{selectedRole.description}</p>
                  <span 
                    className="role-level-badge"
                    style={{ backgroundColor: getRoleColor(selectedRole.key) }}
                  >
                    Security Level {selectedRole.level}
                  </span>
                </div>
                
                <div className="role-settings">
                  <div className="setting-item">
                    <strong>Max Sessions:</strong> {selectedRole.maxSessions}
                  </div>
                  <div className="setting-item">
                    <strong>Session Timeout:</strong> {selectedRole.sessionTimeout} minutes
                  </div>
                  <div className="setting-item">
                    <strong>MFA Required:</strong> {selectedRole.mfaRequired ? 'Yes' : 'No'}
                  </div>
                </div>
              </div>
              
              <div className="permissions-detail">
                <h4>Detailed Permissions</h4>
                <div className="permission-categories">
                  {Object.entries(selectedRole.permissions).reduce((categories, [permission, value]) => {
                    const category = permission.split('.')[0];
                    if (!categories[category]) categories[category] = [];
                    categories[category].push({ permission, value });
                    return categories;
                  }, {})
                  }
                  {Object.entries(Object.entries(selectedRole.permissions).reduce((categories, [permission, value]) => {
                    const category = permission.split('.')[0];
                    if (!categories[category]) categories[category] = [];
                    categories[category].push({ permission, value });
                    return categories;
                  }, {})).map(([category, permissions]) => (
                    <div key={category} className="permission-category">
                      <h5>{category.charAt(0).toUpperCase() + category.slice(1)}</h5>
                      <div className="permission-items">
                        {permissions.map(({ permission, value }) => (
                          <div key={permission} className="permission-item">
                            <span className="permission-name">{permission}</span>
                            <span className={`permission-value ${hasPermission(selectedRole.permissions, permission) ? 'granted' : 'denied'}`}>
                              {typeof value === 'boolean' ? (value ? 'Full Access' : 'No Access') : value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleBasedAccessControl;