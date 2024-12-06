
import React from 'react'
import {  useParams } from 'react-router';

const HomePage = () => {
    const { userId } = useParams();

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1>Home Page {userId}</h1>
      </div>
    </div>
  )
}

export default HomePage
