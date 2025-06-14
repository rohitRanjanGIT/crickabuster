import React from 'react';

const CartHeader = ({ currentStep = 1 }) => {
  return (
    <header className="mb-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Tournament Experience</h1>
      <div className="flex items-center">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-500 h-2.5 rounded-full" 
            style={{ width: currentStep === 1 ? '33%' : '66%' }}
          ></div>
        </div>
        <span className="ml-4 text-sm font-medium text-gray-600">
          {currentStep === 1 
            ? "Step 1 of 3: Review Your Cart" 
            : "Step 2 of 3: Booking Details"}
        </span>
      </div>
    </header>
  );
};

export default CartHeader;
