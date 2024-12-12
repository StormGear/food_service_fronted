import React, { useEffect, useState, useContext } from "react";
import { CartContext } from "../../../contextproviders/Cartcontext";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import baseUrl from "../../../constants";


const Cart = () => {
  // const getTotal = () =>
  //   cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const {  cartItems,  updateCartItem, clearCart, setCartItems } = useContext(CartContext);
  const { userId } = useParams()
  const [totalCost, setTotalCost] = useState(0)

  useEffect(() => {
    const cart_id = userId;
 // Fetch data when the component mounts
 const fetchCartItems = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/cartitems/allcart-totalcost/${cart_id}`)
    const data = await response.data;
    console.log('cart items', data)
    setCartItems([...data.items]);
    setTotalCost(data.total_cost)
  } catch (error) {
    console.error("Error fetching cart items:", error);
  }
};

  fetchCartItems();
    return () => console.log("Cart unmounted");
  }, [])


  return (
    <div className="p-4 mt-4">
      <h2 className="text-2xl font-semibold mb-7">Your Cart</h2>
      {cartItems.length === 0 ? (
        <div className="flex flex-col justify-center items-center min-h-full">
        <p className="text-gray-700 mb-4 font-bold">Your cart is empty.</p>
        <NavLink
        to={`/users/${userId}`}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Back to Menu
      </NavLink>
      </div>
      ) : (
        <>
          <ul className="divide-y">
            {cartItems.map((item) => (
              <li key={item.cartitem_id} className="py-4 flex justify-between">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-gray-700">Price: GH₵{item.price}</p>
                  <p className="text-gray-700">Quantity: {item.quantity}</p>
                  <div className="mt-4">
                { item.extra_toppings.length > 0 && <p className="font-semibold">Extra Toppings:</p>} 
                <ul className="list-disc ml-6">
                  {item.extra_toppings.map((opt) => (
                    <li key={opt}>{opt}</li>
                  ))}
                </ul>
              </div>
                </div>
                <div>
                
                <button
                onClick={() => updateCartItem(item.cartitem_id, 0)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Remove Item
              </button>
                  
                  <span className="px-4 cursor-pointer" onClick={() =>
                    { 
                      if (item.quantity === 1) {
                        return;
                      }
                      updateCartItem(item.id, item.quantity - 1)
                    }
                    } >-</span>
                  <input
                    min="1"
                    value={item.quantity}
                    readOnly
                    onChange={(e) => 
                      updateCartItem(item.id, parseInt(e.target.value, 10)
                    ) 
                    }
                    className="w-16 border text-center"
                  />
                  <span className="px-4 cursor-pointer" onClick={() => updateCartItem(item.cartitem_id, item.quantity + 1)}>+</span>
                </div>
              
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <p className="font-semibold">
              Total: GH₵ {totalCost}
            </p>
            <div className="flex justify-between mt-4">
              <button
                onClick={clearCart}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Clear Cart
              </button>
              <NavLink
                to={`/users/${userId}`}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Back to Menu
              </NavLink>
              <button
                onClick={() => alert("Order placed!")}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Place Order
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
