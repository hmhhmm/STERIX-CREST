import { useState } from 'react';
import { mockData, formatDate } from '../utils/mockData';

const DocumentViewer = ({ orderId }) => {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter documents related to the order
  const orderDocuments = mockData.documents.filter(doc => 
    doc.name.includes(orderId) || orderId === 'all'
  );

  const getDocumentIcon = (type) => {
    switch(type) {
      case 'protocol':
        return '📋';
      case 'report':
        return '📊';
      case 'certificate':
        return '🏆';
      default:
        return '📄';
    }
  };

  const getDocumentTypeColor = (type) => {
    switch(type) {
      case 'protocol':
        return '#3b82f6';
      case 'report':
        return '#10b981';
      case 'certificate':
        return '#f59e0b';
      default:
        return '#6b7280';
    }
  };

  const openDocument = (document) => {
    setSelectedDocument(document);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedDocument(null);
    setIsModalOpen(false);
  };

  const downloadDocument = (document) => {
    // Simulate download
    alert(`Downloading: ${document.name}`);
  };

  return (
    <div className="document-viewer">
      <div className="document-header">
        <h3>Documents & Reports</h3>
        <button className="btn" style={{fontSize: '0.9rem', padding: '0.5rem 1rem'}}>
          Upload Document
        </button>
      </div>

      <div className="document-list">
        {orderDocuments.length === 0 ? (
          <div className="no-documents">
            <p>No documents available</p>
          </div>
        ) : (
          orderDocuments.map(document => (
            <div key={document.id} className="document-item">
              <div className="document-icon">
                {getDocumentIcon(document.type)}
              </div>
              
              <div className="document-info">
                <h4 className="document-name">{document.name}</h4>
                <div className="document-meta">
                  <span 
                    className="document-type"
                    style={{color: getDocumentTypeColor(document.type)}}
                  >
                    {document.type.charAt(0).toUpperCase() + document.type.slice(1)}
                  </span>
                  <span className="separator">•</span>
                  <span className="document-size">{document.size}</span>
                  <span className="separator">•</span>
                  <span className="document-date">{formatDate(document.uploadDate)}</span>
                </div>
                <div className="document-uploader">
                  Uploaded by: {document.uploadedBy}
                </div>
              </div>

              <div className="document-actions">
                <button 
                  className="action-btn view-btn"
                  onClick={() => openDocument(document)}
                >
                  👁️ View
                </button>
                <button 
                  className="action-btn download-btn"
                  onClick={() => downloadDocument(document)}
                >
                  📥 Download
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Document Upload Area */}
      <div className="upload-area">
        <div className="upload-zone">
          <div className="upload-icon">📁</div>
          <p>Drag and drop documents here or <span style={{color: '#3b82f6', cursor: 'pointer'}}>browse files</span></p>
          <small>Supported formats: PDF, DOC, DOCX (Max 10MB)</small>
        </div>
      </div>

      {/* Modal for document preview */}
      {isModalOpen && selectedDocument && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selectedDocument.name}</h3>
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
              <div className="document-preview">
                <div className="preview-placeholder">
                  <div style={{fontSize: '4rem', marginBottom: '1rem'}}>
                    {getDocumentIcon(selectedDocument.type)}
                  </div>
                  <h4>Document Preview</h4>
                  <p>This is a preview placeholder for: {selectedDocument.name}</p>
                  <div className="preview-info">
                    <p><strong>Type:</strong> {selectedDocument.type}</p>
                    <p><strong>Size:</strong> {selectedDocument.size}</p>
                    <p><strong>Uploaded:</strong> {formatDate(selectedDocument.uploadDate)}</p>
                    <p><strong>Uploaded by:</strong> {selectedDocument.uploadedBy}</p>
                  </div>
                  <button 
                    className="btn"
                    onClick={() => downloadDocument(selectedDocument)}
                  >
                    Download Full Document
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .document-viewer {
          background: white;
          border-radius: 10px;
          padding: 1.5rem;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }

        .document-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .document-header h3 {
          margin: 0;
          color: #1e293b;
        }

        .document-list {
          margin-bottom: 2rem;
        }

        .document-item {
          display: flex;
          align-items: center;
          padding: 1rem;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          margin-bottom: 0.75rem;
          transition: all 0.2s ease;
        }

        .document-item:hover {
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .document-icon {
          font-size: 2rem;
          margin-right: 1rem;
        }

        .document-info {
          flex: 1;
        }

        .document-name {
          margin: 0 0 0.5rem 0;
          font-size: 1rem;
          font-weight: 600;
          color: #1e293b;
        }

        .document-meta {
          display: flex;
          align-items: center;
          font-size: 0.85rem;
          color: #64748b;
          margin-bottom: 0.25rem;
        }

        .document-type {
          font-weight: 500;
        }

        .separator {
          margin: 0 0.5rem;
        }

        .document-uploader {
          font-size: 0.8rem;
          color: #94a3b8;
        }

        .document-actions {
          display: flex;
          gap: 0.5rem;
        }

        .action-btn {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 5px;
          padding: 0.5rem 0.75rem;
          cursor: pointer;
          font-size: 0.85rem;
          transition: all 0.2s ease;
        }

        .action-btn:hover {
          background: #e2e8f0;
        }

        .view-btn:hover {
          background: #eff6ff;
          border-color: #3b82f6;
        }

        .download-btn:hover {
          background: #f0fdf4;
          border-color: #10b981;
        }

        .upload-area {
          border: 2px dashed #d1d5db;
          border-radius: 8px;
          padding: 2rem;
          text-align: center;
          background: #f9fafb;
        }

        .upload-zone {
          cursor: pointer;
        }

        .upload-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          opacity: 0.5;
        }

        .upload-zone p {
          margin: 0 0 0.5rem 0;
          color: #6b7280;
        }

        .upload-zone small {
          color: #9ca3af;
        }

        .no-documents {
          text-align: center;
          padding: 2rem;
          color: #94a3b8;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          background: white;
          border-radius: 10px;
          width: 90%;
          max-width: 600px;
          max-height: 80vh;
          overflow-y: auto;
        }

        .modal-header {
          padding: 1.5rem;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-header h3 {
          margin: 0;
          color: #1e293b;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 2rem;
          cursor: pointer;
          color: #6b7280;
          padding: 0;
          line-height: 1;
        }

        .close-btn:hover {
          color: #374151;
        }

        .modal-body {
          padding: 1.5rem;
        }

        .document-preview {
          text-align: center;
        }

        .preview-placeholder {
          padding: 2rem;
          background: #f8fafc;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
        }

        .preview-info {
          background: white;
          padding: 1rem;
          border-radius: 5px;
          margin: 1rem 0;
          text-align: left;
        }

        .preview-info p {
          margin: 0.5rem 0;
          color: #4b5563;
        }
      `}</style>
    </div>
  );
};

export default DocumentViewer;