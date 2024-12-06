

import React from 'react'
import { NavLink, useParams } from "react-router";
import { useContext } from "react";
import { CartContext } from "../contextproviders/Cartcontext";


const Navbar = () => {
    const { userId } = useParams();
    const { cart } = useContext(CartContext);
  return (
    <div className="flex justify-end items-center">
        <h1 className="text-3xl font-bold text-center my-4 mr-4">Menu</h1>
        <span>
          <NavLink
              to={`/users/${userId}/cart`}
              className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
            >
             View Cart - {cart.length}
            </NavLink>
        </span>
      </div>
  )
}

export default Navbar
