

import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Navbar from '../../Navbar';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import baseUrl from '../../../constants';
import dateFormat from "dateformat";
import Chip from '@mui/material/Chip';

const Orders = () => {
    const [orders, setOrders] = useState([]);
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
    
        fetchOrders();
        }, []);
    


  return (
    <>
    <Navbar />
    <h2 className="m-10 text-2xl font-semibold text-primary-color">Your Orders</h2>
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


export default Orders
