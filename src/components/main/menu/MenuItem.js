import React, { useState, useContext } from "react";
import { CartContext } from "../../../contextproviders/Cartcontext";

const MenuItem = ({ item, onAddToCart }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const { cart } = useContext(CartContext);

  const handleOptionChange = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((opt) => opt !== option)
        : [...prev, option]
    );
  };

  return (
    <div className="border p-4 rounded shadow-md mb-4">
      <h2 className="text-xl font-semibold">{item.name}</h2>
      <p className="text-gray-700">Category: {item.category}</p>
      <p className="text-gray-700">Price: ${item.price.toFixed(2)}</p>
      <div className="text-gray-700">
        <p>Nutritional Information:</p>
        <ul className="list-disc ml-6">
          <li>Calories: {item.nutritionalInfo.calories} kcal</li>
          <li>Fat: {item.nutritionalInfo.fat} g</li>
          <li>Protein: {item.nutritionalInfo.protein} g</li>
        </ul>
      </div>
      <div className="mt-4">
        <p className="font-semibold">Customization Options:</p>
        {item.customizationOptions.map((option) => (
          <label key={option} className="block">
            <input
              type="checkbox"
              className="mr-2"
              checked={selectedOptions.includes(option)}
              onChange={() => handleOptionChange(option)}
            />
            {option}
          </label>
        ))}
      </div>
      {selectedOptions.length > 0 && (
        <div className="mt-4">
          <p className="font-semibold">Selected Customizations:</p>
          <ul className="list-disc ml-6">
            {selectedOptions.map((opt) => (
              <li key={opt}>{opt}</li>
            ))}
          </ul>
        </div>
      )}
       <button
            onClick={() => onAddToCart(item, selectedOptions)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add to Cart - {cart.find((cartItem) => cartItem.id === item.id)?.quantity || 0}
          </button>
    </div>
  );
};

export default MenuItem;
