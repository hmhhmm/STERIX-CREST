import { useState } from 'react';

const SterilizationProviderDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Mock data
  const mockChambers = [
    {
      id: 'CH-A1',
      name: 'Chamber A-1',
      status: 'running',
      currentOrder: 'ORD-001',
      manufacturer: 'MedDevice Corp',
      startTime: '2025-09-29 08:00',
      estimatedComplete: '2025-09-29 14:00',
      temperature: '121°C',
      pressure: '15 psi'
    },
    {
      id: 'CH-A2',
      name: 'Chamber A-2',
      status: 'idle',
      currentOrder: null,
      manufacturer: null,
      nextScheduled: '2025-09-30 10:00',
      temperature: 'N/A',
      pressure: 'N/A'
    },
    {
      id: 'CH-B1',
      name: 'Chamber B-1',
      status: 'maintenance',
      currentOrder: null,
      manufacturer: null,
      maintenanceUntil: '2025-10-01 16:00',
      temperature: 'N/A',
      pressure: 'N/A'
    }
  ];

  const mockOrders = [
    {
      id: 'ORD-001',
      manufacturer: 'MedDevice Corp',
      productName: 'Surgical Instruments Set A',
      quantity: 500,
      status: 'in-process',
      chamber: 'Chamber A-1',
      scheduledDate: '2025-09-29',
      priority: 'high'
    },
    {
      id: 'ORD-002',
      manufacturer: 'BioTech Industries',
      productName: 'Implantable Devices',
      quantity: 200,
      status: 'scheduled',
      chamber: 'Chamber A-2',
      scheduledDate: '2025-09-30',
      priority: 'medium'
    },
    {
      id: 'ORD-003',
      manufacturer: 'Surgical Solutions Ltd',
      productName: 'Disposable Equipment',
      quantity: 750,
      status: 'completed',
      chamber: 'Chamber B-1',
      completedDate: '2025-09-28',
      priority: 'low'
    }
  ];

  const getStatusBadge = (status) => {
    const statusMap = {
      'scheduled': { class: 'status-pending', text: 'Scheduled' },
      'in-process': { class: 'status-in-progress', text: 'In Process' },
      'completed': { class: 'status-completed', text: 'Completed' },
      'failed': { class: 'status-failed', text: 'Failed' },
      'running': { class: 'status-in-progress', text: 'Running' },
      'idle': { class: 'status-pending', text: 'Idle' },
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

  return (
    <div>
      <header className="header">
        <h1>STERIX - Sterilization Provider Dashboard</h1>
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
              <span>🔬</span>
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
              className={`sidebar-nav-item ${activeTab === 'chambers' ? 'active' : ''}`}
              onClick={() => setActiveTab('chambers')}
            >
              <span className="icon">⚗️</span>
              <span>Chamber Management</span>
            </button>
            <button
              className={`sidebar-nav-item ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <span className="icon">📦</span>
              <span>Order Management</span>
            </button>
          </nav>

          {/* User Profile Section */}
          <div className="sidebar-user-profile">
            <div className="sidebar-user-avatar">
              {user.username.split(' ').map(n => n[0]).join('').toUpperCase()}
            </div>
            <div className="sidebar-user-info">
              <h4>{user.username}</h4>
              <div className="sidebar-user-role">Sterilization Provider</div>
              <div className="sidebar-user-status">Online</div>
            </div>
          </div>
          
          {/* Notifications Panel */}
          <div className="sidebar-notifications">
            <div className="sidebar-notifications-header">
              <h5>
                🔔 Notifications
              </h5>
              <span className="sidebar-notification-count">4</span>
            </div>
            <div className="sidebar-notification-item">
              <div className="sidebar-notification-icon info">
                ℹ
              </div>
              <div className="sidebar-notification-content">
                <p>New sterilization request from MedDevice Corp</p>
                <span className="sidebar-notification-time">10 min ago</span>
              </div>
            </div>
            <div className="sidebar-notification-item">
              <div className="sidebar-notification-icon warning">
                ⚠
              </div>
              <div className="sidebar-notification-content">
                <p>Chamber A-1 maintenance required</p>
                <span className="sidebar-notification-time">30 min ago</span>
              </div>
            </div>
            <div className="sidebar-notification-item">
              <div className="sidebar-notification-icon success">
                ✓
              </div>
              <div className="sidebar-notification-content">
                <p>Batch B-456 sterilization completed</p>
                <span className="sidebar-notification-time">1 hour ago</span>
              </div>
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="sidebar-quick-actions">
            <h5>⚡ Quick Actions</h5>
            <div className="sidebar-quick-action" onClick={() => setActiveTab('chambers')}>
              <div className="sidebar-quick-action-icon">⚗️</div>
              Start Sterilization
            </div>
            <div className="sidebar-quick-action" onClick={() => setActiveTab('orders')}>
              <div className="sidebar-quick-action-icon">📦</div>
              Manage Orders
            </div>
            <div className="sidebar-quick-action">
              <div className="sidebar-quick-action-icon">🛑</div>
              Emergency Stop
            </div>
          </div>

          {/* Recent Activity Feed */}
          <div className="sidebar-activity-feed">
            <h5>📈 Recent Activity</h5>
            <div className="sidebar-activity-item">
              <div className="sidebar-activity-avatar">MD</div>
              <div className="sidebar-activity-content">
                <p><strong>MedDevice Corp</strong> submitted new sterilization request</p>
                <span className="sidebar-activity-time">8 min ago</span>
              </div>
            </div>
            <div className="sidebar-activity-item">
              <div className="sidebar-activity-avatar">CH</div>
              <div className="sidebar-activity-content">
                <p><strong>Chamber A-1</strong> cycle completed successfully</p>
                <span className="sidebar-activity-time">25 min ago</span>
              </div>
            </div>
            <div className="sidebar-activity-item">
              <div className="sidebar-activity-avatar">TL</div>
              <div className="sidebar-activity-content">
                <p>Samples sent to <strong>TestLab Inc</strong> for validation</p>
                <span className="sidebar-activity-time">1 hour ago</span>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="sidebar-system-status">
            <h5>🟢 System Status</h5>
            <div className="sidebar-system-metrics">
              <div className="sidebar-system-metric">
                <span className="sidebar-system-metric-value">99%</span>
                <span className="sidebar-system-metric-label">Chamber Efficiency</span>
              </div>
              <div className="sidebar-system-metric">
                <span className="sidebar-system-metric-value">3</span>
                <span className="sidebar-system-metric-label">Active Chambers</span>
              </div>
              <div className="sidebar-system-metric">
                <span className="sidebar-system-metric-value">12</span>
                <span className="sidebar-system-metric-label">Completed Today</span>
              </div>
            </div>
          </div>

          {/* Process Monitoring Panel */}
          <div className="sidebar-process-monitoring">
            <h5>🌡️ Live Monitoring</h5>
            <div className="sidebar-process-metrics">
              <div className="sidebar-process-metric">
                <span className="sidebar-process-metric-value">121°C</span>
                <span className="sidebar-process-metric-label">Temperature</span>
              </div>
              <div className="sidebar-process-metric">
                <span className="sidebar-process-metric-value">15 psi</span>
                <span className="sidebar-process-metric-label">Pressure</span>
              </div>
              <div className="sidebar-process-metric critical">
                <span className="sidebar-process-metric-value">45 min</span>
                <span className="sidebar-process-metric-label">Cycle Time</span>
              </div>
              <div className="sidebar-process-metric">
                <span className="sidebar-process-metric-value">98.5%</span>
                <span className="sidebar-process-metric-label">Humidity</span>
              </div>
            </div>
          </div>

          {/* Quality Assurance Panel */}
          <div className="sidebar-qa-panel">
            <h5>✅ QA Checklist</h5>
            <div className="sidebar-qa-checklist">
              <div className="sidebar-qa-item">
                <div className="sidebar-qa-checkbox checked">✓</div>
                <span>Pre-cycle chamber inspection</span>
              </div>
              <div className="sidebar-qa-item">
                <div className="sidebar-qa-checkbox checked">✓</div>
                <span>Load packaging verification</span>
              </div>
              <div className="sidebar-qa-item">
                <div className="sidebar-qa-checkbox">○</div>
                <span>Biological indicator placement</span>
              </div>
              <div className="sidebar-qa-item">
                <div className="sidebar-qa-checkbox">○</div>
                <span>Post-cycle documentation</span>
              </div>
            </div>
          </div>

          {/* Compliance Status */}
          <div className="sidebar-compliance">
            <h5>📋 Compliance</h5>
            <div className="sidebar-compliance-item compliant">
              <span className="sidebar-compliance-label">ISO 11135</span>
              <span className="sidebar-compliance-status compliant">Valid</span>
            </div>
            <div className="sidebar-compliance-item compliant">
              <span className="sidebar-compliance-label">FDA 21 CFR</span>
              <span className="sidebar-compliance-status compliant">Current</span>
            </div>
            <div className="sidebar-compliance-item pending">
              <span className="sidebar-compliance-label">Facility License</span>
              <span className="sidebar-compliance-status pending">Renewing</span>
            </div>
          </div>

          {/* Risk Assessment */}
          <div className="sidebar-risk-assessment">
            <h5>⚠️ Risk Level</h5>
            <div className="sidebar-risk-level medium">
              Medium Risk
            </div>
            <div className="sidebar-risk-factors">
              Chamber A-1 requires maintenance within 48 hours. All other systems nominal.
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
              className={`sidebar-nav-item ${activeTab === 'chambers' ? 'active' : ''}`}
              onClick={() => setActiveTab('chambers')}
            >
              <span className="icon">⚗️</span>
              <span>Chamber Management</span>
            </button>
            <button
              className={`sidebar-nav-item ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <span className="icon">📦</span>
              <span>Order Management</span>
            </button>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
          <div className="dashboard">

        {activeTab === 'overview' && (
          <div className="dashboard-grid">
            <div className="card">
              <h3>Chamber Status Overview</h3>
              <div style={{display: 'flex', justifyContent: 'space-between', margin: '1rem 0'}}>
                <div style={{textAlign: 'center'}}>
                  <strong style={{fontSize: '1.5rem', color: '#10b981'}}>1</strong>
                  <p>Running</p>
                </div>
                <div style={{textAlign: 'center'}}>
                  <strong style={{fontSize: '1.5rem', color: '#f59e0b'}}>1</strong>
                  <p>Idle</p>
                </div>
                <div style={{textAlign: 'center'}}>
                  <strong style={{fontSize: '1.5rem', color: '#ef4444'}}>1</strong>
                  <p>Maintenance</p>
                </div>
              </div>
            </div>

            <div className="card">
              <h3>Today's Performance</h3>
              <div>
                <div style={{margin: '0.5rem 0', display: 'flex', justifyContent: 'space-between'}}>
                  <span>Orders Processed:</span>
                  <strong>3</strong>
                </div>
                <div style={{margin: '0.5rem 0', display: 'flex', justifyContent: 'space-between'}}>
                  <span>Success Rate:</span>
                  <strong style={{color: '#10b981'}}>98.5%</strong>
                </div>
                <div style={{margin: '0.5rem 0', display: 'flex', justifyContent: 'space-between'}}>
                  <span>Avg. Cycle Time:</span>
                  <strong>6.2 hours</strong>
                </div>
              </div>
            </div>

            <div className="card">
              <h3>Recent Activities</h3>
              <div>
                <div style={{margin: '0.5rem 0', padding: '0.5rem', background: '#f8fafc', borderRadius: '5px'}}>
                  <strong>ORD-001</strong> sterilization started
                  <br />
                  <small style={{color: '#64748b'}}>30 minutes ago</small>
                </div>
                <div style={{margin: '0.5rem 0', padding: '0.5rem', background: '#f8fafc', borderRadius: '5px'}}>
                  <strong>Chamber B-1</strong> maintenance completed
                  <br />
                  <small style={{color: '#64748b'}}>2 hours ago</small>
                </div>
              </div>
            </div>

            <div className="card">
              <h3>Upcoming Schedule</h3>
              <div>
                <div style={{margin: '0.5rem 0', padding: '0.5rem', background: '#eff6ff', borderRadius: '5px'}}>
                  <strong>Tomorrow 10:00</strong>
                  <br />
                  ORD-002 - BioTech Industries
                </div>
                <div style={{margin: '0.5rem 0', padding: '0.5rem', background: '#eff6ff', borderRadius: '5px'}}>
                  <strong>Oct 1, 16:00</strong>
                  <br />
                  Chamber B-1 maintenance end
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'chambers' && (
          <div>
            <div className="card">
              <h3>Chamber Status & Control</h3>
              <table className="table">
                <thead>
                  <tr>
                    <th>Chamber</th>
                    <th>Status</th>
                    <th>Current Order</th>
                    <th>Manufacturer</th>
                    <th>Temperature</th>
                    <th>Pressure</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockChambers.map(chamber => (
                    <tr key={chamber.id}>
                      <td><strong>{chamber.name}</strong></td>
                      <td>{getStatusBadge(chamber.status)}</td>
                      <td>{chamber.currentOrder || 'None'}</td>
                      <td>{chamber.manufacturer || 'N/A'}</td>
                      <td>{chamber.temperature}</td>
                      <td>{chamber.pressure}</td>
                      <td>
                        {chamber.status === 'running' && (
                          <button className="btn btn-secondary" style={{fontSize: '0.8rem', padding: '0.4rem 0.8rem'}}>
                            Monitor
                          </button>
                        )}
                        {chamber.status === 'idle' && (
                          <button className="btn" style={{fontSize: '0.8rem', padding: '0.4rem 0.8rem'}}>
                            Start Cycle
                          </button>
                        )}
                        {chamber.status === 'maintenance' && (
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

        {activeTab === 'orders' && (
          <div>
            <div className="card">
              <h3>Sterilization Orders</h3>
              <table className="table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Manufacturer</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Chamber</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockOrders.map(order => (
                    <tr key={order.id}>
                      <td><strong>{order.id}</strong></td>
                      <td>{order.manufacturer}</td>
                      <td>{order.productName}</td>
                      <td>{order.quantity}</td>
                      <td>{getStatusBadge(order.status)}</td>
                      <td>{getPriorityBadge(order.priority)}</td>
                      <td>{order.chamber}</td>
                      <td>{order.scheduledDate || order.completedDate}</td>
                      <td>
                        {order.status === 'completed' && (
                          <button className="btn btn-success" style={{fontSize: '0.8rem', padding: '0.4rem 0.8rem'}}>
                            Ship to Lab
                          </button>
                        )}
                        {order.status === 'in-process' && (
                          <button className="btn btn-secondary" style={{fontSize: '0.8rem', padding: '0.4rem 0.8rem'}}>
                            Monitor
                          </button>
                        )}
                        {order.status === 'scheduled' && (
                          <button className="btn" style={{fontSize: '0.8rem', padding: '0.4rem 0.8rem'}}>
                            Start Process
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

export default SterilizationProviderDashboard;