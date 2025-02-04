// @ts-nocheck
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter,   } from 'react-router';
import NotFound from './components/NotFound';
import HomePage from './components/main/HomePage';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Cart from './components/main/cart/Cart';
import Orders from './components/main/orders/Orders';
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <NotFound/>
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/users/:userId',
    element: <HomePage />,
  },
  {
    path: '/users/:userId/cart',
    element: <Cart />,
  },
  {
    path: '/users/:userId/order',
    element: <Orders />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Theme>
     <App />
    </Theme>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
