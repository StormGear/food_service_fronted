// @ts-nocheck
import React, { useState,  useReducer, useContext } from "react";
// import { CartContext } from "../../../contextproviders/Cartcontext";
import { loadingReducer, initialState } from "../../reducers/reducers";
import Spinner from "../../Spinner";
import { CartContext } from "../../../contextproviders/Cartcontext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contextproviders/Authcontext";
import { Inset } from "@radix-ui/themes";
import Checkbox from '@mui/material/Checkbox';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import InfoIcon from '@mui/icons-material/Info';




const MenuItem = ({ item, onAddToCart }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [loadingState, dispatch] = useReducer(loadingReducer, initialState);
  const { cartItems } = useContext(CartContext)
  const { authState } = useContext(AuthContext)

  const navigate = useNavigate();

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

  const handleAddToCart = async (e) => {
   if (e.target.textContent === 'Add to Cart') {
    dispatch({ type: 'LOADING' });
    const res = await onAddToCart(item, selectedOptions)
    if (res.error) {
      dispatch({ type: 'ERROR', payload: res.message });
    } else {
      dispatch({ type: 'SUCCESS' });
    }
  } else {
    navigate(`/users/${authState.user.user_id}/cart`)
  }
  };

  const defaultImage = "https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80";

  return (
    <div className="border rounded-2xl shadow-md mb-4 min-w-72 max-h-min">
      <Inset clip="padding-box" side="top" pb="current">
			<img
				src={item.image_url ?? defaultImage}
				alt="Bold typography"
				style={{
					display: "block",
					objectFit: "cover",
					width: "100%",
					height: 140,
					backgroundColor: "var(--gray-5)",
				}}
        className="rounded-t-2xl"
			/>
		</Inset>
      <div className="p-4">
        <h2 className="text-xl font-semibold">{item.name}</h2>
        <p className="text-gray-700 my-1">Price: GH₵ {item.price}</p>
        <div className="text-gray-700">
          <p className="italic">Nutritional Information:</p>
          <ul className="ml-1 ">
            {
              item.nutritional_info.map((item, index) => (
                <li key={index}> <InfoIcon sx={{ fontSize: 18, color: '#122023' }} /> {item} </li>
              ))
            }
          </ul>
        </div>
        <div className="my-2">
          <p className="font-semibold italic">Extra Toppings:</p>
          {item.extra_toppings.map((option) => (
            <label key={option} className="block">
              <Checkbox
              checked={selectedOptions.includes(option)}
              onChange={() => handleOptionChange(option)}
              inputProps={{ 'aria-label': 'controlled' }}
              sx={{
                color: '#2ECC40',
                margin: '0',
                padding: 0.6,
                '&.Mui-checked': {
                  color: '#2ECC40',
                },
              }}
              />          
              {option}
            </label>
          ))}
        </div>
        {selectedOptions.length > 0 && (
          <div className="my-4">
            <p className="font-semibold">Selected Customizations:</p>
            <ul className="ml-2">
              {selectedOptions.map((opt) => (
                <li className="flex items-center" key={opt}> <FastfoodIcon  sx={{ fontSize: 20, color: '#2ECC40' }} className="mr-2"/> {opt}</li>
              ))}
            </ul>
          </div>
        )}
         <button
              disabled={loadingState.loading}
              onClick={ handleAddToCart}
              className={`${loadingState.loading ? "bg-gray-300" : "bg-secondary-color"} text-white px-4 py-2 rounded-xl min-w-20`}
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
    </div>
  );
};

export default MenuItem;
