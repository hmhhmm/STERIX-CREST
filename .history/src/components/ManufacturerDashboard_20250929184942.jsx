import { useState } from 'react';
import NotificationCenter from './shared/NotificationCenter';
import WorkflowTracker from './shared/WorkflowTracker';
import DocumentViewer from './shared/DocumentViewer';

const ManufacturerDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');

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

      <div className="dashboard">
        <div className="tab-nav">
          <button 
            className={`btn ${activeTab === 'overview' ? '' : 'btn-secondary'}`}
            onClick={() => setActiveTab('overview')}
          >
            <span style={{marginRight: '0.5rem'}}>📊</span> Overview
          </button>
          <button 
            className={`btn ${activeTab === 'booking' ? '' : 'btn-secondary'}`}
            onClick={() => setActiveTab('booking')}
          >
            <span style={{marginRight: '0.5rem'}}>📅</span> Chamber Booking
          </button>
          <button 
            className={`btn ${activeTab === 'orders' ? '' : 'btn-secondary'}`}
            onClick={() => setActiveTab('orders')}
          >
            <span style={{marginRight: '0.5rem'}}>📋</span> My Orders
          </button>
          <button 
            className={`btn ${activeTab === 'workflow' ? '' : 'btn-secondary'}`}
            onClick={() => setActiveTab('workflow')}
          >
            <span style={{marginRight: '0.5rem'}}>🔄</span> Workflow Tracker
          </button>
          <button 
            className={`btn ${activeTab === 'documents' ? '' : 'btn-secondary'}`}
            onClick={() => setActiveTab('documents')}
          >
            <span style={{marginRight: '0.5rem'}}>📄</span> Documents
          </button>
        </div>

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
                <button className="btn" style={{
                  width: '100%', 
                  background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}>
                  <span>📅</span> Book New Chamber Slot
                </button>
                <button className="btn btn-secondary" style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}>
                  <span>📋</span> Upload Product Specifications
                </button>
                <button className="btn btn-secondary" style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}>
                  <span>📄</span> Download Reports
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

        {activeTab === 'orders' && (
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
            <WorkflowTracker orderId="ORD-001" />
          </div>
        )}

        {activeTab === 'documents' && (
          <div>
            <DocumentViewer orderId="ORD-001" />
          </div>
        )}
      </div>
      
      {/* Floating Action Button */}
      <div className="tooltip">
        <button className="fab" onClick={() => setActiveTab('booking')}>
          <span>➕</span>
        </button>
        <span className="tooltiptext">Quick Book Chamber</span>
      </div>
    </div>
  );
};

export default ManufacturerDashboard;