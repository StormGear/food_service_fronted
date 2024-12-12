// @ts-nocheck
import React, { useState,  useReducer, useContext } from "react";
// import { CartContext } from "../../../contextproviders/Cartcontext";
import { loadingReducer, initialState } from "../../reducers/reducers";
import Spinner from "../../Spinner";
import { CartContext } from "../../../contextproviders/Cartcontext";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const MenuItem = ({ item, onAddToCart }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  // const { cart } = useContext(CartContext);
  const [loadingState, dispatch] = useReducer(loadingReducer, initialState);
  const { cartItems } = useContext(CartContext)

  const handleOptionChange = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((opt) => opt !== option)
        : [...prev, option]
    );
  };

  const isMenuItemInCart = (id) => {
    return cartItems.find((item) => item.menuitem_id === id);
  }

  const handleAddToCart = async () => {
    dispatch({ type: 'LOADING' });
    await delay(2000); // 2-second delay
    const res = await onAddToCart(item, selectedOptions)
    if (res.error) {
      dispatch({ type: 'ERROR', payload: res.message });
    } else {
      dispatch({ type: 'SUCCESS' });
    }
  };

  return (
    <div className="border p-4 rounded shadow-md mb-4">
      <h2 className="text-xl font-semibold">{item.name}</h2>
      <p className="text-gray-700">Price: GH₵ {item.price}</p>
      <div className="text-gray-700">
        <p>Nutritional Information:</p>
        <ul className="list-disc ml-6 ">
          {
            item.nutritional_info.map((item, index) => (
              <li key={index}>{item} </li>
            ))
          } 
        </ul>
      </div>
      <div className="my-4">
        <p className="font-semibold">Extra Toppings:</p>
        {item.extra_toppings.map((option) => (
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
        <div className="my-4">
          <p className="font-semibold">Selected Customizations:</p>
          <ul className="list-disc ml-6">
            {selectedOptions.map((opt) => (
              <li key={opt}>{opt}</li>
            ))}
          </ul>
        </div>
      )}
       <button
            disabled={loadingState.loading}
            onClick={handleAddToCart}
            className={`${loadingState.loading ? "bg-gray-300" : "bg-blue-500"} text-white px-4 py-2 rounded min-w-20`}
          >
            {(() => {
          switch (loadingState.success) {
            case true:
              return 'Go to Cart';
            case false:
              return  loadingState.loading ? <Spinner /> : isMenuItemInCart(item.menuitem_id) ? 'Go to Cart' : 'Add to Cart';
            default:
              return  'Go to Cart';
          }
          })()}
         
          </button>
    </div>
  );
};

export default MenuItem;
