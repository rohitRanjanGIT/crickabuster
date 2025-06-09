import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const PaymentSuccess = () => {
  const [animate, setAnimate] = useState(false);
  const location = useLocation();
  const bookingDetails = location.state?.bookingDetails || {
    id: 'TICK-' + Math.floor(Math.random() * 1000000),
    matchDetails: 'Delhi Capitals vs Mumbai Indians',
    venue: 'Arun Jaitley Stadium, Delhi',
    date: 'April 5, 2025',
    time: '7:30 PM',
    quantity: 3,
    totalAmount: 312.00
  };
  
  useEffect(() => {
    // Trigger animation after component mount
    setTimeout(() => {
      setAnimate(true);
    }, 300);
  }, []);
  
  // Function to download match tickets
  const downloadTickets = () => {
    // In a real application, this would create a proper PDF or formatted ticket
    const content = `
MATCH TICKET
===========
Booking ID: ${bookingDetails.id}
Match: ${bookingDetails.matchDetails}
Venue: ${bookingDetails.venue}
Date: ${bookingDetails.date}
Time: ${bookingDetails.time}
Quantity: ${bookingDetails.quantity}
Total Amount: $${bookingDetails.totalAmount.toFixed(2)}

ADMIT ONE
Valid only with confirmation ID: ${bookingDetails.id}
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `Tickets_${bookingDetails.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  // Function to download payment invoice
  const downloadInvoice = () => {
    // In a real application, this would create a proper PDF invoice
    const content = `
PAYMENT INVOICE
==============
Invoice #: INV-${bookingDetails.id}
Date: ${new Date().toLocaleDateString()}

Transaction Details:
Booking ID: ${bookingDetails.id}
Payment Date: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}
Payment Method: Credit Card (ending in ****4242)

Match Details:
Match: ${bookingDetails.matchDetails}
Date: ${bookingDetails.date}
Time: ${bookingDetails.time}
Venue: ${bookingDetails.venue}

Ticket Details:
Quantity: ${bookingDetails.quantity}
Price per ticket: $${(bookingDetails.totalAmount / bookingDetails.quantity).toFixed(2)}

Subtotal: $${bookingDetails.totalAmount.toFixed(2)}
Service Fee: $10.00
Total Amount: $${(bookingDetails.totalAmount + 10).toFixed(2)}

Thank you for booking with CrickBuster!
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `Invoice_${bookingDetails.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col p-4">
      {/* Tournament Experience Steps - Matched with CartHeader design */}
      <div className="container mx-auto max-w-5xl mb-6">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Tournament Experience</h1>
          <div className="flex items-center">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-500 h-2.5 rounded-full" 
                style={{ width: '100%' }}
              ></div>
            </div>
            <span className="ml-4 text-sm font-medium text-gray-600">
              Step 3 of 3: Payment Complete
            </span>
          </div>
        </header>
      </div>
      
      {/* Success Card - Landscape for desktop */}
      <div className="container mx-auto max-w-5xl">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 md:flex">
          {/* Left side - Animation and Title */}
          <div className="md:w-1/3 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-100 pb-6 md:pb-0 md:pr-8">
            {/* Success Animation */}
            <div className="mb-6 flex justify-center">
              <div className={`success-checkmark ${animate ? 'animate' : ''}`}>
                <div className="check-icon">
                  <span className="icon-line line-tip"></span>
                  <span className="icon-line line-long"></span>
                  <div className="icon-circle"></div>
                  <div className="icon-fix"></div>
                </div>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">Payment Successful!</h1>
            <p className="text-green-600 font-medium text-center">Your booking has been confirmed</p>
          </div>
          
          {/* Right side - Booking Details */}
          <div className="md:w-2/3 md:pl-8 pt-6 md:pt-0">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Booking Details</h2>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border-b md:border-b-0 pb-2 md:pb-0 md:border-r border-gray-200">
                  <span className="text-sm text-gray-500">Booking ID:</span>
                  <span className="block font-medium text-gray-800">{bookingDetails.id}</span>
                </div>
                
                <div className="border-b md:border-b-0 pb-2 md:pb-0">
                  <span className="text-sm text-gray-500">Match:</span>
                  <span className="block font-medium text-gray-800">{bookingDetails.matchDetails}</span>
                </div>
                
                <div className="border-b md:border-b-0 pb-2 md:pb-0 md:border-r border-gray-200">
                  <span className="text-sm text-gray-500">Venue:</span>
                  <span className="block font-medium text-gray-800">{bookingDetails.venue}</span>
                </div>
                
                <div className="border-b md:border-b-0 pb-2 md:pb-0">
                  <span className="text-sm text-gray-500">Date & Time:</span>
                  <span className="block font-medium text-gray-800">
                    {bookingDetails.date}, {bookingDetails.time}
                  </span>
                </div>
                
                <div className="border-b md:border-b-0 pb-2 md:pb-0 md:border-r border-gray-200">
                  <span className="text-sm text-gray-500">Tickets:</span>
                  <span className="block font-medium text-gray-800">{bookingDetails.quantity}</span>
                </div>
                
                <div>
                  <span className="text-sm text-gray-500">Amount Paid:</span>
                  <span className="block font-medium text-gray-800">${bookingDetails.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
              <div className="flex flex-wrap gap-3">
              <Link 
                to="/profile"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center font-medium transition duration-200"
              >
                <i className="fas fa-user mr-2"></i>
                View in Profile
              </Link>
                <button 
                onClick={downloadTickets}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center font-medium transition duration-200"
              >
                <i className="fas fa-ticket-alt mr-2"></i>
                Download Tickets
              </button>

              <button 
                onClick={downloadInvoice}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg flex items-center font-medium transition duration-200"
              >
                <i className="fas fa-file-invoice-dollar mr-2"></i>
                Download Invoice
              </button>
            </div>
            
            <p className="mt-6 text-sm text-gray-500">
              A confirmation email has been sent to your registered email address
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
