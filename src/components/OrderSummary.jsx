import React, { useState } from 'react';

const OrderSummary = ({ tournaments, serviceFee = 10.00, currentStep = 1, onProceedToBooking }) => {
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  
  // Calculate totals
  const calculateSubtotal = () => {
    let subtotal = 0;
    tournaments.forEach(tournament => {
      tournament.matches.forEach(match => {
        match.categories.forEach(category => {
          subtotal += category.price * category.quantity;
        });
      });
    });
    return subtotal;
  };

  const subtotal = calculateSubtotal();
  const total = subtotal + serviceFee;

  return (
    <div className="lg:w-1/3">
      <div className="bg-white rounded-xl shadow-md p-6 sticky top-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
        
        <div className="space-y-3">
          {tournaments.map((tournament) => (
            <div key={tournament.id}>
              <h3 className="text-md font-semibold text-gray-800 mb-2">{tournament.name}</h3>
              {tournament.matches.map((match) => (
                match.categories.map((category) => (
                  <div key={category.id} className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">
                      {match.team1.substring(0, 3)} vs {match.team2.substring(0, 3)} - {category.name.split(' ')[0]} ({category.quantity} x ${category.price.toFixed(2)})
                    </span>
                    <span className="font-medium text-gray-700">${(category.price * category.quantity).toFixed(2)}</span>
                  </div>
                ))
              ))}
            </div>
          ))}
          
          <div className="border-t border-gray-200 pt-3 mt-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Items Subtotal</span>
              <span className="font-medium text-gray-800">${subtotal.toFixed(2)}</span>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Service Fee</span>
            <span className="font-medium text-gray-800">${serviceFee.toFixed(2)}</span>
          </div>
          
          <div className="border-t border-gray-200 pt-3 mt-3">
            <div className="flex justify-between">
              <span className="text-lg font-bold text-gray-800">Total</span>
              <span className="text-lg font-bold text-blue-600">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>        {/* Coupon/Voucher Code Section (only visible on step 2) */}
        {currentStep === 2 && (
          <div className="mt-6">
            <h3 className="font-semibold text-gray-800 mb-2">Do you have a coupon code or voucher code?</h3>
            <div className="flex">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="e.g. FTKJH99T39BZ"
                className="flex-grow p-2 border border-gray-300 rounded-l"
              />
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700"
                onClick={() => setIsApplyingCoupon(true)}
              >
                Apply Code
              </button>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              <p>Information:</p>
              <ul className="list-disc list-inside pl-1">
                <li>You can use multiple vouchers and/or one coupon code for a single order.</li>
                <li>When there is still an amount left after your order, than that amount can be used with the same code on a different order.</li>
              </ul>
            </div>
          </div>
        )}

        <div className="mt-8">
          <div className="flex items-center mb-4">
            <input 
              type="checkbox" 
              id="terms" 
              checked={termsAgreed}
              onChange={() => setTermsAgreed(!termsAgreed)}
              className="rounded text-blue-600 focus:ring-blue-600"
            />
            <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
              I agree to the <a href="#" className="text-blue-600 hover:underline">Terms & Conditions</a>
            </label>
          </div>
          
          <button 
            className={`w-full ${termsAgreed ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-400 cursor-not-allowed'} text-white font-bold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center`}
            disabled={!termsAgreed}
            onClick={currentStep === 1 ? onProceedToBooking : undefined}
          >
            {currentStep === 1 ? 'Proceed to Booking' : 'Proceed to Payment'}
            <i className="fas fa-arrow-right ml-2"></i>
          </button>
          
          <p className="text-xs text-gray-500 mt-3 text-center">
            Your card will not be charged until you complete the booking process
          </p>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6">
          <h3 className="font-semibold text-gray-800 mb-3">Need Help?</h3>
          <div className="flex items-center text-gray-600 mb-2">
            <i className="fas fa-phone-alt mr-3 text-blue-600"></i>
            <span>+1 (555) 123-4567</span>
          </div>
          <div className="flex items-center text-gray-600">
            <i className="fas fa-envelope mr-3 text-blue-600"></i>
            <span>support@sportstourism.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;