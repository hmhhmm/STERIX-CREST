import { useState } from 'react';

const SterilizationProviderDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');

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
        <h1>Sterilization Provider Dashboard</h1>
        <div className="user-info">
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
            className={`btn ${activeTab === 'chambers' ? '' : 'btn-secondary'}`}
            onClick={() => setActiveTab('chambers')}
          >
            Chamber Management
          </button>
          <button 
            className={`btn ${activeTab === 'orders' ? '' : 'btn-secondary'}`}
            onClick={() => setActiveTab('orders')}
          >
            Order Management
          </button>
        </div>

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
    </div>
  );
};

export default SterilizationProviderDashboard;