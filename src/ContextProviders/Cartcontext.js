// @ts-nocheck
import React, { useState,  createContext, useContext } from "react";
import axios from "axios";
import baseUrl from "../constants";
import { AuthContext } from "./Authcontext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { authState } = useContext(AuthContext)

  const addToCart =  async (item, newOptions) => {
    console.log('input item', item);
    const cart_id = authState.user.user_id
    try {
      let cartitem_res;
      let response;
      console.log('newOptions', newOptions)
      console.log('adding to cart')
        response = await axios.post(`${baseUrl}/api/cartitems/create-cartitem`, 
          {
            cart_id: cart_id,
            menuitem_id: item.menuitem_id,
            extra_toppings: newOptions
          }
        );
        cartitem_res = await axios.get(`${baseUrl}/api/cartitems/${cart_id}`)
        console.log('cartitem_res', cartitem_res.data)
        setCartItems((prevCart) => {
        return [...prevCart, { ...item }];
           }
        );
        return {
          success: 'success',
          message: response.data.cartitem_id
        }
    } catch (error) {
      if (error.response) {
        console.log('error', error.response.data.message ?? error.message)
        return {
          error: 'error',
          message: error.response.data.message ?? error.message
        }
      } else {
        console.log('error', error.message)
        return {
          error: 'error',
          message:  error.message
        }

      }
    }
  }
  
 


  const updateCartItem = (id, quantity) => {
    setCartItems((prevCart) =>
      prevCart
        .map((item) => (item.id === id ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = async () => {
    const cart_id = authState.user.user_id
    try {

      let response;
      console.log('clearing the cart')
        response = await axios.delete(`${baseUrl}/api/cartitems/clear-cart/${cart_id}`);
        console.log('cartitem_res', response.data)
        setCartItems([])
        return {
          success: 'success',
        }
    } catch (error) {
      if (error.response) {
        console.log('error', error.response.data.message ?? error.message)
        return {
          error: 'error',
          message: error.response.data.message ?? error.message
        }
      } else {
        console.log('error', error.message)
        return {
          error: 'error',
          message:  error.message
        }

      }
    }
    
  };

  return (
    <CartContext.Provider value={{  cartItems, setCartItems, addToCart, updateCartItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
