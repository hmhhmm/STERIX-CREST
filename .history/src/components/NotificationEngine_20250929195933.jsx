import React, { useState, useEffect } from 'react';

const NotificationEngine = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'status_change',
      title: 'Sterilization Cycle Completed',
      message: 'Chamber A-101 has completed sterilization cycle SC-2025-0892 for MedTech Corp surgical instruments.',
      priority: 'high',
      status: 'unread',
      timestamp: '2025-09-29T14:30:00',
      category: 'process',
      actionRequired: true,
      relatedEntity: { type: 'chamber', id: 'A-101' },
      channels: ['email', 'sms', 'push']
    },
    {
      id: 2,
      type: 'deadline',
      title: 'FDA Submission Due Soon',
      message: 'FDA 510(k) submission for Surgical Instrument Set A is due in 3 days. Please review and submit.',
      priority: 'urgent',
      status: 'unread',
      timestamp: '2025-09-29T09:15:00',
      category: 'regulatory',
      actionRequired: true,
      relatedEntity: { type: 'document', id: 'FDA-510k-001' },
      channels: ['email', 'push']
    },
    {
      id: 3,
      type: 'alert',
      title: 'Temperature Anomaly Detected',
      message: 'Chamber B-202 temperature exceeded normal range during cycle. Quality check recommended.',
      priority: 'high',
      status: 'read',
      timestamp: '2025-09-28T16:45:00',
      category: 'quality',
      actionRequired: true,
      relatedEntity: { type: 'chamber', id: 'B-202' },
      channels: ['email', 'sms', 'push']
    },
    {
      id: 4,
      type: 'reminder',
      title: 'Monthly Calibration Due',
      message: 'Chamber C-303 is due for monthly calibration check. Schedule maintenance appointment.',
      priority: 'medium',
      status: 'unread',
      timestamp: '2025-09-27T10:20:00',
      category: 'maintenance',
      actionRequired: false,
      relatedEntity: { type: 'chamber', id: 'C-303' },
      channels: ['email']
    },
    {
      id: 5,
      type: 'approval',
      title: 'Document Approved',
      message: 'ISO 13485 Quality Manual v3.0 has been approved by Lisa Rodriguez.',
      priority: 'low',
      status: 'read',
      timestamp: '2025-09-26T14:10:00',
      category: 'document',
      actionRequired: false,
      relatedEntity: { type: 'document', id: 'ISO-QM-3.0' },
      channels: ['push']
    }
  ]);

  const [notificationSettings, setNotificationSettings] = useState({
    email: {
      enabled: true,
      address: 'user@company.com',
      categories: {
        process: true,
        regulatory: true,
        quality: true,
        maintenance: true,
        document: false
      },
      priorities: {
        urgent: true,
        high: true,
        medium: true,
        low: false
      }
    },
    sms: {
      enabled: true,
      number: '+1234567890',
      categories: {
        process: true,
        regulatory: true,
        quality: true,
        maintenance: false,
        document: false
      },
      priorities: {
        urgent: true,
        high: true,
        medium: false,
        low: false
      }
    },
    push: {
      enabled: true,
      categories: {
        process: true,
        regulatory: true,
        quality: true,
        maintenance: true,
        document: true
      },
      priorities: {
        urgent: true,
        high: true,
        medium: true,
        low: true
      }
    }
  });

  const [activeTab, setActiveTab] = useState('all');
  const [showSettings, setShowSettings] = useState(false);
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate new notification every 30 seconds
      if (Math.random() > 0.8) {
        const newNotification = {
          id: Date.now(),
          type: 'status_change',
          title: 'New Process Update',
          message: 'A sterilization process has been updated.',
          priority: 'medium',
          status: 'unread',
          timestamp: new Date().toISOString(),
          category: 'process',
          actionRequired: false,
          relatedEntity: { type: 'process', id: 'P-' + Date.now() },
          channels: ['push']
        };
        setNotifications(prev => [newNotification, ...prev]);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Filter notifications
  const filteredNotifications = notifications.filter(notification => {
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'unread' && notification.status === 'unread') ||
                      (activeTab === 'action' && notification.actionRequired);
    
    const matchesPriority = filterPriority === 'all' || notification.priority === filterPriority;
    const matchesCategory = filterCategory === 'all' || notification.category === filterCategory;
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesTab && matchesPriority && matchesCategory && matchesSearch;
  });

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

  // Get priority icon
  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'urgent': return '🚨';
      case 'high': return '⚠️';
      case 'medium': return 'ℹ️';
      case 'low': return '📝';
      default: return 'ℹ️';
    }
  };

  // Get category icon
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'process': return '⚙️';
      case 'regulatory': return '📋';
      case 'quality': return '✅';
      case 'maintenance': return '🔧';
      case 'document': return '📄';
      default: return '📝';
    }
  };

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, status: 'read' }
          : notification
      )
    );
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, status: 'read' }))
    );
  };

  // Delete notification
  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  // Update notification settings
  const updateSettings = (channel, setting, value) => {
    setNotificationSettings(prev => ({
      ...prev,
      [channel]: {
        ...prev[channel],
        ...setting,
        [setting]: value
      }
    }));
  };

  const unreadCount = notifications.filter(n => n.status === 'unread').length;
  const actionRequiredCount = notifications.filter(n => n.actionRequired && n.status === 'unread').length;

  return (
    <div className="notification-engine">
      {/* Header */}
      <div className="notification-header">
        <div className="header-left">
          <h2>Notification Center</h2>
          <span className="notification-count">
            {unreadCount} unread • {actionRequiredCount} action required
          </span>
        </div>
        <div className="header-right">
          <button
            onClick={markAllAsRead}
            className="mark-read-btn"
            disabled={unreadCount === 0}
          >
            Mark All Read
          </button>
          <button
            onClick={() => setShowSettings(true)}
            className="settings-btn"
          >
            ⚙️ Settings
          </button>
        </div>
      </div>

      {/* Tabs and Filters */}
      <div className="notification-controls">
        <div className="tabs">
          <button
            className={activeTab === 'all' ? 'active' : ''}
            onClick={() => setActiveTab('all')}
          >
            All ({notifications.length})
          </button>
          <button
            className={activeTab === 'unread' ? 'active' : ''}
            onClick={() => setActiveTab('unread')}
          >
            Unread ({unreadCount})
          </button>
          <button
            className={activeTab === 'action' ? 'active' : ''}
            onClick={() => setActiveTab('action')}
          >
            Action Required ({actionRequiredCount})
          </button>
        </div>

        <div className="filters">
          <div className="search-filter">
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filter-group">
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="all">All Priorities</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="process">Process</option>
              <option value="regulatory">Regulatory</option>
              <option value="quality">Quality</option>
              <option value="maintenance">Maintenance</option>
              <option value="document">Document</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="notifications-list">
        {filteredNotifications.map(notification => (
          <div
            key={notification.id}
            className={`notification-item ${notification.status} ${notification.priority}`}
            onClick={() => markAsRead(notification.id)}
          >
            <div className="notification-icon">
              <div className="priority-indicator" style={{ backgroundColor: getPriorityColor(notification.priority) }}>
                {getPriorityIcon(notification.priority)}
              </div>
              <div className="category-icon">
                {getCategoryIcon(notification.category)}
              </div>
            </div>
            
            <div className="notification-content">
              <div className="notification-title">
                {notification.title}
                {notification.actionRequired && <span className="action-badge">Action Required</span>}
              </div>
              <div className="notification-message">{notification.message}</div>
              <div className="notification-meta">
                <span className="timestamp">{formatTimestamp(notification.timestamp)}</span>
                <div className="channels">
                  {notification.channels.map(channel => (
                    <span key={channel} className={`channel ${channel}`}>
                      {channel === 'email' ? '📧' : channel === 'sms' ? '📱' : '🔔'}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="notification-actions">
              {notification.actionRequired && (
                <button className="action-btn primary">Take Action</button>
              )}
              <button
                className="action-btn secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteNotification(notification.id);
                }}
              >
                ✕
              </button>
            </div>
          </div>
        ))}
        
        {filteredNotifications.length === 0 && (
          <div className="no-notifications">
            <div className="empty-state">
              <span className="empty-icon">🔔</span>
              <h3>No notifications found</h3>
              <p>Try adjusting your filters or check back later.</p>
            </div>
          </div>
        )}
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="modal-overlay" onClick={() => setShowSettings(false)}>
          <div className="settings-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Notification Settings</h3>
              <button onClick={() => setShowSettings(false)} className="close-btn">×</button>
            </div>
            
            <div className="settings-content">
              {/* Email Settings */}
              <div className="settings-section">
                <h4>📧 Email Notifications</h4>
                <div className="setting-row">
                  <label>
                    <input
                      type="checkbox"
                      checked={notificationSettings.email.enabled}
                      onChange={(e) => updateSettings('email', 'enabled', e.target.checked)}
                    />
                    Enable email notifications
                  </label>
                </div>
                
                {notificationSettings.email.enabled && (
                  <>
                    <div className="setting-row">
                      <label>Email Address</label>
                      <input
                        type="email"
                        value={notificationSettings.email.address}
                        onChange={(e) => updateSettings('email', 'address', e.target.value)}
                      />
                    </div>
                    
                    <div className="setting-categories">
                      <h5>Categories</h5>
                      {Object.entries(notificationSettings.email.categories).map(([category, enabled]) => (
                        <label key={category}>
                          <input
                            type="checkbox"
                            checked={enabled}
                            onChange={(e) => updateSettings('email', { categories: { ...notificationSettings.email.categories, [category]: e.target.checked } })}
                          />
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </label>
                      ))}
                    </div>
                    
                    <div className="setting-priorities">
                      <h5>Priorities</h5>
                      {Object.entries(notificationSettings.email.priorities).map(([priority, enabled]) => (
                        <label key={priority}>
                          <input
                            type="checkbox"
                            checked={enabled}
                            onChange={(e) => updateSettings('email', { priorities: { ...notificationSettings.email.priorities, [priority]: e.target.checked } })}
                          />
                          {priority.charAt(0).toUpperCase() + priority.slice(1)}
                        </label>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* SMS Settings */}
              <div className="settings-section">
                <h4>📱 SMS Notifications</h4>
                <div className="setting-row">
                  <label>
                    <input
                      type="checkbox"
                      checked={notificationSettings.sms.enabled}
                      onChange={(e) => updateSettings('sms', 'enabled', e.target.checked)}
                    />
                    Enable SMS notifications
                  </label>
                </div>
                
                {notificationSettings.sms.enabled && (
                  <>
                    <div className="setting-row">
                      <label>Phone Number</label>
                      <input
                        type="tel"
                        value={notificationSettings.sms.number}
                        onChange={(e) => updateSettings('sms', 'number', e.target.value)}
                      />
                    </div>
                    
                    <div className="setting-categories">
                      <h5>Categories</h5>
                      {Object.entries(notificationSettings.sms.categories).map(([category, enabled]) => (
                        <label key={category}>
                          <input
                            type="checkbox"
                            checked={enabled}
                            onChange={(e) => updateSettings('sms', { categories: { ...notificationSettings.sms.categories, [category]: e.target.checked } })}
                          />
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </label>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Push Settings */}
              <div className="settings-section">
                <h4>🔔 Push Notifications</h4>
                <div className="setting-row">
                  <label>
                    <input
                      type="checkbox"
                      checked={notificationSettings.push.enabled}
                      onChange={(e) => updateSettings('push', 'enabled', e.target.checked)}
                    />
                    Enable push notifications
                  </label>
                </div>
                
                {notificationSettings.push.enabled && (
                  <div className="setting-categories">
                    <h5>Categories</h5>
                    {Object.entries(notificationSettings.push.categories).map(([category, enabled]) => (
                      <label key={category}>
                        <input
                          type="checkbox"
                          checked={enabled}
                          onChange={(e) => updateSettings('push', { categories: { ...notificationSettings.push.categories, [category]: e.target.checked } })}
                        />
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="settings-actions">
              <button onClick={() => setShowSettings(false)} className="save-settings">
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationEngine;