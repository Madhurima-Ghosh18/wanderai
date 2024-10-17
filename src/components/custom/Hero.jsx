import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col items-center mx-auto max-w-6xl px-4 gap-9'>
      <h2 className='font-extrabold text-[50px] text-center mt-16'>
        <span className='text-[#64c5eb]'>Unleash Your Wanderlust:</span><br />
        <span className='text-[rgb(255,145,0)]'>AI-Crafted Itineraries Tailored for You</span>
      </h2>
      <p className='text-xl text-gray-500 text-center'>Your Personal Trip Planner: Custom Itineraries Curated to Your Interests and Budget.</p>
      <Link to={'/create-trip'}>
        <Button>Get Started, It's Free</Button>
      </Link>
      <div className='w-full flex justify-center p-4'>
        <img 
          src='/landing.jpg' 
          className='w-full max-w-[1000px] h-auto object-cover rounded-lg shadow-lg'
          alt="Landing image showcasing travel destinations"
        />
      </div>
    </div>
  )
}

export default Hero