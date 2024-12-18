

import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Navbar from '../../Navbar';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import baseUrl from '../../../constants';
import dateFormat from "dateformat";
import Chip from '@mui/material/Chip';
import { Box, Card, Flex, Text } from '@radix-ui/themes';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import { IoArrowBackCircle } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [points, setPoints] = useState(0);
    const { userId } = useParams()
    

    useEffect(() => {
        const fetchOrders = async () => {
            try {
         
            const response = await axios.get(`${baseUrl}/api/orders/${userId}`)
            response.data.forEach((order, index) => {
                order.id = index + 1;
                let orderDate = new Date(order.order_date);
                let updatedDate = new Date(order.updated_at);
                order.order_date = dateFormat(orderDate, "mmmm dS, yyyy, h:MM TT");
                order.updated_at = dateFormat(updatedDate, "mmmm dS, yyyy, h:MM TT");
            });
            setOrders([...response.data]);
            
            console.log('orders', orders)
            } catch (error) {
               
            console.error("Error fetching orders:", error);
            } finally {
                console.log('orders', orders)

            }
        };

        const fetchPoints = async () => {
            try {
                const response = await axios.get(`${baseUrl}/api/loyalty/${userId}`)
                setPoints(response.data);
            } catch (error) {
                console.error("Error fetching points:", error);
            } finally {
                console.log('points', points)
            }
        }
        fetchPoints();
        fetchOrders();
        }, []);
    


  return (
    <>
    <Navbar />
    <div className='flex items-center justify-between'>
      <div className='m-10'>
        <h2 className="text-2xl mb-2 font-semibold text-primary-color">Your Orders</h2>
        <NavLink
                to={`/users/${userId}`}
                className="text-white rounded max-w-max"
              >
            <span className="inline-flex items-center">
            <IoArrowBackCircle className='text-secondary-color text-xl' /> 
            <p className="text-secondary-color mx-2 font-bold">Back to Menu</p>
         </span>
         </NavLink>
      </div>
      <LoyaltyCard points={points}/>
    </div>
    
    <div className='m-10  shadow-md rounded-lg flex items-center justify-center'>
      <DataGrid rows={orders} columns={columns} />
    </div>
    </>
  )
}


const columns = [
  { field: 'order_id', headerName: 'Order ID', flex: 1 },
  { field: 'order_date', headerName: 'Order Date', flex: 1 },
  { field: 'order_status', headerName: 'Order Status', flex: 1,    renderCell: (params) => {
    // Conditional rendering or styling
    return (
      <Chip 
        label={params.value}
        color={
          params.value === 'preparing' ? 'warning' : 
          params.value === 'ready' ? 'success' : 
          'success'
        }
      />
    );
  }
},
  { field: 'updated_at', headerName: 'Updated At', flex: 1 },
  { field: 'total_amount', headerName: 'Total Amount (GH₵)', flex: 0.8 },
];




const LoyaltyCard = ({points}) => {
  return (
    <>
  {/* <Box maxWidth="240px" align="center" css={{ padding: 20 }}> */}
  <div className='mr-10'>
	<Card>
		<Flex gap="2" align="center" direction='row'>
      <LoyaltyIcon sx={{color: '#2ECC40', fontSize: 35}} />
			<Box>
				<Text as="div" size="2" weight="bold">
					Your Loyal Points
				</Text>
				<Text as="div" size="2" color="gray">
					You have {points} points
				</Text>
			</Box>
		</Flex>
	</Card>
  </div>
{/* </Box> */}
    </>
  )
}





export default Orders
