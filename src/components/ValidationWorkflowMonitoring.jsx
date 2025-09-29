import React, { useState, useEffect } from 'react';

const ValidationWorkflowMonitoring = () => {
  const [activeView, setActiveView] = useState('overview'); // 'overview', 'timeline', 'workflow', 'analytics'
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterUrgency, setFilterUrgency] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [realTimeUpdates, setRealTimeUpdates] = useState(true);

  // Workflow stages with detailed tracking
  const workflowStages = [
    {
      id: 'arrival',
      name: 'Device Arrival',
      icon: '📦',
      description: 'Device received and logged',
      estimatedTime: '30 minutes',
      requiredActions: ['Verify shipment', 'Log devices', 'Inspect condition']
    },
    {
      id: 'preparation',
      name: 'Preparation',
      icon: '🧹',
      description: 'Cleaning and preparation for sterilization',
      estimatedTime: '2 hours',
      requiredActions: ['Pre-cleaning', 'Sorting', 'Packaging preparation']
    },
    {
      id: 'sterilization',
      name: 'Sterilization',
      icon: '🔥',
      description: 'Sterilization process execution',
      estimatedTime: '4-8 hours',
      requiredActions: ['Load chamber', 'Execute cycle', 'Monitor parameters']
    },
    {
      id: 'cooling',
      name: 'Cooling & Unload',
      icon: '❄️',
      description: 'Cooling period and chamber unloading',
      estimatedTime: '1-2 hours',
      requiredActions: ['Cool down', 'Unload chamber', 'Visual inspection']
    },
    {
      id: 'sampling',
      name: 'Sample Collection',
      icon: '🧪',
      description: 'Collect samples for testing',
      estimatedTime: '1 hour',
      requiredActions: ['Collect samples', 'Label properly', 'Document collection']
    },
    {
      id: 'shipment',
      name: 'Lab Shipment',
      icon: '🚛',
      description: 'Ship samples to testing laboratory',
      estimatedTime: '1-3 days',
      requiredActions: ['Package samples', 'Arrange transport', 'Track shipment']
    },
    {
      id: 'testing',
      name: 'Laboratory Testing',
      icon: '🔬',
      description: 'Microbiological and chemical testing',
      estimatedTime: '3-7 days',
      requiredActions: ['Receive samples', 'Conduct tests', 'Analyze results']
    },
    {
      id: 'results',
      name: 'Results Review',
      icon: '📊',
      description: 'Test results analysis and validation',
      estimatedTime: '1-2 days',
      requiredActions: ['Review results', 'Validate data', 'Prepare reports']
    },
    {
      id: 'approval',
      name: 'Final Approval',
      icon: '✅',
      description: 'Final approval and certification',
      estimatedTime: '1 day',
      requiredActions: ['Final review', 'Issue certificate', 'Notify stakeholders']
    }
  ];

  // Comprehensive workflow data with detailed tracking
  const [workflows, setWorkflows] = useState([
    {
      id: 'WF-2025-001',
      client: 'MedTech Corporation',
      deviceType: 'Surgical Instruments',
      batchNumber: 'MT-SI-2025-001',
      deviceCount: 150,
      priority: 'standard',
      currentStage: 'testing',
      status: 'in-testing', // 'pending', 'in-progress', 'in-testing', 'passed', 'failed', 'retest'
      startDate: '2025-09-25T08:00:00Z',
      expectedCompletion: '2025-10-05T17:00:00Z',
      actualProgress: 75,
      stages: {
        arrival: { status: 'completed', startTime: '2025-09-25T08:00:00Z', endTime: '2025-09-25T08:30:00Z', notes: 'All devices received in good condition', assignedTo: 'John Smith' },
        preparation: { status: 'completed', startTime: '2025-09-25T09:00:00Z', endTime: '2025-09-25T11:00:00Z', notes: 'Cleaning and packaging completed', assignedTo: 'Sarah Johnson' },
        sterilization: { status: 'completed', startTime: '2025-09-25T12:00:00Z', endTime: '2025-09-25T18:00:00Z', notes: 'Steam sterilization cycle completed successfully', assignedTo: 'Mike Wilson' },
        cooling: { status: 'completed', startTime: '2025-09-25T18:00:00Z', endTime: '2025-09-25T19:30:00Z', notes: 'Cooling completed, visual inspection passed', assignedTo: 'Mike Wilson' },
        sampling: { status: 'completed', startTime: '2025-09-26T08:00:00Z', endTime: '2025-09-26T09:00:00Z', notes: 'Samples collected and labeled', assignedTo: 'Lisa Brown' },
        shipment: { status: 'completed', startTime: '2025-09-26T10:00:00Z', endTime: '2025-09-27T14:00:00Z', notes: 'Shipped to AccuTest Labs via FedEx', assignedTo: 'Tom Davis' },
        testing: { status: 'in-progress', startTime: '2025-09-27T15:00:00Z', endTime: null, notes: 'Microbiological testing in progress', assignedTo: 'Dr. Emily Chen' },
        results: { status: 'pending', startTime: null, endTime: null, notes: '', assignedTo: 'Dr. Emily Chen' },
        approval: { status: 'pending', startTime: null, endTime: null, notes: '', assignedTo: 'QA Manager' }
      },
      alerts: [
        { type: 'info', message: 'Testing proceeding as scheduled', timestamp: '2025-09-29T10:00:00Z' }
      ],
      documents: ['Batch Record', 'Sterilization Certificate', 'Chain of Custody'],
      sterilizationParams: {
        temperature: 121,
        pressure: 15,
        exposure: 15,
        humidity: 95
      }
    },
    {
      id: 'WF-2025-002',
      client: 'BioMed Solutions Ltd',
      deviceType: 'Orthopedic Implants',
      batchNumber: 'BMS-OI-2025-002',
      deviceCount: 75,
      priority: 'high',
      currentStage: 'results',
      status: 'passed',
      startDate: '2025-09-20T10:00:00Z',
      expectedCompletion: '2025-09-30T17:00:00Z',
      actualProgress: 95,
      stages: {
        arrival: { status: 'completed', startTime: '2025-09-20T10:00:00Z', endTime: '2025-09-20T10:30:00Z', notes: 'High-priority batch received', assignedTo: 'John Smith' },
        preparation: { status: 'completed', startTime: '2025-09-20T11:00:00Z', endTime: '2025-09-20T13:30:00Z', notes: 'Extended cleaning for implants', assignedTo: 'Sarah Johnson' },
        sterilization: { status: 'completed', startTime: '2025-09-21T08:00:00Z', endTime: '2025-09-21T16:00:00Z', notes: 'ETO sterilization completed', assignedTo: 'Mike Wilson' },
        cooling: { status: 'completed', startTime: '2025-09-21T16:00:00Z', endTime: '2025-09-22T08:00:00Z', notes: 'Extended aeration period completed', assignedTo: 'Night Shift' },
        sampling: { status: 'completed', startTime: '2025-09-22T09:00:00Z', endTime: '2025-09-22T10:00:00Z', notes: 'Samples collected with extra care', assignedTo: 'Lisa Brown' },
        shipment: { status: 'completed', startTime: '2025-09-22T11:00:00Z', endTime: '2025-09-23T08:00:00Z', notes: 'Express shipment to lab', assignedTo: 'Tom Davis' },
        testing: { status: 'completed', startTime: '2025-09-23T09:00:00Z', endTime: '2025-09-27T17:00:00Z', notes: 'All tests completed successfully', assignedTo: 'Dr. Emily Chen' },
        results: { status: 'in-progress', startTime: '2025-09-28T08:00:00Z', endTime: null, notes: 'Final report preparation', assignedTo: 'Dr. Emily Chen' },
        approval: { status: 'pending', startTime: null, endTime: null, notes: '', assignedTo: 'QA Manager' }
      },
      alerts: [
        { type: 'success', message: 'All tests passed - pending final approval', timestamp: '2025-09-28T16:00:00Z' }
      ],
      documents: ['Batch Record', 'ETO Certificate', 'Biocompatibility Report'],
      sterilizationParams: {
        temperature: 55,
        pressure: 8,
        exposure: 8,
        ethyleneOxide: 600
      }
    },
    {
      id: 'WF-2025-003',
      client: 'Advanced Pharma Labs',
      deviceType: 'Diagnostic Equipment',
      batchNumber: 'APL-DE-2025-003',
      deviceCount: 25,
      priority: 'urgent',
      currentStage: 'sterilization',
      status: 'in-progress',
      startDate: '2025-09-28T06:00:00Z',
      expectedCompletion: '2025-10-08T17:00:00Z',
      actualProgress: 35,
      stages: {
        arrival: { status: 'completed', startTime: '2025-09-28T06:00:00Z', endTime: '2025-09-28T06:20:00Z', notes: 'Urgent priority batch', assignedTo: 'John Smith' },
        preparation: { status: 'completed', startTime: '2025-09-28T07:00:00Z', endTime: '2025-09-28T09:00:00Z', notes: 'Rush preparation completed', assignedTo: 'Sarah Johnson' },
        sterilization: { status: 'in-progress', startTime: '2025-09-28T10:00:00Z', endTime: null, notes: 'Gamma irradiation in progress', assignedTo: 'Mike Wilson' },
        cooling: { status: 'pending', startTime: null, endTime: null, notes: '', assignedTo: 'Mike Wilson' },
        sampling: { status: 'pending', startTime: null, endTime: null, notes: '', assignedTo: 'Lisa Brown' },
        shipment: { status: 'pending', startTime: null, endTime: null, notes: '', assignedTo: 'Tom Davis' },
        testing: { status: 'pending', startTime: null, endTime: null, notes: '', assignedTo: 'Dr. Emily Chen' },
        results: { status: 'pending', startTime: null, endTime: null, notes: '', assignedTo: 'Dr. Emily Chen' },
        approval: { status: 'pending', startTime: null, endTime: null, notes: '', assignedTo: 'QA Manager' }
      },
      alerts: [
        { type: 'warning', message: 'Urgent priority - monitor closely', timestamp: '2025-09-28T06:00:00Z' }
      ],
      documents: ['Batch Record', 'Rush Order Authorization'],
      sterilizationParams: {
        dose: 25,
        rate: 5,
        temperature: 22,
        humidity: 45
      }
    },
    {
      id: 'WF-2025-004',
      client: 'Precision Medical',
      deviceType: 'Surgical Tools',
      batchNumber: 'PM-ST-2025-004',
      deviceCount: 200,
      priority: 'standard',
      currentStage: 'results',
      status: 'retest',
      startDate: '2025-09-15T08:00:00Z',
      expectedCompletion: '2025-10-10T17:00:00Z',
      actualProgress: 85,
      stages: {
        arrival: { status: 'completed', startTime: '2025-09-15T08:00:00Z', endTime: '2025-09-15T08:45:00Z', notes: 'Large batch received', assignedTo: 'John Smith' },
        preparation: { status: 'completed', startTime: '2025-09-15T09:00:00Z', endTime: '2025-09-15T12:00:00Z', notes: 'Extended preparation time', assignedTo: 'Sarah Johnson' },
        sterilization: { status: 'completed', startTime: '2025-09-16T08:00:00Z', endTime: '2025-09-16T16:00:00Z', notes: 'Standard steam cycle', assignedTo: 'Mike Wilson' },
        cooling: { status: 'completed', startTime: '2025-09-16T16:00:00Z', endTime: '2025-09-16T18:00:00Z', notes: 'Normal cooling period', assignedTo: 'Mike Wilson' },
        sampling: { status: 'completed', startTime: '2025-09-17T08:00:00Z', endTime: '2025-09-17T09:30:00Z', notes: 'Multiple sampling points', assignedTo: 'Lisa Brown' },
        shipment: { status: 'completed', startTime: '2025-09-17T10:00:00Z', endTime: '2025-09-18T14:00:00Z', notes: 'Standard shipment', assignedTo: 'Tom Davis' },
        testing: { status: 'completed', startTime: '2025-09-18T15:00:00Z', endTime: '2025-09-25T17:00:00Z', notes: 'Initial test failed - contamination detected', assignedTo: 'Dr. Emily Chen' },
        results: { status: 'completed', startTime: '2025-09-26T08:00:00Z', endTime: '2025-09-26T17:00:00Z', notes: 'Retest required due to contamination', assignedTo: 'Dr. Emily Chen' },
        approval: { status: 'pending', startTime: null, endTime: null, notes: '', assignedTo: 'QA Manager' }
      },
      alerts: [
        { type: 'error', message: 'Contamination detected - retest initiated', timestamp: '2025-09-26T09:00:00Z' },
        { type: 'info', message: 'Resterilization scheduled for Oct 2', timestamp: '2025-09-29T10:00:00Z' }
      ],
      documents: ['Batch Record', 'Failed Test Report', 'Retest Authorization'],
      sterilizationParams: {
        temperature: 121,
        pressure: 15,
        exposure: 15,
        humidity: 95
      }
    }
  ]);

  // Real-time updates simulation
  useEffect(() => {
    if (realTimeUpdates) {
      const interval = setInterval(() => {
        setWorkflows(prev => prev.map(workflow => {
          if (workflow.status === 'in-progress' || workflow.status === 'in-testing') {
            // Simulate progress updates
            const newProgress = Math.min(100, workflow.actualProgress + Math.random() * 2);
            return { ...workflow, actualProgress: newProgress };
          }
          return workflow;
        }));
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [realTimeUpdates]);

  // Filter workflows based on status, urgency, and search
  const filteredWorkflows = workflows.filter(workflow => {
    const matchesStatus = filterStatus === 'all' || workflow.status === filterStatus;
    const matchesUrgency = filterUrgency === 'all' || workflow.priority === filterUrgency;
    const matchesSearch = !searchTerm || 
      workflow.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workflow.deviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workflow.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workflow.batchNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesUrgency && matchesSearch;
  });

  // Get status indicator
  const getStatusIndicator = (status) => {
    const indicators = {
      'pending': { emoji: '⏳', color: '#ffa500', text: 'Pending' },
      'in-progress': { emoji: '🟡', color: '#ffaa00', text: 'In Progress' },
      'in-testing': { emoji: '🟡', color: '#0088ff', text: 'In Testing' },
      'passed': { emoji: '🟢', color: '#00aa00', text: 'Passed' },
      'failed': { emoji: '🔴', color: '#ff0000', text: 'Failed' },
      'retest': { emoji: '🔄', color: '#ff6600', text: 'Retest Required' }
    };
    return indicators[status] || indicators['pending'];
  };

  // Get priority indicator
  const getPriorityIndicator = (priority) => {
    const indicators = {
      'standard': { emoji: '🟢', color: '#00aa00', text: 'Standard' },
      'high': { emoji: '🟡', color: '#ffaa00', text: 'High Priority' },
      'urgent': { emoji: '🔴', color: '#ff0000', text: 'Urgent' }
    };
    return indicators[priority] || indicators['standard'];
  };

  // Calculate stage progress percentage
  const getStageProgress = (workflow, stageId) => {
    const stage = workflow.stages[stageId];
    if (stage.status === 'completed') return 100;
    if (stage.status === 'in-progress') return 50;
    return 0;
  };

  // Calculate overall workflow progress
  const calculateOverallProgress = (workflow) => {
    const stageIds = Object.keys(workflow.stages);
    const completedStages = stageIds.filter(stageId => 
      workflow.stages[stageId].status === 'completed'
    ).length;
    return (completedStages / stageIds.length) * 100;
  };

  // Get estimated completion time
  const getEstimatedCompletion = (workflow) => {
    const now = new Date();
    const expected = new Date(workflow.expectedCompletion);
    const diffHours = (expected - now) / (1000 * 60 * 60);
    
    if (diffHours < 0) {
      return `Overdue by ${Math.abs(diffHours).toFixed(1)} hours`;
    } else if (diffHours < 24) {
      return `${diffHours.toFixed(1)} hours remaining`;
    } else {
      return `${(diffHours / 24).toFixed(1)} days remaining`;
    }
  };

  return (
    <div className="validation-workflow-monitoring">
      {/* Header */}
      <div className="vwm-header">
        <div className="vwm-title-section">
          <h1>🔄 Validation Workflow Monitoring</h1>
          <p>End-to-end tracking of sterilization validation workflows</p>
        </div>
        
        <div className="vwm-controls">
          <div className="view-selector">
            <button 
              className={`view-btn ${activeView === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveView('overview')}
            >
              📊 Overview
            </button>
            <button 
              className={`view-btn ${activeView === 'timeline' ? 'active' : ''}`}
              onClick={() => setActiveView('timeline')}
            >
              📅 Timeline
            </button>
            <button 
              className={`view-btn ${activeView === 'workflow' ? 'active' : ''}`}
              onClick={() => setActiveView('workflow')}
            >
              🔄 Workflow
            </button>
            <button 
              className={`view-btn ${activeView === 'analytics' ? 'active' : ''}`}
              onClick={() => setActiveView('analytics')}
            >
              📈 Analytics
            </button>
          </div>
          
          <button 
            className="real-time-toggle"
            onClick={() => setRealTimeUpdates(!realTimeUpdates)}
          >
            {realTimeUpdates ? '🟢 Live Updates' : '⏸️ Paused'}
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="vwm-filters">
        <div className="filter-group">
          <label>Status Filter:</label>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="in-testing">In Testing</option>
            <option value="passed">Passed</option>
            <option value="failed">Failed</option>
            <option value="retest">Retest Required</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>Priority Filter:</label>
          <select value={filterUrgency} onChange={(e) => setFilterUrgency(e.target.value)}>
            <option value="all">All Priorities</option>
            <option value="standard">Standard</option>
            <option value="high">High Priority</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
        
        <div className="search-group">
          <label>Search:</label>
          <input 
            type="text"
            placeholder="Search by client, device type, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Overview Dashboard */}
      {activeView === 'overview' && (
        <div className="overview-dashboard">
          {/* Key Metrics */}
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-icon">📊</div>
              <div className="metric-content">
                <h3>Total Workflows</h3>
                <div className="metric-value">{workflows.length}</div>
                <div className="metric-change">+2 this week</div>
              </div>
            </div>
            
            <div className="metric-card">
              <div className="metric-icon">🟡</div>
              <div className="metric-content">
                <h3>In Progress</h3>
                <div className="metric-value">
                  {workflows.filter(w => w.status === 'in-progress' || w.status === 'in-testing').length}
                </div>
                <div className="metric-change">Active workflows</div>
              </div>
            </div>
            
            <div className="metric-card">
              <div className="metric-icon">🟢</div>
              <div className="metric-content">
                <h3>Completed</h3>
                <div className="metric-value">
                  {workflows.filter(w => w.status === 'passed').length}
                </div>
                <div className="metric-change">Success rate: 75%</div>
              </div>
            </div>
            
            <div className="metric-card">
              <div className="metric-icon">⚠️</div>
              <div className="metric-content">
                <h3>Issues</h3>
                <div className="metric-value">
                  {workflows.filter(w => w.status === 'failed' || w.status === 'retest').length}
                </div>
                <div className="metric-change">Require attention</div>
              </div>
            </div>
          </div>

          {/* Workflow Cards */}
          <div className="workflows-grid">
            {filteredWorkflows.map(workflow => {
              const statusInfo = getStatusIndicator(workflow.status);
              const priorityInfo = getPriorityIndicator(workflow.priority);
              const overallProgress = calculateOverallProgress(workflow);
              
              return (
                <div 
                  key={workflow.id} 
                  className={`workflow-card ${workflow.priority}`}
                  onClick={() => setSelectedWorkflow(workflow)}
                >
                  <div className="workflow-header">
                    <div className="workflow-id">{workflow.id}</div>
                    <div className="workflow-status">
                      <span 
                        className="status-indicator"
                        style={{ color: statusInfo.color }}
                      >
                        {statusInfo.emoji} {statusInfo.text}
                      </span>
                    </div>
                  </div>
                  
                  <div className="workflow-content">
                    <h4>{workflow.client}</h4>
                    <p>{workflow.deviceType}</p>
                    <div className="device-count">{workflow.deviceCount} devices</div>
                    
                    <div className="workflow-details">
                      <div className="detail-row">
                        <span>Batch:</span>
                        <span>{workflow.batchNumber}</span>
                      </div>
                      <div className="detail-row">
                        <span>Priority:</span>
                        <span style={{ color: priorityInfo.color }}>
                          {priorityInfo.emoji} {priorityInfo.text}
                        </span>
                      </div>
                      <div className="detail-row">
                        <span>Current Stage:</span>
                        <span>{workflowStages.find(s => s.id === workflow.currentStage)?.name}</span>
                      </div>
                    </div>
                    
                    <div className="progress-section">
                      <div className="progress-header">
                        <span>Progress: {overallProgress.toFixed(0)}%</span>
                        <span className="completion-time">{getEstimatedCompletion(workflow)}</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill"
                          style={{ width: `${overallProgress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {workflow.alerts.length > 0 && (
                      <div className="workflow-alerts">
                        {workflow.alerts.slice(0, 2).map((alert, index) => (
                          <div key={index} className={`alert ${alert.type}`}>
                            {alert.message}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Timeline View */}
      {activeView === 'timeline' && (
        <div className="timeline-view">
          <h3>📅 Workflow Timeline</h3>
          
          <div className="timeline-container">
            {filteredWorkflows.map(workflow => (
              <div key={workflow.id} className="timeline-workflow">
                <div className="timeline-header">
                  <h4>{workflow.client} - {workflow.id}</h4>
                  <span className={`priority-badge ${workflow.priority}`}>
                    {getPriorityIndicator(workflow.priority).emoji} {workflow.priority}
                  </span>
                </div>
                
                <div className="timeline-stages">
                  {workflowStages.map((stage, index) => {
                    const stageData = workflow.stages[stage.id];
                    const isActive = workflow.currentStage === stage.id;
                    const isCompleted = stageData.status === 'completed';
                    const isInProgress = stageData.status === 'in-progress';
                    
                    return (
                      <div key={stage.id} className="timeline-stage">
                        <div className={`stage-marker ${isCompleted ? 'completed' : isInProgress ? 'in-progress' : isActive ? 'active' : 'pending'}`}>
                          <span className="stage-icon">{stage.icon}</span>
                          <div className="stage-connector"></div>
                        </div>
                        
                        <div className="stage-content">
                          <h5>{stage.name}</h5>
                          <p>{stage.description}</p>
                          
                          {stageData.startTime && (
                            <div className="stage-times">
                              <div>Started: {new Date(stageData.startTime).toLocaleString()}</div>
                              {stageData.endTime && (
                                <div>Completed: {new Date(stageData.endTime).toLocaleString()}</div>
                              )}
                            </div>
                          )}
                          
                          {stageData.assignedTo && (
                            <div className="stage-assigned">
                              Assigned to: {stageData.assignedTo}
                            </div>
                          )}
                          
                          {stageData.notes && (
                            <div className="stage-notes">
                              Notes: {stageData.notes}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Workflow Details View */}
      {activeView === 'workflow' && (
        <div className="workflow-view">
          <h3>🔄 Workflow Process Map</h3>
          
          <div className="workflow-process-map">
            <div className="process-stages">
              {workflowStages.map((stage, index) => (
                <div key={stage.id} className="process-stage">
                  <div className="stage-header">
                    <div className="stage-icon-large">{stage.icon}</div>
                    <h4>{stage.name}</h4>
                  </div>
                  
                  <div className="stage-details">
                    <p>{stage.description}</p>
                    <div className="estimated-time">
                      ⏱️ {stage.estimatedTime}
                    </div>
                    
                    <div className="required-actions">
                      <h5>Required Actions:</h5>
                      <ul>
                        {stage.requiredActions.map((action, actionIndex) => (
                          <li key={actionIndex}>{action}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {index < workflowStages.length - 1 && (
                    <div className="stage-arrow">→</div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Active Workflows in Each Stage */}
          <div className="stage-workflows">
            <h4>Current Workflows by Stage</h4>
            <div className="stage-columns">
              {workflowStages.map(stage => {
                const stageWorkflows = workflows.filter(w => w.currentStage === stage.id);
                
                return (
                  <div key={stage.id} className="stage-column">
                    <div className="stage-column-header">
                      <span className="stage-icon">{stage.icon}</span>
                      <span className="stage-name">{stage.name}</span>
                      <span className="workflow-count">({stageWorkflows.length})</span>
                    </div>
                    
                    <div className="stage-workflow-list">
                      {stageWorkflows.map(workflow => (
                        <div key={workflow.id} className="stage-workflow-item">
                          <div className="workflow-info">
                            <strong>{workflow.client}</strong>
                            <span>{workflow.id}</span>
                          </div>
                          <div className="workflow-priority">
                            {getPriorityIndicator(workflow.priority).emoji}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Analytics View */}
      {activeView === 'analytics' && (
        <div className="analytics-view">
          <h3>📈 Workflow Analytics</h3>
          
          <div className="analytics-grid">
            {/* Completion Rate */}
            <div className="analytics-card">
              <h4>Completion Rate</h4>
              <div className="completion-chart">
                <div className="chart-bar">
                  <div className="bar passed" style={{height: '75%'}}>
                    <span>75% Passed</span>
                  </div>
                  <div className="bar failed" style={{height: '25%'}}>
                    <span>25% Issues</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Average Processing Time */}
            <div className="analytics-card">
              <h4>Average Processing Time</h4>
              <div className="processing-time">
                <div className="time-metric">
                  <span className="time-value">8.5</span>
                  <span className="time-unit">days</span>
                </div>
                <div className="time-breakdown">
                  <div>Testing: 4.2 days</div>
                  <div>Sterilization: 1.5 days</div>
                  <div>Other: 2.8 days</div>
                </div>
              </div>
            </div>
            
            {/* Priority Distribution */}
            <div className="analytics-card">
              <h4>Priority Distribution</h4>
              <div className="priority-chart">
                <div className="priority-item">
                  <span className="priority-label">🟢 Standard</span>
                  <div className="priority-bar">
                    <div className="priority-fill" style={{width: '60%'}}></div>
                  </div>
                  <span>60%</span>
                </div>
                <div className="priority-item">
                  <span className="priority-label">🟡 High</span>
                  <div className="priority-bar">
                    <div className="priority-fill" style={{width: '30%'}}></div>
                  </div>
                  <span>30%</span>
                </div>
                <div className="priority-item">
                  <span className="priority-label">🔴 Urgent</span>
                  <div className="priority-bar">
                    <div className="priority-fill" style={{width: '10%'}}></div>
                  </div>
                  <span>10%</span>
                </div>
              </div>
            </div>
            
            {/* Stage Performance */}
            <div className="analytics-card full-width">
              <h4>Stage Performance</h4>
              <div className="stage-performance">
                {workflowStages.map(stage => {
                  const avgTime = Math.random() * 48 + 12; // Simulated data
                  const efficiency = Math.random() * 30 + 70; // 70-100%
                  
                  return (
                    <div key={stage.id} className="performance-item">
                      <div className="performance-header">
                        <span className="stage-icon">{stage.icon}</span>
                        <span className="stage-name">{stage.name}</span>
                      </div>
                      <div className="performance-metrics">
                        <div className="metric">
                          <span className="metric-label">Avg Time:</span>
                          <span className="metric-value">{avgTime.toFixed(1)}h</span>
                        </div>
                        <div className="metric">
                          <span className="metric-label">Efficiency:</span>
                          <span className="metric-value">{efficiency.toFixed(0)}%</span>
                        </div>
                      </div>
                      <div className="efficiency-bar">
                        <div 
                          className="efficiency-fill"
                          style={{width: `${efficiency}%`}}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Selected Workflow Detail Modal */}
      {selectedWorkflow && (
        <div className="modal-overlay">
          <div className="workflow-detail-modal">
            <div className="modal-header">
              <h3>📋 Workflow Details - {selectedWorkflow.id}</h3>
              <button 
                className="close-btn"
                onClick={() => setSelectedWorkflow(null)}
              >
                ✕
              </button>
            </div>
            
            <div className="modal-content">
              <div className="detail-section">
                <h4>Basic Information</h4>
                <div className="detail-grid">
                  <div className="detail-item">
                    <strong>Client:</strong> {selectedWorkflow.client}
                  </div>
                  <div className="detail-item">
                    <strong>Device Type:</strong> {selectedWorkflow.deviceType}
                  </div>
                  <div className="detail-item">
                    <strong>Batch Number:</strong> {selectedWorkflow.batchNumber}
                  </div>
                  <div className="detail-item">
                    <strong>Device Count:</strong> {selectedWorkflow.deviceCount}
                  </div>
                  <div className="detail-item">
                    <strong>Priority:</strong>
                    <span style={{ color: getPriorityIndicator(selectedWorkflow.priority).color }}>
                      {getPriorityIndicator(selectedWorkflow.priority).emoji} {selectedWorkflow.priority}
                    </span>
                  </div>
                  <div className="detail-item">
                    <strong>Status:</strong>
                    <span style={{ color: getStatusIndicator(selectedWorkflow.status).color }}>
                      {getStatusIndicator(selectedWorkflow.status).emoji} {selectedWorkflow.status}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="detail-section">
                <h4>Sterilization Parameters</h4>
                <div className="param-grid">
                  {Object.entries(selectedWorkflow.sterilizationParams).map(([key, value]) => (
                    <div key={key} className="param-item">
                      <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                      {key === 'temperature' && '°C'}
                      {key === 'pressure' && ' PSI'}
                      {key === 'exposure' && ' min'}
                      {key === 'humidity' && '%'}
                      {key === 'dose' && ' kGy'}
                      {key === 'rate' && ' kGy/h'}
                      {key === 'ethyleneOxide' && ' mg/L'}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="detail-section">
                <h4>Stage Progress</h4>
                <div className="stage-progress-list">
                  {workflowStages.map(stage => {
                    const stageData = selectedWorkflow.stages[stage.id];
                    const isCompleted = stageData.status === 'completed';
                    const isInProgress = stageData.status === 'in-progress';
                    
                    return (
                      <div key={stage.id} className={`stage-progress-item ${stageData.status}`}>
                        <div className="stage-info">
                          <span className="stage-icon">{stage.icon}</span>
                          <span className="stage-name">{stage.name}</span>
                          <span className={`stage-status ${stageData.status}`}>
                            {stageData.status}
                          </span>
                        </div>
                        
                        {stageData.assignedTo && (
                          <div className="stage-assigned">
                            Assigned to: {stageData.assignedTo}
                          </div>
                        )}
                        
                        {stageData.startTime && (
                          <div className="stage-timing">
                            Started: {new Date(stageData.startTime).toLocaleString()}
                            {stageData.endTime && (
                              <span> | Completed: {new Date(stageData.endTime).toLocaleString()}</span>
                            )}
                          </div>
                        )}
                        
                        {stageData.notes && (
                          <div className="stage-notes">
                            Notes: {stageData.notes}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="detail-section">
                <h4>Documents</h4>
                <div className="document-list">
                  {selectedWorkflow.documents.map((doc, index) => (
                    <div key={index} className="document-item">
                      📄 {doc}
                    </div>
                  ))}
                </div>
              </div>
              
              {selectedWorkflow.alerts.length > 0 && (
                <div className="detail-section">
                  <h4>Alerts & Notifications</h4>
                  <div className="alert-list">
                    {selectedWorkflow.alerts.map((alert, index) => (
                      <div key={index} className={`alert-item ${alert.type}`}>
                        <div className="alert-message">{alert.message}</div>
                        <div className="alert-timestamp">
                          {new Date(alert.timestamp).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ValidationWorkflowMonitoring;