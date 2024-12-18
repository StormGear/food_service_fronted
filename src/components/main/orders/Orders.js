

import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Navbar from '../../Navbar';
import { useState, useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import baseUrl from '../../../constants';
import { loadingReducer, initialState } from '../../reducers/reducers';
import dateFormat from "dateformat";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const { userId } = useParams()
    const [loadingState, dispatch] = useReducer(loadingReducer, initialState);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
            dispatch({ type: 'LOADING' });
            const response = await axios.get(`${baseUrl}/api/orders/${userId}`)
            response.data.forEach((order, index) => {
                order.id = index + 1;
                let orderDate = new Date(order.order_date);
                let updatedDate = new Date(order.updated_at);
                order.order_date = dateFormat(orderDate, "mmmm dS, yyyy, h:MM TT");
                order.updated_at = dateFormat(updatedDate, "mmmm dS, yyyy, h:MM TT");
            });
            setOrders([...response.data]);
            dispatch({ type: 'SUCCESS' });
            console.log('orders', orders)
            } catch (error) {
                dispatch({ type: 'ERROR', payload: error.message });
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
  { field: 'order_id', headerName: 'Order ID', width: 150 },
  { field: 'order_date', headerName: 'Order Date', width: 150 },
  { field: 'order_status', headerName: 'Order Status', width: 150 },
  { field: 'updated_at', headerName: 'Updated At', width: 150 },
  { field: 'total_amount', headerName: 'Total Amount (GH₵)', width: 150 },
];


export default Orders
