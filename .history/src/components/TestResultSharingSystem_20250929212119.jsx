import React, { useState, useEffect } from 'react';

const TestResultSharingSystem = () => {
  const [activeTab, setActiveTab] = useState('upload'); // 'upload', 'results', 'sharing', 'templates'
  const [selectedResult, setSelectedResult] = useState(null);
  const [uploadModal, setUploadModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [templateModal, setTemplateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');

  // Standardized report templates
  const [reportTemplates, setReportTemplates] = useState([
    {
      id: 'bioburden-template',
      name: 'Bioburden Testing Report',
      category: 'microbiological',
      version: '2.1',
      lastUpdated: '2025-09-15',
      description: 'Standard template for bioburden testing results',
      fields: [
        { name: 'sampleId', label: 'Sample ID', type: 'text', required: true },
        { name: 'testDate', label: 'Test Date', type: 'date', required: true },
        { name: 'methodology', label: 'Test Methodology', type: 'select', options: ['ISO 11737-1', 'AAMI TIR12', 'USP <71>'], required: true },
        { name: 'bioburdenCount', label: 'Bioburden Count (CFU)', type: 'number', required: true },
        { name: 'acceptanceCriteria', label: 'Acceptance Criteria', type: 'text', required: true },
        { name: 'result', label: 'Test Result', type: 'select', options: ['Pass', 'Fail'], required: true },
        { name: 'analyst', label: 'Analyst', type: 'text', required: true },
        { name: 'reviewer', label: 'Reviewer', type: 'text', required: true },
        { name: 'comments', label: 'Comments', type: 'textarea', required: false }
      ]
    },
    {
      id: 'sterility-template',
      name: 'Sterility Test Report',
      category: 'microbiological',
      version: '1.8',
      lastUpdated: '2025-09-10',
      description: 'Standard template for sterility testing results',
      fields: [
        { name: 'sampleId', label: 'Sample ID', type: 'text', required: true },
        { name: 'testDate', label: 'Test Date', type: 'date', required: true },
        { name: 'methodology', label: 'Test Methodology', type: 'select', options: ['ISO 11737-2', 'USP <71>', 'EP 2.6.1'], required: true },
        { name: 'incubationPeriod', label: 'Incubation Period (days)', type: 'number', required: true },
        { name: 'mediaType', label: 'Growth Media', type: 'select', options: ['TSB', 'FTM', 'Both'], required: true },
        { name: 'growthObserved', label: 'Growth Observed', type: 'select', options: ['Yes', 'No'], required: true },
        { name: 'result', label: 'Test Result', type: 'select', options: ['Sterile', 'Non-Sterile'], required: true },
        { name: 'analyst', label: 'Analyst', type: 'text', required: true },
        { name: 'reviewer', label: 'Reviewer', type: 'text', required: true }
      ]
    },
    {
      id: 'residue-template',
      name: 'Chemical Residue Analysis',
      category: 'chemical',
      version: '1.5',
      lastUpdated: '2025-09-20',
      description: 'Template for chemical residue testing results',
      fields: [
        { name: 'sampleId', label: 'Sample ID', type: 'text', required: true },
        { name: 'testDate', label: 'Test Date', type: 'date', required: true },
        { name: 'methodology', label: 'Test Methodology', type: 'select', options: ['ISO 10993-7', 'AAMI TIR17', 'Custom'], required: true },
        { name: 'residueType', label: 'Residue Type', type: 'select', options: ['Ethylene Oxide', 'Formaldehyde', 'Ethylene Chlorohydrin'], required: true },
        { name: 'concentration', label: 'Concentration (ppm)', type: 'number', required: true },
        { name: 'acceptanceLimit', label: 'Acceptance Limit (ppm)', type: 'number', required: true },
        { name: 'result', label: 'Test Result', type: 'select', options: ['Pass', 'Fail'], required: true },
        { name: 'analyst', label: 'Analyst', type: 'text', required: true },
        { name: 'reviewer', label: 'Reviewer', type: 'text', required: true }
      ]
    }
  ]);

  // Test results data
  const [testResults, setTestResults] = useState([
    {
      id: 'TR-2025-001',
      workflowId: 'WF-2025-001',
      client: 'MedTech Corporation',
      deviceType: 'Surgical Instruments',
      batchNumber: 'MT-SI-2025-001',
      testType: 'Bioburden Testing',
      templateUsed: 'bioburden-template',
      status: 'completed',
      result: 'Pass',
      uploadDate: '2025-09-28T14:30:00Z',
      testDate: '2025-09-27T09:00:00Z',
      lab: 'AccuTest Laboratories',
      analyst: 'Dr. Emily Chen',
      reviewer: 'Dr. Michael Johnson',
      certificateNumber: 'ACC-2025-BT-001',
      expiryDate: '2025-12-27',
      files: [
        { name: 'Bioburden_Test_Report.pdf', size: '2.5 MB', type: 'application/pdf', uploadTime: '2025-09-28T14:30:00Z' },
        { name: 'Test_Data_Raw.xlsx', size: '1.8 MB', type: 'application/xlsx', uploadTime: '2025-09-28T14:32:00Z' },
        { name: 'Certificate_ACC-2025-BT-001.pdf', size: '0.8 MB', type: 'application/pdf', uploadTime: '2025-09-28T14:35:00Z' }
      ],
      data: {
        sampleId: 'MT-SI-2025-001-S1',
        bioburdenCount: 15,
        acceptanceCriteria: '≤ 100 CFU',
        methodology: 'ISO 11737-1',
        comments: 'All samples within acceptable limits'
      },
      sharedWith: [
        { stakeholder: 'MedTech Corporation', email: 'qa@medtech.com', sharedDate: '2025-09-28T15:00:00Z', accessLevel: 'full' },
        { stakeholder: 'Sterilization Provider', email: 'operations@steripro.com', sharedDate: '2025-09-28T15:05:00Z', accessLevel: 'results-only' }
      ],
      notifications: [
        { type: 'upload', message: 'Test results uploaded successfully', timestamp: '2025-09-28T14:30:00Z' },
        { type: 'shared', message: 'Results shared with stakeholders', timestamp: '2025-09-28T15:00:00Z' }
      ]
    },
    {
      id: 'TR-2025-002',
      workflowId: 'WF-2025-002',
      client: 'BioMed Solutions Ltd',
      deviceType: 'Orthopedic Implants',
      batchNumber: 'BMS-OI-2025-002',
      testType: 'Sterility Testing',
      templateUsed: 'sterility-template',
      status: 'completed',
      result: 'Pass',
      uploadDate: '2025-09-27T16:45:00Z',
      testDate: '2025-09-23T10:00:00Z',
      lab: 'AccuTest Laboratories',
      analyst: 'Dr. Sarah Wilson',
      reviewer: 'Dr. Michael Johnson',
      certificateNumber: 'ACC-2025-ST-002',
      expiryDate: '2025-12-23',
      files: [
        { name: 'Sterility_Test_Report.pdf', size: '3.1 MB', type: 'application/pdf', uploadTime: '2025-09-27T16:45:00Z' },
        { name: 'Incubation_Photos.zip', size: '5.2 MB', type: 'application/zip', uploadTime: '2025-09-27T16:50:00Z' },
        { name: 'Certificate_ACC-2025-ST-002.pdf', size: '0.9 MB', type: 'application/pdf', uploadTime: '2025-09-27T16:48:00Z' }
      ],
      data: {
        sampleId: 'BMS-OI-2025-002-S1',
        incubationPeriod: 14,
        mediaType: 'Both',
        growthObserved: 'No',
        methodology: 'ISO 11737-2'
      },
      sharedWith: [
        { stakeholder: 'BioMed Solutions Ltd', email: 'quality@biomed.com', sharedDate: '2025-09-27T17:00:00Z', accessLevel: 'full' },
        { stakeholder: 'Regulatory Authority', email: 'submissions@health.gov', sharedDate: '2025-09-27T17:30:00Z', accessLevel: 'certificate-only' }
      ],
      notifications: [
        { type: 'upload', message: 'Sterility test results uploaded', timestamp: '2025-09-27T16:45:00Z' },
        { type: 'shared', message: 'Certificate shared with regulatory authority', timestamp: '2025-09-27T17:30:00Z' }
      ]
    },
    {
      id: 'TR-2025-003',
      workflowId: 'WF-2025-004',
      client: 'Precision Medical',
      deviceType: 'Surgical Tools',
      batchNumber: 'PM-ST-2025-004',
      testType: 'Bioburden Testing',
      templateUsed: 'bioburden-template',
      status: 'failed',
      result: 'Fail',
      uploadDate: '2025-09-25T11:20:00Z',
      testDate: '2025-09-22T14:00:00Z',
      lab: 'AccuTest Laboratories',
      analyst: 'Dr. James Rodriguez',
      reviewer: 'Dr. Michael Johnson',
      certificateNumber: null,
      expiryDate: null,
      files: [
        { name: 'Failed_Bioburden_Report.pdf', size: '2.8 MB', type: 'application/pdf', uploadTime: '2025-09-25T11:20:00Z' },
        { name: 'Contamination_Analysis.pdf', size: '1.5 MB', type: 'application/pdf', uploadTime: '2025-09-25T11:25:00Z' }
      ],
      data: {
        sampleId: 'PM-ST-2025-004-S1',
        bioburdenCount: 250,
        acceptanceCriteria: '≤ 100 CFU',
        methodology: 'ISO 11737-1',
        comments: 'Contamination detected - resterilization required'
      },
      sharedWith: [
        { stakeholder: 'Precision Medical', email: 'qa@precisionmed.com', sharedDate: '2025-09-25T12:00:00Z', accessLevel: 'full' },
        { stakeholder: 'Sterilization Provider', email: 'operations@steripro.com', sharedDate: '2025-09-25T12:30:00Z', accessLevel: 'results-only' }
      ],
      notifications: [
        { type: 'upload', message: 'Failed test results uploaded', timestamp: '2025-09-25T11:20:00Z' },
        { type: 'alert', message: 'Contamination detected - immediate action required', timestamp: '2025-09-25T11:21:00Z' },
        { type: 'shared', message: 'Failure report shared with stakeholders', timestamp: '2025-09-25T12:00:00Z' }
      ]
    }
  ]);

  // Stakeholder groups for sharing
  const stakeholderGroups = [
    {
      id: 'manufacturers',
      name: 'Manufacturers',
      description: 'Device manufacturers and clients',
      members: [
        { name: 'MedTech Corporation', email: 'qa@medtech.com', role: 'client' },
        { name: 'BioMed Solutions Ltd', email: 'quality@biomed.com', role: 'client' },
        { name: 'Precision Medical', email: 'qa@precisionmed.com', role: 'client' }
      ]
    },
    {
      id: 'sterilization-providers',
      name: 'Sterilization Providers',
      description: 'Sterilization service providers',
      members: [
        { name: 'Sterilization Pro', email: 'operations@steripro.com', role: 'provider' },
        { name: 'Advanced Sterilization', email: 'quality@advancedsteril.com', role: 'provider' }
      ]
    },
    {
      id: 'regulatory',
      name: 'Regulatory Authorities',
      description: 'Regulatory and compliance bodies',
      members: [
        { name: 'Health Authority', email: 'submissions@health.gov', role: 'regulator' },
        { name: 'Quality Assurance Board', email: 'qa@qualityboard.org', role: 'regulator' }
      ]
    },
    {
      id: 'laboratories',
      name: 'Testing Laboratories',
      description: 'Analytical and testing laboratories',
      members: [
        { name: 'AccuTest Laboratories', email: 'results@accutest.com', role: 'lab' },
        { name: 'Precision Analytics', email: 'data@precisionanalytics.com', role: 'lab' }
      ]
    }
  ];

  // New upload form state
  const [newUpload, setNewUpload] = useState({
    workflowId: '',
    testType: '',
    templateUsed: '',
    result: '',
    testDate: '',
    analyst: '',
    reviewer: '',
    files: [],
    data: {},
    shareWith: []
  });

  // Filter test results
  const filteredResults = testResults.filter(result => {
    const matchesSearch = !searchTerm || 
      result.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.deviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.batchNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.testType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || result.status === filterStatus;
    const matchesType = filterType === 'all' || result.testType.toLowerCase().includes(filterType.toLowerCase());
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Handle file upload
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const fileData = files.map(file => ({
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      type: file.type,
      uploadTime: new Date().toISOString(),
      file: file
    }));
    
    setNewUpload(prev => ({
      ...prev,
      files: [...prev.files, ...fileData]
    }));
  };

  // Remove uploaded file
  const removeFile = (index) => {
    setNewUpload(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  // Handle upload submission
  const handleUploadSubmit = () => {
    const upload = {
      id: `TR-${new Date().getFullYear()}-${String(testResults.length + 1).padStart(3, '0')}`,
      ...newUpload,
      status: 'completed',
      uploadDate: new Date().toISOString(),
      lab: 'AccuTest Laboratories', // Current lab
      certificateNumber: newUpload.result === 'Pass' ? 
        `ACC-${new Date().getFullYear()}-${newUpload.testType.substring(0, 2).toUpperCase()}-${String(testResults.length + 1).padStart(3, '0')}` : 
        null,
      expiryDate: newUpload.result === 'Pass' ? 
        new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : 
        null,
      sharedWith: [],
      notifications: [
        { type: 'upload', message: 'Test results uploaded successfully', timestamp: new Date().toISOString() }
      ]
    };
    
    setTestResults(prev => [upload, ...prev]);
    
    // Auto-share with relevant stakeholders
    setTimeout(() => {
      autoShareResults(upload);
    }, 1000);
    
    // Reset form
    setNewUpload({
      workflowId: '',
      testType: '',
      templateUsed: '',
      result: '',
      testDate: '',
      analyst: '',
      reviewer: '',
      files: [],
      data: {},
      shareWith: []
    });
    
    setUploadModal(false);
  };

  // Auto-share results with stakeholders
  const autoShareResults = (result) => {
    const shares = [];
    
    // Share with client (full access)
    const clientStakeholder = stakeholderGroups
      .find(g => g.id === 'manufacturers')
      ?.members.find(m => m.name === result.client);
    
    if (clientStakeholder) {
      shares.push({
        stakeholder: clientStakeholder.name,
        email: clientStakeholder.email,
        sharedDate: new Date().toISOString(),
        accessLevel: 'full'
      });
    }
    
    // Share with sterilization provider (results only)
    const providerStakeholder = stakeholderGroups
      .find(g => g.id === 'sterilization-providers')
      ?.members[0]; // First available provider
    
    if (providerStakeholder) {
      shares.push({
        stakeholder: providerStakeholder.name,
        email: providerStakeholder.email,
        sharedDate: new Date().toISOString(),
        accessLevel: 'results-only'
      });
    }
    
    // Update result with shares
    setTestResults(prev => prev.map(r => 
      r.id === result.id 
        ? { 
            ...r, 
            sharedWith: shares,
            notifications: [
              ...r.notifications,
              { type: 'shared', message: `Results automatically shared with ${shares.length} stakeholders`, timestamp: new Date().toISOString() }
            ]
          }
        : r
    ));
  };

  // Manual sharing function
  const shareResultManually = (resultId, stakeholders) => {
    const shareTime = new Date().toISOString();
    
    setTestResults(prev => prev.map(result => 
      result.id === resultId 
        ? {
            ...result,
            sharedWith: [...result.sharedWith, ...stakeholders.map(s => ({
              ...s,
              sharedDate: shareTime
            }))],
            notifications: [
              ...result.notifications,
              { 
                type: 'shared', 
                message: `Results manually shared with ${stakeholders.length} additional stakeholder(s)`, 
                timestamp: shareTime 
              }
            ]
          }
        : result
    ));
  };

  // Get file type icon
  const getFileIcon = (type) => {
    if (type.includes('pdf')) return '📄';
    if (type.includes('excel') || type.includes('xlsx')) return '📊';
    if (type.includes('word') || type.includes('docx')) return '📝';
    if (type.includes('image')) return '🖼️';
    if (type.includes('zip')) return '📦';
    return '📎';
  };

  // Get status color
  const getStatusColor = (status) => {
    const colors = {
      'completed': '#00aa00',
      'failed': '#ff0000',
      'pending': '#ffaa00',
      'in-review': '#0088ff'
    };
    return colors[status] || '#666666';
  };

  // Get result indicator
  const getResultIndicator = (result) => {
    return result === 'Pass' ? '🟢' : result === 'Fail' ? '🔴' : '🟡';
  };

  return (
    <div className="test-result-sharing-system">
      {/* Header */}
      <div className="trss-header">
        <div className="trss-title-section">
          <h1>🧪 Test Result Sharing System</h1>
          <p>Comprehensive test result management and stakeholder sharing</p>
        </div>
        
        <div className="trss-controls">
          <button 
            className="upload-btn"
            onClick={() => setUploadModal(true)}
          >
            📤 Upload Results
          </button>
          <button 
            className="template-btn"
            onClick={() => setTemplateModal(true)}
          >
            📋 Manage Templates
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="trss-navigation">
        <button 
          className={`nav-tab ${activeTab === 'upload' ? 'active' : ''}`}
          onClick={() => setActiveTab('upload')}
        >
          📤 Upload Center
        </button>
        <button 
          className={`nav-tab ${activeTab === 'results' ? 'active' : ''}`}
          onClick={() => setActiveTab('results')}
        >
          📊 Test Results
        </button>
        <button 
          className={`nav-tab ${activeTab === 'sharing' ? 'active' : ''}`}
          onClick={() => setActiveTab('sharing')}
        >
          📤 Sharing Management
        </button>
        <button 
          className={`nav-tab ${activeTab === 'templates' ? 'active' : ''}`}
          onClick={() => setActiveTab('templates')}
        >
          📋 Report Templates
        </button>
      </div>

      {/* Filters */}
      <div className="trss-filters">
        <div className="filter-group">
          <label>Search:</label>
          <input 
            type="text"
            placeholder="Search results, clients, or batch numbers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-group">
          <label>Status:</label>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
            <option value="pending">Pending</option>
            <option value="in-review">In Review</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>Test Type:</label>
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="all">All Types</option>
            <option value="bioburden">Bioburden Testing</option>
            <option value="sterility">Sterility Testing</option>
            <option value="residue">Chemical Residue</option>
            <option value="endotoxin">Endotoxin Testing</option>
          </select>
        </div>
      </div>

      {/* Upload Center Tab */}
      {activeTab === 'upload' && (
        <div className="upload-center">
          <div className="upload-stats">
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-content">
                <h3>Total Results</h3>
                <div className="stat-value">{testResults.length}</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">🟢</div>
              <div className="stat-content">
                <h3>Passed</h3>
                <div className="stat-value">
                  {testResults.filter(r => r.result === 'Pass').length}
                </div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">🔴</div>
              <div className="stat-content">
                <h3>Failed</h3>
                <div className="stat-value">
                  {testResults.filter(r => r.result === 'Fail').length}
                </div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">📤</div>
              <div className="stat-content">
                <h3>This Week</h3>
                <div className="stat-value">
                  {testResults.filter(r => {
                    const uploadDate = new Date(r.uploadDate);
                    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                    return uploadDate > weekAgo;
                  }).length}
                </div>
              </div>
            </div>
          </div>
          
          <div className="recent-uploads">
            <h3>Recent Uploads</h3>
            <div className="uploads-list">
              {testResults.slice(0, 5).map(result => (
                <div key={result.id} className="upload-item">
                  <div className="upload-info">
                    <div className="upload-header">
                      <strong>{result.client}</strong>
                      <span className="upload-id">{result.id}</span>
                    </div>
                    <div className="upload-details">
                      <span>{result.testType}</span>
                      <span>{result.deviceType}</span>
                      <span>{new Date(result.uploadDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="upload-status">
                    <span 
                      className="result-indicator"
                      style={{ color: getStatusColor(result.status) }}
                    >
                      {getResultIndicator(result.result)} {result.result}
                    </span>
                  </div>
                  
                  <div className="upload-actions">
                    <button onClick={() => setSelectedResult(result)}>
                      👁️ View
                    </button>
                    <button onClick={() => {
                      setSelectedResult(result);
                      setShareModal(true);
                    }}>
                      📤 Share
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Test Results Tab */}
      {activeTab === 'results' && (
        <div className="test-results">
          <div className="results-grid">
            {filteredResults.map(result => (
              <div key={result.id} className={`result-card ${result.status}`}>
                <div className="result-header">
                  <div className="result-id">{result.id}</div>
                  <div className="result-status">
                    <span 
                      className="status-indicator"
                      style={{ color: getStatusColor(result.status) }}
                    >
                      {getResultIndicator(result.result)} {result.result}
                    </span>
                  </div>
                </div>
                
                <div className="result-content">
                  <h4>{result.client}</h4>
                  <p>{result.deviceType}</p>
                  <div className="result-details">
                    <div className="detail-row">
                      <span>Test Type:</span>
                      <span>{result.testType}</span>
                    </div>
                    <div className="detail-row">
                      <span>Batch:</span>
                      <span>{result.batchNumber}</span>
                    </div>
                    <div className="detail-row">
                      <span>Lab:</span>
                      <span>{result.lab}</span>
                    </div>
                    <div className="detail-row">
                      <span>Test Date:</span>
                      <span>{new Date(result.testDate).toLocaleDateString()}</span>
                    </div>
                    <div className="detail-row">
                      <span>Analyst:</span>
                      <span>{result.analyst}</span>
                    </div>
                  </div>
                  
                  {result.certificateNumber && (
                    <div className="certificate-info">
                      <strong>Certificate: {result.certificateNumber}</strong>
                      <span>Expires: {new Date(result.expiryDate).toLocaleDateString()}</span>
                    </div>
                  )}
                  
                  <div className="files-section">
                    <h5>Files ({result.files.length})</h5>
                    <div className="files-list">
                      {result.files.slice(0, 3).map((file, index) => (
                        <div key={index} className="file-item">
                          <span className="file-icon">{getFileIcon(file.type)}</span>
                          <span className="file-name">{file.name}</span>
                          <span className="file-size">{file.size}</span>
                        </div>
                      ))}
                      {result.files.length > 3 && (
                        <div className="more-files">
                          +{result.files.length - 3} more files
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="sharing-info">
                    <span>Shared with {result.sharedWith.length} stakeholder(s)</span>
                  </div>
                </div>
                
                <div className="result-actions">
                  <button onClick={() => setSelectedResult(result)}>
                    👁️ View Details
                  </button>
                  <button onClick={() => {
                    setSelectedResult(result);
                    setShareModal(true);
                  }}>
                    📤 Share
                  </button>
                  <button>
                    📥 Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sharing Management Tab */}
      {activeTab === 'sharing' && (
        <div className="sharing-management">
          <div className="stakeholder-groups">
            <h3>Stakeholder Groups</h3>
            {stakeholderGroups.map(group => (
              <div key={group.id} className="stakeholder-group">
                <div className="group-header">
                  <h4>{group.name}</h4>
                  <span className="member-count">({group.members.length} members)</span>
                </div>
                <p>{group.description}</p>
                
                <div className="group-members">
                  {group.members.map((member, index) => (
                    <div key={index} className="member-item">
                      <div className="member-info">
                        <strong>{member.name}</strong>
                        <span>{member.email}</span>
                      </div>
                      <span className={`role-badge ${member.role}`}>
                        {member.role}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="sharing-activity">
            <h3>Recent Sharing Activity</h3>
            <div className="activity-list">
              {testResults.flatMap(result => 
                result.notifications
                  .filter(n => n.type === 'shared')
                  .map(notification => ({
                    ...notification,
                    resultId: result.id,
                    client: result.client,
                    testType: result.testType
                  }))
              )
              .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
              .slice(0, 10)
              .map((activity, index) => (
                <div key={index} className="activity-item">
                  <div className="activity-icon">📤</div>
                  <div className="activity-content">
                    <div className="activity-message">{activity.message}</div>
                    <div className="activity-details">
                      {activity.client} - {activity.testType} ({activity.resultId})
                    </div>
                    <div className="activity-time">
                      {new Date(activity.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Report Templates Tab */}
      {activeTab === 'templates' && (
        <div className="report-templates">
          <div className="templates-grid">
            {reportTemplates.map(template => (
              <div key={template.id} className="template-card">
                <div className="template-header">
                  <h4>{template.name}</h4>
                  <span className="template-version">v{template.version}</span>
                </div>
                
                <div className="template-content">
                  <div className="template-category">
                    <span className={`category-badge ${template.category}`}>
                      {template.category}
                    </span>
                  </div>
                  
                  <p>{template.description}</p>
                  
                  <div className="template-details">
                    <div className="detail-row">
                      <span>Fields:</span>
                      <span>{template.fields.length}</span>
                    </div>
                    <div className="detail-row">
                      <span>Required:</span>
                      <span>{template.fields.filter(f => f.required).length}</span>
                    </div>
                    <div className="detail-row">
                      <span>Last Updated:</span>
                      <span>{new Date(template.lastUpdated).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="template-actions">
                  <button>👁️ Preview</button>
                  <button>✏️ Edit</button>
                  <button>📄 Use Template</button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="template-actions-section">
            <button className="create-template-btn">
              ➕ Create New Template
            </button>
            <button className="import-template-btn">
              📥 Import Template
            </button>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {uploadModal && (
        <div className="modal-overlay">
          <div className="upload-modal">
            <div className="modal-header">
              <h3>📤 Upload Test Results</h3>
              <button 
                className="close-btn"
                onClick={() => setUploadModal(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="modal-content">
              <form className="upload-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label>Workflow ID *</label>
                    <input 
                      type="text"
                      value={newUpload.workflowId}
                      onChange={(e) => setNewUpload(prev => ({...prev, workflowId: e.target.value}))}
                      placeholder="WF-2025-XXX"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Test Type *</label>
                    <select 
                      value={newUpload.testType}
                      onChange={(e) => setNewUpload(prev => ({...prev, testType: e.target.value}))}
                      required
                    >
                      <option value="">Select Test Type</option>
                      <option value="Bioburden Testing">Bioburden Testing</option>
                      <option value="Sterility Testing">Sterility Testing</option>
                      <option value="Chemical Residue Analysis">Chemical Residue Analysis</option>
                      <option value="Endotoxin Testing">Endotoxin Testing</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Report Template *</label>
                    <select 
                      value={newUpload.templateUsed}
                      onChange={(e) => setNewUpload(prev => ({...prev, templateUsed: e.target.value}))}
                      required
                    >
                      <option value="">Select Template</option>
                      {reportTemplates.map(template => (
                        <option key={template.id} value={template.id}>
                          {template.name} (v{template.version})
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Test Result *</label>
                    <select 
                      value={newUpload.result}
                      onChange={(e) => setNewUpload(prev => ({...prev, result: e.target.value}))}
                      required
                    >
                      <option value="">Select Result</option>
                      <option value="Pass">Pass</option>
                      <option value="Fail">Fail</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Test Date *</label>
                    <input 
                      type="date"
                      value={newUpload.testDate}
                      onChange={(e) => setNewUpload(prev => ({...prev, testDate: e.target.value}))}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Analyst *</label>
                    <input 
                      type="text"
                      value={newUpload.analyst}
                      onChange={(e) => setNewUpload(prev => ({...prev, analyst: e.target.value}))}
                      placeholder="Dr. Name"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Reviewer *</label>
                    <input 
                      type="text"
                      value={newUpload.reviewer}
                      onChange={(e) => setNewUpload(prev => ({...prev, reviewer: e.target.value}))}
                      placeholder="Dr. Name"
                      required
                    />
                  </div>
                </div>
                
                <div className="file-upload-section">
                  <label>Upload Files *</label>
                  <div className="file-upload-area">
                    <input 
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.zip,.jpg,.jpeg,.png"
                    />
                    <div className="upload-instructions">
                      <p>📎 Click to select files or drag and drop</p>
                      <p>Supported formats: PDF, DOC, XLS, ZIP, Images</p>
                    </div>
                  </div>
                  
                  {newUpload.files.length > 0 && (
                    <div className="uploaded-files">
                      <h4>Uploaded Files ({newUpload.files.length})</h4>
                      {newUpload.files.map((file, index) => (
                        <div key={index} className="uploaded-file">
                          <span className="file-icon">{getFileIcon(file.type)}</span>
                          <span className="file-name">{file.name}</span>
                          <span className="file-size">{file.size}</span>
                          <button 
                            type="button"
                            onClick={() => removeFile(index)}
                            className="remove-file-btn"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="form-actions">
                  <button 
                    type="button" 
                    onClick={() => setUploadModal(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="button"
                    onClick={handleUploadSubmit}
                    className="submit-btn"
                    disabled={!newUpload.workflowId || !newUpload.testType || !newUpload.result || newUpload.files.length === 0}
                  >
                    📤 Upload Results
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Result Detail Modal */}
      {selectedResult && !shareModal && (
        <div className="modal-overlay">
          <div className="result-detail-modal">
            <div className="modal-header">
              <h3>📋 Test Result Details - {selectedResult.id}</h3>
              <button 
                className="close-btn"
                onClick={() => setSelectedResult(null)}
              >
                ✕
              </button>
            </div>
            
            <div className="modal-content">
              <div className="detail-sections">
                <div className="detail-section">
                  <h4>Basic Information</h4>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <strong>Client:</strong> {selectedResult.client}
                    </div>
                    <div className="detail-item">
                      <strong>Device Type:</strong> {selectedResult.deviceType}
                    </div>
                    <div className="detail-item">
                      <strong>Batch Number:</strong> {selectedResult.batchNumber}
                    </div>
                    <div className="detail-item">
                      <strong>Test Type:</strong> {selectedResult.testType}
                    </div>
                    <div className="detail-item">
                      <strong>Test Date:</strong> {new Date(selectedResult.testDate).toLocaleDateString()}
                    </div>
                    <div className="detail-item">
                      <strong>Result:</strong>
                      <span style={{ color: getStatusColor(selectedResult.status) }}>
                        {getResultIndicator(selectedResult.result)} {selectedResult.result}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="detail-section">
                  <h4>Testing Information</h4>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <strong>Laboratory:</strong> {selectedResult.lab}
                    </div>
                    <div className="detail-item">
                      <strong>Analyst:</strong> {selectedResult.analyst}
                    </div>
                    <div className="detail-item">
                      <strong>Reviewer:</strong> {selectedResult.reviewer}
                    </div>
                    <div className="detail-item">
                      <strong>Upload Date:</strong> {new Date(selectedResult.uploadDate).toLocaleString()}
                    </div>
                    {selectedResult.certificateNumber && (
                      <>
                        <div className="detail-item">
                          <strong>Certificate:</strong> {selectedResult.certificateNumber}
                        </div>
                        <div className="detail-item">
                          <strong>Expires:</strong> {new Date(selectedResult.expiryDate).toLocaleDateString()}
                        </div>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="detail-section">
                  <h4>Test Data</h4>
                  <div className="test-data">
                    {Object.entries(selectedResult.data).map(([key, value]) => (
                      <div key={key} className="data-item">
                        <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="detail-section">
                  <h4>Files ({selectedResult.files.length})</h4>
                  <div className="files-list">
                    {selectedResult.files.map((file, index) => (
                      <div key={index} className="file-item detailed">
                        <span className="file-icon">{getFileIcon(file.type)}</span>
                        <div className="file-info">
                          <div className="file-name">{file.name}</div>
                          <div className="file-details">
                            {file.size} • Uploaded: {new Date(file.uploadTime).toLocaleString()}
                          </div>
                        </div>
                        <button className="download-btn">📥</button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="detail-section">
                  <h4>Sharing History</h4>
                  <div className="sharing-history">
                    {selectedResult.sharedWith.map((share, index) => (
                      <div key={index} className="share-item">
                        <div className="share-info">
                          <strong>{share.stakeholder}</strong>
                          <span>{share.email}</span>
                        </div>
                        <div className="share-details">
                          <span className={`access-level ${share.accessLevel}`}>
                            {share.accessLevel}
                          </span>
                          <span>{new Date(share.sharedDate).toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {shareModal && selectedResult && (
        <div className="modal-overlay">
          <div className="share-modal">
            <div className="modal-header">
              <h3>📤 Share Test Results - {selectedResult.id}</h3>
              <button 
                className="close-btn"
                onClick={() => setShareModal(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="modal-content">
              <div className="share-options">
                <h4>Select Stakeholders to Share With</h4>
                {stakeholderGroups.map(group => (
                  <div key={group.id} className="stakeholder-group-share">
                    <h5>{group.name}</h5>
                    {group.members.map((member, index) => {
                      const alreadyShared = selectedResult.sharedWith.some(s => s.email === member.email);
                      
                      return (
                        <div key={index} className="member-share-option">
                          <div className="member-info">
                            <strong>{member.name}</strong>
                            <span>{member.email}</span>
                          </div>
                          <div className="share-controls">
                            {alreadyShared ? (
                              <span className="already-shared">✅ Already Shared</span>
                            ) : (
                              <>
                                <select defaultValue="results-only">
                                  <option value="full">Full Access</option>
                                  <option value="results-only">Results Only</option>
                                  <option value="certificate-only">Certificate Only</option>
                                </select>
                                <button 
                                  className="share-btn"
                                  onClick={() => {
                                    shareResultManually(selectedResult.id, [{
                                      stakeholder: member.name,
                                      email: member.email,
                                      accessLevel: 'results-only'
                                    }]);
                                  }}
                                >
                                  📤 Share
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
              
              <div className="share-actions">
                <button onClick={() => setShareModal(false)}>
                  Cancel
                </button>
                <button onClick={() => setShareModal(false)} className="done-btn">
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestResultSharingSystem;