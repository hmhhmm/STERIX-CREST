import React, { useState, useEffect } from 'react';

const ReportingModule = () => {
  const [reports, setReports] = useState([
    {
      id: 1,
      name: 'Monthly Sterilization Performance',
      type: 'performance',
      category: 'Operations',
      frequency: 'monthly',
      lastGenerated: '2025-09-28T09:30:00',
      nextScheduled: '2025-10-28T09:30:00',
      status: 'completed',
      format: 'pdf',
      recipients: ['operations@company.com', 'quality@company.com'],
      description: 'Comprehensive monthly report on sterilization cycle performance metrics',
      dataPoints: {
        cycles: 245,
        successRate: 98.4,
        avgCycleTime: 4.2,
        chambers: 4
      }
    },
    {
      id: 2,
      name: 'FDA Compliance Dashboard',
      type: 'compliance',
      category: 'Regulatory',
      frequency: 'weekly',
      lastGenerated: '2025-09-27T15:00:00',
      nextScheduled: '2025-10-04T15:00:00',
      status: 'scheduled',
      format: 'excel',
      recipients: ['regulatory@company.com'],
      description: 'Weekly compliance status report for FDA requirements and submissions',
      dataPoints: {
        submissions: 12,
        pending: 3,
        approved: 8,
        compliance: 94.2
      }
    },
    {
      id: 3,
      name: 'Quality Metrics Analysis',
      type: 'quality',
      category: 'Quality Assurance',
      frequency: 'daily',
      lastGenerated: '2025-09-29T08:00:00',
      nextScheduled: '2025-09-30T08:00:00',
      status: 'generating',
      format: 'dashboard',
      recipients: ['qa@company.com', 'management@company.com'],
      description: 'Daily quality metrics including temperature deviations, cycle failures, and corrective actions',
      dataPoints: {
        deviations: 2,
        failures: 1,
        correctives: 3,
        oee: 87.6
      }
    }
  ]);

  const [analytics, setAnalytics] = useState({
    overview: {
      totalCycles: 1247,
      successRate: 97.8,
      avgCycleTime: 4.3,
      activeChambers: 4,
      monthlyTrend: '+12%',
      costPerCycle: 45.60
    },
    performance: {
      cyclesByMonth: [
        { month: 'May', cycles: 198, success: 97.2 },
        { month: 'Jun', cycles: 234, success: 98.1 },
        { month: 'Jul', cycles: 267, success: 97.9 },
        { month: 'Aug', cycles: 289, success: 98.3 },
        { month: 'Sep', cycles: 245, success: 98.4 }
      ],
      chamberUtilization: [
        { chamber: 'A-101', utilization: 89, cycles: 312, downtime: 2.1 },
        { chamber: 'B-202', utilization: 76, cycles: 287, downtime: 1.8 },
        { chamber: 'C-303', utilization: 82, cycles: 298, downtime: 3.2 },
        { chamber: 'D-404', utilization: 71, cycles: 243, downtime: 1.5 }
      ]
    },
    quality: {
      temperatureDeviations: [
        { date: '2025-09-25', chamber: 'A-101', deviation: 2.3, severity: 'minor' },
        { date: '2025-09-27', chamber: 'B-202', deviation: 5.1, severity: 'major' },
        { date: '2025-09-28', chamber: 'C-303', deviation: 1.8, severity: 'minor' }
      ],
      failureAnalysis: {
        mechanical: 35,
        electrical: 20,
        procedural: 30,
        environmental: 15
      }
    },
    compliance: {
      fdaSubmissions: [
        { type: '510(k)', pending: 3, approved: 8, rejected: 1, inReview: 2 },
        { type: 'PMA', pending: 1, approved: 2, rejected: 0, inReview: 1 },
        { type: 'IDE', pending: 0, approved: 3, rejected: 1, inReview: 0 }
      ],
      auditStatus: {
        passed: 15,
        failed: 2,
        pending: 3,
        nextAudit: '2025-11-15'
      }
    }
  });

  const [selectedReport, setSelectedReport] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeTab, setActiveTab] = useState('reports');
  const [newReport, setNewReport] = useState({
    name: '',
    type: 'performance',
    category: 'Operations',
    frequency: 'monthly',
    format: 'pdf',
    recipients: '',
    description: ''
  });

  // Generate report
  const generateReport = (reportId) => {
    setReports(prev => 
      prev.map(report => 
        report.id === reportId 
          ? { ...report, status: 'generating', lastGenerated: new Date().toISOString() }
          : report
      )
    );
    
    // Simulate report generation
    setTimeout(() => {
      setReports(prev => 
        prev.map(report => 
          report.id === reportId 
            ? { ...report, status: 'completed' }
            : report
        )
      );
    }, 3000);
  };

  // Create new report
  const createReport = (e) => {
    e.preventDefault();
    const report = {
      id: Date.now(),
      ...newReport,
      recipients: newReport.recipients.split(',').map(email => email.trim()),
      lastGenerated: null,
      nextScheduled: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'scheduled',
      dataPoints: {}
    };
    
    setReports([...reports, report]);
    setNewReport({
      name: '',
      type: 'performance',
      category: 'Operations',
      frequency: 'monthly',
      format: 'pdf',
      recipients: '',
      description: ''
    });
    setShowCreateModal(false);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#10b981';
      case 'generating': return '#3b82f6';
      case 'scheduled': return '#f59e0b';
      case 'failed': return '#ef4444';
      default: return '#6b7280';
    }
  };

  // Get trend icon
  const getTrendIcon = (trend) => {
    if (trend.startsWith('+')) return '📈';
    if (trend.startsWith('-')) return '📉';
    return '➡️';
  };

  return (
    <div className="reporting-module">
      {/* Header */}
      <div className="reporting-header">
        <div className="header-left">
          <h2>Reports & Analytics</h2>
          <span className="report-count">{reports.length} active reports</span>
        </div>
        <div className="header-right">
          <button
            onClick={() => setShowCreateModal(true)}
            className="create-report-btn"
          >
            + Create Report
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="reporting-tabs">
        <button
          className={activeTab === 'reports' ? 'active' : ''}
          onClick={() => setActiveTab('reports')}
        >
          📊 Reports
        </button>
        <button
          className={activeTab === 'analytics' ? 'active' : ''}
          onClick={() => setActiveTab('analytics')}
        >
          📈 Analytics
        </button>
        <button
          className={activeTab === 'dashboard' ? 'active' : ''}
          onClick={() => setActiveTab('dashboard')}
        >
          🎯 Dashboard
        </button>
      </div>

      {/* Reports Tab */}
      {activeTab === 'reports' && (
        <div className="reports-view">
          <div className="reports-grid">
            {reports.map(report => (
              <div key={report.id} className="report-card">
                <div className="report-header">
                  <div className="report-info">
                    <h4>{report.name}</h4>
                    <span className="report-category">{report.category}</span>
                  </div>
                  <div 
                    className="status-indicator"
                    style={{ backgroundColor: getStatusColor(report.status) }}
                  >
                    {report.status}
                  </div>
                </div>
                
                <p className="report-description">{report.description}</p>
                
                <div className="report-metrics">
                  <div className="frequency-badge">{report.frequency}</div>
                  <div className="format-badge">{report.format}</div>
                </div>
                
                <div className="report-schedule">
                  <div className="schedule-item">
                    <label>Last Generated:</label>
                    <span>{formatDate(report.lastGenerated)}</span>
                  </div>
                  <div className="schedule-item">
                    <label>Next Scheduled:</label>
                    <span>{formatDate(report.nextScheduled)}</span>
                  </div>
                </div>
                
                <div className="report-recipients">
                  <label>Recipients:</label>
                  <div className="recipients-list">
                    {report.recipients.map((email, index) => (
                      <span key={index} className="recipient-tag">{email}</span>
                    ))}
                  </div>
                </div>
                
                <div className="report-actions">
                  <button 
                    onClick={() => generateReport(report.id)}
                    className="generate-btn"
                    disabled={report.status === 'generating'}
                  >
                    {report.status === 'generating' ? 'Generating...' : 'Generate Now'}
                  </button>
                  <button 
                    onClick={() => setSelectedReport(report)}
                    className="view-btn"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="analytics-view">
          <div className="analytics-grid">
            {/* Overview Cards */}
            <div className="overview-section">
              <h3>Performance Overview</h3>
              <div className="overview-cards">
                <div className="metric-card">
                  <div className="metric-value">{analytics.overview.totalCycles}</div>
                  <div className="metric-label">Total Cycles</div>
                  <div className="metric-trend">
                    {getTrendIcon(analytics.overview.monthlyTrend)} {analytics.overview.monthlyTrend}
                  </div>
                </div>
                
                <div className="metric-card">
                  <div className="metric-value">{analytics.overview.successRate}%</div>
                  <div className="metric-label">Success Rate</div>
                  <div className="metric-trend">➡️ Stable</div>
                </div>
                
                <div className="metric-card">
                  <div className="metric-value">{analytics.overview.avgCycleTime}h</div>
                  <div className="metric-label">Avg Cycle Time</div>
                  <div className="metric-trend">📉 -0.2h</div>
                </div>
                
                <div className="metric-card">
                  <div className="metric-value">${analytics.overview.costPerCycle}</div>
                  <div className="metric-label">Cost per Cycle</div>
                  <div className="metric-trend">📈 +$2.10</div>
                </div>
              </div>
            </div>

            {/* Performance Charts */}
            <div className="chart-section">
              <h3>Monthly Performance Trend</h3>
              <div className="chart-container">
                <div className="chart-placeholder">
                  {analytics.performance.cyclesByMonth.map((data, index) => (
                    <div key={index} className="chart-bar">
                      <div className="bar-label">{data.month}</div>
                      <div 
                        className="bar-fill"
                        style={{ 
                          height: `${(data.cycles / 300) * 100}%`,
                          backgroundColor: 'var(--primary-blue)'
                        }}
                      />
                      <div className="bar-value">{data.cycles}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Chamber Utilization */}
            <div className="utilization-section">
              <h3>Chamber Utilization</h3>
              <div className="utilization-list">
                {analytics.performance.chamberUtilization.map(chamber => (
                  <div key={chamber.chamber} className="utilization-item">
                    <div className="chamber-info">
                      <span className="chamber-name">{chamber.chamber}</span>
                      <span className="utilization-percent">{chamber.utilization}%</span>
                    </div>
                    <div className="utilization-bar">
                      <div 
                        className="utilization-fill"
                        style={{ 
                          width: `${chamber.utilization}%`,
                          backgroundColor: chamber.utilization > 80 ? '#10b981' : '#f59e0b'
                        }}
                      />
                    </div>
                    <div className="chamber-stats">
                      <span>{chamber.cycles} cycles</span>
                      <span>{chamber.downtime}h downtime</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quality Metrics */}
            <div className="quality-section">
              <h3>Quality Analysis</h3>
              <div className="quality-metrics">
                <div className="deviations-list">
                  <h4>Recent Deviations</h4>
                  {analytics.quality.temperatureDeviations.map((deviation, index) => (
                    <div key={index} className={`deviation-item ${deviation.severity}`}>
                      <div className="deviation-info">
                        <span className="deviation-chamber">{deviation.chamber}</span>
                        <span className="deviation-value">±{deviation.deviation}°C</span>
                      </div>
                      <div className="deviation-date">{formatDate(deviation.date)}</div>
                      <div className={`severity-badge ${deviation.severity}`}>
                        {deviation.severity}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="failure-analysis">
                  <h4>Failure Analysis</h4>
                  <div className="failure-chart">
                    {Object.entries(analytics.quality.failureAnalysis).map(([type, percentage]) => (
                      <div key={type} className="failure-item">
                        <div className="failure-label">{type}</div>
                        <div className="failure-bar">
                          <div 
                            className="failure-fill"
                            style={{ 
                              width: `${percentage}%`,
                              backgroundColor: `hsl(${(100 - percentage) * 1.2}, 70%, 50%)`
                            }}
                          />
                        </div>
                        <div className="failure-percent">{percentage}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <div className="dashboard-view">
          <div className="dashboard-grid">
            <div className="kpi-section">
              <h3>Key Performance Indicators</h3>
              <div className="kpi-grid">
                <div className="kpi-card success">
                  <div className="kpi-icon">✅</div>
                  <div className="kpi-value">97.8%</div>
                  <div className="kpi-label">Overall Success Rate</div>
                </div>
                
                <div className="kpi-card warning">
                  <div className="kpi-icon">⚠️</div>
                  <div className="kpi-value">3</div>
                  <div className="kpi-label">Active Deviations</div>
                </div>
                
                <div className="kpi-card info">
                  <div className="kpi-icon">🔄</div>
                  <div className="kpi-value">2</div>
                  <div className="kpi-label">Cycles in Progress</div>
                </div>
                
                <div className="kpi-card primary">
                  <div className="kpi-icon">📊</div>
                  <div className="kpi-value">15</div>
                  <div className="kpi-label">Reports Generated</div>
                </div>
              </div>
            </div>

            <div className="compliance-section">
              <h3>Regulatory Compliance</h3>
              <div className="compliance-status">
                {analytics.compliance.fdaSubmissions.map(submission => (
                  <div key={submission.type} className="compliance-item">
                    <h4>{submission.type} Submissions</h4>
                    <div className="submission-stats">
                      <div className="stat approved">
                        <span className="stat-value">{submission.approved}</span>
                        <span className="stat-label">Approved</span>
                      </div>
                      <div className="stat pending">
                        <span className="stat-value">{submission.pending}</span>
                        <span className="stat-label">Pending</span>
                      </div>
                      <div className="stat review">
                        <span className="stat-value">{submission.inReview}</span>
                        <span className="stat-label">In Review</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="alerts-section">
              <h3>Active Alerts</h3>
              <div className="alerts-list">
                <div className="alert-item high">
                  <div className="alert-icon">🔴</div>
                  <div className="alert-content">
                    <div className="alert-title">Chamber B-202 Temperature Anomaly</div>
                    <div className="alert-description">Temperature exceeded threshold by 5.1°C</div>
                    <div className="alert-time">2 hours ago</div>
                  </div>
                </div>
                
                <div className="alert-item medium">
                  <div className="alert-icon">🟡</div>
                  <div className="alert-content">
                    <div className="alert-title">FDA Submission Due Soon</div>
                    <div className="alert-description">510(k) submission deadline in 3 days</div>
                    <div className="alert-time">Today</div>
                  </div>
                </div>
                
                <div className="alert-item low">
                  <div className="alert-icon">🔵</div>
                  <div className="alert-content">
                    <div className="alert-title">Monthly Report Generated</div>
                    <div className="alert-description">Performance report sent to stakeholders</div>
                    <div className="alert-time">Yesterday</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Report Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="create-report-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Create New Report</h3>
              <button onClick={() => setShowCreateModal(false)} className="close-btn">×</button>
            </div>
            
            <form onSubmit={createReport} className="report-form">
              <div className="form-group">
                <label>Report Name</label>
                <input
                  type="text"
                  value={newReport.name}
                  onChange={(e) => setNewReport({...newReport, name: e.target.value})}
                  placeholder="Enter report name"
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Type</label>
                  <select
                    value={newReport.type}
                    onChange={(e) => setNewReport({...newReport, type: e.target.value})}
                  >
                    <option value="performance">Performance</option>
                    <option value="compliance">Compliance</option>
                    <option value="quality">Quality</option>
                    <option value="financial">Financial</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Category</label>
                  <input
                    type="text"
                    value={newReport.category}
                    onChange={(e) => setNewReport({...newReport, category: e.target.value})}
                    placeholder="e.g., Operations, Quality"
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Frequency</label>
                  <select
                    value={newReport.frequency}
                    onChange={(e) => setNewReport({...newReport, frequency: e.target.value})}
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Format</label>
                  <select
                    value={newReport.format}
                    onChange={(e) => setNewReport({...newReport, format: e.target.value})}
                  >
                    <option value="pdf">PDF</option>
                    <option value="excel">Excel</option>
                    <option value="dashboard">Dashboard</option>
                    <option value="csv">CSV</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label>Recipients (comma separated)</label>
                <input
                  type="text"
                  value={newReport.recipients}
                  onChange={(e) => setNewReport({...newReport, recipients: e.target.value})}
                  placeholder="email1@company.com, email2@company.com"
                />
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newReport.description}
                  onChange={(e) => setNewReport({...newReport, description: e.target.value})}
                  placeholder="Describe what this report will contain"
                  rows="3"
                />
              </div>
              
              <div className="form-actions">
                <button type="button" onClick={() => setShowCreateModal(false)} className="cancel-btn">
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Create Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Report Details Modal */}
      {selectedReport && (
        <div className="modal-overlay" onClick={() => setSelectedReport(null)}>
          <div className="report-details-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selectedReport.name}</h3>
              <button onClick={() => setSelectedReport(null)} className="close-btn">×</button>
            </div>
            
            <div className="report-details-content">
              <div className="details-section">
                <h4>Report Information</h4>
                <div className="details-grid">
                  <div className="detail-item">
                    <label>Type:</label>
                    <span>{selectedReport.type}</span>
                  </div>
                  <div className="detail-item">
                    <label>Category:</label>
                    <span>{selectedReport.category}</span>
                  </div>
                  <div className="detail-item">
                    <label>Frequency:</label>
                    <span>{selectedReport.frequency}</span>
                  </div>
                  <div className="detail-item">
                    <label>Format:</label>
                    <span>{selectedReport.format}</span>
                  </div>
                  <div className="detail-item">
                    <label>Status:</label>
                    <span style={{ color: getStatusColor(selectedReport.status) }}>
                      {selectedReport.status}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="details-section">
                <h4>Schedule</h4>
                <div className="schedule-info">
                  <div>Last Generated: {formatDate(selectedReport.lastGenerated)}</div>
                  <div>Next Scheduled: {formatDate(selectedReport.nextScheduled)}</div>
                </div>
              </div>
              
              <div className="details-section">
                <h4>Data Points</h4>
                <div className="data-points">
                  {Object.entries(selectedReport.dataPoints).map(([key, value]) => (
                    <div key={key} className="data-point">
                      <span className="data-label">{key}:</span>
                      <span className="data-value">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="details-actions">
                <button className="primary-btn">Download Latest</button>
                <button className="secondary-btn">Edit Report</button>
                <button className="secondary-btn">View History</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportingModule;