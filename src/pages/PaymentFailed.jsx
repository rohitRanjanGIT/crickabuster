import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PaymentFailed = () => {
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    // Trigger animation after component mount
    setTimeout(() => {
      setAnimate(true);
    }, 300);
  }, []);
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
                style={{ width: '66%' }}
              ></div>
            </div>
            <span className="ml-4 text-sm font-medium text-gray-600">
              Step 3 of 3: Payment Failed
            </span>
          </div>
        </header>
      </div>
      
      {/* Failed Card - Landscape for desktop */}
      <div className="container mx-auto max-w-5xl">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 md:flex">
          {/* Left side - Animation and Title */}
          <div className="md:w-1/3 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-100 pb-6 md:pb-0 md:pr-8">
            {/* Error Animation */}
            <div className="mb-6 flex justify-center">
              <div className={`error-mark ${animate ? 'animate' : ''}`}>
                <div className="error-icon">
                  <span className="icon-line line-left"></span>
                  <span className="icon-line line-right"></span>
                  <div className="icon-circle"></div>
                  <div className="icon-fix"></div>
                </div>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">Payment Failed</h1>
            <p className="text-red-600 font-medium text-center">Your payment could not be processed</p>
          </div>
          
          {/* Right side - Error Details */}
          <div className="md:w-2/3 md:pl-8 pt-6 md:pt-0">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Payment Issue</h2>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="mb-4">
                <h3 className="font-medium text-gray-800 mb-2">Possible reasons:</h3>
                <ul className="text-sm text-gray-600 space-y-2 pl-5 list-disc">
                  <li>Insufficient funds in your account</li>
                  <li>Card details entered incorrectly</li>
                  <li>Transaction declined by your bank</li>
                  <li>Network or connectivity issues</li>
                </ul>
              </div>
              
              <p className="text-sm text-gray-600 mt-4">
                Don't worry, your booking is saved but not confirmed. You can try again with a different payment method.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Link 
                to="/cart"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center font-medium transition duration-200"
              >
                <i className="fas fa-shopping-cart mr-2"></i>
                Return to Cart
              </Link>
              
              <button 
                onClick={() => {
                  // Would normally retry payment
                  alert('Retrying payment...');
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center font-medium transition duration-200"
              >
                <i className="fas fa-redo mr-2"></i>
                Try Again
              </button>
            </div>
            
            <div className="mt-6 text-sm text-gray-500 border-t border-gray-200 pt-4">
              <p className="mb-2">Need help? Contact our support team:</p>
              <p><i className="fas fa-envelope mr-1"></i> support@crickbuster.com</p>
              <p><i className="fas fa-phone mr-1"></i> +1 (555) 123-4567</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
