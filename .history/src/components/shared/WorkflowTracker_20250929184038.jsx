import { useState, useEffect } from 'react';
import { mockData } from '../../utils/mockData';

const WorkflowTracker = ({ orderId }) => {
  const [steps, setSteps] = useState(mockData.workflowSteps);

  const getStepIcon = (status) => {
    switch(status) {
      case 'completed':
        return '✓';
      case 'active':
        return '●';
      case 'pending':
        return '○';
      default:
        return '○';
    }
  };

  const getStepClass = (status) => {
    switch(status) {
      case 'completed':
        return 'workflow-step completed';
      case 'active':
        return 'workflow-step active';
      case 'pending':
        return 'workflow-step pending';
      default:
        return 'workflow-step pending';
    }
  };

  return (
    <div className="workflow-tracker">
      <h3 style={{marginBottom: '1.5rem'}}>Order Progress: {orderId}</h3>
      
      <div className="workflow-steps">
        {steps.map((step, index) => (
          <div key={step.id} className={getStepClass(step.status)}>
            <div className="step-indicator">
              <span className="step-icon">{getStepIcon(step.status)}</span>
              <span className="step-number">{step.id}</span>
            </div>
            
            <div className="step-content">
              <h4 className="step-title">{step.name}</h4>
              <p className="step-description">{step.description}</p>
              
              {step.status === 'active' && (
                <div className="progress-bar">
                  <div className="progress-fill" style={{width: '60%'}}></div>
                </div>
              )}
            </div>
            
            {index < steps.length - 1 && (
              <div className={`connector ${step.status === 'completed' ? 'completed' : 'pending'}`}></div>
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        .workflow-tracker {
          background: white;
          border-radius: 10px;
          padding: 1.5rem;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        
        .workflow-steps {
          position: relative;
        }
        
        .workflow-step {
          display: flex;
          align-items: flex-start;
          margin-bottom: 2rem;
          position: relative;
        }
        
        .step-indicator {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-right: 1rem;
          position: relative;
          z-index: 2;
        }
        
        .step-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
        }
        
        .workflow-step.completed .step-icon {
          background: #10b981;
          color: white;
        }
        
        .workflow-step.active .step-icon {
          background: #3b82f6;
          color: white;
          animation: pulse 2s infinite;
        }
        
        .workflow-step.pending .step-icon {
          background: #e5e7eb;
          color: #6b7280;
          border: 2px solid #d1d5db;
        }
        
        .step-number {
          font-size: 0.8rem;
          color: #6b7280;
          font-weight: 500;
        }
        
        .step-content {
          flex: 1;
          padding-top: 0.5rem;
        }
        
        .step-title {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #1e293b;
        }
        
        .step-description {
          color: #64748b;
          font-size: 0.9rem;
          margin: 0;
        }
        
        .workflow-step.active .step-title {
          color: #3b82f6;
        }
        
        .progress-bar {
          background: #e5e7eb;
          height: 4px;
          border-radius: 2px;
          margin-top: 0.5rem;
          overflow: hidden;
        }
        
        .progress-fill {
          background: #3b82f6;
          height: 100%;
          border-radius: 2px;
          transition: width 0.3s ease;
        }
        
        .connector {
          position: absolute;
          left: 20px;
          top: 50px;
          width: 2px;
          height: 40px;
          z-index: 1;
        }
        
        .connector.completed {
          background: #10b981;
        }
        
        .connector.pending {
          background: #e5e7eb;
        }
        
        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
          }
        }
      `}</style>
    </div>
  );
};

export default WorkflowTracker;