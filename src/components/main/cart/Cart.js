// @ts-nocheck
import React, { useEffect, useContext, useReducer } from "react";
import { CartContext } from "../../../contextproviders/Cartcontext";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import baseUrl from "../../../constants";
import CartItem from "./CartItem";
import { loadingReducer, initialState } from "../../reducers/reducers";
import Spinner from "../../Spinner";
import { IoArrowBackCircle } from "react-icons/io5";
import { GiConfirmed } from "react-icons/gi";
import logo from '../../../assets/images/logo.png';
import { MdRemoveShoppingCart } from "react-icons/md";
import toast from 'react-hot-toast';
import { IoFastFoodSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { Button as RadixButton } from '@radix-ui/themes' 
import { AlertDialog, Flex } from '@radix-ui/themes';
import Tooltip from '@mui/material/Tooltip';


const Cart = () => {
  // const getTotal = () =>
  //   cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const {  cartItems, totalCost, setTotalCost, clearCart, setCartItems, placeOrder } = useContext(CartContext);
  const { userId } = useParams()
 const [loadingState, dispatch] = useReducer(loadingReducer, initialState);
 const [loadingStateForClearCart, dispatchForClearCart] = useReducer(loadingReducer, initialState);


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

  const handleClearCart = async (item) => {
    try {
      dispatchForClearCart({ type: 'LOADING' });
      const response = await clearCart(item);
      if (response.success) {
        toast.success('Cart cleared successfully')
        setCartItems([]);
        setTotalCost(0);
        dispatchForClearCart({ type: 'SUCCESS' });
        
      } else {
        dispatchForClearCart({ type: 'ERROR', payload: response.message });
        console.error("Error clearing cart:", response.message);
        toast.error(loadingStateForClearCart.payload)
      }
    } catch (error) {
      dispatchForClearCart({ type: 'ERROR', payload: error.message });
      console.error("Error clearing cart:", error);
      toast.error(loadingStateForClearCart.payload)
    }
  }

  const handlePlaceOrder = async (userId, total_cost) => {
    try {
      console.log(`Placing order for user with id  ${userId} and total amout ${total_cost}`)
      dispatch({ type: 'LOADING' });

      const response = await placeOrder(userId, total_cost);
      if (response.success) {
        setCartItems([]);
        setTotalCost(0);
        dispatch({ type: 'SUCCESS' });
        toast.success('Order placed successfully')
      } else {
        dispatch({ type: 'ERROR', payload: response.message });
        console.error("Error placing order response.message:", response.message);
        toast.error(loadingState.payload)
      }
    } catch (error) {
      dispatch({ type: 'ERROR', payload: error.message });
      console.error("Error placing order catch block:", error);
      toast.error(loadingState.payload)
    }
  }




  return (
    <div className="p-4 mt-4">
      <div className='flex'> 
        <img src={logo} alt="Logo" className='w-16 h-8'/>
      <h2 className="text-2xl font-semibold mb-7 text-primary-color">Your Cart</h2>
      </div>
      
      {cartItems.length === 0 ? (
        <div className="flex flex-col justify-center items-center min-h-full">
        <div> <MdRemoveShoppingCart className="text-primary-color text-8xl my-10" /> </div>
        <p className="mb-4 text-secondary-color font-extrabold">Your cart is empty.</p>
        <NavLink
                to={`/users/${userId}`}
                className="text-white px-4 py-2 my-2 rounded max-w-max"
              >
                <span className="inline-flex items-center">
                  <IoArrowBackCircle className='text-primary-color text-2xl' /> 
                  <p className="text-primary-color mx-4">Back to Menu</p>
                </span>
        </NavLink>
        <NavLink
                to={`/users/${userId}/order`}
                className="text-white px-4 py-2 my-2 rounded max-w-max"
              >
                <span className="inline-flex items-center">
                  <IoFastFoodSharp className='text-primary-color text-2xl' />
                  <p className="text-primary-color mx-4">View Your Orders</p>
                </span>
        </NavLink>
      </div>
      ) : (
        <>
          <ul className="divide-y">
            {cartItems.map((item, index) => {
              console.log(`cart item at ${index}`, item)
               return <CartItem key={item.cartitem_id} item={item} />
            }
              
            
            )}
          </ul>
          <div className="mt-4">
            <p className="font-semibold">
              Total: GH₵ {totalCost}
            </p>
            <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
              <button
                onClick={() => handleClearCart(userId)}
                className="flex items-center" 
              >
                {
                  <>
                  <div className="flex items-center">
                    <RadixButton color="red"> 
                   { loadingStateForClearCart.loading ? <Spinner /> : <p className="flex items-center font-bold"> <MdDelete className="text-white text-xl" /> Clear Cart</p> }
                      </RadixButton>
                  </div>
                 </>
                }
          
              </button>

              <NavLink
                to={`/users/${userId}`}
                className="text-white px-4 py-2 my-2 rounded max-w-max"
              >
                <span className="inline-flex items-center">
                  <IoArrowBackCircle className='text-primary-color text-xl' /> 
                  <p className="text-primary-color mx-4 font-bold">Back to Menu</p>
                </span>
              </NavLink>
              
              {/* <button
                className="bg-secondary-color text-white px-4 py-2 my-2 rounded max-w-max"
              > */}
                { loadingState.loading ? <Spinner /> : <PlaceOrderButton placeOrderHandler={() => handlePlaceOrder(userId, totalCost)}/>}
              {/* </button> */}
            </div>
            <div className="flex justify-end">
              {loadingState.loading && <p className="text-blue-500 font-bold">Placing order...</p>}
              {loadingState.error && <p className="text-red-500 font-bold">{loadingState.error}</p>}
              {loadingState.success && <p className="text-green-500 font-bold">{loadingState.success}</p>}
            </div>
          </div>
        </>
      )}
    </div>
  );
};


const PlaceOrderButton = ({ placeOrderHandler }) => {
  return (
    <div>
  <AlertDialog.Root>
	<AlertDialog.Trigger>
  <Tooltip title="Place Your Order" arrow>
           <p className="flex items-center">    
      <RadixButton color="green">
        <p className="font-bold">Place Order</p>
      <GiConfirmed className="text-white text-lg ml-2" />
      </RadixButton> </p>
  </Tooltip>
	</AlertDialog.Trigger>
	<AlertDialog.Content maxWidth="450px">
		<AlertDialog.Title >Place An Order</AlertDialog.Title>
		<AlertDialog.Description size="2">
			Are you ready to place this order?
		</AlertDialog.Description>

		<Flex gap="3" mt="4" justify="end">
			<AlertDialog.Cancel>
				<RadixButton variant="soft" color="gray">
					Cancel
				</RadixButton>
			</AlertDialog.Cancel>
			<AlertDialog.Action>
				<RadixButton variant="solid" color="green" onClick={placeOrderHandler}>
					Yes
				</RadixButton>
			</AlertDialog.Action>
		</Flex>
	</AlertDialog.Content>
</AlertDialog.Root>

    </div>
  )
}

export default Cart;
