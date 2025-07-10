import React from 'react';

const AcceptUserMailTemplate = () => {
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
    email: 'rohit.sharma@example.com'
  };

  return (
    <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg">
      {/* Email Header with Cricket Theme */}
      <div className="bg-gradient-to-br from-green-600 to-green-500 text-white p-8 relative overflow-hidden">
        {/* Cricket Ball Pattern */}
        <div className="absolute -top-5 -right-5 w-20 h-20 rounded-full bg-white bg-opacity-10 border-2 border-white border-opacity-20"></div>
        <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-white bg-opacity-5"></div>
        
        {/* Success Animation Elements */}
        <div className="absolute top-4 right-12 w-3 h-3 bg-yellow-300 rounded-full opacity-70 animate-pulse"></div>
        <div className="absolute top-8 right-8 w-2 h-2 bg-yellow-200 rounded-full opacity-50 animate-pulse"></div>
        
        {/* Logo and Brand */}
        <div className="flex items-center mb-4 relative z-10">
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mr-4 text-2xl font-bold">
            🏏
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">CrickBuster</h1>
            <p className="text-sm opacity-90 mt-1">Your Cricket Experience Partner</p>
          </div>
        </div>
        
        {/* Success Header */}
        <div className="bg-white bg-opacity-15 backdrop-blur-sm p-6 rounded-xl mt-5 border border-white border-opacity-20">
          <h2 className="text-2xl font-bold flex items-center mb-2">
            <span className="mr-3 text-3xl">🎉</span>
            Booking Confirmed!
          </h2>
          <p className="text-lg opacity-95">Your tickets are ready to download</p>
        </div>
      </div>
      
      {/* Email Body */}
      <div className="p-8">
        <div className="mb-6">
          <p className="text-base text-gray-700 mb-4">
            Dear <span className="font-semibold">{userData.firstName}</span>,
          </p>
          <p className="text-base text-gray-600 leading-relaxed">
            Great news! Your booking has been confirmed successfully. Your tickets for the upcoming match are ready and attached to this email.
          </p>
        </div>
        
        {/* Ticket Information with QR Code */}
        <div className="mb-8 bg-gradient-to-br from-green-50 to-green-25 p-6 rounded-xl border border-green-200">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex-1 mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-green-700 mb-2 flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                Your Tickets Are Confirmed!
              </h3>
              <p className="text-gray-700 mb-2">Scan this code at the venue entrance</p>
              <p className="text-sm font-mono bg-white bg-opacity-70 px-3 py-1 rounded-lg inline-block">
                Booking ID: <span className="font-bold text-green-700">{bookingDetails.id}</span>
              </p>
            </div>
            
            {/* QR Code Placeholder */}
            <div className="w-32 h-32 bg-white border-2 border-green-300 border-dashed rounded-xl flex items-center justify-center shadow-sm">
              <div className="text-center">
                <div className="text-3xl mb-2">📱</div>
                <div className="text-xs text-gray-500 font-medium">QR CODE</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Match Details */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <span className="w-1 h-6 bg-green-500 rounded-full mr-3"></span>
            Match Details
          </h3>
          
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-sm font-medium text-gray-500">Match:</span>
                  <span className="text-sm font-bold text-gray-800 text-right">{bookingDetails.matchDetails}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-sm font-medium text-gray-500">Tournament:</span>
                  <span className="text-sm text-gray-800">{bookingDetails.tournamentName}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-sm font-medium text-gray-500">Date & Time:</span>
                  <span className="text-sm font-bold text-gray-800 text-right">{bookingDetails.date}, {bookingDetails.time}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-sm font-medium text-gray-500">Venue:</span>
                  <span className="text-sm text-gray-800 text-right">{bookingDetails.venue}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-sm font-medium text-gray-500">Gate:</span>
                  <span className="text-sm font-bold text-gray-800">{bookingDetails.gateNumber}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Ticket Details */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 rounded-full mr-3"></span>
            Ticket Details
          </h3>
          
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-blue-200">
                  <span className="text-sm font-medium text-blue-700">Ticket ID:</span>
                  <span className="text-sm font-mono text-gray-800">{bookingDetails.ticketId}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-blue-200">
                  <span className="text-sm font-medium text-blue-700">Category:</span>
                  <span className="text-sm text-gray-800">{bookingDetails.categoryName}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-blue-200">
                  <span className="text-sm font-medium text-blue-700">Quantity:</span>
                  <span className="text-sm text-gray-800">{bookingDetails.quantity}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-blue-200">
                  <span className="text-sm font-medium text-blue-700">Seat Numbers:</span>
                  <span className="text-sm font-bold text-gray-800">{bookingDetails.seatNumbers.join(', ')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Payment Summary */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <span className="w-1 h-6 bg-purple-500 rounded-full mr-3"></span>
            Payment Summary
          </h3>
          
          <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
            <div className="space-y-2">
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-purple-700">Subtotal:</span>
                <span className="text-sm text-gray-800">${bookingDetails.totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-purple-700">Service Fee:</span>
                <span className="text-sm text-gray-800">$10.00</span>
              </div>
              <div className="border-t border-purple-200 pt-2">
                <div className="flex justify-between items-center py-2">
                  <span className="text-base font-bold text-purple-800">Total Paid:</span>
                  <span className="text-lg font-bold text-gray-900">${(bookingDetails.totalAmount + 10).toFixed(2)}</span>
                </div>
              </div>
              <div className="bg-white bg-opacity-70 rounded-lg p-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-purple-700">Payment ID:</span>
                  <span className="text-xs font-mono text-gray-800">{bookingDetails.paymentId}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Important Information */}
        <div className="mb-8 bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 p-6 rounded-r-xl">
          <h3 className="text-lg font-semibold text-yellow-800 mb-4 flex items-center">
            <span className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-yellow-600 text-sm">⚠️</span>
            </span>
            Important Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3 mt-2"></span>
                <span className="text-sm text-yellow-800">Please arrive at least 45 minutes before the match starts.</span>
              </div>
              <div className="flex items-start">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3 mt-2"></span>
                <span className="text-sm text-yellow-800">Bring a valid ID that matches the name on the booking.</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3 mt-2"></span>
                <span className="text-sm text-yellow-800">Outside food and beverages are not allowed in the stadium.</span>
              </div>
              <div className="flex items-start">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3 mt-2"></span>
                <span className="text-sm text-yellow-800">Check the weather forecast and dress accordingly.</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="text-center">
          <p className="text-gray-600 mb-6">
            You can view your booking details and download your tickets anytime from your CrickBuster profile.
          </p>
          <a 
            href="#" 
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 inline-flex items-center shadow-lg"
          >
            <span className="mr-2">🎫</span>
            View My Tickets
          </a>
        </div>
      </div>
      
      {/* Support Section */}
      <div className="bg-gray-50 p-8 border-t border-gray-200">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center justify-center">
            <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-blue-600 text-sm">🤝</span>
            </span>
            Need Help?
          </h3>
          <p className="text-gray-600 mb-4">Have questions about your booking? Our support team is here to help!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:support@crickbuster.com" 
              className="flex items-center justify-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
            >
              <span className="mr-2">📧</span>
              support@crickbuster.com
            </a>
            <a 
              href="tel:+918002742538" 
              className="flex items-center justify-center px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
            >
              <span className="mr-2">📞</span>
              +91 800-CRICKET
            </a>
          </div>
        </div>
      </div>
      
      {/* Email Footer */}
      <div className="bg-gray-800 text-white p-6 text-center">
        <div className="flex items-center justify-center mb-4">
          <span className="text-2xl mr-2">🏏</span>
          <span className="font-bold text-lg">CrickBuster</span>
        </div>
        <p className="text-sm text-gray-300 mb-2">Thank you for choosing CrickBuster for your cricket experience!</p>
        <p className="text-xs text-gray-400">&copy; 2025 CrickBuster. All rights reserved.</p>
        <div className="mt-4 pt-4 border-t border-gray-700">
          <p className="text-xs text-gray-400">
            Bringing you closer to the game you love, one match at a time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AcceptUserMailTemplate;