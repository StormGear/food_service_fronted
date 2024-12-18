

import React from 'react'
import { useContext } from "react";
import { CartContext } from "../../../contextproviders/Cartcontext";
import { IoCloseCircle } from 'react-icons/io5';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { IoAddCircleSharp } from "react-icons/io5";
import { FaCircleMinus } from "react-icons/fa6";



const CartItem = ({ item}) => {
    const {   removeCartItem, setTotalCost, totalCost, setCartItems, updateQuantity } = useContext(CartContext);
    const [quantity, setQuantity] = React.useState(item.quantity);

    const handleRemoveCartItem = async (item) => {
        try {
          const response = await removeCartItem(item);
          if (response.success) {
            setCartItems((prevCart) => prevCart.filter((cartItem) => cartItem.cartitem_id !== item.cartitem_id));
            setTotalCost(totalCost - (item.price * item.quantity))
          } else {
            console.error("Error removing item from cart:", response.message);
          }
        } catch (error) {
          console.error("Error removing item from cart:", error);
        }
      }
      
  return (
    <li key={item.cartitem_id} className="py-4 flex justify-between bg-gray-200 rounded-lg shadow-md my-4 px-4">
    <div>
      <p className="font-semibold">{item.name}</p>
      <p className="text-gray-700">Price: GH₵{item.price}</p>
       <p className="text-gray-700">Quantity: {quantity}</p>
      <div className="mt-4">
    { item.extra_toppings.length > 0 && <p className="font-semibold">Extra Toppings:</p>} 
    <ul className="list-disc ml-6">
      {item.extra_toppings.map((opt) => (
        <li key={opt}>{opt}</li>
      ))}
    </ul>
      </div>
      <div>
      <p className="font-semibold">Total: GH₵ {item.price * quantity}</p>
    </div> 
    </div>

    <div className='flex-col sm:flex-row'>
        <div className='sm:inline'>
            <button
            key={item.cartitem_id}
            onClick={() => handleRemoveCartItem(item)}
            className="hidden sm:inline rounded mx-4"
            >
                  <Tooltip title="Remove item from cart" >
                     <IconButton>
                    <DeleteIcon className=' text-red-500' />
                    </IconButton>
                  </Tooltip>
            {/* <IoCloseCircle /> */}
                   </button>
               
                  
                  <span className="p-2 sm:px-4 cursor-pointer" onClick={async () =>
            {
              if (item.quantity === 1) {
                return;
              }
              setQuantity((prevQuantity) => prevQuantity - 1);
              const res = await updateQuantity(item, item.quantity - 1)
                if (res.success) {
                    setTotalCost(totalCost - parseFloat(item.price))
                }
            }
            } >
              <Tooltip title="Remove one" >
                <IconButton >
              <FaCircleMinus className='text-red-400 inline text-lg' /> 
              </IconButton>
              </Tooltip>
              </span>
                  <input
            min="1"
            value={quantity}
            readOnly
            onChange={(e) =>
              updateQuantity(item, parseFloat(e.target.value)
            )
            }
            className="w-16 border text-center"
                  />
                  <span className="p-2 sm:px-4 cursor-pointer" onClick={async () => {
            setQuantity((prevQuantity) => prevQuantity + 1);
            const res = await updateQuantity(item, item.quantity + 1)
            if (res.success) {
                setTotalCost(totalCost + parseFloat(item.price))
            }
                  }}>
                    <Tooltip title="Add one more" >
                      <IconButton>
                    <IoAddCircleSharp className='text-primary-color inline' />
                    </IconButton>
                    </Tooltip>
                    </span>
        </div>

      <button
        key={item.cartitem_id}
        onClick={() => handleRemoveCartItem(item)}
        className="sm:hidden my-4 bg-red-500 text-white px-4 py-2 rounded"
    >
        <IoCloseCircle />
      </button>
    </div>

  </li>
  )
}

export default CartItem
