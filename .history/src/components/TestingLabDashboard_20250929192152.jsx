import { useState } from 'react';

const TestingLabDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Mock data
  const mockSamples = [
    {
      id: 'SMP-001',
      orderId: 'ORD-001',
      manufacturer: 'MedDevice Corp',
      productName: 'Surgical Instruments Set A',
      receivedDate: '2025-09-29',
      testType: 'Sterility Test',
      status: 'testing',
      priority: 'high',
      estimatedCompletion: '2025-10-02',
      assignedTechnician: 'Dr. Sarah Johnson'
    },
    {
      id: 'SMP-002',
      orderId: 'ORD-002',
      manufacturer: 'BioTech Industries',
      productName: 'Implantable Devices',
      receivedDate: '2025-09-28',
      testType: 'Bioburden Analysis',
      status: 'completed',
      priority: 'medium',
      completedDate: '2025-09-29',
      assignedTechnician: 'Lab Tech Mike Chen'
    },
    {
      id: 'SMP-003',
      orderId: 'ORD-003',
      manufacturer: 'Surgical Solutions Ltd',
      productName: 'Disposable Equipment',
      receivedDate: '2025-09-27',
      testType: 'Residual Analysis',
      status: 'pending-receipt',
      priority: 'low',
      estimatedArrival: '2025-09-30',
      assignedTechnician: 'Lab Tech Anna Rodriguez'
    }
  ];

  const mockResults = [
    {
      id: 'RES-001',
      sampleId: 'SMP-002',
      testType: 'Bioburden Analysis',
      result: 'PASS',
      specifications: 'CFU < 100/device',
      actualValue: '15 CFU/device',
      testDate: '2025-09-29',
      reviewedBy: 'Dr. Sarah Johnson',
      reportGenerated: true
    },
    {
      id: 'RES-002',
      sampleId: 'SMP-004',
      testType: 'Sterility Test',
      result: 'PASS',
      specifications: 'No growth detected',
      actualValue: 'No growth after 14 days',
      testDate: '2025-09-25',
      reviewedBy: 'Dr. Michael Thompson',
      reportGenerated: true
    }
  ];

  const mockEquipment = [
    {
      id: 'EQ-001',
      name: 'Biological Safety Cabinet A',
      type: 'BSC Class II',
      status: 'available',
      lastMaintenance: '2025-09-15',
      nextMaintenance: '2025-12-15'
    },
    {
      id: 'EQ-002',
      name: 'Incubator Unit B',
      type: 'CO2 Incubator',
      status: 'in-use',
      currentSample: 'SMP-001',
      lastMaintenance: '2025-09-10',
      nextMaintenance: '2025-12-10'
    },
    {
      id: 'EQ-003',
      name: 'Autoclave C',
      type: 'Steam Sterilizer',
      status: 'maintenance',
      lastMaintenance: '2025-09-29',
      nextMaintenance: '2025-12-29'
    }
  ];

  const getStatusBadge = (status) => {
    const statusMap = {
      'pending-receipt': { class: 'status-pending', text: 'Pending Receipt' },
      'received': { class: 'status-in-progress', text: 'Received' },
      'testing': { class: 'status-in-progress', text: 'Testing' },
      'completed': { class: 'status-completed', text: 'Completed' },
      'failed': { class: 'status-failed', text: 'Failed' },
      'available': { class: 'status-completed', text: 'Available' },
      'in-use': { class: 'status-in-progress', text: 'In Use' },
      'maintenance': { class: 'status-failed', text: 'Maintenance' }
    };
    const statusInfo = statusMap[status] || { class: 'status-pending', text: status };
    return <span className={`status-badge ${statusInfo.class}`}>{statusInfo.text}</span>;
  };

  const getPriorityBadge = (priority) => {
    const priorityMap = {
      'high': { class: 'status-failed', text: 'High' },
      'medium': { class: 'status-in-progress', text: 'Medium' },
      'low': { class: 'status-completed', text: 'Low' }
    };
    const priorityInfo = priorityMap[priority] || { class: 'status-pending', text: priority };
    return <span className={`status-badge ${priorityInfo.class}`}>{priorityInfo.text}</span>;
  };

  const getResultBadge = (result) => {
    const resultMap = {
      'PASS': { class: 'status-completed', text: 'PASS' },
      'FAIL': { class: 'status-failed', text: 'FAIL' },
      'PENDING': { class: 'status-pending', text: 'PENDING' }
    };
    const resultInfo = resultMap[result] || { class: 'status-pending', text: result };
    return <span className={`status-badge ${resultInfo.class}`}>{resultInfo.text}</span>;
  };

  return (
    <div>
      <header className="header">
        <h1>STERIX - Testing Laboratory Dashboard</h1>
        <div className="user-info">
          <span>Welcome, {user.username}</span>
          <button className="logout-btn" onClick={onLogout}>Logout</button>
        </div>
      </header>

      <div className="main-layout">
        {/* Sidebar Toggle Button */}
        <button 
          className={`sidebar-toggle ${sidebarOpen ? 'open' : ''}`}
          onClick={toggleSidebar}
        >
          {sidebarOpen ? '✕' : '☰'}
        </button>

        {/* Sidebar Overlay for mobile */}
        <div 
          className={`sidebar-overlay ${sidebarOpen ? 'active' : ''}`}
          onClick={toggleSidebar}
        ></div>

        {/* Left Sidebar Navigation */}
        <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          {/* Navigation Menu - First for better UX */}
          <div className="sidebar-header">
            <h3>
              <span>🧪</span>
              Navigation
            </h3>
          </div>
          <nav className="sidebar-nav">
            <button
              className={`sidebar-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <span className="icon">📊</span>
              <span>Overview</span>
            </button>
            <button
              className={`sidebar-nav-item ${activeTab === 'samples' ? 'active' : ''}`}
              onClick={() => setActiveTab('samples')}
            >
              <span className="icon">🧫</span>
              <span>Sample Management</span>
            </button>
            <button
              className={`sidebar-nav-item ${activeTab === 'results' ? 'active' : ''}`}
              onClick={() => setActiveTab('results')}
            >
              <span className="icon">📋</span>
              <span>Test Results</span>
            </button>
            <button
              className={`sidebar-nav-item ${activeTab === 'equipment' ? 'active' : ''}`}
              onClick={() => setActiveTab('equipment')}
            >
              <span className="icon">🔧</span>
              <span>Equipment</span>
            </button>
          </nav>

          {/* User Profile Section */}
          <div className="sidebar-user-profile">
            <div className="sidebar-user-avatar">
              {user.username.split(' ').map(n => n[0]).join('').toUpperCase()}
            </div>
            <div className="sidebar-user-info">
              <h4>{user.username}</h4>
              <div className="sidebar-user-role">Testing Laboratory</div>
              <div className="sidebar-user-status">Online</div>
            </div>
          </div>
          
          {/* Notifications Panel */}
          <div className="sidebar-notifications">
            <div className="sidebar-notifications-header">
              <h5>
                🔔 Notifications
              </h5>
              <span className="sidebar-notification-count">2</span>
            </div>
            <div className="sidebar-notification-item">
              <div className="sidebar-notification-icon info">
                ℹ
              </div>
              <div className="sidebar-notification-content">
                <p>New samples received for testing</p>
                <span className="sidebar-notification-time">15 min ago</span>
              </div>
            </div>
            <div className="sidebar-notification-item">
              <div className="sidebar-notification-icon success">
                ✓
              </div>
              <div className="sidebar-notification-content">
                <p>Sterility test results ready for SMP-003</p>
                <span className="sidebar-notification-time">45 min ago</span>
              </div>
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="sidebar-quick-actions">
            <h5>⚡ Quick Actions</h5>
            <div className="sidebar-quick-action" onClick={() => setActiveTab('samples')}>
              <div className="sidebar-quick-action-icon">🧫</div>
              New Test Sample
            </div>
            <div className="sidebar-quick-action" onClick={() => setActiveTab('results')}>
              <div className="sidebar-quick-action-icon">📋</div>
              Quick Test
            </div>
            <div className="sidebar-quick-action" onClick={() => setActiveTab('equipment')}>
              <div className="sidebar-quick-action-icon">🔧</div>
              Equipment Check
            </div>
          </div>

          {/* Recent Activity Feed */}
          <div className="sidebar-activity-feed">
            <h5>📈 Recent Activity</h5>
            <div className="sidebar-activity-item">
              <div className="sidebar-activity-avatar">SC</div>
              <div className="sidebar-activity-content">
                <p><strong>SterilCorp</strong> delivered samples for testing</p>
                <span className="sidebar-activity-time">15 min ago</span>
              </div>
            </div>
            <div className="sidebar-activity-item">
              <div className="sidebar-activity-avatar">ST</div>
              <div className="sidebar-activity-content">
                <p><strong>Sterility Test</strong> completed for SMP-005</p>
                <span className="sidebar-activity-time">40 min ago</span>
              </div>
            </div>
            <div className="sidebar-activity-item">
              <div className="sidebar-activity-avatar">EQ</div>
              <div className="sidebar-activity-content">
                <p><strong>Equipment EQ-003</strong> maintenance scheduled</p>
                <span className="sidebar-activity-time">2 hours ago</span>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="sidebar-system-status">
            <h5>🟢 System Status</h5>
            <div className="sidebar-system-metrics">
              <div className="sidebar-system-metric">
                <span className="sidebar-system-metric-value">97%</span>
                <span className="sidebar-system-metric-label">Test Accuracy</span>
              </div>
              <div className="sidebar-system-metric">
                <span className="sidebar-system-metric-value">8</span>
                <span className="sidebar-system-metric-label">Active Tests</span>
              </div>
              <div className="sidebar-system-metric">
                <span className="sidebar-system-metric-value">15</span>
                <span className="sidebar-system-metric-label">Completed Today</span>
              </div>
            </div>
          </div>

          {/* Sample Queue */}
          <div className="sidebar-sample-queue">
            <h5>🧪 Sample Queue</h5>
            <div className="sidebar-sample-item">
              <div className="sidebar-sample-priority high"></div>
              <div className="sidebar-sample-info">
                <div className="sidebar-sample-id">SMP-2025-456</div>
                <div className="sidebar-sample-type">Sterility Test - Urgent</div>
              </div>
            </div>
            <div className="sidebar-sample-item">
              <div className="sidebar-sample-priority medium"></div>
              <div className="sidebar-sample-info">
                <div className="sidebar-sample-id">SMP-2025-457</div>
                <div className="sidebar-sample-type">Endotoxin Test</div>
              </div>
            </div>
            <div className="sidebar-sample-item">
              <div className="sidebar-sample-priority low"></div>
              <div className="sidebar-sample-info">
                <div className="sidebar-sample-id">SMP-2025-458</div>
                <div className="sidebar-sample-type">Biocompatibility</div>
              </div>
            </div>
          </div>

          {/* Equipment Status */}
          <div className="sidebar-equipment-status">
            <h5>🔧 Equipment Status</h5>
            <div className="sidebar-equipment-item">
              <span className="sidebar-equipment-name">Incubator A1</span>
              <span className="sidebar-equipment-status-badge operational">Operational</span>
            </div>
            <div className="sidebar-equipment-item">
              <span className="sidebar-equipment-name">Biosafety Cabinet</span>
              <span className="sidebar-equipment-status-badge operational">Operational</span>
            </div>
            <div className="sidebar-equipment-item">
              <span className="sidebar-equipment-name">Autoclave B2</span>
              <span className="sidebar-equipment-status-badge maintenance">Maintenance</span>
            </div>
            <div className="sidebar-equipment-item">
              <span className="sidebar-equipment-name">Microscope C1</span>
              <span className="sidebar-equipment-status-badge operational">Operational</span>
            </div>
          </div>

          {/* Document Management */}
          <div className="sidebar-documents">
            <h5>📁 Quick Documents</h5>
            <div className="sidebar-document-item">
              <div className="sidebar-document-icon">📋</div>
              <div className="sidebar-document-info">
                <div className="sidebar-document-name">Test Protocols</div>
                <div className="sidebar-document-status">Updated 2 hours ago</div>
              </div>
            </div>
            <div className="sidebar-document-item">
              <div className="sidebar-document-icon">📊</div>
              <div className="sidebar-document-info">
                <div className="sidebar-document-name">Validation Reports</div>
                <div className="sidebar-document-status">3 pending review</div>
              </div>
            </div>
            <div className="sidebar-document-item">
              <div className="sidebar-document-icon">🏆</div>
              <div className="sidebar-document-info">
                <div className="sidebar-document-name">Certificates</div>
                <div className="sidebar-document-status">All current</div>
              </div>
            </div>
            <div className="sidebar-document-item">
              <div className="sidebar-document-icon">📝</div>
              <div className="sidebar-document-info">
                <div className="sidebar-document-name">Audit Trail</div>
                <div className="sidebar-document-status">Real-time logging</div>
              </div>
            </div>
          </div>

          {/* Compliance Status */}
          <div className="sidebar-compliance">
            <h5>📋 Lab Compliance</h5>
            <div className="sidebar-compliance-item compliant">
              <span className="sidebar-compliance-label">ISO 17025</span>
              <span className="sidebar-compliance-status compliant">Valid</span>
            </div>
            <div className="sidebar-compliance-item compliant">
              <span className="sidebar-compliance-label">CLIA Cert</span>
              <span className="sidebar-compliance-status compliant">Current</span>
            </div>
            <div className="sidebar-compliance-item pending">
              <span className="sidebar-compliance-label">CAP Accred</span>
              <span className="sidebar-compliance-status pending">Renewal</span>
            </div>
          </div>

          {/* Risk Assessment */}
          <div className="sidebar-risk-assessment">
            <h5>⚠️ Risk Status</h5>
            <div className="sidebar-risk-level low">
              Low Risk
            </div>
            <div className="sidebar-risk-factors">
              All critical systems operational. One equipment in scheduled maintenance.
            </div>
          </div>
          <nav className="sidebar-nav">
            <button
              className={`sidebar-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <span className="icon">📊</span>
              <span>Overview</span>
            </button>
            <button
              className={`sidebar-nav-item ${activeTab === 'samples' ? 'active' : ''}`}
              onClick={() => setActiveTab('samples')}
            >
              <span className="icon">🧫</span>
              <span>Sample Management</span>
            </button>
            <button
              className={`sidebar-nav-item ${activeTab === 'results' ? 'active' : ''}`}
              onClick={() => setActiveTab('results')}
            >
              <span className="icon">📋</span>
              <span>Test Results</span>
            </button>
            <button
              className={`sidebar-nav-item ${activeTab === 'equipment' ? 'active' : ''}`}
              onClick={() => setActiveTab('equipment')}
            >
              <span className="icon">🔧</span>
              <span>Equipment</span>
            </button>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
          <div className="dashboard">

        {activeTab === 'overview' && (
          <div className="dashboard-grid">
            <div className="card">
              <h3>Sample Status Summary</h3>
              <div style={{display: 'flex', justifyContent: 'space-between', margin: '1rem 0'}}>
                <div style={{textAlign: 'center'}}>
                  <strong style={{fontSize: '1.5rem', color: '#f59e0b'}}>1</strong>
                  <p>Pending Receipt</p>
                </div>
                <div style={{textAlign: 'center'}}>
                  <strong style={{fontSize: '1.5rem', color: '#3b82f6'}}>1</strong>
                  <p>Testing</p>
                </div>
                <div style={{textAlign: 'center'}}>
                  <strong style={{fontSize: '1.5rem', color: '#10b981'}}>1</strong>
                  <p>Completed</p>
                </div>
              </div>
            </div>

            <div className="card">
              <h3>Today's Performance</h3>
              <div>
                <div style={{margin: '0.5rem 0', display: 'flex', justifyContent: 'space-between'}}>
                  <span>Tests Completed:</span>
                  <strong>2</strong>
                </div>
                <div style={{margin: '0.5rem 0', display: 'flex', justifyContent: 'space-between'}}>
                  <span>Pass Rate:</span>
                  <strong style={{color: '#10b981'}}>100%</strong>
                </div>
                <div style={{margin: '0.5rem 0', display: 'flex', justifyContent: 'space-between'}}>
                  <span>Avg. Turnaround:</span>
                  <strong>2.1 days</strong>
                </div>
              </div>
            </div>

            <div className="card">
              <h3>Pending Actions</h3>
              <div>
                <div style={{margin: '0.5rem 0', padding: '0.5rem', background: '#fef3c7', borderRadius: '5px'}}>
                  <strong>SMP-001</strong> - Sterility test in progress
                  <br />
                  <small style={{color: '#92400e'}}>Due: Oct 2, 2025</small>
                </div>
                <div style={{margin: '0.5rem 0', padding: '0.5rem', background: '#dbeafe', borderRadius: '5px'}}>
                  <strong>SMP-003</strong> - Awaiting sample arrival
                  <br />
                  <small style={{color: '#1e40af'}}>Expected: Sep 30, 2025</small>
                </div>
              </div>
            </div>

            <div className="card">
              <h3>Equipment Status</h3>
              <div>
                <div style={{margin: '0.5rem 0', display: 'flex', justifyContent: 'space-between'}}>
                  <span>Available:</span>
                  <strong style={{color: '#10b981'}}>1</strong>
                </div>
                <div style={{margin: '0.5rem 0', display: 'flex', justifyContent: 'space-between'}}>
                  <span>In Use:</span>
                  <strong style={{color: '#3b82f6'}}>1</strong>
                </div>
                <div style={{margin: '0.5rem 0', display: 'flex', justifyContent: 'space-between'}}>
                  <span>Maintenance:</span>
                  <strong style={{color: '#ef4444'}}>1</strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'samples' && (
          <div>
            <div className="card">
              <h3>Sample Tracking & Management</h3>
              <table className="table">
                <thead>
                  <tr>
                    <th>Sample ID</th>
                    <th>Order ID</th>
                    <th>Manufacturer</th>
                    <th>Product</th>
                    <th>Test Type</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Technician</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockSamples.map(sample => (
                    <tr key={sample.id}>
                      <td><strong>{sample.id}</strong></td>
                      <td>{sample.orderId}</td>
                      <td>{sample.manufacturer}</td>
                      <td>{sample.productName}</td>
                      <td>{sample.testType}</td>
                      <td>{getStatusBadge(sample.status)}</td>
                      <td>{getPriorityBadge(sample.priority)}</td>
                      <td>{sample.assignedTechnician}</td>
                      <td>
                        {sample.status === 'completed' 
                          ? sample.completedDate 
                          : sample.status === 'pending-receipt'
                          ? sample.estimatedArrival
                          : sample.receivedDate
                        }
                      </td>
                      <td>
                        {sample.status === 'testing' && (
                          <button className="btn" style={{fontSize: '0.8rem', padding: '0.4rem 0.8rem'}}>
                            Update Progress
                          </button>
                        )}
                        {sample.status === 'completed' && (
                          <button className="btn btn-success" style={{fontSize: '0.8rem', padding: '0.4rem 0.8rem'}}>
                            Generate Report
                          </button>
                        )}
                        {sample.status === 'pending-receipt' && (
                          <button className="btn btn-secondary" style={{fontSize: '0.8rem', padding: '0.4rem 0.8rem'}}>
                            Mark Received
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'results' && (
          <div>
            <div className="card">
              <h3>Test Results & Reports</h3>
              <table className="table">
                <thead>
                  <tr>
                    <th>Result ID</th>
                    <th>Sample ID</th>
                    <th>Test Type</th>
                    <th>Result</th>
                    <th>Specifications</th>
                    <th>Actual Value</th>
                    <th>Test Date</th>
                    <th>Reviewed By</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockResults.map(result => (
                    <tr key={result.id}>
                      <td><strong>{result.id}</strong></td>
                      <td>{result.sampleId}</td>
                      <td>{result.testType}</td>
                      <td>{getResultBadge(result.result)}</td>
                      <td>{result.specifications}</td>
                      <td>{result.actualValue}</td>
                      <td>{result.testDate}</td>
                      <td>{result.reviewedBy}</td>
                      <td>
                        {result.reportGenerated ? (
                          <button className="btn btn-success" style={{fontSize: '0.8rem', padding: '0.4rem 0.8rem'}}>
                            Download Report
                          </button>
                        ) : (
                          <button className="btn" style={{fontSize: '0.8rem', padding: '0.4rem 0.8rem'}}>
                            Generate Report
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="card" style={{marginTop: '2rem'}}>
              <h3>Upload New Test Results</h3>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem'}}>
                <div className="form-group">
                  <label>Sample ID</label>
                  <input type="text" className="form-control" placeholder="Enter sample ID" />
                </div>
                <div className="form-group">
                  <label>Test Type</label>
                  <select className="form-control">
                    <option>Select test type</option>
                    <option>Sterility Test</option>
                    <option>Bioburden Analysis</option>
                    <option>Residual Analysis</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Test Results File</label>
                <input type="file" className="form-control" accept=".pdf,.doc,.docx" />
              </div>
              <button className="btn">Upload Results</button>
            </div>
          </div>
        )}

        {activeTab === 'equipment' && (
          <div>
            <div className="card">
              <h3>Laboratory Equipment Status</h3>
              <table className="table">
                <thead>
                  <tr>
                    <th>Equipment ID</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Current Sample</th>
                    <th>Last Maintenance</th>
                    <th>Next Maintenance</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockEquipment.map(equipment => (
                    <tr key={equipment.id}>
                      <td><strong>{equipment.id}</strong></td>
                      <td>{equipment.name}</td>
                      <td>{equipment.type}</td>
                      <td>{getStatusBadge(equipment.status)}</td>
                      <td>{equipment.currentSample || 'None'}</td>
                      <td>{equipment.lastMaintenance}</td>
                      <td>{equipment.nextMaintenance}</td>
                      <td>
                        {equipment.status === 'available' && (
                          <button className="btn" style={{fontSize: '0.8rem', padding: '0.4rem 0.8rem'}}>
                            Assign Sample
                          </button>
                        )}
                        {equipment.status === 'in-use' && (
                          <button className="btn btn-secondary" style={{fontSize: '0.8rem', padding: '0.4rem 0.8rem'}}>
                            Monitor
                          </button>
                        )}
                        {equipment.status === 'maintenance' && (
                          <button className="btn btn-secondary" style={{fontSize: '0.8rem', padding: '0.4rem 0.8rem'}}>
                            Complete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default TestingLabDashboard;