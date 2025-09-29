import React, { useState, useEffect } from 'react';

const VisualStatusTracking = () => {
  const [workflows, setWorkflows] = useState([
    {
      id: 1,
      name: 'FDA 510(k) Submission - Surgical Instruments',
      type: 'regulatory',
      priority: 'high',
      startDate: '2025-09-15',
      endDate: '2025-10-30',
      currentStage: 3,
      overallProgress: 65,
      status: 'in-progress',
      stages: [
        {
          id: 1,
          name: 'Documentation Preparation',
          description: 'Gather all required documentation and technical files',
          status: 'completed',
          progress: 100,
          startDate: '2025-09-15',
          endDate: '2025-09-22',
          assignee: 'Dr. Sarah Johnson',
          milestones: [
            { name: 'Technical Files Compiled', status: 'completed', date: '2025-09-18' },
            { name: 'Risk Analysis Complete', status: 'completed', date: '2025-09-20' },
            { name: 'Clinical Data Review', status: 'completed', date: '2025-09-22' }
          ]
        },
        {
          id: 2,
          name: 'Internal Review',
          description: 'Quality assurance and regulatory review',
          status: 'completed',
          progress: 100,
          startDate: '2025-09-23',
          endDate: '2025-09-27',
          assignee: 'Mike Chen',
          milestones: [
            { name: 'QA Review Complete', status: 'completed', date: '2025-09-25' },
            { name: 'Regulatory Review', status: 'completed', date: '2025-09-27' }
          ]
        },
        {
          id: 3,
          name: 'FDA Submission',
          description: 'Submit application to FDA and track progress',
          status: 'in-progress',
          progress: 75,
          startDate: '2025-09-28',
          endDate: '2025-10-05',
          assignee: 'Lisa Rodriguez',
          milestones: [
            { name: 'Application Submitted', status: 'completed', date: '2025-09-28' },
            { name: 'FDA Acknowledgment', status: 'completed', date: '2025-09-30' },
            { name: 'Initial Review', status: 'in-progress', date: '2025-10-05' }
          ]
        },
        {
          id: 4,
          name: 'FDA Review Process',
          description: 'FDA technical review and correspondence',
          status: 'pending',
          progress: 0,
          startDate: '2025-10-06',
          endDate: '2025-10-20',
          assignee: 'Dr. Sarah Johnson',
          milestones: [
            { name: 'Technical Review', status: 'pending', date: '2025-10-10' },
            { name: 'FDA Questions Response', status: 'pending', date: '2025-10-15' }
          ]
        },
        {
          id: 5,
          name: 'Approval & Clearance',
          description: 'Final approval and 510(k) clearance',
          status: 'pending',
          progress: 0,
          startDate: '2025-10-21',
          endDate: '2025-10-30',
          assignee: 'Lisa Rodriguez',
          milestones: [
            { name: 'Clearance Letter', status: 'pending', date: '2025-10-30' }
          ]
        }
      ]
    },
    {
      id: 2,
      name: 'ISO 13485 Certification Renewal',
      type: 'quality',
      priority: 'medium',
      startDate: '2025-09-01',
      endDate: '2025-11-30',
      currentStage: 2,
      overallProgress: 40,
      status: 'in-progress',
      stages: [
        {
          id: 1,
          name: 'Gap Analysis',
          description: 'Analyze current QMS against ISO 13485 requirements',
          status: 'completed',
          progress: 100,
          startDate: '2025-09-01',
          endDate: '2025-09-15',
          assignee: 'Mike Chen',
          milestones: [
            { name: 'Current State Assessment', status: 'completed', date: '2025-09-05' },
            { name: 'Gap Report', status: 'completed', date: '2025-09-15' }
          ]
        },
        {
          id: 2,
          name: 'Documentation Update',
          description: 'Update QMS documentation to address gaps',
          status: 'in-progress',
          progress: 60,
          startDate: '2025-09-16',
          endDate: '2025-10-15',
          assignee: 'Lisa Rodriguez',
          milestones: [
            { name: 'Quality Manual Update', status: 'completed', date: '2025-09-25' },
            { name: 'Procedures Review', status: 'in-progress', date: '2025-10-10' },
            { name: 'Training Materials', status: 'pending', date: '2025-10-15' }
          ]
        },
        {
          id: 3,
          name: 'Internal Audit',
          description: 'Conduct internal audit of updated QMS',
          status: 'pending',
          progress: 0,
          startDate: '2025-10-16',
          endDate: '2025-11-05',
          assignee: 'Dr. Sarah Johnson',
          milestones: [
            { name: 'Audit Planning', status: 'pending', date: '2025-10-20' },
            { name: 'Audit Execution', status: 'pending', date: '2025-10-30' },
            { name: 'Audit Report', status: 'pending', date: '2025-11-05' }
          ]
        },
        {
          id: 4,
          name: 'Certification Audit',
          description: 'External certification body audit',
          status: 'pending',
          progress: 0,
          startDate: '2025-11-06',
          endDate: '2025-11-30',
          assignee: 'Mike Chen',
          milestones: [
            { name: 'Certification Audit', status: 'pending', date: '2025-11-20' },
            { name: 'Certificate Issued', status: 'pending', date: '2025-11-30' }
          ]
        }
      ]
    },
    {
      id: 3,
      name: 'Sterilization Validation Study - Chamber A-101',
      type: 'validation',
      priority: 'urgent',
      startDate: '2025-09-20',
      endDate: '2025-10-15',
      currentStage: 4,
      overallProgress: 85,
      status: 'in-progress',
      stages: [
        {
          id: 1,
          name: 'Protocol Development',
          description: 'Develop validation protocol and test procedures',
          status: 'completed',
          progress: 100,
          startDate: '2025-09-20',
          endDate: '2025-09-22',
          assignee: 'Dr. Sarah Johnson',
          milestones: [
            { name: 'Protocol Draft', status: 'completed', date: '2025-09-21' },
            { name: 'Protocol Approval', status: 'completed', date: '2025-09-22' }
          ]
        },
        {
          id: 2,
          name: 'Installation Qualification',
          description: 'Verify equipment installation and documentation',
          status: 'completed',
          progress: 100,
          startDate: '2025-09-23',
          endDate: '2025-09-25',
          assignee: 'Lisa Rodriguez',
          milestones: [
            { name: 'IQ Testing Complete', status: 'completed', date: '2025-09-25' }
          ]
        },
        {
          id: 3,
          name: 'Operational Qualification',
          description: 'Test equipment functionality and performance',
          status: 'completed',
          progress: 100,
          startDate: '2025-09-26',
          endDate: '2025-09-30',
          assignee: 'Mike Chen',
          milestones: [
            { name: 'OQ Testing Complete', status: 'completed', date: '2025-09-30' }
          ]
        },
        {
          id: 4,
          name: 'Performance Qualification',
          description: 'Validate sterilization effectiveness',
          status: 'in-progress',
          progress: 70,
          startDate: '2025-10-01',
          endDate: '2025-10-10',
          assignee: 'Dr. Sarah Johnson',
          milestones: [
            { name: 'PQ Test Cycles', status: 'completed', date: '2025-10-05' },
            { name: 'Biological Indicators', status: 'in-progress', date: '2025-10-08' },
            { name: 'Data Analysis', status: 'pending', date: '2025-10-10' }
          ]
        },
        {
          id: 5,
          name: 'Report & Approval',
          description: 'Generate validation report and obtain approval',
          status: 'pending',
          progress: 0,
          startDate: '2025-10-11',
          endDate: '2025-10-15',
          assignee: 'Lisa Rodriguez',
          milestones: [
            { name: 'Validation Report', status: 'pending', date: '2025-10-13' },
            { name: 'Final Approval', status: 'pending', date: '2025-10-15' }
          ]
        }
      ]
    }
  ]);

  const [selectedWorkflow, setSelectedWorkflow] = useState(workflows[0]);
  const [viewMode, setViewMode] = useState('timeline');

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#10b981';
      case 'in-progress': return '#3b82f6';
      case 'pending': return '#6b7280';
      case 'delayed': return '#ef4444';
      case 'at-risk': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return '#ef4444';
      case 'high': return '#f59e0b';
      case 'medium': return '#3b82f6';
      case 'low': return '#6b7280';
      default: return '#6b7280';
    }
  };

  // Calculate days remaining
  const getDaysRemaining = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Get milestone status icon
  const getMilestoneIcon = (status) => {
    switch (status) {
      case 'completed': return '✅';
      case 'in-progress': return '🔄';
      case 'pending': return '⏳';
      case 'delayed': return '⚠️';
      default: return '⏳';
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Progress Circle Component
  const ProgressCircle = ({ progress, size = 60, strokeWidth = 6 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
      <svg width={size} height={size} className="progress-circle">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--primary-blue)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy="0.3em"
          fontSize="12"
          fill="var(--text-dark)"
          fontWeight="600"
        >
          {progress}%
        </text>
      </svg>
    );
  };

  return (
    <div className="visual-status-tracking">
      {/* Header */}
      <div className="tracking-header">
        <div className="header-left">
          <h2>Workflow Progress Tracking</h2>
          <span className="workflow-count">{workflows.length} active workflows</span>
        </div>
        <div className="header-right">
          <div className="view-toggle">
            <button
              className={viewMode === 'timeline' ? 'active' : ''}
              onClick={() => setViewMode('timeline')}
            >
              Timeline
            </button>
            <button
              className={viewMode === 'kanban' ? 'active' : ''}
              onClick={() => setViewMode('kanban')}
            >
              Kanban
            </button>
            <button
              className={viewMode === 'dashboard' ? 'active' : ''}
              onClick={() => setViewMode('dashboard')}
            >
              Dashboard
            </button>
          </div>
        </div>
      </div>

      <div className="tracking-layout">
        {/* Sidebar with Workflow List */}
        <div className="workflow-sidebar">
          <h3>Active Workflows</h3>
          <div className="workflow-list">
            {workflows.map(workflow => (
              <div
                key={workflow.id}
                className={`workflow-item ${selectedWorkflow.id === workflow.id ? 'active' : ''}`}
                onClick={() => setSelectedWorkflow(workflow)}
              >
                <div className="workflow-header">
                  <div className="workflow-title">{workflow.name}</div>
                  <div 
                    className="priority-badge"
                    style={{ backgroundColor: getPriorityColor(workflow.priority) }}
                  >
                    {workflow.priority}
                  </div>
                </div>
                <div className="workflow-meta">
                  <span className="workflow-type">{workflow.type}</span>
                  <span className="days-remaining">
                    {getDaysRemaining(workflow.endDate)} days left
                  </span>
                </div>
                <div className="workflow-progress">
                  <ProgressCircle progress={workflow.overallProgress} size={40} strokeWidth={4} />
                  <div className="current-stage">
                    Stage {workflow.currentStage} of {workflow.stages.length}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="tracking-main">
          {viewMode === 'timeline' && (
            <div className="timeline-view">
              <div className="workflow-overview">
                <div className="overview-header">
                  <h3>{selectedWorkflow.name}</h3>
                  <div className="overview-stats">
                    <div className="stat">
                      <label>Overall Progress</label>
                      <ProgressCircle progress={selectedWorkflow.overallProgress} />
                    </div>
                    <div className="stat">
                      <label>Current Stage</label>
                      <div className="stage-info">
                        {selectedWorkflow.currentStage} of {selectedWorkflow.stages.length}
                      </div>
                    </div>
                    <div className="stat">
                      <label>Days Remaining</label>
                      <div className="days-info">
                        {getDaysRemaining(selectedWorkflow.endDate)}
                      </div>
                    </div>
                    <div className="stat">
                      <label>Status</label>
                      <div 
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(selectedWorkflow.status) }}
                      >
                        {selectedWorkflow.status}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="timeline-container">
                  {selectedWorkflow.stages.map((stage, index) => (
                    <div key={stage.id} className={`timeline-stage ${stage.status}`}>
                      <div className="timeline-marker">
                        <div className="marker-circle" style={{ backgroundColor: getStatusColor(stage.status) }}>
                          {stage.status === 'completed' ? '✓' : 
                           stage.status === 'in-progress' ? index + 1 : index + 1}
                        </div>
                        {index < selectedWorkflow.stages.length - 1 && (
                          <div className={`timeline-line ${selectedWorkflow.stages[index + 1].status !== 'pending' ? 'completed' : ''}`} />
                        )}
                      </div>
                      
                      <div className="stage-content">
                        <div className="stage-header">
                          <h4>{stage.name}</h4>
                          <div className="stage-meta">
                            <span className="stage-dates">
                              {formatDate(stage.startDate)} - {formatDate(stage.endDate)}
                            </span>
                            <span className="stage-assignee">👤 {stage.assignee}</span>
                          </div>
                        </div>
                        
                        <p className="stage-description">{stage.description}</p>
                        
                        <div className="stage-progress">
                          <div className="progress-bar">
                            <div 
                              className="progress-fill" 
                              style={{ 
                                width: `${stage.progress}%`,
                                backgroundColor: getStatusColor(stage.status)
                              }}
                            />
                          </div>
                          <span className="progress-text">{stage.progress}%</span>
                        </div>
                        
                        <div className="milestones">
                          <h5>Milestones</h5>
                          <div className="milestone-list">
                            {stage.milestones.map((milestone, milestoneIndex) => (
                              <div key={milestoneIndex} className={`milestone ${milestone.status}`}>
                                <span className="milestone-icon">
                                  {getMilestoneIcon(milestone.status)}
                                </span>
                                <span className="milestone-name">{milestone.name}</span>
                                <span className="milestone-date">
                                  {formatDate(milestone.date)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {viewMode === 'dashboard' && (
            <div className="dashboard-view">
              <div className="dashboard-grid">
                <div className="summary-card">
                  <h4>Workflow Summary</h4>
                  <div className="summary-stats">
                    <div className="summary-stat">
                      <span className="stat-number">{selectedWorkflow.overallProgress}%</span>
                      <span className="stat-label">Complete</span>
                    </div>
                    <div className="summary-stat">
                      <span className="stat-number">{selectedWorkflow.currentStage}</span>
                      <span className="stat-label">Current Stage</span>
                    </div>
                    <div className="summary-stat">
                      <span className="stat-number">{getDaysRemaining(selectedWorkflow.endDate)}</span>
                      <span className="stat-label">Days Left</span>
                    </div>
                  </div>
                </div>
                
                <div className="stages-overview">
                  <h4>Stage Progress</h4>
                  <div className="stages-grid">
                    {selectedWorkflow.stages.map(stage => (
                      <div key={stage.id} className={`stage-card ${stage.status}`}>
                        <div className="stage-card-header">
                          <h5>{stage.name}</h5>
                          <div 
                            className="stage-status"
                            style={{ backgroundColor: getStatusColor(stage.status) }}
                          >
                            {stage.status}
                          </div>
                        </div>
                        <div className="stage-card-progress">
                          <ProgressCircle progress={stage.progress} size={50} strokeWidth={4} />
                        </div>
                        <div className="stage-card-info">
                          <span>👤 {stage.assignee}</span>
                          <span>{formatDate(stage.endDate)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="milestones-overview">
                  <h4>Upcoming Milestones</h4>
                  <div className="upcoming-milestones">
                    {selectedWorkflow.stages
                      .flatMap(stage => stage.milestones)
                      .filter(milestone => milestone.status === 'pending' || milestone.status === 'in-progress')
                      .slice(0, 5)
                      .map((milestone, index) => (
                        <div key={index} className="milestone-item">
                          <span className="milestone-icon">{getMilestoneIcon(milestone.status)}</span>
                          <div className="milestone-info">
                            <span className="milestone-name">{milestone.name}</span>
                            <span className="milestone-date">{formatDate(milestone.date)}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {viewMode === 'kanban' && (
            <div className="kanban-view">
              <div className="kanban-board">
                {['pending', 'in-progress', 'completed'].map(status => (
                  <div key={status} className="kanban-column">
                    <div className="column-header">
                      <h4>{status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}</h4>
                      <span className="stage-count">
                        {selectedWorkflow.stages.filter(stage => stage.status === status).length}
                      </span>
                    </div>
                    <div className="column-content">
                      {selectedWorkflow.stages
                        .filter(stage => stage.status === status)
                        .map(stage => (
                          <div key={stage.id} className="kanban-card">
                            <h5>{stage.name}</h5>
                            <p>{stage.description}</p>
                            <div className="card-progress">
                              <div className="progress-bar">
                                <div 
                                  className="progress-fill" 
                                  style={{ 
                                    width: `${stage.progress}%`,
                                    backgroundColor: getStatusColor(stage.status)
                                  }}
                                />
                              </div>
                              <span>{stage.progress}%</span>
                            </div>
                            <div className="card-footer">
                              <span>👤 {stage.assignee}</span>
                              <span>{formatDate(stage.endDate)}</span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisualStatusTracking;