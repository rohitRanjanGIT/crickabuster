import React from 'react';
import QuantitySelector from './QuantitySelector';

const CategoryItem = ({ category, onQuantityChange, onRemove }) => {
  const handleDecrease = () => {
    if (category.quantity > 1) {
      onQuantityChange(category.id, category.quantity - 1);
    }
  };

  const handleIncrease = () => {
    onQuantityChange(category.id, category.quantity + 1);
  };

  const handleRemove = () => {
    onRemove(category.id);
  };

  const total = category.price * category.quantity;

  return (
    <div className="flex flex-col sm:flex-row justify-between sm:items-center bg-gray-50 p-3 rounded-lg">
      <div className="mb-2 sm:mb-0">
        <span className="font-medium text-gray-800">{category.name}</span>
        <p className="text-sm text-gray-600 mt-1">${category.price.toFixed(2)}/package</p>
      </div>
      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto">
        <span className="font-medium text-gray-800 mr-4">Total: ${total.toFixed(2)}</span>
        <QuantitySelector
          quantity={category.quantity}
          onDecrease={handleDecrease}
          onIncrease={handleIncrease}
          onRemove={handleRemove}
        />
      </div>
    </div>
  );
};

export default CategoryItem;