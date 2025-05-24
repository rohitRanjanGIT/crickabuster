import React from 'react';
import CategoryItem from './CategoryItem';
import AmenityList from './AmenityList';

const MatchCard = ({ match, onQuantityChange, onRemove }) => {  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-6 transition-all duration-200 hover:transform hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-4">
        <h3 className="font-bold text-lg text-gray-800 mb-1">
          <span>{match.team1}</span><br />
          <span className="text-gray-500 mx-2">vs</span><br />
          <span>{match.team2}</span>
        </h3>
        <p className="text-gray-600 mt-2">
          <i className="fas fa-calendar-day mr-2 text-blue-600"></i>
          {match.date} • {match.time}
        </p>
        <p className="text-gray-600">
          <i className="fas fa-map-marker-alt mr-2 text-blue-600"></i>
          {match.venue}
        </p>
      </div>

      <div className="border-t border-gray-200 pt-4 mt-4">
        <h4 className="font-semibold text-gray-700 mb-3">Package Categories</h4>
        <div className="space-y-4">
          {match.categories.map((category) => (
            <CategoryItem
              key={category.id}
              category={category}
              onQuantityChange={(categoryId, newQuantity) => onQuantityChange(match.id, categoryId, newQuantity)}
              onRemove={(categoryId) => onRemove(match.id, categoryId)}
            />
          ))}
        </div>
      </div>

      <AmenityList amenities={match.amenities} />
    </div>
  );
};

export default MatchCard;