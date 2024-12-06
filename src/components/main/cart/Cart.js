import React, { useEffect } from "react";
import { useContext } from "react";
import { CartContext } from "../../../contextproviders/CartContext";
import { NavLink, useParams } from "react-router-dom";

const Cart = () => {
  const getTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const { cart,  updateCartItem, clearCart } = useContext(CartContext);
  const { userId } = useParams()

  useEffect(() => {
    console.log("Cart mounted");
    console.log(cart);
    return () => console.log("Cart unmounted");
  })

  return (
    <div className="p-4 mt-4">
      <h2 className="text-2xl font-semibold mb-7">Your Cart</h2>
      {cart.length === 0 ? (
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
            {cart.map((item) => (
              <li key={item.id} className="py-4 flex justify-between">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-gray-700">Price: ${item.price.toFixed(2)}</p>
                  <p className="text-gray-700">Quantity: {item.quantity}</p>
                  <div className="mt-4">
                <p className="font-semibold">Selected Customizations:</p>
                <ul className="list-disc ml-6">
                  {item.selectedOptions.map((opt) => (
                    <li key={opt}>{opt}</li>
                  ))}
                </ul>
              </div>
                </div>
                <div>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateCartItem(item.id, parseInt(e.target.value, 10))
                    }
                    className="w-16 border text-center"
                  />
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <p className="font-semibold">
              Total: ${getTotal().toFixed(2)}
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
