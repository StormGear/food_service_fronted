import React from 'react';
import { Link } from 'react-router-dom'
import { TbError404Off } from "react-icons/tb";
import { AiOutlineHome } from "react-icons/ai";
import logo from '../assets/images/logo.png';
import { useParams } from 'react-router-dom';

const NotFoundPage = () => {
  const { userId } = useParams();
  
  return (
    <div className="flex flex-col items-center justify-evenly h-screen">
           <div className='flex items-center'>
              <img src={logo} alt="Eat Right" className='w-20 h-10 my-2' />
              <span className='text-primary-color font-bold text-xl'>Eat Right</span>
            </div>
      <h1 className="text-6xl font-bold mb-4"><TbError404Off /></h1>
      <p className="text-2xl mb-8">Oops! The page you're looking for doesn't exist.</p>
      <Link  to={ userId ? `/users/${userId}` : `/`} className="bg-primary-color text-white font-bold py-2 px-4 rounded flex items-center">
        <AiOutlineHome className="inline-block mr-4 text-2xl" />
        Go back home
      </Link>
    </div>
  );
};

export default NotFoundPage;