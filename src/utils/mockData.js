// Mock data for the entire application
export const mockData = {
  // Manufacturers data
  manufacturers: [
    { id: 'MFG-001', name: 'MedDevice Corp', email: 'contact@meddevice.com', phone: '+1-555-0101' },
    { id: 'MFG-002', name: 'BioTech Industries', email: 'info@biotech.com', phone: '+1-555-0102' },
    { id: 'MFG-003', name: 'Surgical Solutions Ltd', email: 'hello@surgicalsol.com', phone: '+1-555-0103' }
  ],

  // Sterilization providers data
  providers: [
    { 
      id: 'SP-001', 
      name: 'SterilTech Solutions', 
      email: 'operations@steriltech.com', 
      phone: '+1-555-0201',
      chambers: ['Chamber A-1', 'Chamber A-2']
    },
    { 
      id: 'SP-002', 
      name: 'BioSteril Corp', 
      email: 'service@biosteril.com', 
      phone: '+1-555-0202',
      chambers: ['Chamber B-1', 'Chamber B-2']
    }
  ],

  // Testing labs data
  labs: [
    { 
      id: 'LAB-001', 
      name: 'Precision Testing Labs', 
      email: 'lab@precision.com', 
      phone: '+1-555-0301',
      capabilities: ['Sterility Testing', 'Bioburden Analysis', 'Residual Analysis']
    },
    { 
      id: 'LAB-002', 
      name: 'Advanced Microbiology Services', 
      email: 'testing@advancedmicro.com', 
      phone: '+1-555-0302',
      capabilities: ['Sterility Testing', 'Endotoxin Testing']
    }
  ],

  // Sample workflow statuses
  workflowSteps: [
    { id: 1, name: 'Order Submitted', status: 'completed', description: 'Manufacturer submits sterilization order' },
    { id: 2, name: 'Chamber Booked', status: 'completed', description: 'Sterilization slot confirmed' },
    { id: 3, name: 'Product Received', status: 'completed', description: 'Product received by sterilization provider' },
    { id: 4, name: 'Sterilization In Progress', status: 'active', description: 'Sterilization process running' },
    { id: 5, name: 'Sterilization Complete', status: 'pending', description: 'Sterilization cycle finished' },
    { id: 6, name: 'Sample to Lab', status: 'pending', description: 'Samples sent to testing laboratory' },
    { id: 7, name: 'Testing Complete', status: 'pending', description: 'All tests completed and passed' },
    { id: 8, name: 'Report Generated', status: 'pending', description: 'Final validation report created' }
  ],

  // Notifications
  notifications: [
    {
      id: 'NOT-001',
      type: 'info',
      title: 'Order Update',
      message: 'ORD-001 sterilization cycle completed successfully',
      timestamp: '2025-09-29 14:30',
      read: false
    },
    {
      id: 'NOT-002',
      type: 'warning',
      title: 'Maintenance Required',
      message: 'Chamber B-1 scheduled for maintenance tomorrow',
      timestamp: '2025-09-29 12:00',
      read: false
    },
    {
      id: 'NOT-003',
      type: 'success',
      title: 'Test Results Ready',
      message: 'Sterility test results for SMP-002 are now available',
      timestamp: '2025-09-29 10:15',
      read: true
    }
  ],

  // Documents
  documents: [
    {
      id: 'DOC-001',
      name: 'Sterilization Protocol v2.1.pdf',
      type: 'protocol',
      uploadedBy: 'SterilTech Solutions',
      uploadDate: '2025-09-25',
      size: '2.4 MB'
    },
    {
      id: 'DOC-002',
      name: 'Test Report - SMP-002.pdf',
      type: 'report',
      uploadedBy: 'Precision Testing Labs',
      uploadDate: '2025-09-29',
      size: '1.8 MB'
    },
    {
      id: 'DOC-003',
      name: 'Certificate of Sterilization - ORD-001.pdf',
      type: 'certificate',
      uploadedBy: 'SterilTech Solutions',
      uploadDate: '2025-09-29',
      size: '0.9 MB'
    }
  ]
};

// Utility functions for data manipulation
export const getStatusColor = (status) => {
  const colors = {
    'pending': '#f59e0b',
    'in-progress': '#3b82f6',
    'completed': '#10b981',
    'failed': '#ef4444',
    'active': '#3b82f6'
  };
  return colors[status] || '#6b7280';
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};