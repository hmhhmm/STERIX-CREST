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
        <div style={{marginBottom: '2rem'}}>
          <button 
            className={`btn ${activeTab === 'overview' ? '' : 'btn-secondary'}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`btn ${activeTab === 'booking' ? '' : 'btn-secondary'}`}
            onClick={() => setActiveTab('booking')}
          >
            Chamber Booking
          </button>
          <button 
            className={`btn ${activeTab === 'orders' ? '' : 'btn-secondary'}`}
            onClick={() => setActiveTab('orders')}
          >
            My Orders
          </button>
          <button 
            className={`btn ${activeTab === 'workflow' ? '' : 'btn-secondary'}`}
            onClick={() => setActiveTab('workflow')}
          >
            Workflow Tracker
          </button>
          <button 
            className={`btn ${activeTab === 'documents' ? '' : 'btn-secondary'}`}
            onClick={() => setActiveTab('documents')}
          >
            Documents
          </button>
        </div>

        {activeTab === 'overview' && (
          <div className="dashboard-grid">
            <div className="card">
              <h3>Order Summary</h3>
              <div style={{display: 'flex', justifyContent: 'space-between', margin: '1rem 0'}}>
                <div>
                  <strong style={{fontSize: '1.5rem', color: '#3b82f6'}}>3</strong>
                  <p>Active Orders</p>
                </div>
                <div>
                  <strong style={{fontSize: '1.5rem', color: '#10b981'}}>12</strong>
                  <p>Completed This Month</p>
                </div>
              </div>
            </div>

            <div className="card">
              <h3>Recent Activity</h3>
              <div>
                <div style={{margin: '0.5rem 0', padding: '0.5rem', background: '#f8fafc', borderRadius: '5px'}}>
                  <strong>ORD-001</strong> moved to sterilization
                  <br />
                  <small style={{color: '#64748b'}}>2 hours ago</small>
                </div>
                <div style={{margin: '0.5rem 0', padding: '0.5rem', background: '#f8fafc', borderRadius: '5px'}}>
                  <strong>ORD-003</strong> testing completed
                  <br />
                  <small style={{color: '#64748b'}}>1 day ago</small>
                </div>
              </div>
            </div>

            <div className="card">
              <h3>Quick Actions</h3>
              <button className="btn" style={{width: '100%', margin: '0.25rem 0'}}>
                Book New Chamber Slot
              </button>
              <button className="btn btn-secondary" style={{width: '100%', margin: '0.25rem 0'}}>
                Upload Product Specifications
              </button>
              <button className="btn btn-secondary" style={{width: '100%', margin: '0.25rem 0'}}>
                Download Reports
              </button>
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
    </div>
  );
};

export default ManufacturerDashboard;