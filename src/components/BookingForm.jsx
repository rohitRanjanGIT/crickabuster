import React, { useState } from 'react';

const BookingForm = ({ cartData, onBack }) => {
  const [isMainTraveler, setIsMainTraveler] = useState(true);
  
  // Form states for main traveler/booker
  const [bookerDetails, setBookerDetails] = useState({
    firstName: '',
    lastName: '',
    nationality: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    email: '',
    phone: ''
  });
  
  // Form states for travelers (if booking for someone else)
  const [travelers, setTravelers] = useState([
    {
      firstName: '',
      lastName: '',
      nationality: '',
      dateOfBirth: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      country: '',
      zipCode: ''
    }
  ]);

  // Handle input change for booker details
  const handleBookerChange = (e) => {
    const { name, value } = e.target;
    setBookerDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle input change for traveler details
  const handleTravelerChange = (index, e) => {
    const { name, value } = e.target;
    setTravelers(prev => {
      const newTravelers = [...prev];
      newTravelers[index] = {
        ...newTravelers[index],
        [name]: value
      };
      return newTravelers;
    });
  };

  // Generate ticket info from cart data
  const generateTicketInfo = () => {
    const ticketInfo = [];
    cartData.tournaments.forEach(tournament => {
      tournament.matches.forEach(match => {
        match.categories.forEach(category => {
          ticketInfo.push({
            matchName: `${match.team1} vs ${match.team2}`,
            category: category.name.split(' - ')[0],
            price: category.price,
            quantity: category.quantity
          });
        });
      });
    });
    return ticketInfo;
  };

  const ticketInfo = generateTicketInfo();

  return (
    <div className="lg:w-2/3">
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex items-center mb-6">
          <button 
            onClick={onBack}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <i className="fas fa-arrow-left mr-2"></i> Back to cart
          </button>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-6">How nice that you want to book!</h1>
        
        {/* Who are you booking for */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Who are you booking for?</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center">
              <input 
                type="radio" 
                id="main-traveler" 
                name="booking-for" 
                checked={isMainTraveler} 
                onChange={() => setIsMainTraveler(true)}
                className="mr-2 h-5 w-5 text-blue-600"
              />
              <label htmlFor="main-traveler" className="text-gray-700">I'm the main traveller</label>
            </div>
            <div className="flex items-center">
              <input 
                type="radio" 
                id="someone-else" 
                name="booking-for" 
                checked={!isMainTraveler} 
                onChange={() => setIsMainTraveler(false)}
                className="mr-2 h-5 w-5 text-blue-600"
              />
              <label htmlFor="someone-else" className="text-gray-700">I'm booking for somebody else</label>
            </div>
          </div>
        </div>
        
        {/* Booker details section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-gray-700">Your details</h2>
            {!isMainTraveler && (
              <button 
                type="button"
                className="text-blue-600 hover:text-blue-800"
                onClick={() => {
                  setBookerDetails({
                    firstName: '',
                    lastName: '',
                    nationality: '',
                    addressLine1: '',
                    addressLine2: '',
                    city: '',
                    state: '',
                    country: '',
                    zipCode: '',
                    email: '',
                    phone: ''
                  });
                }}
              >
                <i className="fas fa-redo-alt mr-1"></i> Reset
              </button>
            )}
          </div>
          <p className="text-gray-500 text-sm mb-4">
            {!isMainTraveler ? 'Please enter your details to complete the booking for someone else.' : ''}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                id="firstName" 
                name="firstName"
                value={bookerDetails.firstName}
                onChange={handleBookerChange}
                placeholder="First name"
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
                value={bookerDetails.lastName}
                onChange={handleBookerChange}
                placeholder="Last name"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 mb-1">
              Nationality <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              id="nationality" 
              name="nationality"
              value={bookerDetails.nationality}
              onChange={handleBookerChange}
              placeholder="Nationality A"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700 mb-1">
                Address line 1 <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                id="addressLine1" 
                name="addressLine1"
                value={bookerDetails.addressLine1}
                onChange={handleBookerChange}
                placeholder="Address"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700 mb-1">
                Address line 2
              </label>
              <input 
                type="text" 
                id="addressLine2" 
                name="addressLine2"
                value={bookerDetails.addressLine2}
                onChange={handleBookerChange}
                placeholder="Address"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                City <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                id="city" 
                name="city"
                value={bookerDetails.city}
                onChange={handleBookerChange}
                placeholder="Name Of City"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                State <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                id="state" 
                name="state"
                value={bookerDetails.state}
                onChange={handleBookerChange}
                placeholder="Name of State"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                Country <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                id="country" 
                name="country"
                value={bookerDetails.country}
                onChange={handleBookerChange}
                placeholder="Select Country"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                Zip Code <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                id="zipCode" 
                name="zipCode"
                value={bookerDetails.zipCode}
                onChange={handleBookerChange}
                placeholder="000000"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
          </div>
        </div>
        
        {/* Contact Information */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">How can we reach you?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                E-mail address <span className="text-red-500">*</span>
              </label>
              <input 
                type="email" 
                id="email" 
                name="email"
                value={bookerDetails.email}
                onChange={handleBookerChange}
                placeholder="Email address"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Telephone number <span className="text-red-500">*</span>
              </label>
              <input 
                type="tel" 
                id="phone" 
                name="phone"
                value={bookerDetails.phone}
                onChange={handleBookerChange}
                placeholder="0000 000 000"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                We only use your telephone number in case of problems with your booking.
              </p>
            </div>
          </div>
        </div>
        
        {/* Traveler Details Section (only if not main traveler) */}
        {!isMainTraveler && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Fill in the details of the traveler(s)</h2>
            
            {ticketInfo.map((ticket, index) => (
              <div key={index} className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-2">Traveler {index + 1}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  {ticket.matchName} - {ticket.category} @ ${ticket.price.toFixed(2)}/ticket
                </p>
                
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor={`traveler-${index}-firstName`} className="block text-sm font-medium text-gray-700 mb-1">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        id={`traveler-${index}-firstName`} 
                        name="firstName"
                        value={travelers[index]?.firstName || ''}
                        onChange={(e) => handleTravelerChange(index, e)}
                        placeholder="First name"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor={`traveler-${index}-lastName`} className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        id={`traveler-${index}-lastName`} 
                        name="lastName"
                        value={travelers[index]?.lastName || ''}
                        onChange={(e) => handleTravelerChange(index, e)}
                        placeholder="Last name"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor={`traveler-${index}-nationality`} className="block text-sm font-medium text-gray-700 mb-1">
                        Nationality <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        id={`traveler-${index}-nationality`} 
                        name="nationality"
                        value={travelers[index]?.nationality || ''}
                        onChange={(e) => handleTravelerChange(index, e)}
                        placeholder="Nationality A"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor={`traveler-${index}-dob`} className="block text-sm font-medium text-gray-700 mb-1">
                        Date of Birth(Optional)
                      </label>
                      <input 
                        type="text" 
                        id={`traveler-${index}-dob`} 
                        name="dateOfBirth"
                        value={travelers[index]?.dateOfBirth || ''}
                        onChange={(e) => handleTravelerChange(index, e)}
                        placeholder="dd-mm-yyyy"
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                  </div>
                  
                  {/* Additional fields for traveler's address */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor={`traveler-${index}-addressLine1`} className="block text-sm font-medium text-gray-700 mb-1">
                        Address line 1 <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        id={`traveler-${index}-addressLine1`} 
                        name="addressLine1"
                        value={travelers[index]?.addressLine1 || ''}
                        onChange={(e) => handleTravelerChange(index, e)}
                        placeholder="Address"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor={`traveler-${index}-addressLine2`} className="block text-sm font-medium text-gray-700 mb-1">
                        Address line 2
                      </label>
                      <input 
                        type="text" 
                        id={`traveler-${index}-addressLine2`} 
                        name="addressLine2"
                        value={travelers[index]?.addressLine2 || ''}
                        onChange={(e) => handleTravelerChange(index, e)}
                        placeholder="Address line 2"
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor={`traveler-${index}-city`} className="block text-sm font-medium text-gray-700 mb-1">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        id={`traveler-${index}-city`} 
                        name="city"
                        value={travelers[index]?.city || ''}
                        onChange={(e) => handleTravelerChange(index, e)}
                        placeholder="City"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor={`traveler-${index}-state`} className="block text-sm font-medium text-gray-700 mb-1">
                        State <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        id={`traveler-${index}-state`} 
                        name="state"
                        value={travelers[index]?.state || ''}
                        onChange={(e) => handleTravelerChange(index, e)}
                        placeholder="State"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor={`traveler-${index}-country`} className="block text-sm font-medium text-gray-700 mb-1">
                        Country <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        id={`traveler-${index}-country`} 
                        name="country"
                        value={travelers[index]?.country || ''}
                        onChange={(e) => handleTravelerChange(index, e)}
                        placeholder="Country"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor={`traveler-${index}-zipCode`} className="block text-sm font-medium text-gray-700 mb-1">
                        Zip Code <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        id={`traveler-${index}-zipCode`} 
                        name="zipCode"
                        value={travelers[index]?.zipCode || ''}
                        onChange={(e) => handleTravelerChange(index, e)}
                        placeholder="Zip Code"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Event Organizer Restrictions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Event organizer restrictions</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600 text-sm pl-1">
            <li>Your reservation is only final after payment has been received. The event organizer applies the following restrictions to your selection.</li>
            <li>You can use multiple vouchers and/or one coupon code for a single order.</li>
            <li>Name changes on tickets are not allowed to limit the resale.</li>
            <li>Fans with a pink, British nationality are not allowed to sit in the home sector.</li>
            <li>Further conditions of identification will be required for any tickets in the above. Additionally, some event organizers might require a copied piece of identification when buying the tickets.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
