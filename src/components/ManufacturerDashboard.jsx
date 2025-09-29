import { useState } from 'react';
import NotificationCenter from './shared/NotificationCenter';
import WorkflowTracker from './shared/WorkflowTracker';
import DocumentViewer from './shared/DocumentViewer';
import SmartCalendar from './SmartCalendar';
import DocumentManagement from './DocumentManagement';
import NotificationEngine from './NotificationEngine';
import VisualStatusTracking from './VisualStatusTracking';
import ReportingModule from './ReportingModule';

const ManufacturerDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Mock data
  const mockOrders = [
    {
      id: 'ORD-001',
      productName: 'Surgical Instruments Set A',
      quantity: 500,
      status: 'in-sterilization',
      scheduledDate: '2025-10-02',
      chamber: 'Chamber A-1',
      provider: 'SterilTech Solutions'
    },
    {
      id: 'ORD-002',
      productName: 'Implantable Devices Batch B',
      quantity: 200,
      status: 'pending-booking',
      scheduledDate: null,
      chamber: null,
      provider: null
    },
    {
      id: 'ORD-003',
      productName: 'Disposable Syringes',
      quantity: 1000,
      status: 'testing',
      scheduledDate: '2025-09-28',
      chamber: 'Chamber B-2',
      provider: 'BioSteril Corp'
    }
  ];

  const mockChambers = [
    {
      id: 'CH-A1',
      name: 'Chamber A-1',
      provider: 'SterilTech Solutions',
      capacity: '500 units',
      availability: 'available',
      nextSlot: '2025-10-01 09:00'
    },
    {
      id: 'CH-A2',
      name: 'Chamber A-2',
      provider: 'SterilTech Solutions',
      capacity: '300 units',
      availability: 'booked',
      nextSlot: '2025-10-03 14:00'
    },
    {
      id: 'CH-B1',
      name: 'Chamber B-1',
      provider: 'BioSteril Corp',
      capacity: '750 units',
      availability: 'available',
      nextSlot: '2025-10-01 11:00'
    }
  ];

  const getStatusBadge = (status) => {
    const statusMap = {
      'pending-booking': { class: 'status-pending', text: 'Pending Booking' },
      'scheduled': { class: 'status-in-progress', text: 'Scheduled' },
      'in-sterilization': { class: 'status-in-progress', text: 'In Sterilization' },
      'testing': { class: 'status-in-progress', text: 'Testing' },
      'completed': { class: 'status-completed', text: 'Completed' },
      'failed': { class: 'status-failed', text: 'Failed' }
    };
    const statusInfo = statusMap[status] || { class: 'status-pending', text: status };
    return <span className={`status-badge ${statusInfo.class}`}>{statusInfo.text}</span>;
  };

  return (
    <div>
      <header className="header">
        <h1>STERIX - Manufacturer Dashboard</h1>
        <div className="user-info">
          <NotificationCenter />
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
              <span>🏭</span>
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
              className={`sidebar-nav-item ${activeTab === 'chamber-booking' ? 'active' : ''}`}
              onClick={() => setActiveTab('chamber-booking')}
            >
              <span className="icon">📅</span>
              <span>Chamber Booking</span>
            </button>
            <button
              className={`sidebar-nav-item ${activeTab === 'my-orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('my-orders')}
            >
              <span className="icon">📋</span>
              <span>My Orders</span>
            </button>
            <button
              className={`sidebar-nav-item ${activeTab === 'workflow' ? 'active' : ''}`}
              onClick={() => setActiveTab('workflow')}
            >
              <span className="icon">�</span>
              <span>Workflow Tracker</span>
            </button>
            <button
              className={`sidebar-nav-item ${activeTab === 'documents' ? 'active' : ''}`}
              onClick={() => setActiveTab('documents')}
            >
              <span className="icon">📄</span>
              <span>Documents</span>
            </button>
            <button
              className={`sidebar-nav-item ${activeTab === 'notifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('notifications')}
            >
              <span className="icon">🔔</span>
              <span>Notifications</span>
            </button>
            <button
              className={`sidebar-nav-item ${activeTab === 'reports' ? 'active' : ''}`}
              onClick={() => setActiveTab('reports')}
            >
              <span className="icon">📈</span>
              <span>Reports & Analytics</span>
            </button>
          </nav>

          {/* User Profile Section */}
          <div className="sidebar-user-profile">
            <div className="sidebar-user-avatar">
              {user.username.split(' ').map(n => n[0]).join('').toUpperCase()}
            </div>
            <div className="sidebar-user-info">
              <h4>{user.username}</h4>
              <div className="sidebar-user-role">Medical Device Manufacturer</div>
              <div className="sidebar-user-status">Online</div>
            </div>
          </div>
          
          {/* Notifications Panel */}
          <div className="sidebar-notifications">
            <div className="sidebar-notifications-header">
              <h5>
                🔔 Notifications
              </h5>
              <span className="sidebar-notification-count">3</span>
            </div>
            <div className="sidebar-notification-item">
              <div className="sidebar-notification-icon success">
                ✓
              </div>
              <div className="sidebar-notification-content">
                <p>Order ORD-001 sterilization completed</p>
                <span className="sidebar-notification-time">5 min ago</span>
              </div>
            </div>
            <div className="sidebar-notification-item">
              <div className="sidebar-notification-icon info">
                ℹ
              </div>
              <div className="sidebar-notification-content">
                <p>New chamber availability at SterilCorp</p>
                <span className="sidebar-notification-time">1 hour ago</span>
              </div>
            </div>
            <div className="sidebar-notification-item">
              <div className="sidebar-notification-icon warning">
                ⚠
              </div>
              <div className="sidebar-notification-content">
                <p>Testing delay for batch B-789</p>
                <span className="sidebar-notification-time">2 hours ago</span>
              </div>
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="sidebar-quick-actions">
            <h5>⚡ Quick Actions</h5>
            <div className="sidebar-quick-action" onClick={() => setActiveTab('booking')}>
              <div className="sidebar-quick-action-icon">+</div>
              New Sterilization Order
            </div>
            <div className="sidebar-quick-action" onClick={() => setActiveTab('orders')}>
              <div className="sidebar-quick-action-icon">📋</div>
              My Orders
            </div>
            <div className="sidebar-quick-action" onClick={() => setActiveTab('workflow')}>
              <div className="sidebar-quick-action-icon">�</div>
              Workflow Tracker
            </div>
            <div className="sidebar-quick-action" onClick={() => setActiveTab('documents')}>
              <div className="sidebar-quick-action-icon">📄</div>
              Documents
            </div>
          </div>

          {/* Recent Activity Feed */}
          <div className="sidebar-activity-feed">
            <h5>📈 Recent Activity</h5>
            <div className="sidebar-activity-item">
              <div className="sidebar-activity-avatar">SC</div>
              <div className="sidebar-activity-content">
                <p><strong>SterilCorp</strong> accepted your sterilization request</p>
                <span className="sidebar-activity-time">12 min ago</span>
              </div>
            </div>
            <div className="sidebar-activity-item">
              <div className="sidebar-activity-avatar">TL</div>
              <div className="sidebar-activity-content">
                <p><strong>TestLab Inc</strong> completed sterility testing</p>
                <span className="sidebar-activity-time">35 min ago</span>
              </div>
            </div>
            <div className="sidebar-activity-item">
              <div className="sidebar-activity-avatar">MD</div>
              <div className="sidebar-activity-content">
                <p>Order <strong>ORD-002</strong> status updated to "In Transit"</p>
                <span className="sidebar-activity-time">1 hour ago</span>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="sidebar-system-status">
            <h5>🟢 System Status</h5>
            <div className="sidebar-system-metrics">
              <div className="sidebar-system-metric">
                <span className="sidebar-system-metric-value">98%</span>
                <span className="sidebar-system-metric-label">Uptime</span>
              </div>
              <div className="sidebar-system-metric">
                <span className="sidebar-system-metric-value">5</span>
                <span className="sidebar-system-metric-label">Active Orders</span>
              </div>
              <div className="sidebar-system-metric">
                <span className="sidebar-system-metric-value">2</span>
                <span className="sidebar-system-metric-label">Pending</span>
              </div>
            </div>
          </div>

          {/* Regulatory Compliance Panel */}
          <div className="sidebar-compliance">
            <h5>📋 Compliance Status</h5>
            <div className="sidebar-compliance-item compliant">
              <span className="sidebar-compliance-label">FDA 510(k)</span>
              <span className="sidebar-compliance-status compliant">Valid</span>
            </div>
            <div className="sidebar-compliance-item compliant">
              <span className="sidebar-compliance-label">ISO 13485</span>
              <span className="sidebar-compliance-status compliant">Current</span>
            </div>
            <div className="sidebar-compliance-item pending">
              <span className="sidebar-compliance-label">EU MDR</span>
              <span className="sidebar-compliance-status pending">Renewal</span>
            </div>
            <div className="sidebar-compliance-item compliant">
              <span className="sidebar-compliance-label">Quality Cert</span>
              <span className="sidebar-compliance-status compliant">Active</span>
            </div>
          </div>

          {/* Batch Tracking Widget */}
          <div className="sidebar-batch-tracking">
            <h5>🏷️ Active Batches</h5>
            <div className="sidebar-batch-item">
              <div>
                <div className="sidebar-batch-id">B-2025-789</div>
                <div className="sidebar-batch-status">Sterilization Phase</div>
              </div>
              <div className="sidebar-batch-progress">
                <div className="sidebar-batch-progress-bar" style={{width: '75%'}}></div>
              </div>
            </div>
            <div className="sidebar-batch-item">
              <div>
                <div className="sidebar-batch-id">B-2025-790</div>
                <div className="sidebar-batch-status">Testing Phase</div>
              </div>
              <div className="sidebar-batch-progress">
                <div className="sidebar-batch-progress-bar" style={{width: '40%'}}></div>
              </div>
            </div>
            <div className="sidebar-batch-item">
              <div>
                <div className="sidebar-batch-id">B-2025-791</div>
                <div className="sidebar-batch-status">Documentation</div>
              </div>
              <div className="sidebar-batch-progress">
                <div className="sidebar-batch-progress-bar" style={{width: '90%'}}></div>
              </div>
            </div>
          </div>

          {/* Risk Assessment Dashboard */}
          <div className="sidebar-risk-assessment">
            <h5>⚠️ Risk Assessment</h5>
            <div className="sidebar-risk-level low">
              Low Risk
            </div>
            <div className="sidebar-risk-factors">
              All processes within normal parameters. No critical deviations detected.
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
          <div className="dashboard">

        {activeTab === 'overview' && (
          <div className="dashboard-grid">
            <div className="card" style={{background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(255, 255, 255, 0.95))'}}>
              <h3>📊 Order Summary</h3>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', margin: '1.5rem 0'}}>
                <div style={{textAlign: 'center', padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px'}}>
                  <strong style={{fontSize: '2.5rem', color: '#3b82f6', display: 'block', fontWeight: '800'}}>3</strong>
                  <p style={{margin: '0.5rem 0 0 0', color: '#64748b', fontWeight: '600'}}>Active Orders</p>
                  <div style={{width: '30px', height: '2px', background: '#3b82f6', margin: '0.5rem auto', borderRadius: '1px'}}></div>
                </div>
                <div style={{textAlign: 'center', padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px'}}>
                  <strong style={{fontSize: '2.5rem', color: '#10b981', display: 'block', fontWeight: '800'}}>12</strong>
                  <p style={{margin: '0.5rem 0 0 0', color: '#64748b', fontWeight: '600'}}>Completed This Month</p>
                  <div style={{width: '30px', height: '2px', background: '#10b981', margin: '0.5rem auto', borderRadius: '1px'}}></div>
                </div>
              </div>
            </div>

            <div className="card" style={{background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(255, 255, 255, 0.95))'}}>
              <h3>🚀 Recent Activity</h3>
              <div>
                <div style={{
                  margin: '1rem 0', 
                  padding: '1rem', 
                  background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)', 
                  borderRadius: '10px',
                  border: '1px solid #bae6fd',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    left: '-2px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '4px',
                    height: '20px',
                    background: '#3b82f6',
                    borderRadius: '2px'
                  }}></div>
                  <strong style={{color: '#1e293b'}}>ORD-001</strong> moved to sterilization
                  <br />
                  <small style={{color: '#0284c7', fontWeight: '600'}}>⏰ 2 hours ago</small>
                </div>
                <div style={{
                  margin: '1rem 0', 
                  padding: '1rem', 
                  background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', 
                  borderRadius: '10px',
                  border: '1px solid #bbf7d0',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    left: '-2px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '4px',
                    height: '20px',
                    background: '#10b981',
                    borderRadius: '2px'
                  }}></div>
                  <strong style={{color: '#1e293b'}}>ORD-003</strong> testing completed
                  <br />
                  <small style={{color: '#059669', fontWeight: '600'}}>⏰ 1 day ago</small>
                </div>
              </div>
            </div>

            <div className="card" style={{background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.05), rgba(255, 255, 255, 0.95))'}}>
              <h3>⚡ Quick Actions</h3>
              <div style={{display: 'grid', gap: '0.75rem'}}>
                <button 
                  className="btn" 
                  onClick={() => setActiveTab('chamber-booking')}
                  style={{
                    width: '100%', 
                    background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <span>📅</span> Book New Chamber Slot
                </button>
                <button 
                  className="btn btn-secondary" 
                  onClick={() => setActiveTab('my-orders')}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <span>📋</span> View My Orders
                </button>
                <button 
                  className="btn btn-secondary" 
                  onClick={() => setActiveTab('reports')}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <span>�</span> Generate Reports
                </button>
              </div>
            </div>

            <div className="card" style={{background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.05), rgba(255, 255, 255, 0.95))'}}>
              <h3>📈 Performance Metrics</h3>
              <div style={{display: 'grid', gap: '1rem'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '8px'}}>
                  <span style={{fontWeight: '600'}}>⏱️ Avg. Turnaround:</span>
                  <strong style={{color: '#d97706', fontSize: '1.1rem'}}>4.2 days</strong>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px'}}>
                  <span style={{fontWeight: '600'}}>✅ Success Rate:</span>
                  <strong style={{color: '#059669', fontSize: '1.1rem'}}>98.5%</strong>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px'}}>
                  <span style={{fontWeight: '600'}}>💰 Cost Savings:</span>
                  <strong style={{color: '#2563eb', fontSize: '1.1rem'}}>$24,500</strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'booking' && (
          <div>
            <div className="card">
              <h3>Available Chambers</h3>
              <table className="table">
                <thead>
                  <tr>
                    <th>Chamber</th>
                    <th>Provider</th>
                    <th>Capacity</th>
                    <th>Next Available</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {mockChambers.map(chamber => (
                    <tr key={chamber.id}>
                      <td>{chamber.name}</td>
                      <td>{chamber.provider}</td>
                      <td>{chamber.capacity}</td>
                      <td>{chamber.nextSlot}</td>
                      <td>
                        <span className={`status-badge ${chamber.availability === 'available' ? 'status-completed' : 'status-pending'}`}>
                          {chamber.availability === 'available' ? 'Available' : 'Booked'}
                        </span>
                      </td>
                      <td>
                        <button 
                          className={`btn ${chamber.availability === 'available' ? '' : 'btn-secondary'}`}
                          disabled={chamber.availability !== 'available'}
                        >
                          {chamber.availability === 'available' ? 'Book Now' : 'Unavailable'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'chamber-booking' && (
          <div>
            <SmartCalendar />
          </div>
        )}

        {activeTab === 'my-orders' && (
          <div>
            <div className="card">
              <h3>My Sterilization Orders</h3>
              <table className="table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Status</th>
                    <th>Scheduled Date</th>
                    <th>Chamber</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockOrders.map(order => (
                    <tr key={order.id}>
                      <td><strong>{order.id}</strong></td>
                      <td>{order.productName}</td>
                      <td>{order.quantity}</td>
                      <td>{getStatusBadge(order.status)}</td>
                      <td>{order.scheduledDate || 'Not scheduled'}</td>
                      <td>{order.chamber || 'Not assigned'}</td>
                      <td>
                        <button className="btn btn-secondary" style={{fontSize: '0.8rem', padding: '0.4rem 0.8rem'}}>
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'workflow' && (
          <div>
            <VisualStatusTracking />
          </div>
        )}

        {activeTab === 'documents' && (
          <div>
            <DocumentManagement />
          </div>
        )}

        {activeTab === 'notifications' && (
          <div>
            <NotificationEngine />
          </div>
        )}

        {activeTab === 'reports' && (
          <div>
            <ReportingModule />
          </div>
        )}
          </div>
        </main>
      </div>
      
      {/* Floating Action Button */}
      <div className="tooltip">
        <button className="fab" onClick={() => setActiveTab('chamber-booking')}>
          <span>➕</span>
        </button>
        <span className="tooltiptext">Quick Book Chamber</span>
      </div>
    </div>
  );
};

export default ManufacturerDashboard;