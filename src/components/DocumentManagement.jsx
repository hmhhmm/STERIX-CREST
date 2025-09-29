import React, { useState, useEffect } from 'react';

const DocumentManagement = () => {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: 'FDA 510(k) Submission - Surgical Instrument Set A',
      type: 'regulatory',
      category: 'FDA Submission',
      version: '2.1',
      size: '2.4 MB',
      uploadedBy: 'Dr. Sarah Johnson',
      uploadedDate: '2025-09-25T14:30:00',
      lastModified: '2025-09-28T09:15:00',
      status: 'approved',
      tags: ['FDA', 'surgical', 'instruments', 'sterilization'],
      accessLevel: 'restricted',
      downloadCount: 23,
      auditTrail: [
        { action: 'uploaded', user: 'Dr. Sarah Johnson', date: '2025-09-25T14:30:00' },
        { action: 'reviewed', user: 'Mike Chen', date: '2025-09-26T10:20:00' },
        { action: 'approved', user: 'Lisa Rodriguez', date: '2025-09-28T09:15:00' }
      ]
    },
    {
      id: 2,
      name: 'ISO 13485 Quality Manual v3.0',
      type: 'standard',
      category: 'Quality Management',
      version: '3.0',
      size: '5.7 MB',
      uploadedBy: 'Mike Chen',
      uploadedDate: '2025-09-20T11:45:00',
      lastModified: '2025-09-27T16:30:00',
      status: 'draft',
      tags: ['ISO', 'quality', 'manual', 'QMS'],
      accessLevel: 'public',
      downloadCount: 67,
      auditTrail: [
        { action: 'uploaded', user: 'Mike Chen', date: '2025-09-20T11:45:00' },
        { action: 'edited', user: 'Mike Chen', date: '2025-09-22T14:10:00' },
        { action: 'reviewed', user: 'Dr. Sarah Johnson', date: '2025-09-27T16:30:00' }
      ]
    },
    {
      id: 3,
      name: 'Sterilization Validation Protocol SV-2025-001',
      type: 'protocol',
      category: 'Validation',
      version: '1.3',
      size: '1.8 MB',
      uploadedBy: 'Lisa Rodriguez',
      uploadedDate: '2025-09-18T08:20:00',
      lastModified: '2025-09-29T13:45:00',
      status: 'in-review',
      tags: ['validation', 'sterilization', 'protocol', 'testing'],
      accessLevel: 'confidential',
      downloadCount: 12,
      auditTrail: [
        { action: 'uploaded', user: 'Lisa Rodriguez', date: '2025-09-18T08:20:00' },
        { action: 'edited', user: 'Lisa Rodriguez', date: '2025-09-24T12:30:00' },
        { action: 'submitted', user: 'Lisa Rodriguez', date: '2025-09-29T13:45:00' }
      ]
    }
  ]);

  const [folders, setFolders] = useState([
    { id: 1, name: 'FDA Submissions', documentCount: 15, parentId: null },
    { id: 2, name: 'ISO Standards', documentCount: 8, parentId: null },
    { id: 3, name: 'Validation Protocols', documentCount: 23, parentId: null },
    { id: 4, name: 'Test Reports', documentCount: 45, parentId: null },
    { id: 5, name: 'Training Materials', documentCount: 12, parentId: null },
    { id: 6, name: 'Audit Reports', documentCount: 7, parentId: null }
  ]);

  const [selectedFolder, setSelectedFolder] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('lastModified');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [newDocument, setNewDocument] = useState({
    name: '',
    type: 'document',
    category: '',
    tags: '',
    accessLevel: 'public',
    file: null
  });

  // Filter and sort documents
  const filteredDocuments = documents
    .filter(doc => {
      const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesType = filterType === 'all' || doc.type === filterType;
      const matchesStatus = filterStatus === 'all' || doc.status === filterStatus;
      return matchesSearch && matchesType && matchesStatus;
    })
    .sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      const multiplier = sortOrder === 'asc' ? 1 : -1;
      
      if (sortBy === 'lastModified' || sortBy === 'uploadedDate') {
        return (new Date(aValue) - new Date(bValue)) * multiplier;
      }
      
      return aValue.localeCompare(bValue) * multiplier;
    });

  // Handle file upload
  const handleFileUpload = (e) => {
    e.preventDefault();
    
    const document = {
      id: Date.now(),
      ...newDocument,
      tags: newDocument.tags.split(',').map(tag => tag.trim()),
      version: '1.0',
      size: newDocument.file ? `${(newDocument.file.size / 1024 / 1024).toFixed(1)} MB` : '0 MB',
      uploadedBy: 'Current User',
      uploadedDate: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      status: 'draft',
      downloadCount: 0,
      auditTrail: [
        { action: 'uploaded', user: 'Current User', date: new Date().toISOString() }
      ]
    };
    
    setDocuments([...documents, document]);
    setNewDocument({
      name: '',
      type: 'document',
      category: '',
      tags: '',
      accessLevel: 'public',
      file: null
    });
    setShowUploadModal(false);
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'var(--secondary-green)';
      case 'draft': return 'var(--text-light)';
      case 'in-review': return 'var(--secondary-orange)';
      case 'rejected': return 'var(--danger-red)';
      default: return 'var(--text-light)';
    }
  };

  // Get access level icon
  const getAccessLevelIcon = (level) => {
    switch (level) {
      case 'public': return '🌐';
      case 'restricted': return '🔒';
      case 'confidential': return '🔐';
      default: return '📄';
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="document-management">
      {/* Header */}
      <div className="document-header">
        <div className="header-left">
          <h2>Document Management</h2>
          <span className="document-count">{filteredDocuments.length} documents</span>
        </div>
        <div className="header-right">
          <button
            onClick={() => setShowUploadModal(true)}
            className="upload-btn"
          >
            + Upload Document
          </button>
          <div className="view-toggle">
            <button
              className={viewMode === 'grid' ? 'active' : ''}
              onClick={() => setViewMode('grid')}
            >
              ⊞
            </button>
            <button
              className={viewMode === 'list' ? 'active' : ''}
              onClick={() => setViewMode('list')}
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      <div className="document-layout">
        {/* Sidebar */}
        <div className="document-sidebar">
          <div className="search-section">
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filters-section">
            <h4>Filters</h4>
            
            <div className="filter-group">
              <label>Type</label>
              <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                <option value="all">All Types</option>
                <option value="regulatory">Regulatory</option>
                <option value="standard">Standard</option>
                <option value="protocol">Protocol</option>
                <option value="report">Report</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Status</label>
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="in-review">In Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Sort By</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="lastModified">Last Modified</option>
                <option value="name">Name</option>
                <option value="uploadedDate">Upload Date</option>
                <option value="size">Size</option>
              </select>
              <div className="sort-order">
                <button
                  className={sortOrder === 'asc' ? 'active' : ''}
                  onClick={() => setSortOrder('asc')}
                >
                  ↑
                </button>
                <button
                  className={sortOrder === 'desc' ? 'active' : ''}
                  onClick={() => setSortOrder('desc')}
                >
                  ↓
                </button>
              </div>
            </div>
          </div>

          <div className="folders-section">
            <h4>Folders</h4>
            <div className="folders-list">
              {folders.map(folder => (
                <div
                  key={folder.id}
                  className={`folder-item ${selectedFolder === folder.id ? 'active' : ''}`}
                  onClick={() => setSelectedFolder(folder.id)}
                >
                  <span className="folder-icon">📁</span>
                  <div className="folder-info">
                    <span className="folder-name">{folder.name}</span>
                    <span className="document-count">{folder.documentCount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="document-main">
          <div className={`documents-${viewMode}`}>
            {filteredDocuments.map(doc => (
              <div
                key={doc.id}
                className="document-item"
                onClick={() => setSelectedDocument(doc)}
              >
                <div className="document-icon">
                  {getAccessLevelIcon(doc.accessLevel)}
                </div>
                
                <div className="document-info">
                  <h4 className="document-name">{doc.name}</h4>
                  <div className="document-meta">
                    <span className="document-type">{doc.type}</span>
                    <span className="document-version">v{doc.version}</span>
                    <span className="document-size">{doc.size}</span>
                  </div>
                  
                  <div className="document-details">
                    <span className="upload-info">
                      by {doc.uploadedBy} • {formatDate(doc.uploadedDate)}
                    </span>
                    <div
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(doc.status) }}
                    >
                      {doc.status}
                    </div>
                  </div>
                  
                  <div className="document-tags">
                    {doc.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                  
                  <div className="document-stats">
                    <span>↓ {doc.downloadCount} downloads</span>
                    <span>Last modified: {formatDate(doc.lastModified)}</span>
                  </div>
                </div>
                
                <div className="document-actions">
                  <button className="action-btn download">Download</button>
                  <button 
                    className="action-btn version"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowVersionHistory(doc);
                    }}
                  >
                    History
                  </button>
                  <button className="action-btn more">⋯</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="modal-overlay" onClick={() => setShowUploadModal(false)}>
          <div className="upload-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Upload Document</h3>
              <button onClick={() => setShowUploadModal(false)} className="close-btn">×</button>
            </div>
            
            <form onSubmit={handleFileUpload} className="upload-form">
              <div className="form-group">
                <label>Document Name</label>
                <input
                  type="text"
                  value={newDocument.name}
                  onChange={(e) => setNewDocument({...newDocument, name: e.target.value})}
                  placeholder="Enter document name"
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Type</label>
                  <select
                    value={newDocument.type}
                    onChange={(e) => setNewDocument({...newDocument, type: e.target.value})}
                  >
                    <option value="document">Document</option>
                    <option value="regulatory">Regulatory</option>
                    <option value="standard">Standard</option>
                    <option value="protocol">Protocol</option>
                    <option value="report">Report</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Access Level</label>
                  <select
                    value={newDocument.accessLevel}
                    onChange={(e) => setNewDocument({...newDocument, accessLevel: e.target.value})}
                  >
                    <option value="public">Public</option>
                    <option value="restricted">Restricted</option>
                    <option value="confidential">Confidential</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label>Category</label>
                <input
                  type="text"
                  value={newDocument.category}
                  onChange={(e) => setNewDocument({...newDocument, category: e.target.value})}
                  placeholder="e.g., FDA Submission, Quality Manual"
                />
              </div>
              
              <div className="form-group">
                <label>Tags (comma separated)</label>
                <input
                  type="text"
                  value={newDocument.tags}
                  onChange={(e) => setNewDocument({...newDocument, tags: e.target.value})}
                  placeholder="e.g., FDA, sterilization, validation"
                />
              </div>
              
              <div className="form-group">
                <label>File</label>
                <input
                  type="file"
                  onChange={(e) => setNewDocument({...newDocument, file: e.target.files[0]})}
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                  required
                />
              </div>
              
              <div className="form-actions">
                <button type="button" onClick={() => setShowUploadModal(false)} className="cancel-btn">
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Upload Document
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Version History Modal */}
      {showVersionHistory && (
        <div className="modal-overlay" onClick={() => setShowVersionHistory(false)}>
          <div className="version-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Version History - {showVersionHistory.name}</h3>
              <button onClick={() => setShowVersionHistory(false)} className="close-btn">×</button>
            </div>
            
            <div className="version-content">
              <div className="version-list">
                {showVersionHistory.auditTrail.map((entry, index) => (
                  <div key={index} className="version-entry">
                    <div className="version-icon">
                      {entry.action === 'uploaded' ? '⬆️' :
                       entry.action === 'edited' ? '✏️' :
                       entry.action === 'reviewed' ? '👁️' :
                       entry.action === 'approved' ? '✅' : '📝'}
                    </div>
                    <div className="version-info">
                      <div className="version-action">
                        <strong>{entry.action.charAt(0).toUpperCase() + entry.action.slice(1)}</strong>
                        by {entry.user}
                      </div>
                      <div className="version-date">{formatDate(entry.date)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Document Details Panel */}
      {selectedDocument && (
        <div className="document-details-panel">
          <div className="panel-header">
            <h3>{selectedDocument.name}</h3>
            <button onClick={() => setSelectedDocument(null)} className="close-panel">×</button>
          </div>
          
          <div className="panel-content">
            <div className="detail-section">
              <h4>Document Information</h4>
              <div className="detail-grid">
                <div className="detail-item">
                  <label>Version:</label>
                  <span>v{selectedDocument.version}</span>
                </div>
                <div className="detail-item">
                  <label>Size:</label>
                  <span>{selectedDocument.size}</span>
                </div>
                <div className="detail-item">
                  <label>Type:</label>
                  <span>{selectedDocument.type}</span>
                </div>
                <div className="detail-item">
                  <label>Status:</label>
                  <span style={{ color: getStatusColor(selectedDocument.status) }}>
                    {selectedDocument.status}
                  </span>
                </div>
                <div className="detail-item">
                  <label>Access Level:</label>
                  <span>{selectedDocument.accessLevel}</span>
                </div>
                <div className="detail-item">
                  <label>Downloads:</label>
                  <span>{selectedDocument.downloadCount}</span>
                </div>
              </div>
            </div>
            
            <div className="detail-section">
              <h4>Tags</h4>
              <div className="tags-display">
                {selectedDocument.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
            
            <div className="detail-section">
              <h4>Audit Trail</h4>
              <div className="audit-trail">
                {selectedDocument.auditTrail.map((entry, index) => (
                  <div key={index} className="audit-entry">
                    <strong>{entry.action}</strong> by {entry.user} on {formatDate(entry.date)}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="panel-actions">
              <button className="primary-btn">Download</button>
              <button className="secondary-btn">Share</button>
              <button className="secondary-btn">Edit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentManagement;