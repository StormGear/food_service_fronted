

import React, { useEffect } from 'react'
import { NavLink, useParams } from "react-router";
import { useContext } from "react";
import { CartContext } from "../contextproviders/Cartcontext";
import { AuthContext } from "../contextproviders/Authcontext";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import baseUrl from '../constants';

const Navbar = () => {
    const { userId } = useParams();
    const { cartItems, setCartItems } = useContext(CartContext);
    const { logout, authState, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
      const fetchUserDetails = async () => {
        try {
          const response = await axios.get(`${baseUrl}/api/users/${userId}`)
          const cart_res = await axios.get(`${baseUrl}/api/cartitems/${response.data.user_id}`)
          dispatch({ type: 'SET_USER', payload: response.data })
          setCartItems((prevCart) => {
            return [ ...cart_res.data];
               }
            )
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
      fetchUserDetails().then(() => console.log('cart items', cartItems));

      return () => {
        console.log('user fetch cleanup')
      }  
    }, [])


    
  return (
    <div className="flex justify-end items-center">
       <button className='mr-4' onClick={() => {
        logout()
        navigate('/')
       }
        }>
        logout
       </button>
      <p className="text-gray-700 mr-4">Welcome, {authState.user?.name}</p>
        <h1 className="text-3xl font-bold text-center my-4 mr-4">Menu</h1>
        <span>
          <NavLink
              to={`/users/${userId}/cart`}
              className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
            >
             View Cart - {cartItems.length}
            </NavLink>
        </span>
      </div>
  )
}

export default Navbar
