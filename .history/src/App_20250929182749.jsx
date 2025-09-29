import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './components/Login';
import ManufacturerDashboard from './components/ManufacturerDashboard';
import SterilizationProviderDashboard from './components/SterilizationProviderDashboard';
import TestingLabDashboard from './components/TestingLabDashboard';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={
            user ? <Navigate to={`/${user.role}`} /> : <Login onLogin={handleLogin} />
          } />
          
          <Route path="/manufacturer" element={
            user && user.role === 'manufacturer' ? 
            <ManufacturerDashboard user={user} onLogout={handleLogout} /> : 
            <Navigate to="/login" />
          } />
          
          <Route path="/sterilization-provider" element={
            user && user.role === 'sterilization-provider' ? 
            <SterilizationProviderDashboard user={user} onLogout={handleLogout} /> : 
            <Navigate to="/login" />
          } />
          
          <Route path="/testing-lab" element={
            user && user.role === 'testing-lab' ? 
            <TestingLabDashboard user={user} onLogout={handleLogout} /> : 
            <Navigate to="/login" />
          } />
          
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;