import React, { useState, useEffect } from 'react';

const ChamberAvailabilityBooking = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('calendar'); // 'calendar', 'slots', 'timeline'
  const [selectedChamber, setSelectedChamber] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [realTimeUpdates, setRealTimeUpdates] = useState(true);

  // Enhanced chamber data with real-time status
  const [chambers, setChambers] = useState([
    { 
      id: 1, 
      name: 'Chamber A-101', 
      capacity: 'Large (500L)', 
      type: 'Steam Sterilization',
      status: 'available',
      currentTemp: 121,
      currentPressure: 15,
      lastMaintenance: '2025-09-15',
      nextMaintenance: '2025-10-15',
      location: 'Building A, Floor 1'
    },
    { 
      id: 2, 
      name: 'Chamber B-202', 
      capacity: 'Medium (300L)', 
      type: 'ETO Sterilization',
      status: 'in-use',
      currentTemp: 55,
      currentPressure: 8,
      lastMaintenance: '2025-09-20',
      nextMaintenance: '2025-10-20',
      location: 'Building B, Floor 2'
    },
    { 
      id: 3, 
      name: 'Chamber C-303', 
      capacity: 'Small (150L)', 
      type: 'Gamma Irradiation',
      status: 'maintenance',
      currentTemp: 22,
      currentPressure: 0,
      lastMaintenance: '2025-09-28',
      nextMaintenance: '2025-10-28',
      location: 'Building C, Floor 3'
    },
    { 
      id: 4, 
      name: 'Chamber D-404', 
      capacity: 'Large (600L)', 
      type: 'Steam Sterilization',
      status: 'available',
      currentTemp: 125,
      currentPressure: 16,
      lastMaintenance: '2025-09-10',
      nextMaintenance: '2025-10-10',
      location: 'Building D, Floor 4'
    }
  ]);

  // Enhanced booking system with detailed tracking
  const [bookings, setBookings] = useState([
    {
      id: 1,
      chamberId: 1,
      date: '2025-09-29',
      startTime: '09:00',
      endTime: '12:00',
      client: 'MedTech Corporation',
      contact: 'john.doe@medtech.com',
      phone: '+1-555-0123',
      status: 'confirmed',
      deviceType: 'Surgical Instruments',
      deviceCount: 150,
      urgency: 'standard',
      sterilizationType: 'standard',
      specialInstructions: 'Handle with extra care',
      bookingReference: 'MTK-2025-001',
      createdAt: '2025-09-25T10:30:00Z',
      updatedAt: '2025-09-26T14:20:00Z'
    },
    {
      id: 2,
      chamberId: 2,
      date: '2025-09-29',
      startTime: '14:00',
      endTime: '18:00',
      client: 'BioMed Solutions Ltd',
      contact: 'sarah.smith@biomed.com',
      phone: '+1-555-0456',
      status: 'pending',
      deviceType: 'Orthopedic Implants',
      deviceCount: 75,
      urgency: 'high',
      sterilizationType: 'extended',
      specialInstructions: 'Temperature sensitive materials',
      bookingReference: 'BMS-2025-002',
      createdAt: '2025-09-27T09:15:00Z',
      updatedAt: '2025-09-28T11:45:00Z'
    },
    {
      id: 3,
      chamberId: 1,
      date: '2025-09-30',
      startTime: '08:00',
      endTime: '11:00',
      client: 'Advanced Pharma Labs',
      contact: 'mike.johnson@pharmalab.com',
      phone: '+1-555-0789',
      status: 'confirmed',
      deviceType: 'Diagnostic Equipment',
      deviceCount: 25,
      urgency: 'urgent',
      sterilizationType: 'validation',
      specialInstructions: 'Critical batch - priority handling',
      bookingReference: 'APL-2025-003',
      createdAt: '2025-09-26T16:20:00Z',
      updatedAt: '2025-09-28T08:30:00Z'
    }
  ]);

  const [newBooking, setNewBooking] = useState({
    chamberId: '',
    date: '',
    startTime: '',
    endTime: '',
    client: '',
    contact: '',
    phone: '',
    deviceType: '',
    deviceCount: '',
    urgency: 'standard',
    sterilizationType: 'standard',
    specialInstructions: ''
  });

  const [conflicts, setConflicts] = useState([]);
  const [availabilityData, setAvailabilityData] = useState({});

  // Time slots for booking (15-minute intervals)
  const timeSlots = [];
  for (let hour = 6; hour <= 22; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      timeSlots.push(timeString);
    }
  }

  // Real-time updates simulation
  useEffect(() => {
    if (realTimeUpdates) {
      const interval = setInterval(() => {
        // Simulate real-time chamber status updates
        setChambers(prev => prev.map(chamber => ({
          ...chamber,
          currentTemp: chamber.currentTemp + (Math.random() - 0.5) * 2,
          currentPressure: Math.max(0, chamber.currentPressure + (Math.random() - 0.5) * 0.5)
        })));
        
        // Update availability data
        updateAvailabilityData();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [realTimeUpdates, selectedDate]);

  // Calculate real-time availability
  const updateAvailabilityData = () => {
    const dateStr = selectedDate.toISOString().split('T')[0];
    const availability = {};
    
    chambers.forEach(chamber => {
      const chamberBookings = bookings.filter(b => 
        b.chamberId === chamber.id && b.date === dateStr
      );
      
      // Calculate time slots
      const occupiedSlots = [];
      chamberBookings.forEach(booking => {
        const startHour = parseInt(booking.startTime.split(':')[0]);
        const startMinute = parseInt(booking.startTime.split(':')[1]);
        const endHour = parseInt(booking.endTime.split(':')[0]);
        const endMinute = parseInt(booking.endTime.split(':')[1]);
        
        const startIndex = (startHour - 6) * 4 + Math.floor(startMinute / 15);
        const endIndex = (endHour - 6) * 4 + Math.floor(endMinute / 15);
        
        for (let i = startIndex; i < endIndex; i++) {
          occupiedSlots.push(i);
        }
      });
      
      const totalSlots = (22 - 6) * 4; // 6 AM to 10 PM, 15-minute slots
      const availableSlots = totalSlots - occupiedSlots.length;
      
      availability[chamber.id] = {
        occupiedSlots,
        availableSlots,
        totalSlots,
        utilization: ((occupiedSlots.length / totalSlots) * 100).toFixed(1),
        nextAvailable: findNextAvailableSlot(chamber.id, dateStr),
        bookings: chamberBookings
      };
    });
    
    setAvailabilityData(availability);
  };

  // Find next available time slot
  const findNextAvailableSlot = (chamberId, date) => {
    const chamberBookings = bookings.filter(b => 
      b.chamberId === chamberId && b.date === date
    ).sort((a, b) => a.startTime.localeCompare(b.startTime));
    
    if (chamberBookings.length === 0) {
      return '06:00';
    }
    
    const lastBooking = chamberBookings[chamberBookings.length - 1];
    return lastBooking.endTime;
  };

  // Check for booking conflicts with enhanced logic
  const checkBookingConflicts = (chamberId, date, startTime, endTime) => {
    const conflictingBookings = bookings.filter(booking => 
      booking.chamberId === parseInt(chamberId) &&
      booking.date === date &&
      (
        (startTime >= booking.startTime && startTime < booking.endTime) ||
        (endTime > booking.startTime && endTime <= booking.endTime) ||
        (startTime <= booking.startTime && endTime >= booking.endTime)
      )
    );
    
    return conflictingBookings;
  };

  // Add notification
  const addNotification = (type, title, message) => {
    const notification = {
      id: Date.now(),
      type, // 'success', 'warning', 'error', 'info'
      title,
      message,
      timestamp: new Date(),
      read: false
    };
    
    setNotifications(prev => [notification, ...prev.slice(0, 9)]); // Keep last 10
    
    // Auto-remove after 5 seconds for success/info
    if (type === 'success' || type === 'info') {
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== notification.id));
      }, 5000);
    }
  };

  // Handle booking submission with enhanced validation
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!newBooking.chamberId || !newBooking.date || !newBooking.startTime || 
        !newBooking.endTime || !newBooking.client || !newBooking.contact) {
      addNotification('error', 'Booking Failed', 'Please fill in all required fields');
      return;
    }
    
    // Check conflicts
    const conflictingBookings = checkBookingConflicts(
      newBooking.chamberId,
      newBooking.date,
      newBooking.startTime,
      newBooking.endTime
    );
    
    if (conflictingBookings.length > 0) {
      setConflicts(conflictingBookings);
      addNotification('error', 'Booking Conflict', 
        `Time slot conflicts with ${conflictingBookings.length} existing booking(s)`);
      return;
    }
    
    // Check chamber availability
    const chamber = chambers.find(c => c.id === parseInt(newBooking.chamberId));
    if (chamber.status !== 'available') {
      addNotification('error', 'Chamber Unavailable', 
        `${chamber.name} is currently ${chamber.status}`);
      return;
    }
    
    // Create booking
    const booking = {
      id: Date.now(),
      ...newBooking,
      chamberId: parseInt(newBooking.chamberId),
      status: 'pending',
      bookingReference: `${newBooking.client.substring(0, 3).toUpperCase()}-${new Date().getFullYear()}-${String(bookings.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setBookings(prev => [...prev, booking]);
    
    // Send confirmation notification
    addNotification('success', 'Booking Confirmed', 
      `Booking ${booking.bookingReference} created successfully for ${chamber.name}`);
    
    // Reset form
    setNewBooking({
      chamberId: '',
      date: '',
      startTime: '',
      endTime: '',
      client: '',
      contact: '',
      phone: '',
      deviceType: '',
      deviceCount: '',
      urgency: 'standard',
      sterilizationType: 'standard',
      specialInstructions: ''
    });
    
    setConflicts([]);
    setShowBookingModal(false);
    updateAvailabilityData();
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    const startDate = new Date(startOfMonth);
    startDate.setDate(startDate.getDate() - startOfMonth.getDay());
    
    const days = [];
    const currentDate = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return days;
  };

  // Get bookings for a specific date
  const getBookingsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return bookings.filter(booking => booking.date === dateStr);
  };

  // Calculate daily utilization
  const getDayUtilization = (date) => {
    const dayBookings = getBookingsForDate(date);
    if (dayBookings.length === 0) return 0;
    
    const totalPossibleHours = chambers.length * 16; // 6 AM to 10 PM
    const bookedHours = dayBookings.reduce((total, booking) => {
      const start = new Date(`${booking.date}T${booking.startTime}`);
      const end = new Date(`${booking.date}T${booking.endTime}`);
      return total + (end - start) / (1000 * 60 * 60);
    }, 0);
    
    return (bookedHours / totalPossibleHours) * 100;
  };

  useEffect(() => {
    updateAvailabilityData();
  }, [selectedDate, bookings]);

  return (
    <div className="chamber-availability-booking">
      {/* Header */}
      <div className="cab-header">
        <div className="cab-title-section">
          <h1>🏥 Chamber Availability & Booking</h1>
          <p>Real-time chamber availability and advanced booking management</p>
        </div>
        
        <div className="cab-controls">
          <div className="view-mode-selector">
            <button 
              className={`view-btn ${viewMode === 'calendar' ? 'active' : ''}`}
              onClick={() => setViewMode('calendar')}
            >
              📅 Calendar View
            </button>
            <button 
              className={`view-btn ${viewMode === 'slots' ? 'active' : ''}`}
              onClick={() => setViewMode('slots')}
            >
              🕐 Slot View
            </button>
            <button 
              className={`view-btn ${viewMode === 'timeline' ? 'active' : ''}`}
              onClick={() => setViewMode('timeline')}
            >
              📊 Timeline View
            </button>
          </div>
          
          <button 
            className="real-time-toggle"
            onClick={() => setRealTimeUpdates(!realTimeUpdates)}
          >
            {realTimeUpdates ? '🟢 Live Updates' : '⏸️ Paused'}
          </button>
          
          <button 
            className="new-booking-btn"
            onClick={() => setShowBookingModal(true)}
          >
            ➕ New Booking
          </button>
        </div>
      </div>

      {/* Notifications Panel */}
      {notifications.length > 0 && (
        <div className="notifications-panel">
          {notifications.slice(0, 3).map(notification => (
            <div key={notification.id} className={`notification ${notification.type}`}>
              <div className="notification-header">
                <strong>{notification.title}</strong>
                <button onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}>
                  ✕
                </button>
              </div>
              <div className="notification-message">{notification.message}</div>
              <div className="notification-time">
                {notification.timestamp.toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Chamber Status Overview */}
      <div className="chamber-status-overview">
        <h3>🏭 Chamber Status Overview</h3>
        <div className="chamber-cards">
          {chambers.map(chamber => (
            <div 
              key={chamber.id} 
              className={`chamber-card ${chamber.status} ${selectedChamber === chamber.id ? 'selected' : ''}`}
              onClick={() => setSelectedChamber(selectedChamber === chamber.id ? null : chamber.id)}
            >
              <div className="chamber-header">
                <h4>{chamber.name}</h4>
                <span className={`status-indicator ${chamber.status}`}>
                  {chamber.status === 'available' ? '🟢' : 
                   chamber.status === 'in-use' ? '🟡' : '🔴'}
                </span>
              </div>
              
              <div className="chamber-details">
                <div className="detail-row">
                  <span>Type:</span>
                  <span>{chamber.type}</span>
                </div>
                <div className="detail-row">
                  <span>Capacity:</span>
                  <span>{chamber.capacity}</span>
                </div>
                <div className="detail-row">
                  <span>Location:</span>
                  <span>{chamber.location}</span>
                </div>
                
                {chamber.status === 'available' && (
                  <div className="real-time-params">
                    <div className="param">
                      <span>🌡️ {chamber.currentTemp.toFixed(1)}°C</span>
                    </div>
                    <div className="param">
                      <span>⏲️ {chamber.currentPressure.toFixed(1)} PSI</span>
                    </div>
                  </div>
                )}
                
                {availabilityData[chamber.id] && (
                  <div className="availability-summary">
                    <div className="utilization-bar">
                      <div 
                        className="utilization-fill"
                        style={{width: `${availabilityData[chamber.id].utilization}%`}}
                      ></div>
                    </div>
                    <span className="utilization-text">
                      {availabilityData[chamber.id].utilization}% utilized
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="cab-main-content">
        {/* Calendar View */}
        {viewMode === 'calendar' && (
          <div className="calendar-view">
            <div className="calendar-header">
              <button onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}>
                ‹ Previous
              </button>
              <h3>
                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h3>
              <button onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}>
                Next ›
              </button>
            </div>
            
            <div className="calendar-grid">
              <div className="calendar-days-header">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="calendar-day-header">{day}</div>
                ))}
              </div>
              
              <div className="calendar-days">
                {generateCalendarDays().map((day, index) => {
                  const dayBookings = getBookingsForDate(day);
                  const utilization = getDayUtilization(day);
                  const isSelected = selectedDate.toDateString() === day.toDateString();
                  const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
                  
                  return (
                    <div 
                      key={index}
                      className={`calendar-day ${isSelected ? 'selected' : ''} ${isCurrentMonth ? 'current-month' : 'other-month'}`}
                      onClick={() => setSelectedDate(day)}
                    >
                      <div className="day-number">{day.getDate()}</div>
                      <div className="day-utilization">
                        <div 
                          className="utilization-indicator"
                          style={{
                            backgroundColor: utilization > 80 ? '#ff4444' : 
                                           utilization > 50 ? '#ffaa00' : '#44ff44',
                            height: `${Math.max(2, utilization / 10)}px`
                          }}
                        ></div>
                      </div>
                      <div className="day-booking-count">
                        {dayBookings.length > 0 && (
                          <span className="booking-badge">{dayBookings.length}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Slot View */}
        {viewMode === 'slots' && (
          <div className="slots-view">
            <div className="slot-view-header">
              <h3>Available Time Slots - {selectedDate.toLocaleDateString()}</h3>
              <input 
                type="date"
                value={selectedDate.toISOString().split('T')[0]}
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
                className="date-picker"
              />
            </div>
            
            <div className="slots-grid">
              {chambers.map(chamber => (
                <div key={chamber.id} className="chamber-slots">
                  <div className="chamber-slots-header">
                    <h4>{chamber.name}</h4>
                    <span className={`chamber-status ${chamber.status}`}>
                      {chamber.status}
                    </span>
                  </div>
                  
                  <div className="time-slots">
                    {timeSlots.map(slot => {
                      const isOccupied = availabilityData[chamber.id]?.occupiedSlots.includes(
                        timeSlots.indexOf(slot)
                      );
                      
                      return (
                        <div 
                          key={slot}
                          className={`time-slot ${isOccupied ? 'occupied' : 'available'} ${chamber.status !== 'available' ? 'disabled' : ''}`}
                          onClick={() => {
                            if (!isOccupied && chamber.status === 'available') {
                              setNewBooking(prev => ({
                                ...prev,
                                chamberId: chamber.id,
                                date: selectedDate.toISOString().split('T')[0],
                                startTime: slot
                              }));
                              setShowBookingModal(true);
                            }
                          }}
                        >
                          {slot}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Timeline View */}
        {viewMode === 'timeline' && (
          <div className="timeline-view">
            <div className="timeline-header">
              <h3>Daily Timeline - {selectedDate.toLocaleDateString()}</h3>
              <div className="timeline-legend">
                <span className="legend-item confirmed">🟢 Confirmed</span>
                <span className="legend-item pending">🟡 Pending</span>
                <span className="legend-item cancelled">🔴 Cancelled</span>
              </div>
            </div>
            
            <div className="timeline-container">
              <div className="time-axis">
                {Array.from({length: 17}, (_, i) => i + 6).map(hour => (
                  <div key={hour} className="time-marker">
                    {hour.toString().padStart(2, '0')}:00
                  </div>
                ))}
              </div>
              
              <div className="chambers-timeline">
                {chambers.map(chamber => {
                  const chamberBookings = getBookingsForDate(selectedDate).filter(
                    b => b.chamberId === chamber.id
                  );
                  
                  return (
                    <div key={chamber.id} className="chamber-timeline">
                      <div className="chamber-timeline-header">
                        <h4>{chamber.name}</h4>
                        <span className={`status ${chamber.status}`}>
                          {chamber.status}
                        </span>
                      </div>
                      
                      <div className="timeline-slots">
                        {chamberBookings.map(booking => {
                          const startHour = parseInt(booking.startTime.split(':')[0]);
                          const endHour = parseInt(booking.endTime.split(':')[0]);
                          const startMinute = parseInt(booking.startTime.split(':')[1]);
                          const endMinute = parseInt(booking.endTime.split(':')[1]);
                          
                          const left = ((startHour - 6) + startMinute / 60) * (100 / 16);
                          const width = ((endHour - startHour) + (endMinute - startMinute) / 60) * (100 / 16);
                          
                          return (
                            <div 
                              key={booking.id}
                              className={`booking-block ${booking.status}`}
                              style={{
                                left: `${left}%`,
                                width: `${width}%`
                              }}
                              title={`${booking.client} - ${booking.deviceType}`}
                            >
                              <div className="booking-content">
                                <strong>{booking.client}</strong>
                                <span>{booking.startTime} - {booking.endTime}</span>
                                <span>{booking.deviceType}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Selected Date Details */}
      <div className="selected-date-details">
        <h3>📋 Bookings for {selectedDate.toLocaleDateString()}</h3>
        {getBookingsForDate(selectedDate).length > 0 ? (
          <div className="bookings-list">
            {getBookingsForDate(selectedDate).map(booking => (
              <div key={booking.id} className={`booking-item ${booking.status}`}>
                <div className="booking-header">
                  <h4>{booking.client}</h4>
                  <span className={`booking-status ${booking.status}`}>
                    {booking.status}
                  </span>
                </div>
                
                <div className="booking-details">
                  <div className="detail-grid">
                    <div className="detail-item">
                      <strong>Chamber:</strong>
                      {chambers.find(c => c.id === booking.chamberId)?.name}
                    </div>
                    <div className="detail-item">
                      <strong>Time:</strong>
                      {booking.startTime} - {booking.endTime}
                    </div>
                    <div className="detail-item">
                      <strong>Device Type:</strong>
                      {booking.deviceType}
                    </div>
                    <div className="detail-item">
                      <strong>Contact:</strong>
                      {booking.contact}
                    </div>
                    <div className="detail-item">
                      <strong>Reference:</strong>
                      {booking.bookingReference}
                    </div>
                    <div className="detail-item">
                      <strong>Urgency:</strong>
                      <span className={`urgency ${booking.urgency}`}>
                        {booking.urgency}
                      </span>
                    </div>
                  </div>
                  
                  {booking.specialInstructions && (
                    <div className="special-instructions">
                      <strong>Special Instructions:</strong>
                      <p>{booking.specialInstructions}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-bookings">
            <p>No bookings scheduled for this date</p>
            <button 
              className="quick-book-btn"
              onClick={() => {
                setNewBooking(prev => ({
                  ...prev,
                  date: selectedDate.toISOString().split('T')[0]
                }));
                setShowBookingModal(true);
              }}
            >
              📅 Quick Book
            </button>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="modal-overlay">
          <div className="booking-modal">
            <div className="modal-header">
              <h3>📝 New Booking Request</h3>
              <button 
                className="close-btn"
                onClick={() => setShowBookingModal(false)}
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleBookingSubmit} className="booking-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Chamber *</label>
                  <select 
                    value={newBooking.chamberId}
                    onChange={(e) => setNewBooking(prev => ({...prev, chamberId: e.target.value}))}
                    required
                  >
                    <option value="">Select Chamber</option>
                    {chambers.filter(c => c.status === 'available').map(chamber => (
                      <option key={chamber.id} value={chamber.id}>
                        {chamber.name} - {chamber.type}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Date *</label>
                  <input 
                    type="date"
                    value={newBooking.date}
                    onChange={(e) => setNewBooking(prev => ({...prev, date: e.target.value}))}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Start Time *</label>
                  <select 
                    value={newBooking.startTime}
                    onChange={(e) => setNewBooking(prev => ({...prev, startTime: e.target.value}))}
                    required
                  >
                    <option value="">Select Start Time</option>
                    {timeSlots.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label>End Time *</label>
                  <select 
                    value={newBooking.endTime}
                    onChange={(e) => setNewBooking(prev => ({...prev, endTime: e.target.value}))}
                    required
                  >
                    <option value="">Select End Time</option>
                    {timeSlots.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Client Name *</label>
                  <input 
                    type="text"
                    value={newBooking.client}
                    onChange={(e) => setNewBooking(prev => ({...prev, client: e.target.value}))}
                    placeholder="Company or Organization Name"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Contact Email *</label>
                  <input 
                    type="email"
                    value={newBooking.contact}
                    onChange={(e) => setNewBooking(prev => ({...prev, contact: e.target.value}))}
                    placeholder="contact@company.com"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Phone Number</label>
                  <input 
                    type="tel"
                    value={newBooking.phone}
                    onChange={(e) => setNewBooking(prev => ({...prev, phone: e.target.value}))}
                    placeholder="+1-555-0123"
                  />
                </div>
                
                <div className="form-group">
                  <label>Device Type *</label>
                  <input 
                    type="text"
                    value={newBooking.deviceType}
                    onChange={(e) => setNewBooking(prev => ({...prev, deviceType: e.target.value}))}
                    placeholder="e.g., Surgical Instruments, Implants"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Device Count</label>
                  <input 
                    type="number"
                    value={newBooking.deviceCount}
                    onChange={(e) => setNewBooking(prev => ({...prev, deviceCount: e.target.value}))}
                    placeholder="Number of devices"
                    min="1"
                  />
                </div>
                
                <div className="form-group">
                  <label>Urgency Level</label>
                  <select 
                    value={newBooking.urgency}
                    onChange={(e) => setNewBooking(prev => ({...prev, urgency: e.target.value}))}
                  >
                    <option value="standard">🟢 Standard</option>
                    <option value="high">🟡 High Priority</option>
                    <option value="urgent">🔴 Urgent</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Sterilization Type</label>
                  <select 
                    value={newBooking.sterilizationType}
                    onChange={(e) => setNewBooking(prev => ({...prev, sterilizationType: e.target.value}))}
                  >
                    <option value="standard">Standard Cycle</option>
                    <option value="extended">Extended Cycle</option>
                    <option value="validation">Validation Cycle</option>
                    <option value="rapid">Rapid Cycle</option>
                  </select>
                </div>
                
                <div className="form-group full-width">
                  <label>Special Instructions</label>
                  <textarea 
                    value={newBooking.specialInstructions}
                    onChange={(e) => setNewBooking(prev => ({...prev, specialInstructions: e.target.value}))}
                    placeholder="Any special handling requirements or notes..."
                    rows="3"
                  />
                </div>
              </div>
              
              {/* Conflict Warnings */}
              {conflicts.length > 0 && (
                <div className="conflicts-warning">
                  <h4>⚠️ Booking Conflicts Detected</h4>
                  {conflicts.map(conflict => (
                    <div key={conflict.id} className="conflict-item">
                      Conflicts with {conflict.client} booking from {conflict.startTime} to {conflict.endTime}
                    </div>
                  ))}
                </div>
              )}
              
              <div className="form-actions">
                <button type="button" onClick={() => setShowBookingModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  📅 Create Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChamberAvailabilityBooking;