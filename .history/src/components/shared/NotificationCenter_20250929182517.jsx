import { useState } from 'react';
import { mockData, formatDateTime } from '../utils/mockData';

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState(mockData.notifications);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (notificationId) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification => ({ ...notification, read: true }))
    );
  };

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'success':
        return '✅';
      case 'warning':
        return '⚠️';
      case 'error':
        return '❌';
      default:
        return 'ℹ️';
    }
  };

  const getNotificationClass = (type, read) => {
    const baseClass = 'notification-item';
    const typeClass = `notification-${type}`;
    const readClass = read ? 'read' : 'unread';
    return `${baseClass} ${typeClass} ${readClass}`;
  };

  return (
    <div className="notification-center">
      <button 
        className="notification-trigger" 
        onClick={() => setIsOpen(!isOpen)}
      >
        🔔
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount}</span>
        )}
      </button>

      {isOpen && (
        <div className="notification-dropdown">
          <div className="notification-header">
            <h3>Notifications</h3>
            {unreadCount > 0 && (
              <button 
                className="mark-all-read"
                onClick={markAllAsRead}
              >
                Mark all read
              </button>
            )}
          </div>

          <div className="notification-list">
            {notifications.length === 0 ? (
              <div className="no-notifications">
                <p>No notifications</p>
              </div>
            ) : (
              notifications.map(notification => (
                <div
                  key={notification.id}
                  className={getNotificationClass(notification.type, notification.read)}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="notification-icon">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="notification-content">
                    <h4>{notification.title}</h4>
                    <p>{notification.message}</p>
                    <small>{formatDateTime(notification.timestamp)}</small>
                  </div>
                  {!notification.read && (
                    <div className="unread-indicator"></div>
                  )}
                </div>
              ))
            )}
          </div>

          <div className="notification-footer">
            <button className="view-all-btn">View All Notifications</button>
          </div>
        </div>
      )}

      <style jsx>{`
        .notification-center {
          position: relative;
          display: inline-block;
        }

        .notification-trigger {
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: white;
          padding: 0.5rem;
          border-radius: 50%;
          cursor: pointer;
          font-size: 1.2rem;
          position: relative;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .notification-trigger:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .notification-badge {
          position: absolute;
          top: -5px;
          right: -5px;
          background: #ef4444;
          color: white;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: bold;
        }

        .notification-dropdown {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          width: 350px;
          background: white;
          border-radius: 10px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          border: 1px solid #e2e8f0;
          z-index: 1000;
          max-height: 500px;
          overflow-y: auto;
        }

        .notification-header {
          padding: 1rem;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .notification-header h3 {
          margin: 0;
          color: #1e293b;
          font-size: 1.1rem;
        }

        .mark-all-read {
          background: none;
          border: none;
          color: #3b82f6;
          cursor: pointer;
          font-size: 0.9rem;
          text-decoration: underline;
        }

        .notification-list {
          max-height: 300px;
          overflow-y: auto;
        }

        .notification-item {
          padding: 1rem;
          border-bottom: 1px solid #f1f5f9;
          display: flex;
          align-items: flex-start;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .notification-item:hover {
          background: #f8fafc;
        }

        .notification-item.unread {
          background: #eff6ff;
        }

        .notification-icon {
          margin-right: 0.75rem;
          font-size: 1.2rem;
          flex-shrink: 0;
        }

        .notification-content {
          flex: 1;
        }

        .notification-content h4 {
          margin: 0 0 0.25rem 0;
          font-size: 0.95rem;
          font-weight: 600;
          color: #1e293b;
        }

        .notification-content p {
          margin: 0 0 0.5rem 0;
          font-size: 0.85rem;
          color: #64748b;
          line-height: 1.4;
        }

        .notification-content small {
          color: #94a3b8;
          font-size: 0.75rem;
        }

        .unread-indicator {
          width: 8px;
          height: 8px;
          background: #3b82f6;
          border-radius: 50%;
          margin-left: 0.5rem;
          margin-top: 0.25rem;
          flex-shrink: 0;
        }

        .no-notifications {
          padding: 2rem;
          text-align: center;
          color: #94a3b8;
        }

        .notification-footer {
          padding: 0.75rem;
          border-top: 1px solid #e2e8f0;
          text-align: center;
        }

        .view-all-btn {
          background: none;
          border: none;
          color: #3b82f6;
          cursor: pointer;
          font-size: 0.9rem;
          text-decoration: underline;
          width: 100%;
          padding: 0.5rem;
        }

        .view-all-btn:hover {
          background: #f8fafc;
        }
      `}</style>
    </div>
  );
};

export default NotificationCenter;