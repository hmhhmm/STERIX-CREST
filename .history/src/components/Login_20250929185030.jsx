import { useState } from 'react';

const Login = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const roles = [
    {
      id: 'manufacturer',
      title: '🏭 Manufacturer',
      description: 'Medical device manufacturers sending products for sterilization',
      color: '#3b82f6'
    },
    {
      id: 'sterilization-provider',
      title: '🔬 Sterilization Provider',
      description: 'Service providers offering sterilization services',
      color: '#10b981'
    },
    {
      id: 'testing-lab',
      title: '🧪 Testing Laboratory', 
      description: 'Laboratories performing post-sterilization testing',
      color: '#f59e0b'
    }
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    if (selectedRole && username) {
      setIsLoading(true);
      // Simulate loading delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      onLogin({
        username: username,
        role: selectedRole,
        id: Date.now() // Mock ID
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div style={{textAlign: 'center', marginBottom: '2rem'}}>
          <h2 className="login-title">STERIX</h2>
          <p style={{color: '#64748b', margin: '0', fontSize: '1.1rem', fontWeight: '500'}}>
            Sterilization Validation Platform
          </p>
          <div style={{
            width: '60px',
            height: '4px',
            background: 'linear-gradient(90deg, #3b82f6, #7c3aed)',
            margin: '1rem auto',
            borderRadius: '2px'
          }}></div>
        </div>
        
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>👤 Username</label>
            <input 
              type="text" 
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              style={{
                background: username ? 'linear-gradient(135deg, #f0f9ff, #ffffff)' : 'white',
                borderColor: username ? '#3b82f6' : '#e2e8f0'
              }}
            />
          </div>

          <div className="form-group">
            <label>🎭 Select Your Role</label>
            <div className="role-selection">
              {roles.map(role => (
                <div 
                  key={role.id}
                  className={`role-btn ${selectedRole === role.id ? 'selected' : ''}`}
                  onClick={() => setSelectedRole(role.id)}
                  style={{
                    borderColor: selectedRole === role.id ? role.color : '#e2e8f0',
                    background: selectedRole === role.id 
                      ? `linear-gradient(135deg, ${role.color}15, ${role.color}10)` 
                      : 'white'
                  }}
                >
                  <h4 style={{
                    margin: '0 0 0.5rem 0', 
                    color: selectedRole === role.id ? role.color : '#1e293b',
                    fontSize: '1.1rem',
                    fontWeight: '700'
                  }}>
                    {role.title}
                  </h4>
                  <p style={{
                    margin: 0, 
                    fontSize: '0.9rem', 
                    color: '#64748b',
                    lineHeight: '1.4'
                  }}>
                    {role.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <button 
            type="submit" 
            className="btn"
            style={{
              width: '100%', 
              marginTop: '1rem',
              padding: '1rem 1.5rem',
              fontSize: '1.1rem',
              fontWeight: '700',
              background: selectedRole && username 
                ? 'linear-gradient(135deg, #3b82f6, #7c3aed)' 
                : 'linear-gradient(135deg, #9ca3af, #6b7280)',
              cursor: selectedRole && username ? 'pointer' : 'not-allowed',
              opacity: isLoading ? 0.8 : 1
            }}
            disabled={!selectedRole || !username || isLoading}
          >
            {isLoading ? (
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'}}>
                <div className="loading"></div>
                <span>Logging in...</span>
              </div>
            ) : (
              '🚀 Launch STERIX Dashboard'
            )}
          </button>
        </form>

        <div style={{
          marginTop: '2rem', 
          padding: '1.5rem', 
          background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)', 
          borderRadius: '12px',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{textAlign: 'center', marginBottom: '1rem'}}>
            <span style={{fontSize: '1.5rem'}}>✨</span>
          </div>
          <p style={{
            margin: 0, 
            fontSize: '0.95rem', 
            color: '#64748b', 
            textAlign: 'center',
            lineHeight: '1.5'
          }}>
            <strong>Demo Mode Active</strong><br />
            Use any username to explore STERIX's powerful sterilization validation workflows
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;