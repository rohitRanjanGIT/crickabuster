import React from 'react';

const AmenityList = ({ amenities }) => {
  return (
    <div className="border-t border-gray-200 pt-4 mt-4">
      <h4 className="font-semibold text-gray-700 mb-3">Common Package Includes (for this match)</h4>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {amenities.map((amenity, index) => (
          <div key={index} className="flex items-center">
            <i className={`${amenity.icon} w-5 h-5 mr-2 text-green-500`}></i>
            <span className="text-sm text-gray-700">{amenity.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AmenityList;