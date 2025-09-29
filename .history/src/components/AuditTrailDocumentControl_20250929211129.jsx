import React, { useState, useEffect } from 'react';

const AuditTrailDocumentControl = () => {
  const [activeTab, setActiveTab] = useState('repository'); // 'repository', 'versions', 'audit', 'access'
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [uploadModal, setUploadModal] = useState(false);
  const [versionModal, setVersionModal] = useState(false);
  const [accessModal, setAccessModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid', 'list', 'tree'

  // Document categories and types
  const documentCategories = {
    'protocols': {
      name: 'Protocols & Procedures',
      icon: '📋',
      types: ['SOP', 'Work Instruction', 'Test Protocol', 'Cleaning Protocol']
    },
    'reports': {
      name: 'Test Reports',
      icon: '📊',
      types: ['Bioburden Report', 'Sterility Report', 'Residue Analysis', 'Validation Report']
    },
    'certificates': {
      name: 'Certificates',
      icon: '🏆',
      types: ['Sterilization Certificate', 'Calibration Certificate', 'Qualification Certificate']
    },
    'specifications': {
      name: 'Specifications',
      icon: '📐',
      types: ['Product Specification', 'Test Specification', 'Equipment Specification']
    },
    'regulatory': {
      name: 'Regulatory Documents',
      icon: '⚖️',
      types: ['Submission', 'Approval Letter', 'Guidance Document', 'Regulation']
    },
    'quality': {
      name: 'Quality Documents',
      icon: '✅',
      types: ['Quality Manual', 'Quality Plan', 'CAPA', 'Deviation Report']
    }
  };

  // Comprehensive document repository
  const [documents, setDocuments] = useState([
    {
      id: 'DOC-2025-001',
      name: 'Steam Sterilization SOP',
      category: 'protocols',
      type: 'SOP',
      version: '3.2',
      status: 'active',
      confidentialityLevel: 'internal',
      fileSize: '2.5 MB',
      fileType: 'application/pdf',
      description: 'Standard Operating Procedure for Steam Sterilization Processes',
      tags: ['sterilization', 'steam', 'SOP', 'validation'],
      createdDate: '2025-01-15T10:00:00Z',
      lastModified: '2025-09-15T14:30:00Z',
      createdBy: 'Dr. Sarah Johnson',
      lastModifiedBy: 'Dr. Michael Chen',
      approvedBy: 'QA Manager',
      approvalDate: '2025-09-16T09:00:00Z',
      expiryDate: '2026-09-15T23:59:59Z',
      reviewDate: '2026-03-15T23:59:59Z',
      department: 'Quality Assurance',
      location: '/quality/protocols/sterilization/',
      checksum: 'SHA256:abc123def456...',
      digitalSignature: true,
      retentionPeriod: '7 years',
      accessLevel: 'controlled',
      downloadCount: 45,
      viewCount: 128,
      versions: [
        {
          version: '3.2',
          date: '2025-09-15T14:30:00Z',
          author: 'Dr. Michael Chen',
          changes: 'Updated temperature requirements per new guidelines',
          fileSize: '2.5 MB',
          status: 'current'
        },
        {
          version: '3.1',
          date: '2025-06-10T11:20:00Z',
          author: 'Dr. Sarah Johnson',
          changes: 'Added new safety protocols',
          fileSize: '2.4 MB',
          status: 'superseded'
        },
        {
          version: '3.0',
          date: '2025-01-15T10:00:00Z',
          author: 'Dr. Sarah Johnson',
          changes: 'Major revision - restructured entire document',
          fileSize: '2.3 MB',
          status: 'superseded'
        }
      ],
      accessLog: [
        { user: 'John Doe', action: 'viewed', timestamp: '2025-09-29T09:30:00Z', ipAddress: '192.168.1.10' },
        { user: 'Jane Smith', action: 'downloaded', timestamp: '2025-09-28T15:45:00Z', ipAddress: '192.168.1.15' },
        { user: 'Mike Wilson', action: 'viewed', timestamp: '2025-09-27T11:20:00Z', ipAddress: '192.168.1.20' }
      ],
      relatedDocuments: ['DOC-2025-002', 'DOC-2025-015'],
      workflowId: 'WF-2025-001',
      complianceRequirements: ['ISO 13485', 'FDA 21 CFR 820', 'EU MDR'],
      changeHistory: [
        {
          changeId: 'CHG-2025-001',
          date: '2025-09-15T14:30:00Z',
          type: 'content-update',
          description: 'Updated temperature requirements',
          requestedBy: 'Quality Manager',
          approvedBy: 'QA Manager',
          reason: 'Regulatory update compliance'
        }
      ]
    },
    {
      id: 'DOC-2025-002',
      name: 'Bioburden Test Report - MT-SI-2025-001',
      category: 'reports',
      type: 'Bioburden Report',
      version: '1.0',
      status: 'active',
      confidentialityLevel: 'confidential',
      fileSize: '3.8 MB',
      fileType: 'application/pdf',
      description: 'Bioburden testing results for MedTech Surgical Instruments batch',
      tags: ['bioburden', 'testing', 'validation', 'MedTech'],
      createdDate: '2025-09-28T14:30:00Z',
      lastModified: '2025-09-28T14:30:00Z',
      createdBy: 'Dr. Emily Chen',
      lastModifiedBy: 'Dr. Emily Chen',
      approvedBy: 'Lab Director',
      approvalDate: '2025-09-28T16:00:00Z',
      expiryDate: '2025-12-28T23:59:59Z',
      reviewDate: null,
      department: 'Laboratory',
      location: '/laboratory/reports/bioburden/',
      checksum: 'SHA256:def789ghi012...',
      digitalSignature: true,
      retentionPeriod: '10 years',
      accessLevel: 'restricted',
      downloadCount: 12,
      viewCount: 28,
      versions: [
        {
          version: '1.0',
          date: '2025-09-28T14:30:00Z',
          author: 'Dr. Emily Chen',
          changes: 'Initial version',
          fileSize: '3.8 MB',
          status: 'current'
        }
      ],
      accessLog: [
        { user: 'MedTech QA', action: 'downloaded', timestamp: '2025-09-29T08:15:00Z', ipAddress: '203.45.67.89' },
        { user: 'Sterilization Ops', action: 'viewed', timestamp: '2025-09-28T17:30:00Z', ipAddress: '192.168.1.25' }
      ],
      relatedDocuments: ['DOC-2025-001', 'DOC-2025-010'],
      workflowId: 'WF-2025-001',
      complianceRequirements: ['ISO 11737-1', 'FDA Guidance'],
      changeHistory: []
    },
    {
      id: 'DOC-2025-003',
      name: 'Sterilization Certificate - ACC-2025-ST-002',
      category: 'certificates',
      type: 'Sterilization Certificate',
      version: '1.0',
      status: 'active',
      confidentialityLevel: 'public',
      fileSize: '0.9 MB',
      fileType: 'application/pdf',
      description: 'Official sterilization certificate for BioMed Orthopedic Implants',
      tags: ['certificate', 'sterilization', 'BioMed', 'implants'],
      createdDate: '2025-09-27T16:48:00Z',
      lastModified: '2025-09-27T16:48:00Z',
      createdBy: 'Certificate System',
      lastModifiedBy: 'Certificate System',
      approvedBy: 'QA Manager',
      approvalDate: '2025-09-27T17:00:00Z',
      expiryDate: '2025-12-27T23:59:59Z',
      reviewDate: null,
      department: 'Quality Assurance',
      location: '/certificates/sterilization/',
      checksum: 'SHA256:ghi345jkl678...',
      digitalSignature: true,
      retentionPeriod: 'permanent',
      accessLevel: 'public',
      downloadCount: 8,
      viewCount: 35,
      versions: [
        {
          version: '1.0',
          date: '2025-09-27T16:48:00Z',
          author: 'Certificate System',
          changes: 'Initial certificate generation',
          fileSize: '0.9 MB',
          status: 'current'
        }
      ],
      accessLog: [
        { user: 'BioMed Quality', action: 'downloaded', timestamp: '2025-09-29T10:20:00Z', ipAddress: '198.51.100.42' },
        { user: 'Regulatory Authority', action: 'viewed', timestamp: '2025-09-28T13:15:00Z', ipAddress: '203.0.113.15' }
      ],
      relatedDocuments: ['DOC-2025-002', 'DOC-2025-012'],
      workflowId: 'WF-2025-002',
      complianceRequirements: ['ISO 11135', 'EU MDR'],
      changeHistory: []
    },
    {
      id: 'DOC-2025-004',
      name: 'Chamber Qualification Protocol',
      category: 'protocols',
      type: 'Test Protocol',
      version: '2.1',
      status: 'under-review',
      confidentialityLevel: 'internal',
      fileSize: '4.2 MB',
      fileType: 'application/pdf',
      description: 'Installation, Operational, and Performance Qualification for Steam Chambers',
      tags: ['qualification', 'chamber', 'validation', 'IQ/OQ/PQ'],
      createdDate: '2025-08-20T09:00:00Z',
      lastModified: '2025-09-25T11:45:00Z',
      createdBy: 'Validation Engineer',
      lastModifiedBy: 'Senior Engineer',
      approvedBy: null,
      approvalDate: null,
      expiryDate: null,
      reviewDate: '2025-10-05T23:59:59Z',
      department: 'Engineering',
      location: '/engineering/protocols/qualification/',
      checksum: 'SHA256:jkl678mno901...',
      digitalSignature: false,
      retentionPeriod: '10 years',
      accessLevel: 'controlled',
      downloadCount: 3,
      viewCount: 15,
      versions: [
        {
          version: '2.1',
          date: '2025-09-25T11:45:00Z',
          author: 'Senior Engineer',
          changes: 'Updated acceptance criteria per latest standards',
          fileSize: '4.2 MB',
          status: 'draft'
        },
        {
          version: '2.0',
          date: '2025-08-20T09:00:00Z',
          author: 'Validation Engineer',
          changes: 'Complete revision for new chamber models',
          fileSize: '4.0 MB',
          status: 'superseded'
        }
      ],
      accessLog: [
        { user: 'QA Reviewer', action: 'viewed', timestamp: '2025-09-28T14:30:00Z', ipAddress: '192.168.1.30' },
        { user: 'Validation Team', action: 'downloaded', timestamp: '2025-09-26T09:15:00Z', ipAddress: '192.168.1.35' }
      ],
      relatedDocuments: ['DOC-2025-001', 'DOC-2025-005'],
      workflowId: null,
      complianceRequirements: ['ISO 17665', 'AAMI ST79'],
      changeHistory: [
        {
          changeId: 'CHG-2025-002',
          date: '2025-09-25T11:45:00Z',
          type: 'content-update',
          description: 'Updated acceptance criteria',
          requestedBy: 'Validation Manager',
          approvedBy: 'Engineering Manager',
          reason: 'Standards compliance update'
        }
      ]
    }
  ]);

  // User roles and permissions
  const userRoles = {
    'admin': {
      name: 'Administrator',
      permissions: ['create', 'read', 'update', 'delete', 'approve', 'manage-access'],
      description: 'Full system access'
    },
    'qa-manager': {
      name: 'QA Manager',
      permissions: ['create', 'read', 'update', 'approve'],
      description: 'Quality assurance management'
    },
    'engineer': {
      name: 'Engineer',
      permissions: ['create', 'read', 'update'],
      description: 'Technical document management'
    },
    'analyst': {
      name: 'Analyst',
      permissions: ['create', 'read'],
      description: 'Create and view reports'
    },
    'viewer': {
      name: 'Viewer',
      permissions: ['read'],
      description: 'Read-only access'
    }
  };

  // Current user context (simulated)
  const [currentUser] = useState({
    id: 'user-001',
    name: 'John Doe',
    email: 'john.doe@company.com',
    role: 'qa-manager',
    department: 'Quality Assurance'
  });

  // Filter documents based on search and filters
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = !searchTerm || 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
      doc.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || doc.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || doc.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Get document type icon
  const getDocumentIcon = (category, type) => {
    if (documentCategories[category]) {
      return documentCategories[category].icon;
    }
    return '📄';
  };

  // Get status color
  const getStatusColor = (status) => {
    const colors = {
      'active': '#00aa00',
      'under-review': '#ffaa00',
      'draft': '#0088ff',
      'expired': '#ff0000',
      'archived': '#666666'
    };
    return colors[status] || '#666666';
  };

  // Get confidentiality level color
  const getConfidentialityColor = (level) => {
    const colors = {
      'public': '#00aa00',
      'internal': '#ffaa00',
      'confidential': '#ff6600',
      'restricted': '#ff0000'
    };
    return colors[level] || '#666666';
  };

  // Check user permissions
  const hasPermission = (permission) => {
    const userPermissions = userRoles[currentUser.role]?.permissions || [];
    return userPermissions.includes(permission);
  };

  // Handle document upload
  const handleDocumentUpload = () => {
    // Simulated upload logic
    console.log('Document upload initiated');
    setUploadModal(false);
  };

  // Create new document version
  const createNewVersion = (documentId, versionData) => {
    setDocuments(prev => prev.map(doc => {
      if (doc.id === documentId) {
        const newVersion = {
          version: versionData.version,
          date: new Date().toISOString(),
          author: currentUser.name,
          changes: versionData.changes,
          fileSize: versionData.fileSize,
          status: 'current'
        };
        
        // Mark previous versions as superseded
        const updatedVersions = doc.versions.map(v => ({
          ...v,
          status: v.status === 'current' ? 'superseded' : v.status
        }));
        
        return {
          ...doc,
          version: versionData.version,
          lastModified: new Date().toISOString(),
          lastModifiedBy: currentUser.name,
          versions: [newVersion, ...updatedVersions],
          changeHistory: [
            {
              changeId: `CHG-${new Date().getFullYear()}-${String(doc.changeHistory.length + 1).padStart(3, '0')}`,
              date: new Date().toISOString(),
              type: 'version-update',
              description: versionData.changes,
              requestedBy: currentUser.name,
              approvedBy: currentUser.role === 'qa-manager' ? currentUser.name : null,
              reason: 'Document revision'
            },
            ...doc.changeHistory
          ]
        };
      }
      return doc;
    }));
  };

  // Log document access
  const logDocumentAccess = (documentId, action) => {
    const timestamp = new Date().toISOString();
    setDocuments(prev => prev.map(doc => {
      if (doc.id === documentId) {
        const accessEntry = {
          user: currentUser.name,
          action: action,
          timestamp: timestamp,
          ipAddress: '192.168.1.100' // Simulated
        };
        
        return {
          ...doc,
          accessLog: [accessEntry, ...doc.accessLog.slice(0, 49)], // Keep last 50 entries
          viewCount: action === 'viewed' ? doc.viewCount + 1 : doc.viewCount,
          downloadCount: action === 'downloaded' ? doc.downloadCount + 1 : doc.downloadCount
        };
      }
      return doc;
    }));
  };

  // Format file size
  const formatFileSize = (sizeStr) => {
    return sizeStr;
  };

  // Format date
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString();
  };

  // Format datetime
  const formatDateTime = (dateStr) => {
    return new Date(dateStr).toLocaleString();
  };

  return (
    <div className="audit-trail-document-control">
      {/* Header */}
      <div className="atdc-header">
        <div className="atdc-title-section">
          <h1>📁 Document Control & Audit Trail</h1>
          <p>Enterprise document management with comprehensive audit tracking</p>
        </div>
        
        <div className="atdc-controls">
          <div className="user-info">
            <span className="user-name">{currentUser.name}</span>
            <span className="user-role">{userRoles[currentUser.role]?.name}</span>
          </div>
          
          {hasPermission('create') && (
            <button 
              className="upload-btn"
              onClick={() => setUploadModal(true)}
            >
              📤 Upload Document
            </button>
          )}
          
          <div className="view-mode-selector">
            <button 
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              ⊞ Grid
            </button>
            <button 
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              ☰ List
            </button>
            <button 
              className={`view-btn ${viewMode === 'tree' ? 'active' : ''}`}
              onClick={() => setViewMode('tree')}
            >
              🌳 Tree
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="atdc-navigation">
        <button 
          className={`nav-tab ${activeTab === 'repository' ? 'active' : ''}`}
          onClick={() => setActiveTab('repository')}
        >
          📂 Document Repository
        </button>
        <button 
          className={`nav-tab ${activeTab === 'versions' ? 'active' : ''}`}
          onClick={() => setActiveTab('versions')}
        >
          🔄 Version Control
        </button>
        <button 
          className={`nav-tab ${activeTab === 'audit' ? 'active' : ''}`}
          onClick={() => setActiveTab('audit')}
        >
          📋 Audit Trail
        </button>
        <button 
          className={`nav-tab ${activeTab === 'access' ? 'active' : ''}`}
          onClick={() => setActiveTab('access')}
        >
          🔐 Access Control
        </button>
      </div>

      {/* Filters */}
      <div className="atdc-filters">
        <div className="filter-group">
          <label>Search:</label>
          <input 
            type="text"
            placeholder="Search documents, descriptions, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-group">
          <label>Category:</label>
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="all">All Categories</option>
            {Object.entries(documentCategories).map(([key, category]) => (
              <option key={key} value={key}>{category.name}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-group">
          <label>Status:</label>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="under-review">Under Review</option>
            <option value="draft">Draft</option>
            <option value="expired">Expired</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Repository Tab */}
      {activeTab === 'repository' && (
        <div className="document-repository">
          {/* Repository Stats */}
          <div className="repository-stats">
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-content">
                <h3>Total Documents</h3>
                <div className="stat-value">{documents.length}</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-content">
                <h3>Active</h3>
                <div className="stat-value">
                  {documents.filter(d => d.status === 'active').length}
                </div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">⏳</div>
              <div className="stat-content">
                <h3>Under Review</h3>
                <div className="stat-value">
                  {documents.filter(d => d.status === 'under-review').length}
                </div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">💾</div>
              <div className="stat-content">
                <h3>Total Size</h3>
                <div className="stat-value">
                  {documents.reduce((total, doc) => {
                    const size = parseFloat(doc.fileSize.split(' ')[0]);
                    return total + size;
                  }, 0).toFixed(1)} MB
                </div>
              </div>
            </div>
          </div>

          {/* Document View */}
          {viewMode === 'grid' && (
            <div className="documents-grid">
              {filteredDocuments.map(doc => (
                <div 
                  key={doc.id} 
                  className={`document-card ${doc.status}`}
                  onClick={() => {
                    setSelectedDocument(doc);
                    logDocumentAccess(doc.id, 'viewed');
                  }}
                >
                  <div className="document-header">
                    <div className="document-icon">
                      {getDocumentIcon(doc.category, doc.type)}
                    </div>
                    <div className="document-id">{doc.id}</div>
                    <div className="document-status">
                      <span 
                        className="status-indicator"
                        style={{ color: getStatusColor(doc.status) }}
                      >
                        {doc.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="document-content">
                    <h4>{doc.name}</h4>
                    <p>{doc.description}</p>
                    
                    <div className="document-details">
                      <div className="detail-row">
                        <span>Type:</span>
                        <span>{doc.type}</span>
                      </div>
                      <div className="detail-row">
                        <span>Version:</span>
                        <span>v{doc.version}</span>
                      </div>
                      <div className="detail-row">
                        <span>Size:</span>
                        <span>{doc.fileSize}</span>
                      </div>
                      <div className="detail-row">
                        <span>Modified:</span>
                        <span>{formatDate(doc.lastModified)}</span>
                      </div>
                    </div>
                    
                    <div className="confidentiality-level">
                      <span 
                        className="confidentiality-badge"
                        style={{ backgroundColor: getConfidentialityColor(doc.confidentialityLevel) }}
                      >
                        {doc.confidentialityLevel}
                      </span>
                    </div>
                    
                    <div className="document-tags">
                      {doc.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                      {doc.tags.length > 3 && (
                        <span className="tag-more">+{doc.tags.length - 3}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="document-actions">
                    <button onClick={(e) => {
                      e.stopPropagation();
                      logDocumentAccess(doc.id, 'downloaded');
                    }}>
                      📥 Download
                    </button>
                    {hasPermission('update') && (
                      <button onClick={(e) => {
                        e.stopPropagation();
                        setSelectedDocument(doc);
                        setVersionModal(true);
                      }}>
                        🔄 New Version
                      </button>
                    )}
                    {hasPermission('manage-access') && (
                      <button onClick={(e) => {
                        e.stopPropagation();
                        setSelectedDocument(doc);
                        setAccessModal(true);
                      }}>
                        🔐 Access
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {viewMode === 'list' && (
            <div className="documents-list">
              <div className="list-header">
                <div className="header-cell">Document</div>
                <div className="header-cell">Type</div>
                <div className="header-cell">Version</div>
                <div className="header-cell">Status</div>
                <div className="header-cell">Modified</div>
                <div className="header-cell">Size</div>
                <div className="header-cell">Actions</div>
              </div>
              
              {filteredDocuments.map(doc => (
                <div 
                  key={doc.id} 
                  className={`list-row ${doc.status}`}
                  onClick={() => {
                    setSelectedDocument(doc);
                    logDocumentAccess(doc.id, 'viewed');
                  }}
                >
                  <div className="list-cell document-info">
                    <span className="document-icon">{getDocumentIcon(doc.category, doc.type)}</span>
                    <div className="document-details">
                      <strong>{doc.name}</strong>
                      <span className="document-id">{doc.id}</span>
                    </div>
                  </div>
                  <div className="list-cell">{doc.type}</div>
                  <div className="list-cell">v{doc.version}</div>
                  <div className="list-cell">
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(doc.status) }}
                    >
                      {doc.status}
                    </span>
                  </div>
                  <div className="list-cell">{formatDate(doc.lastModified)}</div>
                  <div className="list-cell">{doc.fileSize}</div>
                  <div className="list-cell actions">
                    <button onClick={(e) => {
                      e.stopPropagation();
                      logDocumentAccess(doc.id, 'downloaded');
                    }}>
                      📥
                    </button>
                    {hasPermission('update') && (
                      <button onClick={(e) => {
                        e.stopPropagation();
                        setSelectedDocument(doc);
                        setVersionModal(true);
                      }}>
                        🔄
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {viewMode === 'tree' && (
            <div className="documents-tree">
              {Object.entries(documentCategories).map(([categoryKey, category]) => {
                const categoryDocs = filteredDocuments.filter(doc => doc.category === categoryKey);
                
                return (
                  <div key={categoryKey} className="tree-category">
                    <div className="category-header">
                      <span className="category-icon">{category.icon}</span>
                      <span className="category-name">{category.name}</span>
                      <span className="document-count">({categoryDocs.length})</span>
                    </div>
                    
                    <div className="category-documents">
                      {categoryDocs.map(doc => (
                        <div 
                          key={doc.id} 
                          className={`tree-document ${doc.status}`}
                          onClick={() => {
                            setSelectedDocument(doc);
                            logDocumentAccess(doc.id, 'viewed');
                          }}
                        >
                          <div className="document-info">
                            <strong>{doc.name}</strong>
                            <span className="document-version">v{doc.version}</span>
                          </div>
                          <div className="document-meta">
                            <span>{doc.fileSize}</span>
                            <span>{formatDate(doc.lastModified)}</span>
                            <span 
                              className="status-indicator"
                              style={{ color: getStatusColor(doc.status) }}
                            >
                              {doc.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Version Control Tab */}
      {activeTab === 'versions' && (
        <div className="version-control">
          <h3>📝 Document Version History</h3>
          
          <div className="version-overview">
            {filteredDocuments.map(doc => (
              <div key={doc.id} className="document-versions">
                <div className="document-header">
                  <h4>{doc.name} ({doc.id})</h4>
                  <span className="current-version">Current: v{doc.version}</span>
                </div>
                
                <div className="version-timeline">
                  {doc.versions.map((version, index) => (
                    <div key={version.version} className={`version-item ${version.status}`}>
                      <div className="version-marker">
                        <span className="version-number">v{version.version}</span>
                        {version.status === 'current' && <span className="current-badge">CURRENT</span>}
                      </div>
                      
                      <div className="version-content">
                        <div className="version-header">
                          <strong>Version {version.version}</strong>
                          <span className="version-date">{formatDateTime(version.date)}</span>
                        </div>
                        
                        <div className="version-details">
                          <div className="detail-row">
                            <span>Author:</span>
                            <span>{version.author}</span>
                          </div>
                          <div className="detail-row">
                            <span>Size:</span>
                            <span>{version.fileSize}</span>
                          </div>
                          <div className="detail-row">
                            <span>Changes:</span>
                            <span>{version.changes}</span>
                          </div>
                        </div>
                        
                        <div className="version-actions">
                          <button onClick={() => logDocumentAccess(doc.id, 'downloaded')}>
                            📥 Download
                          </button>
                          {version.status !== 'current' && hasPermission('update') && (
                            <button>🔄 Restore</button>
                          )}
                          <button onClick={() => {
                            setSelectedDocument({...doc, selectedVersion: version});
                          }}>
                            👁️ Compare
                          </button>
                        </div>
                      </div>
                      
                      {index < doc.versions.length - 1 && (
                        <div className="version-connector"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Audit Trail Tab */}
      {activeTab === 'audit' && (
        <div className="audit-trail">
          <h3>📋 Document Audit Trail</h3>
          
          <div className="audit-filters">
            <select>
              <option value="all">All Documents</option>
              {documents.map(doc => (
                <option key={doc.id} value={doc.id}>{doc.name}</option>
              ))}
            </select>
            
            <select>
              <option value="all">All Actions</option>
              <option value="viewed">Viewed</option>
              <option value="downloaded">Downloaded</option>
              <option value="uploaded">Uploaded</option>
              <option value="modified">Modified</option>
            </select>
            
            <input type="date" placeholder="From Date" />
            <input type="date" placeholder="To Date" />
          </div>
          
          <div className="audit-log">
            {documents.flatMap(doc => 
              doc.accessLog.map(log => ({
                ...log,
                documentId: doc.id,
                documentName: doc.name,
                category: doc.category
              }))
            )
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .slice(0, 50)
            .map((entry, index) => (
              <div key={index} className={`audit-entry ${entry.action}`}>
                <div className="audit-timestamp">
                  {formatDateTime(entry.timestamp)}
                </div>
                
                <div className="audit-user">
                  <strong>{entry.user}</strong>
                  <span className="ip-address">{entry.ipAddress}</span>
                </div>
                
                <div className="audit-action">
                  <span className={`action-badge ${entry.action}`}>
                    {entry.action}
                  </span>
                </div>
                
                <div className="audit-document">
                  <span className="document-icon">
                    {getDocumentIcon(entry.category)}
                  </span>
                  <div className="document-info">
                    <strong>{entry.documentName}</strong>
                    <span>{entry.documentId}</span>
                  </div>
                </div>
                
                <div className="audit-details">
                  <button onClick={() => {
                    const doc = documents.find(d => d.id === entry.documentId);
                    setSelectedDocument(doc);
                  }}>
                    👁️ View Document
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Access Control Tab */}
      {activeTab === 'access' && (
        <div className="access-control">
          <h3>🔐 Document Access Control</h3>
          
          <div className="access-overview">
            <div className="role-permissions">
              <h4>Role Permissions</h4>
              {Object.entries(userRoles).map(([roleKey, role]) => (
                <div key={roleKey} className="role-item">
                  <div className="role-header">
                    <strong>{role.name}</strong>
                    <span className="role-description">{role.description}</span>
                  </div>
                  
                  <div className="role-permissions-list">
                    {role.permissions.map(permission => (
                      <span key={permission} className={`permission-badge ${permission}`}>
                        {permission}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="document-access-levels">
              <h4>Document Access Levels</h4>
              {filteredDocuments.map(doc => (
                <div key={doc.id} className="document-access">
                  <div className="document-info">
                    <span className="document-icon">
                      {getDocumentIcon(doc.category, doc.type)}
                    </span>
                    <div className="document-details">
                      <strong>{doc.name}</strong>
                      <span>{doc.id}</span>
                    </div>
                  </div>
                  
                  <div className="access-info">
                    <span 
                      className="access-level-badge"
                      style={{ backgroundColor: getConfidentialityColor(doc.confidentialityLevel) }}
                    >
                      {doc.confidentialityLevel}
                    </span>
                    <span className="access-type">{doc.accessLevel}</span>
                  </div>
                  
                  <div className="access-stats">
                    <span>👀 {doc.viewCount}</span>
                    <span>📥 {doc.downloadCount}</span>
                  </div>
                  
                  {hasPermission('manage-access') && (
                    <div className="access-actions">
                      <button onClick={() => {
                        setSelectedDocument(doc);
                        setAccessModal(true);
                      }}>
                        ⚙️ Manage
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Document Detail Modal */}
      {selectedDocument && !versionModal && !accessModal && (
        <div className="modal-overlay">
          <div className="document-detail-modal">
            <div className="modal-header">
              <h3>📄 Document Details - {selectedDocument.name}</h3>
              <button 
                className="close-btn"
                onClick={() => setSelectedDocument(null)}
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
                      <strong>Document ID:</strong> {selectedDocument.id}
                    </div>
                    <div className="detail-item">
                      <strong>Name:</strong> {selectedDocument.name}
                    </div>
                    <div className="detail-item">
                      <strong>Category:</strong> {documentCategories[selectedDocument.category]?.name}
                    </div>
                    <div className="detail-item">
                      <strong>Type:</strong> {selectedDocument.type}
                    </div>
                    <div className="detail-item">
                      <strong>Version:</strong> v{selectedDocument.version}
                    </div>
                    <div className="detail-item">
                      <strong>Status:</strong>
                      <span style={{ color: getStatusColor(selectedDocument.status) }}>
                        {selectedDocument.status}
                      </span>
                    </div>
                    <div className="detail-item">
                      <strong>File Size:</strong> {selectedDocument.fileSize}
                    </div>
                    <div className="detail-item">
                      <strong>Department:</strong> {selectedDocument.department}
                    </div>
                  </div>
                </div>
                
                <div className="detail-section">
                  <h4>Security & Access</h4>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <strong>Confidentiality:</strong>
                      <span style={{ color: getConfidentialityColor(selectedDocument.confidentialityLevel) }}>
                        {selectedDocument.confidentialityLevel}
                      </span>
                    </div>
                    <div className="detail-item">
                      <strong>Access Level:</strong> {selectedDocument.accessLevel}
                    </div>
                    <div className="detail-item">
                      <strong>Digital Signature:</strong> {selectedDocument.digitalSignature ? '✅ Signed' : '❌ Not Signed'}
                    </div>
                    <div className="detail-item">
                      <strong>Checksum:</strong> {selectedDocument.checksum}
                    </div>
                    <div className="detail-item">
                      <strong>Retention Period:</strong> {selectedDocument.retentionPeriod}
                    </div>
                  </div>
                </div>
                
                <div className="detail-section">
                  <h4>Lifecycle Information</h4>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <strong>Created:</strong> {formatDateTime(selectedDocument.createdDate)} by {selectedDocument.createdBy}
                    </div>
                    <div className="detail-item">
                      <strong>Last Modified:</strong> {formatDateTime(selectedDocument.lastModified)} by {selectedDocument.lastModifiedBy}
                    </div>
                    {selectedDocument.approvedBy && (
                      <div className="detail-item">
                        <strong>Approved:</strong> {formatDateTime(selectedDocument.approvalDate)} by {selectedDocument.approvedBy}
                      </div>
                    )}
                    {selectedDocument.expiryDate && (
                      <div className="detail-item">
                        <strong>Expires:</strong> {formatDateTime(selectedDocument.expiryDate)}
                      </div>
                    )}
                    {selectedDocument.reviewDate && (
                      <div className="detail-item">
                        <strong>Next Review:</strong> {formatDateTime(selectedDocument.reviewDate)}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="detail-section">
                  <h4>Compliance & Standards</h4>
                  <div className="compliance-requirements">
                    {selectedDocument.complianceRequirements.map(req => (
                      <span key={req} className="compliance-badge">{req}</span>
                    ))}
                  </div>
                </div>
                
                <div className="detail-section">
                  <h4>Tags</h4>
                  <div className="document-tags">
                    {selectedDocument.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
                
                <div className="detail-section">
                  <h4>Recent Access Log</h4>
                  <div className="access-log">
                    {selectedDocument.accessLog.slice(0, 10).map((entry, index) => (
                      <div key={index} className="access-entry">
                        <div className="access-user">{entry.user}</div>
                        <div className="access-action">{entry.action}</div>
                        <div className="access-time">{formatDateTime(entry.timestamp)}</div>
                        <div className="access-ip">{entry.ipAddress}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {selectedDocument.relatedDocuments.length > 0 && (
                  <div className="detail-section">
                    <h4>Related Documents</h4>
                    <div className="related-documents">
                      {selectedDocument.relatedDocuments.map(relatedId => {
                        const relatedDoc = documents.find(d => d.id === relatedId);
                        return relatedDoc ? (
                          <div key={relatedId} className="related-document">
                            <span className="document-icon">
                              {getDocumentIcon(relatedDoc.category, relatedDoc.type)}
                            </span>
                            <span className="document-name">{relatedDoc.name}</span>
                            <span className="document-id">{relatedDoc.id}</span>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="document-actions">
                <button onClick={() => logDocumentAccess(selectedDocument.id, 'downloaded')}>
                  📥 Download
                </button>
                <button>🖨️ Print</button>
                <button>📧 Email</button>
                {hasPermission('update') && (
                  <button onClick={() => setVersionModal(true)}>
                    🔄 New Version
                  </button>
                )}
                {hasPermission('manage-access') && (
                  <button onClick={() => setAccessModal(true)}>
                    🔐 Manage Access
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {uploadModal && (
        <div className="modal-overlay">
          <div className="upload-modal">
            <div className="modal-header">
              <h3>📤 Upload New Document</h3>
              <button 
                className="close-btn"
                onClick={() => setUploadModal(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="modal-content">
              <form className="upload-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label>Document Name *</label>
                    <input type="text" placeholder="Enter document name" required />
                  </div>
                  
                  <div className="form-group">
                    <label>Category *</label>
                    <select required>
                      <option value="">Select Category</option>
                      {Object.entries(documentCategories).map(([key, category]) => (
                        <option key={key} value={key}>{category.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Document Type *</label>
                    <select required>
                      <option value="">Select Type</option>
                      <option value="SOP">SOP</option>
                      <option value="Protocol">Protocol</option>
                      <option value="Report">Report</option>
                      <option value="Certificate">Certificate</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Confidentiality Level *</label>
                    <select required>
                      <option value="">Select Level</option>
                      <option value="public">Public</option>
                      <option value="internal">Internal</option>
                      <option value="confidential">Confidential</option>
                      <option value="restricted">Restricted</option>
                    </select>
                  </div>
                  
                  <div className="form-group full-width">
                    <label>Description *</label>
                    <textarea placeholder="Enter document description" required />
                  </div>
                  
                  <div className="form-group full-width">
                    <label>Tags</label>
                    <input type="text" placeholder="Enter tags separated by commas" />
                  </div>
                  
                  <div className="form-group full-width">
                    <label>File Upload *</label>
                    <input type="file" accept=".pdf,.doc,.docx" required />
                  </div>
                </div>
                
                <div className="form-actions">
                  <button type="button" onClick={() => setUploadModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" onClick={handleDocumentUpload}>
                    📤 Upload Document
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Version Modal */}
      {versionModal && selectedDocument && (
        <div className="modal-overlay">
          <div className="version-modal">
            <div className="modal-header">
              <h3>🔄 Create New Version - {selectedDocument.name}</h3>
              <button 
                className="close-btn"
                onClick={() => setVersionModal(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="modal-content">
              <div className="current-version-info">
                <h4>Current Version: v{selectedDocument.version}</h4>
                <p>Last modified: {formatDateTime(selectedDocument.lastModified)} by {selectedDocument.lastModifiedBy}</p>
              </div>
              
              <form className="version-form">
                <div className="form-group">
                  <label>New Version Number *</label>
                  <input 
                    type="text" 
                    placeholder="e.g., 3.3, 4.0" 
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label>Changes Made *</label>
                  <textarea 
                    placeholder="Describe the changes made in this version"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Upload New File *</label>
                  <input type="file" accept=".pdf,.doc,.docx" required />
                </div>
                
                <div className="form-actions">
                  <button type="button" onClick={() => setVersionModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" onClick={(e) => {
                    e.preventDefault();
                    // Simulated version creation
                    createNewVersion(selectedDocument.id, {
                      version: '3.3',
                      changes: 'Updated content per user input',
                      fileSize: '2.6 MB'
                    });
                    setVersionModal(false);
                  }}>
                    🔄 Create Version
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Access Management Modal */}
      {accessModal && selectedDocument && (
        <div className="modal-overlay">
          <div className="access-modal">
            <div className="modal-header">
              <h3>🔐 Manage Access - {selectedDocument.name}</h3>
              <button 
                className="close-btn"
                onClick={() => setAccessModal(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="modal-content">
              <div className="current-access-info">
                <h4>Current Access Settings</h4>
                <div className="access-settings">
                  <div className="setting-item">
                    <strong>Confidentiality Level:</strong>
                    <span style={{ color: getConfidentialityColor(selectedDocument.confidentialityLevel) }}>
                      {selectedDocument.confidentialityLevel}
                    </span>
                  </div>
                  <div className="setting-item">
                    <strong>Access Level:</strong> {selectedDocument.accessLevel}
                  </div>
                  <div className="setting-item">
                    <strong>Digital Signature:</strong> {selectedDocument.digitalSignature ? 'Required' : 'Not Required'}
                  </div>
                </div>
              </div>
              
              <div className="access-management">
                <h4>Role-Based Access</h4>
                {Object.entries(userRoles).map(([roleKey, role]) => (
                  <div key={roleKey} className="role-access">
                    <div className="role-info">
                      <strong>{role.name}</strong>
                      <span>{role.description}</span>
                    </div>
                    
                    <div className="access-permissions">
                      {role.permissions.map(permission => (
                        <label key={permission} className="permission-checkbox">
                          <input 
                            type="checkbox" 
                            defaultChecked={role.permissions.includes(permission)}
                          />
                          <span>{permission}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="form-actions">
                <button onClick={() => setAccessModal(false)}>
                  Cancel
                </button>
                <button onClick={() => setAccessModal(false)}>
                  💾 Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuditTrailDocumentControl;