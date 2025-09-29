import { useState } from 'react';

const Login = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState('');
  const [username, setUsername] = useState('');

  const roles = [
    {
      id: 'manufacturer',
      title: 'Manufacturer',
      description: 'Medical device manufacturers sending products for sterilization'
    },
    {
      id: 'sterilization-provider',
      title: 'Sterilization Provider',
      description: 'Service providers offering sterilization services'
    },
    {
      id: 'testing-lab',
      title: 'Testing Laboratory',
      description: 'Laboratories performing post-sterilization testing'
    }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    if (selectedRole && username) {
      onLogin({
        username: username,
        role: selectedRole,
        id: Date.now() // Mock ID
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">STERIX</h2>
        <p style={{textAlign: 'center', color: '#64748b', margin: '0 0 2rem 0', fontSize: '1.1rem'}}>Sterilization Validation Platform</p>
        
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Username</label>
            <input 
              type="text" 
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="form-group">
            <label>Select Your Role</label>
            <div className="role-selection">
              {roles.map(role => (
                <div 
                  key={role.id}
                  className={`role-btn ${selectedRole === role.id ? 'selected' : ''}`}
                  onClick={() => setSelectedRole(role.id)}
                >
                  <h4 style={{margin: '0 0 0.5rem 0', color: '#1e293b'}}>{role.title}</h4>
                  <p style={{margin: 0, fontSize: '0.9rem', color: '#64748b'}}>{role.description}</p>
                </div>
              ))}
            </div>
          </div>

          <button 
            type="submit" 
            className="btn"
            style={{width: '100%', marginTop: '1rem'}}
            disabled={!selectedRole || !username}
          >
            Login to Dashboard
          </button>
        </form>

        <div style={{marginTop: '2rem', padding: '1rem', background: '#f8fafc', borderRadius: '8px'}}>
          <p style={{margin: 0, fontSize: '0.9rem', color: '#64748b', textAlign: 'center'}}>
            Demo Mode - Use any username to login
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;