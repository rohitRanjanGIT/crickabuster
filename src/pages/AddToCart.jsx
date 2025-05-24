import React, { useState } from 'react';
import CartHeader from '../components/CartHeader';
import TournamentGroup from '../components/TournamentGroup';
import OrderSummary from '../components/OrderSummary';
import BookingForm from '../components/BookingForm';

const AddToCart = () => {
  const [currentStep, setCurrentStep] = useState(1);
  // Sample data that would normally come from an API or Redux store
  const [cartData, setCartData] = useState({
    tournaments: [
      {
        id: "t1",
        name: "Tata IPL 2025",
        description: "Season 18 • 10 Teams • 74 T20 Matches",
        matches: [
          {
            id: "m1",
            team1: "Delhi Capitals",
            team2: "Mumbai Indians",
            date: "April 5, 2025",
            time: "7:30 PM",
            venue: "Arun Jaitley Stadium, Delhi",
            categories: [
              {
                id: "c1",
                name: "Category A - Premium Stand",
                price: 102,
                quantity: 2
              },
              {
                id: "c2",
                name: "Category B - Grand Stand",
                price: 62,
                quantity: 1
              }
            ],
            amenities: [
              { icon: "fas fa-umbrella-beach", text: "Lounge access" },
              { icon: "fas fa-hotel", text: "Hotel stay (1 night)" },
              { icon: "fas fa-map-marked-alt", text: "City tour package" },
              { icon: "fas fa-utensils", text: "Complimentary dinner" },
              { icon: "fas fa-car", text: "Stadium transfer" }
            ]
          },
          {
            id: "m2",
            team1: "Royal Challengers Bangalore",
            team2: "Chennai Super Kings",
            date: "April 12, 2025",
            time: "7:30 PM",
            venue: "M. Chinnaswamy Stadium, Bangalore",
            categories: [
              {
                id: "c3",
                name: "Category C - Standard Stand",
                price: 38.40,
                quantity: 3
              }
            ],
            amenities: [
              { icon: "fas fa-umbrella-beach", text: "Lounge access" },
              { icon: "fas fa-hotel", text: "Hotel stay (1 night)" },
              { icon: "fas fa-utensils", text: "Complimentary dinner" }
            ]
          }
        ]
      },
      {
        id: "t2",
        name: "ICC World Test Championship Final 2025",
        description: "Global Tournament • 12 Teams • 48 Matches",
        matches: [
          {
            id: "m3",
            team1: "India",
            team2: "Australia",
            date: "October 28, 2025",
            time: "2:00 PM",
            venue: "Melbourne Cricket Ground, Melbourne",
            categories: [
              {
                id: "c4",
                name: "Gold Tier - Premium Seating",
                price: 120,
                quantity: 2
              }
            ],
            amenities: [
              { icon: "fas fa-couch", text: "Premium Seating" },
              { icon: "fas fa-gift", text: "Official Merchandise" },
              { icon: "fas fa-utensils", text: "Food & Beverage Voucher" }
            ]
          }
        ]
      }
    ],
    serviceFee: 10.00
  });

  // Handle quantity change for a category
  const handleQuantityChange = (tournamentId, matchId, categoryId, newQuantity) => {
    setCartData(prevData => {
      const newData = { ...prevData };
      const tournament = newData.tournaments.find(t => t.id === tournamentId);
      if (tournament) {
        const match = tournament.matches.find(m => m.id === matchId);
        if (match) {
          const category = match.categories.find(c => c.id === categoryId);
          if (category) {
            category.quantity = newQuantity;
          }
        }
      }
      return newData;
    });
  };

  // Handle removing a category
  const handleRemoveCategory = (tournamentId, matchId, categoryId) => {
    setCartData(prevData => {
      const newData = { ...prevData };
      const tournament = newData.tournaments.find(t => t.id === tournamentId);
      if (tournament) {
        const match = tournament.matches.find(m => m.id === matchId);
        if (match) {
          match.categories = match.categories.filter(c => c.id !== categoryId);
          // If no categories left in match, remove match
          if (match.categories.length === 0) {
            tournament.matches = tournament.matches.filter(m => m.id !== matchId);
            // If no matches left in tournament, remove tournament
            if (tournament.matches.length === 0) {
              newData.tournaments = newData.tournaments.filter(t => t.id !== tournamentId);
            }
          }
        }
      }
      return newData;
    });
  };
  // Handle proceeding to next step
  const handleProceedToBooking = () => {
    setCurrentStep(2);
  };

  // Handle going back to cart
  const handleBackToCart = () => {
    setCurrentStep(1);
  };

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <CartHeader currentStep={currentStep} />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content - Conditionally render cart or booking form */}
          {currentStep === 1 ? (
            /* Cart Content */
            <div className="lg:w-2/3">
              {/* Header for Tournament Selections */}
              <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">Your Tournament Selections</h2>
                    <p className="text-gray-500">Review packages for each selected tournament</p>
                  </div>
                  <span className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
                    {cartData.tournaments.length} Tournaments
                  </span>
                </div>
              </div>

              {/* Tournament groups */}
              {cartData.tournaments.map(tournament => (
                <TournamentGroup
                  key={tournament.id}
                  tournament={tournament}
                  onQuantityChange={(matchId, categoryId, quantity) => 
                    handleQuantityChange(tournament.id, matchId, categoryId, quantity)}
                  onRemove={(matchId, categoryId) => 
                    handleRemoveCategory(tournament.id, matchId, categoryId)}
                />
              ))}
            </div>
          ) : (
            /* Booking Form */
            <BookingForm cartData={cartData} onBack={handleBackToCart} />
          )}

          {/* Order Summary */}
          <OrderSummary 
            tournaments={cartData.tournaments} 
            serviceFee={cartData.serviceFee} 
            currentStep={currentStep} 
            onProceedToBooking={handleProceedToBooking} 
          />
        </div>
      </div>
    </div>
  );
};

export default AddToCart;