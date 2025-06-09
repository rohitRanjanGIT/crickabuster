import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Tooltip from '../components/Tooltip';

function Profile() {
  // Only 'overview' and 'all' tabs are available now
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock user data that would normally come from an API/Redux
  const [userData, setUserData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+91 9876543210',
    nationality: 'Indian',
    addressLine1: '123 Cricket Lane',
    addressLine2: 'Stadium District',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    zipCode: '400001',
  });
    // Mock booking history
  const [bookingHistory, setBookingHistory] = useState([
    {
      id: 'b1',
      tournamentName: 'Tata IPL 2025',
      match: 'Delhi Capitals vs Mumbai Indians',
      date: 'April 5, 2025',
      time: '7:30 PM',
      venue: 'Arun Jaitley Stadium, Delhi',
      categoryName: 'Category A - Premium Stand',
      quantity: 2,
      price: 102,
      status: 'upcoming',
      ticketId: 'TICK-IPL-7823',
      paymentId: 'PAY-78231452'
    },
    {
      id: 'b2',
      tournamentName: 'Tata IPL 2025',
      match: 'Royal Challengers Bangalore vs Chennai Super Kings',
      date: 'April 12, 2025',
      time: '7:30 PM',
      venue: 'M. Chinnaswamy Stadium, Bangalore',
      categoryName: 'Category C - Standard Stand',
      quantity: 3,      price: 38.40,
      status: 'upcoming',
      ticketId: 'TICK-IPL-5421',
      paymentId: 'PAY-54218759'
    },
    {
      id: 'b3',
      tournamentName: 'ICC World Cup 2024',
      match: 'India vs Australia',
      date: 'December 15, 2024',
      time: '2:00 PM',
      venue: 'Wankhede Stadium, Mumbai',
      categoryName: 'Gold Tier - Premium Seating',
      quantity: 1,
      price: 120,
      status: 'completed',
      ticketId: 'TICK-WC-9632',
      paymentId: 'PAY-96324587'
    }
  ]);

  // Handle user data form changes
  const handleUserDataChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally send the updated data to your backend
    setIsEditing(false);
    alert('Profile updated successfully!');
  };
  
  // Function to download match details
  const downloadMatchDetails = (booking) => {
    // In a real application, this would create a proper PDF or formatted document
    const content = `
MATCH DETAILS
=============
Match: ${booking.match}
Tournament: ${booking.tournamentName}
Date: ${booking.date}
Time: ${booking.time}
Venue: ${booking.venue}
Category: ${booking.categoryName}
Quantity: ${booking.quantity}
Price per ticket: $${booking.price.toFixed(2)}
Total Amount: $${(booking.price * booking.quantity).toFixed(2)}
Ticket ID: ${booking.ticketId}
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `Match_Details_${booking.ticketId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  // Function to download payment invoice
  const downloadInvoice = (booking) => {
    // In a real application, this would create a proper PDF invoice
    const content = `
PAYMENT INVOICE
==============
Invoice #: INV-${booking.paymentId}
Date: ${new Date().toLocaleDateString()}

Customer Details:
Name: ${userData.firstName} ${userData.lastName}
Email: ${userData.email}
Phone: ${userData.phone}

Match Details:
Match: ${booking.match}
Tournament: ${booking.tournamentName}
Date: ${booking.date}
Time: ${booking.time}
Venue: ${booking.venue}

Ticket Details:
Category: ${booking.categoryName}
Quantity: ${booking.quantity}
Price per ticket: $${booking.price.toFixed(2)}

Amount: $${(booking.price * booking.quantity).toFixed(2)}
Service Fee: $2.00
Total Amount: $${(booking.price * booking.quantity + 2).toFixed(2)}

Payment ID: ${booking.paymentId}
Ticket ID: ${booking.ticketId}

Thank you for booking with CrickBuster!
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `Invoice_${booking.paymentId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-blue-600 p-6 text-white">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="bg-white rounded-full h-16 w-16 flex items-center justify-center text-blue-600 text-2xl font-bold mr-4">
                  {userData.firstName.charAt(0)}{userData.lastName.charAt(0)}
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{userData.firstName} {userData.lastName}</h1>
                  <p className="text-blue-100">{userData.email}</p>
                </div>
              </div>              {!isEditing && (
                <div className="flex space-x-3">
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors"
                  >
                    <i className="fas fa-edit mr-2"></i>Edit Profile
                  </button>
                  <button                    onClick={() => {
                      // In a real app, this would call your auth logout function
                      alert('Logging out...');
                      // Redirect to cart page after logout
                      window.location.href = '/cart';
                    }}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                  >
                    <i className="fas fa-sign-out-alt mr-2"></i>Logout
                  </button>
                </div>
              )}
            </div>
          </div>
            {/* Navigation Tabs */}
          <div className="bg-gray-100 border-b border-gray-200">
            <nav className="flex overflow-x-auto">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-3 font-medium text-sm ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Overview
              </button>
              <button 
                onClick={() => setActiveTab('all')}
                className={`px-6 py-3 font-medium text-sm ${activeTab === 'all' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Your Bookings
              </button>
            </nav>
          </div>

          {/* Content Area */}
          <div className="p-6">
            {isEditing ? (
              /* Edit Profile Form */
              <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Edit Profile Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      id="firstName" 
                      name="firstName"
                      value={userData.firstName}
                      onChange={handleUserDataChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      id="lastName" 
                      name="lastName"
                      value={userData.lastName}
                      onChange={handleUserDataChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email"
                      value={userData.email}
                      onChange={handleUserDataChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      id="phone" 
                      name="phone"
                      value={userData.phone}
                      onChange={handleUserDataChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 mb-1">
                      Nationality
                    </label>
                    <input 
                      type="text" 
                      id="nationality" 
                      name="nationality"
                      value={userData.nationality}
                      onChange={handleUserDataChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700 mb-1">
                      Address Line 1
                    </label>
                    <input 
                      type="text" 
                      id="addressLine1" 
                      name="addressLine1"
                      value={userData.addressLine1}
                      onChange={handleUserDataChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700 mb-1">
                      Address Line 2
                    </label>
                    <input 
                      type="text" 
                      id="addressLine2" 
                      name="addressLine2"
                      value={userData.addressLine2}
                      onChange={handleUserDataChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input 
                      type="text" 
                      id="city" 
                      name="city"
                      value={userData.city}
                      onChange={handleUserDataChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <input 
                      type="text" 
                      id="state" 
                      name="state"
                      value={userData.state}
                      onChange={handleUserDataChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                      Country
                    </label>
                    <input 
                      type="text" 
                      id="country" 
                      name="country"
                      value={userData.country}
                      onChange={handleUserDataChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP Code
                    </label>
                    <input 
                      type="text" 
                      id="zipCode" 
                      name="zipCode"
                      value={userData.zipCode}
                      onChange={handleUserDataChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <button 
                    type="button" 
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : activeTab === 'overview' ? (
              /* Profile Overview */
              <div className="max-w-4xl mx-auto">                {/* User Information Card */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Personal Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                      <p className="mt-1">{userData.firstName} {userData.lastName}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Email Address</h3>
                      <p className="mt-1">{userData.email}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                      <p className="mt-1">{userData.phone}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Nationality</h3>
                      <p className="mt-1">{userData.nationality}</p>
                    </div>

                    {/* Address Information */}
                    <div className="col-span-1 md:col-span-2 mt-2 pt-4 border-t border-gray-100">
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Address</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-gray-600 text-sm font-medium">Street Address:</p>
                          <p>{userData.addressLine1}</p>
                          {userData.addressLine2 && <p>{userData.addressLine2}</p>}
                        </div>
                        <div>
                          <p className="text-gray-600 text-sm font-medium">Location:</p>
                          <p>{userData.city}, {userData.state}</p>
                          <p>{userData.country} - {userData.zipCode}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Recent Bookings */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Recent Bookings</h2>
                    <button 
                      onClick={() => setActiveTab('all')}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      View All Bookings
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {bookingHistory.slice(0, 2).map(booking => (
                      <div key={booking.id} className="border border-gray-200 rounded-lg p-4 hover:bg-blue-50 transition-colors">
                        <div className="flex flex-col md:flex-row justify-between mb-2">
                          <h3 className="font-semibold text-gray-800">{booking.match}</h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            booking.status === 'upcoming' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {booking.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                          <p className="text-gray-600">
                            <i className="fas fa-trophy mr-1 text-blue-600"></i> {booking.tournamentName}
                          </p>
                          <p className="text-gray-600">
                            <i className="fas fa-calendar-day mr-1 text-blue-600"></i> {booking.date}, {booking.time}
                          </p>
                          <p className="text-gray-600">
                            <i className="fas fa-map-marker-alt mr-1 text-blue-600"></i> {booking.venue}
                          </p>
                          <p className="text-gray-600">
                            <i className="fas fa-ticket-alt mr-1 text-blue-600"></i> {booking.categoryName} (Qty: {booking.quantity})
                          </p>
                        </div>
                        <div className="flex flex-wrap justify-between items-center mt-4 pt-3 border-t border-gray-100">
                          <div className="mb-2 md:mb-0">
                            <span className="text-gray-500 mr-3">Ticket ID: {booking.ticketId}</span>
                            <span className="font-medium text-gray-800">${(booking.price * booking.quantity).toFixed(2)}</span>
                          </div>
                          <div className="flex flex-col xs:flex-row gap-2">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                downloadMatchDetails(booking);
                              }}
                              className="flex items-center text-xs text-blue-600 hover:text-blue-800 border border-blue-200 rounded px-3 py-1 transition-colors hover:bg-blue-50"
                            >
                              <i className="fas fa-ticket-alt mr-1"></i> Download Ticket
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                downloadInvoice(booking);
                              }}
                              className="flex items-center text-xs text-green-600 hover:text-green-800 border border-green-200 rounded px-3 py-1 transition-colors hover:bg-green-50"
                            >
                              <i className="fas fa-file-invoice-dollar mr-1"></i> Download Invoice
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Booking Lists based on tab */
              <div className="max-w-4xl mx-auto">                <h2 className="text-xl font-bold text-gray-800 mb-6">Your Bookings</h2>
                  {bookingHistory.length === 0 ? (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                    <div className="text-gray-400 text-5xl mb-4">
                      <i className="fas fa-ticket-alt"></i>
                    </div>
                    <h3 className="text-lg font-medium text-gray-700 mb-2">No bookings found</h3>                    <p className="text-gray-500 mb-4">
                      You don't have any bookings yet.
                    </p>
                    <Link 
                      to="/" 
                      className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                      Browse Matches
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">                    {bookingHistory.map(booking => (
                      <div key={booking.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row justify-between mb-2">
                          <h3 className="font-semibold text-gray-800">{booking.match}</h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            booking.status === 'upcoming' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {booking.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                          <p className="text-gray-600">
                            <i className="fas fa-trophy mr-1 text-blue-600"></i> {booking.tournamentName}
                          </p>
                          <p className="text-gray-600">
                            <i className="fas fa-calendar-day mr-1 text-blue-600"></i> {booking.date}, {booking.time}
                          </p>
                          <p className="text-gray-600">
                            <i className="fas fa-map-marker-alt mr-1 text-blue-600"></i> {booking.venue}
                          </p>
                          <p className="text-gray-600">
                            <i className="fas fa-ticket-alt mr-1 text-blue-600"></i> {booking.categoryName} (Qty: {booking.quantity})
                          </p>
                        </div>
                        <div className="flex flex-wrap justify-between items-center mt-4 pt-3 border-t border-gray-100">
                          <div className="mb-2 md:mb-0">
                            <span className="text-gray-500 mr-3">Ticket ID: {booking.ticketId}</span>
                            <span className="font-medium text-gray-800">${(booking.price * booking.quantity).toFixed(2)}</span>
                          </div>
                          <div className="flex flex-col xs:flex-row gap-2">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                downloadMatchDetails(booking);
                              }}
                              className="flex items-center text-xs text-blue-600 hover:text-blue-800 border border-blue-200 rounded px-3 py-1 transition-colors hover:bg-blue-50"
                            >
                              <i className="fas fa-ticket-alt mr-1"></i> Download Ticket
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                downloadInvoice(booking);
                              }}
                              className="flex items-center text-xs text-green-600 hover:text-green-800 border border-green-200 rounded px-3 py-1 transition-colors hover:bg-green-50"
                            >
                              <i className="fas fa-file-invoice-dollar mr-1"></i> Download Invoice
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
