import React from 'react';

const RejectUserMailTemplate = () => {
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
    // Failure reason (one of the following will be used)
    failureReason: 'session_expired',  // or 'payment_failed', 'tickets_unavailable'
  };

  // Sample user data
  const userData = {
    firstName: 'Rohit',
    lastName: 'Sharma',
    email: 'rohit.sharma@example.com'
  };

  // Get the appropriate failure message based on the reason
  const getFailureMessage = () => {
    switch(bookingDetails.failureReason) {
      case 'session_expired':
        return {
          title: 'Session Expired',
          description: 'Your booking session timed out before the payment was completed. For security reasons, we limit the time allowed to complete a transaction.',
          solution: 'Please try booking again. Our system holds your tickets for 10 minutes during the checkout process.'
        };
      case 'payment_failed':
        return {
          title: 'Payment Failed',
          description: 'We couldn\'t process your payment. This could be due to insufficient funds, incorrect card details, or your bank declining the transaction.',
          solution: 'Please check your payment details and try again with a different payment method if necessary.'
        };
      case 'tickets_unavailable':
        return {
          title: 'Tickets No Longer Available',
          description: 'We\'re sorry, but the tickets you selected were purchased by someone else before your transaction was completed.',
          solution: 'Please check if other ticket categories are still available for this match or browse other upcoming matches.'
        };
      default:
        return {
          title: 'Booking Unsuccessful',
          description: 'We encountered an unexpected issue while processing your booking.',
          solution: 'Please try again later or contact our customer support for assistance.'
        };
    }
  };

  const failureInfo = getFailureMessage();

  return (
    <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg">
      {/* Email Header with Cricket Theme */}
      <div className="bg-gradient-to-br from-blue-700 to-blue-500 text-white p-8 relative overflow-hidden">
        {/* Cricket Ball Pattern */}
        <div className="absolute -top-5 -right-5 w-20 h-20 rounded-full bg-white bg-opacity-10 border-2 border-white border-opacity-20"></div>
        <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-white bg-opacity-5"></div>
        
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
        
        {/* Main Header */}
        <div className="bg-red-600 bg-opacity-90 p-4 rounded-lg mt-5">
          <h2 className="text-xl font-bold flex items-center">
            <span className="mr-2">❌</span>
            Booking Unsuccessful
          </h2>
          <p className="text-base opacity-95 mt-1">{failureInfo.title}</p>
        </div>
      </div>
      
      {/* Email Body */}
      <div className="p-8">
        <div className="mb-6">
          <p className="text-base text-gray-700 mb-4">
            Dear <span className="font-semibold">{userData.firstName}</span>,
          </p>
          <p className="text-base text-gray-600 leading-relaxed">
            We're sorry to inform you that your recent booking attempt was unsuccessful. Don't worry – no charges have been made to your account.
          </p>
        </div>
        
        {/* Failure Information */}
        <div className="mb-8 bg-gradient-to-br from-red-50 to-red-25 p-6 rounded-xl border border-red-200 relative">
          <div className="absolute top-4 right-4 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-red-600 text-sm">⚠️</span>
          </div>
          
          <h3 className="text-lg font-semibold text-red-700 mb-3 flex items-center">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
            {failureInfo.title}
          </h3>
          <p className="text-gray-700 mb-4 leading-relaxed">{failureInfo.description}</p>
          <div className="bg-white bg-opacity-70 p-3 rounded-lg">
            <p className="font-medium text-gray-800 text-sm">
              <span className="text-blue-600">💡 Solution:</span> {failureInfo.solution}
            </p>
          </div>
        </div>
        
        {/* Booking Attempt Details */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 rounded-full mr-3"></span>
            Booking Attempt Details
          </h3>
          
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-sm font-medium text-gray-500">Reference ID:</span>
                  <span className="text-sm font-semibold text-gray-800 font-mono">{bookingDetails.id}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-sm font-medium text-gray-500">Attempt Time:</span>
                  <span className="text-sm text-gray-800">{currentDateTime}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-sm font-medium text-gray-500">Match:</span>
                  <span className="text-sm text-gray-800 text-right">{bookingDetails.matchDetails}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-sm font-medium text-gray-500">Tournament:</span>
                  <span className="text-sm text-gray-800">{bookingDetails.tournamentName}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-sm font-medium text-gray-500">Date & Time:</span>
                  <span className="text-sm text-gray-800">{bookingDetails.date}, {bookingDetails.time}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-sm font-medium text-gray-500">Venue:</span>
                  <span className="text-sm text-gray-800 text-right">{bookingDetails.venue}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-sm font-medium text-gray-500">Category:</span>
                  <span className="text-sm text-gray-800 text-right">{bookingDetails.categoryName}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-sm font-medium text-gray-500">Quantity:</span>
                  <span className="text-sm text-gray-800">{bookingDetails.quantity}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-300">
              <div className="flex justify-between items-center">
                <span className="text-base font-semibold text-gray-700">Total Amount:</span>
                <span className="text-lg font-bold text-gray-900">${(bookingDetails.totalAmount + 10).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* What happens next section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <span className="w-1 h-6 bg-green-500 rounded-full mr-3"></span>
            What Happens Next?
          </h3>
          
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <div className="flex items-start mb-4">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                <span className="text-green-600 text-sm">✅</span>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {bookingDetails.failureReason === 'payment_failed' 
                  ? 'No charge has been made to your payment method for this unsuccessful booking attempt.'
                  : 'Your payment was not processed, so you haven\'t been charged for this booking.'}
              </p>
            </div>
            
            <div className="bg-white bg-opacity-70 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                <span className="text-blue-500 mr-2">🎯</span>
                Available Options:
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  Try booking again with the link below
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  Check other ticket categories or matches
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  Contact our customer support if you need assistance
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* CTA Buttons */}
        <div className="text-center mb-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center shadow-md"
            >
              <span className="mr-2">🎫</span>
              Try Booking Again
            </a>
            <a 
              href="#" 
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center shadow-md"
            >
              <span className="mr-2">🏏</span>
              View Other Matches
            </a>
          </div>
        </div>
      </div>
      
      {/* Help Section */}
      <div className="bg-gray-50 p-8 border-t border-gray-200">
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-blue-600 text-sm">🤝</span>
            </span>
            Need Help?
          </h3>
          <p className="text-gray-600 mb-4">Our customer support team is ready to assist you:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center p-3 bg-blue-50 rounded-lg">
              <span className="text-blue-600 mr-2">📧</span>
              <div>
                <p className="text-xs text-gray-500 font-medium">Email</p>
                <p className="text-sm font-semibold text-gray-800">support@crickbuster.com</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-green-50 rounded-lg">
              <span className="text-green-600 mr-2">📞</span>
              <div>
                <p className="text-xs text-gray-500 font-medium">Phone</p>
                <p className="text-sm font-semibold text-gray-800">+91 800-CRICKET</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-purple-50 rounded-lg">
              <span className="text-purple-600 mr-2">💬</span>
              <div>
                <p className="text-xs text-gray-500 font-medium">Live Chat</p>
                <p className="text-sm font-semibold text-gray-800">9 AM - 9 PM IST</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Email Footer */}
      <div className="bg-gray-800 text-white p-6 text-center">
        <div className="flex items-center justify-center mb-4">
          <span className="text-2xl mr-2">🏏</span>
          <span className="font-bold text-lg">CrickBuster</span>
        </div>
        <p className="text-sm text-gray-300 mb-2">This email was sent regarding your booking attempt on CrickBuster.</p>
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

export default RejectUserMailTemplate;