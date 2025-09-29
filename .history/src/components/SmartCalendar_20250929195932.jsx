import React, { useState, useEffect } from 'react';

const SmartCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [chambers, setChambers] = useState([
    { id: 1, name: 'Chamber A-101', capacity: 'Large', type: 'Steam' },
    { id: 2, name: 'Chamber B-202', capacity: 'Medium', type: 'ETO' },
    { id: 3, name: 'Chamber C-303', capacity: 'Small', type: 'Gamma' },
    { id: 4, name: 'Chamber D-404', capacity: 'Large', type: 'Steam' }
  ]);
  const [bookings, setBookings] = useState([
    {
      id: 1,
      chamberId: 1,
      date: '2025-09-29',
      startTime: '09:00',
      endTime: '12:00',
      client: 'MedTech Corp',
      status: 'confirmed',
      deviceType: 'Surgical Instruments'
    },
    {
      id: 2,
      chamberId: 2,
      date: '2025-09-29',
      startTime: '14:00',
      endTime: '18:00',
      client: 'BioMed Solutions',
      status: 'pending',
      deviceType: 'Implants'
    },
    {
      id: 3,
      chamberId: 1,
      date: '2025-09-30',
      startTime: '08:00',
      endTime: '11:00',
      client: 'Pharma Labs',
      status: 'confirmed',
      deviceType: 'Diagnostic Equipment'
    }
  ]);
  const [newBooking, setNewBooking] = useState({
    chamberId: '',
    date: '',
    startTime: '',
    endTime: '',
    client: '',
    deviceType: ''
  });
  const [conflicts, setConflicts] = useState([]);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [availability, setAvailability] = useState({});

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

  // Check for booking conflicts
  const checkConflicts = (chamberId, date, startTime, endTime) => {
    const conflicts = bookings.filter(booking => 
      booking.chamberId === parseInt(chamberId) &&
      booking.date === date &&
      (
        (startTime >= booking.startTime && startTime < booking.endTime) ||
        (endTime > booking.startTime && endTime <= booking.endTime) ||
        (startTime <= booking.startTime && endTime >= booking.endTime)
      )
    );
    return conflicts;
  };

  // Calculate chamber availability for a specific date
  const calculateAvailability = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    const availability = {};
    
    chambers.forEach(chamber => {
      const chamberBookings = bookings.filter(b => 
        b.chamberId === chamber.id && b.date === dateStr
      );
      
      const totalHours = chamberBookings.reduce((total, booking) => {
        const start = new Date(`${booking.date}T${booking.startTime}`);
        const end = new Date(`${booking.date}T${booking.endTime}`);
        return total + (end - start) / (1000 * 60 * 60);
      }, 0);
      
      availability[chamber.id] = {
        bookedHours: totalHours,
        availableHours: 24 - totalHours,
        utilization: (totalHours / 24) * 100
      };
    });
    
    return availability;
  };

  // Handle booking submission
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    
    const conflictingBookings = checkConflicts(
      newBooking.chamberId,
      newBooking.date,
      newBooking.startTime,
      newBooking.endTime
    );
    
    if (conflictingBookings.length > 0) {
      setConflicts(conflictingBookings);
      return;
    }
    
    const booking = {
      id: Date.now(),
      ...newBooking,
      chamberId: parseInt(newBooking.chamberId),
      status: 'pending'
    };
    
    setBookings([...bookings, booking]);
    setNewBooking({
      chamberId: '',
      date: '',
      startTime: '',
      endTime: '',
      client: '',
      deviceType: ''
    });
    setConflicts([]);
    setShowBookingModal(false);
  };

  // Get bookings for a specific date
  const getBookingsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return bookings.filter(b => b.date === dateStr);
  };

  const calendarDays = generateCalendarDays();
  const today = new Date();

  return (
    <div className="smart-calendar">
      <div className="calendar-header">
        <div className="calendar-navigation">
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
            className="nav-button"
          >
            ←
          </button>
          <h2 className="calendar-title">
            {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h2>
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
            className="nav-button"
          >
            →
          </button>
        </div>
        <button
          onClick={() => setShowBookingModal(true)}
          className="new-booking-btn"
        >
          + New Booking
        </button>
      </div>

      <div className="calendar-grid">
        <div className="weekdays">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="weekday">{day}</div>
          ))}
        </div>
        
        <div className="calendar-days">
          {calendarDays.map((day, index) => {
            const dayBookings = getBookingsForDate(day);
            const availability = calculateAvailability(day);
            const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
            const isToday = day.toDateString() === today.toDateString();
            const isPast = day < today;
            
            return (
              <div
                key={index}
                className={`calendar-day ${isCurrentMonth ? 'current-month' : 'other-month'} ${isToday ? 'today' : ''} ${isPast ? 'past' : ''}`}
                onClick={() => !isPast && setSelectedDate(day)}
              >
                <div className="day-number">{day.getDate()}</div>
                {dayBookings.length > 0 && (
                  <div className="day-bookings">
                    {dayBookings.slice(0, 2).map(booking => (
                      <div
                        key={booking.id}
                        className={`booking-indicator ${booking.status}`}
                        title={`${booking.client} - ${booking.startTime}-${booking.endTime}`}
                      >
                        {chambers.find(c => c.id === booking.chamberId)?.name}
                      </div>
                    ))}
                    {dayBookings.length > 2 && (
                      <div className="more-bookings">+{dayBookings.length - 2} more</div>
                    )}
                  </div>
                )}
                {isCurrentMonth && (
                  <div className="availability-indicator">
                    {Object.keys(availability).length > 0 && (
                      <div className="utilization-bar">
                        {Object.values(availability).map((avail, i) => (
                          <div
                            key={i}
                            className="utilization-segment"
                            style={{
                              backgroundColor: avail.utilization > 80 ? '#ff4757' :
                                             avail.utilization > 60 ? '#ffa726' :
                                             avail.utilization > 40 ? '#66bb6a' : '#42a5f5',
                              width: `${100 / Object.keys(availability).length}%`
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Chamber Availability Panel */}
      <div className="chamber-availability">
        <h3>Chamber Availability</h3>
        <div className="chambers-grid">
          {chambers.map(chamber => {
            const todayAvailability = calculateAvailability(today)[chamber.id] || { utilization: 0, availableHours: 24 };
            return (
              <div key={chamber.id} className="chamber-card">
                <div className="chamber-info">
                  <h4>{chamber.name}</h4>
                  <span className="chamber-type">{chamber.type} - {chamber.capacity}</span>
                </div>
                <div className="utilization-display">
                  <div className="utilization-percentage">
                    {Math.round(todayAvailability.utilization)}%
                  </div>
                  <div className="available-hours">
                    {todayAvailability.availableHours}h available
                  </div>
                  <div className="utilization-bar-full">
                    <div
                      className="utilization-fill"
                      style={{
                        width: `${todayAvailability.utilization}%`,
                        backgroundColor: todayAvailability.utilization > 80 ? '#ff4757' :
                                       todayAvailability.utilization > 60 ? '#ffa726' :
                                       todayAvailability.utilization > 40 ? '#66bb6a' : '#42a5f5'
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="modal-overlay" onClick={() => setShowBookingModal(false)}>
          <div className="booking-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>New Booking</h3>
              <button onClick={() => setShowBookingModal(false)} className="close-btn">×</button>
            </div>
            
            <form onSubmit={handleBookingSubmit} className="booking-form">
              <div className="form-group">
                <label>Chamber</label>
                <select
                  value={newBooking.chamberId}
                  onChange={(e) => setNewBooking({...newBooking, chamberId: e.target.value})}
                  required
                >
                  <option value="">Select Chamber</option>
                  {chambers.map(chamber => (
                    <option key={chamber.id} value={chamber.id}>
                      {chamber.name} - {chamber.type} ({chamber.capacity})
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  value={newBooking.date}
                  onChange={(e) => setNewBooking({...newBooking, date: e.target.value})}
                  min={today.toISOString().split('T')[0]}
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Start Time</label>
                  <input
                    type="time"
                    value={newBooking.startTime}
                    onChange={(e) => setNewBooking({...newBooking, startTime: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>End Time</label>
                  <input
                    type="time"
                    value={newBooking.endTime}
                    onChange={(e) => setNewBooking({...newBooking, endTime: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Client</label>
                <input
                  type="text"
                  value={newBooking.client}
                  onChange={(e) => setNewBooking({...newBooking, client: e.target.value})}
                  placeholder="Client name"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Device Type</label>
                <input
                  type="text"
                  value={newBooking.deviceType}
                  onChange={(e) => setNewBooking({...newBooking, deviceType: e.target.value})}
                  placeholder="Type of medical device"
                  required
                />
              </div>
              
              {conflicts.length > 0 && (
                <div className="conflict-warning">
                  <h4>Booking Conflicts Detected!</h4>
                  {conflicts.map(conflict => (
                    <div key={conflict.id} className="conflict-item">
                      {conflict.client} has booked {conflict.startTime}-{conflict.endTime}
                    </div>
                  ))}
                </div>
              )}
              
              <div className="form-actions">
                <button type="button" onClick={() => setShowBookingModal(false)} className="cancel-btn">
                  Cancel
                </button>
                <button type="submit" className="submit-btn" disabled={conflicts.length > 0}>
                  Create Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Selected Date Details */}
      {selectedDate && (
        <div className="date-details">
          <h3>Bookings for {selectedDate.toLocaleDateString()}</h3>
          <div className="date-bookings">
            {getBookingsForDate(selectedDate).map(booking => (
              <div key={booking.id} className={`booking-detail ${booking.status}`}>
                <div className="booking-header">
                  <span className="chamber-name">
                    {chambers.find(c => c.id === booking.chamberId)?.name}
                  </span>
                  <span className={`status-badge ${booking.status}`}>
                    {booking.status}
                  </span>
                </div>
                <div className="booking-info">
                  <div className="time-slot">{booking.startTime} - {booking.endTime}</div>
                  <div className="client-info">{booking.client}</div>
                  <div className="device-type">{booking.deviceType}</div>
                </div>
              </div>
            ))}
            {getBookingsForDate(selectedDate).length === 0 && (
              <div className="no-bookings">No bookings scheduled for this date</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartCalendar;