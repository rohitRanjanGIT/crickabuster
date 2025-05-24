import React from 'react';

const QuantitySelector = ({ quantity, onDecrease, onIncrease, onRemove }) => {
  return (
    <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto">
      <div className="flex items-center border border-gray-300 rounded-md">
        <button 
          onClick={onDecrease}
          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
          disabled={quantity <= 1}
        >
          -
        </button>
        <span className="px-3 py-1 border-x border-gray-300">{quantity}</span>
        <button 
          onClick={onIncrease}
          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
        >
          +
        </button>
      </div>
      <button 
        onClick={onRemove}
        className="ml-4 text-red-500 hover:text-red-700"
      >
        <i className="fas fa-trash-alt"></i>
      </button>
    </div>
  );
};

export default QuantitySelector;