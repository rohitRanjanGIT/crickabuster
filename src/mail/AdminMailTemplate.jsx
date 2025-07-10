import React from 'react';

const AdminBookingNotificationEmail = () => {
  // Current date from the provided timestamp
  const currentDateTime = "2025-07-10 04:43:46";
  
  // Sample booking data
  const bookingDetails = {
    id: 'BK-7845124',
    matchDetails: 'Mumbai Indians vs Chennai Super Kings',
    tournamentName: 'Tata IPL 2025',
    date: 'July 15, 2025',
    time: '7:30 PM',
    venue: 'Wankhede Stadium, Mumbai',
    categoryName: 'Premium Stand - Category A',
    quantity: 2,
    price: 75.00,
    totalAmount: 150.00,
    paymentId: 'PAY-78231452',
    ticketId: 'TICK-IPL-7823',
    gateNumber: 'Gate C',
    seatNumbers: ['A12', 'A13']
  };

  // Sample user data
  const userData = {
    firstName: 'Rohit',
    lastName: 'Sharma',
    email: 'rohit.sharma@example.com',
    phone: '+91 9876543210',
    addressLine1: '123 Cricket Lane',
    addressLine2: 'Apartment 5B',
    city: 'Mumbai',
    state: 'Maharashtra',
    zipCode: '400001',
    country: 'India'
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', fontFamily: 'Arial, sans-serif', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
      {/* Email Header */}
      <div style={{ padding: '24px 32px 8px 32px', borderBottom: '1px solid #e5e7eb' }}>
        <h1 style={{ fontSize: '1.7rem', fontWeight: 700, margin: 0, color: '#222' }}>CrickBuster Admin</h1>
        <p style={{ margin: '8px 0 0 0', color: '#444', fontSize: '1rem' }}>Admin Booking Notification</p>
      </div>
      {/* Notification Header */}
      <div style={{ padding: '16px 32px 0 32px' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 600, margin: 0, color: '#222', textAlign: 'left' }}>New Booking Alert!</h2>
        <p style={{ color: '#444', margin: '6px 0 0 0', textAlign: 'left' }}>Booking ID: {bookingDetails.id}</p>
      </div>
      {/* Email Body */}
      <div style={{ padding: '16px 32px' }}>
        <div style={{ marginBottom: '18px' }}>
          <p style={{ color: '#222', margin: 0 }}>Dear <span style={{ fontWeight: 600 }}>Admin</span>,</p>
          <p style={{ color: '#444', margin: '8px 0 0 0' }}>A new booking has been made on CrickBuster. Please find the complete details below:</p>
        </div>
        {/* Customer Information */}
        <div style={{ marginBottom: '24px', textAlign: 'left' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#222', margin: '0 0 10px 0' }}>Customer Information</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.98rem' }}>
            <tbody>
              <tr><td style={{ padding: '6px 0', color: '#666' }}>Name:</td><td style={{ padding: '6px 0' }}>{userData.firstName} {userData.lastName}</td></tr>
              <tr><td style={{ padding: '6px 0', color: '#666' }}>Email:</td><td style={{ padding: '6px 0' }}>{userData.email}</td></tr>
              <tr><td style={{ padding: '6px 0', color: '#666' }}>Phone:</td><td style={{ padding: '6px 0' }}>{userData.phone}</td></tr>
              <tr><td style={{ padding: '6px 0', color: '#666', verticalAlign: 'top' }}>Address:</td><td style={{ padding: '6px 0' }}>{userData.addressLine1}{userData.addressLine2 ? ', ' + userData.addressLine2 : ''}, {userData.city}, {userData.state} {userData.zipCode}, {userData.country}</td></tr>
            </tbody>
          </table>
        </div>
        {/* Match Details */}
        <div style={{ marginBottom: '24px', textAlign: 'left' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#222', margin: '0 0 10px 0' }}>Match Details</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.98rem' }}>
            <tbody>
              <tr><td style={{ padding: '6px 0', color: '#666' }}>Match:</td><td style={{ padding: '6px 0' }}>{bookingDetails.matchDetails}</td></tr>
              <tr><td style={{ padding: '6px 0', color: '#666' }}>Tournament:</td><td style={{ padding: '6px 0' }}>{bookingDetails.tournamentName}</td></tr>
              <tr><td style={{ padding: '6px 0', color: '#666' }}>Date & Time:</td><td style={{ padding: '6px 0' }}>{bookingDetails.date}, {bookingDetails.time}</td></tr>
              <tr><td style={{ padding: '6px 0', color: '#666' }}>Venue:</td><td style={{ padding: '6px 0' }}>{bookingDetails.venue}</td></tr>
            </tbody>
          </table>
        </div>
        {/* Ticket Details */}
        <div style={{ marginBottom: '24px', textAlign: 'left' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#222', margin: '0 0 10px 0' }}>Ticket Details</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.98rem' }}>
            <tbody>
              <tr><td style={{ padding: '6px 0', color: '#666' }}>Ticket ID:</td><td style={{ padding: '6px 0' }}>{bookingDetails.ticketId}</td></tr>
              <tr><td style={{ padding: '6px 0', color: '#666' }}>Category:</td><td style={{ padding: '6px 0' }}>{bookingDetails.categoryName}</td></tr>
              <tr><td style={{ padding: '6px 0', color: '#666' }}>Quantity:</td><td style={{ padding: '6px 0' }}>{bookingDetails.quantity}</td></tr>
              <tr><td style={{ padding: '6px 0', color: '#666' }}>Price per ticket:</td><td style={{ padding: '6px 0' }}>${bookingDetails.price.toFixed(2)}</td></tr>
              <tr><td style={{ padding: '6px 0', color: '#666' }}>Seat Numbers:</td><td style={{ padding: '6px 0' }}>{bookingDetails.seatNumbers.join(', ')}</td></tr>
              <tr><td style={{ padding: '6px 0', color: '#666' }}>Gate Number:</td><td style={{ padding: '6px 0' }}>{bookingDetails.gateNumber}</td></tr>
            </tbody>
          </table>
        </div>
        {/* Payment Summary */}
        <div style={{ marginBottom: '24px', textAlign: 'left' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#222', margin: '0 0 10px 0' }}>Payment Summary</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.98rem' }}>
            <tbody>
              <tr><td style={{ padding: '6px 0', color: '#666' }}>Subtotal:</td><td style={{ padding: '6px 0' }}>${bookingDetails.totalAmount.toFixed(2)}</td></tr>
              <tr><td style={{ padding: '6px 0', color: '#666' }}>Service Fee:</td><td style={{ padding: '6px 0' }}>$10.00</td></tr>
              <tr><td style={{ padding: '6px 0', color: '#666', fontWeight: 600 }}>Total Paid:</td><td style={{ padding: '6px 0', fontWeight: 600 }}>${(bookingDetails.totalAmount + 10).toFixed(2)}</td></tr>
              <tr><td style={{ padding: '6px 0', color: '#666' }}>Payment ID:</td><td style={{ padding: '6px 0' }}>{bookingDetails.paymentId}</td></tr>
            </tbody>
          </table>
        </div>
        {/* Admin Actions */}
        <div style={{ marginBottom: '24px', textAlign: 'left' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#222', margin: '0 0 10px 0' }}>Admin Actions</h3>
          <ul style={{ margin: 0, padding: '0 0 0 18px', color: '#444', fontSize: '0.98rem' }}>
            <li style={{ marginBottom: '6px' }}>Please verify the payment with the payment gateway.</li>
            <li style={{ marginBottom: '6px' }}>Ensure the tickets are allocated correctly in the system.</li>
            <li style={{ marginBottom: '6px' }}>Check for any special customer requests or notes.</li>
            <li>Confirm the booking details with the venue if needed.</li>
          </ul>
        </div>
        {/* Call to Action */}
        <div style={{ textAlign: 'left', marginBottom: '24px' }}>
          <p style={{ color: '#444', margin: 0 }}>You can view and manage this booking from the admin dashboard.</p>
        </div>
      </div>
      {/* Support Section */}
      <div style={{ padding: '16px 32px', borderTop: '1px solid #e5e7eb', background: '#fafbfc' }}>
        <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#222', margin: '0 0 8px 0' }}>System Information</h4>
        <p style={{ color: '#666', margin: 0, fontSize: '0.97rem' }}>This is an automated notification from the CrickBuster booking system.</p>
        <p style={{ color: '#999', margin: '8px 0 0 0', fontSize: '0.95rem' }}>Notification generated on: {currentDateTime}</p>
        <p style={{ color: '#999', margin: 0, fontSize: '0.95rem' }}>System ID: SYS-{Math.floor(Math.random() * 10000)}</p>
      </div>
      {/* Email Footer */}
      <div style={{ padding: '16px 32px', borderTop: '1px solid #e5e7eb', textAlign: 'center', color: '#888', fontSize: '0.93rem', background: '#fafbfc' }}>
        <p style={{ margin: 0 }}>CrickBuster Booking Management System &mdash; &copy; 2025 CrickBuster. All rights reserved.</p>
        <p style={{ margin: '8px 0 0 0', fontSize: '0.9rem' }}>For internal use only. Unauthorized access is prohibited.</p>
      </div>
    </div>
  );
};

export default AdminBookingNotificationEmail;