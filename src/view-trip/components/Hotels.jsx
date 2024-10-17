import React from 'react';
import HotelCardItem from './HotelCardItem';

function Hotels({ trip }) {
  const hotelOptions = trip?.tripData?.hotelOptions || [];

  // Determine the grid class based on the number of hotels
  const getGridClass = () => {
    const count = hotelOptions.length;
    if (count <= 1) return 'grid-cols-1';
    if (count === 2) return 'grid-cols-1 sm:grid-cols-2';
    if (count === 3) return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
    return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
  };

  return (
    <div className='py-6 px-4 sm:px-6'>
      <h2 className='font-bold text-2xl text-gray-800 mb-6'>Hotel Recommendations</h2>
      <div className={`grid ${getGridClass()} gap-4 justify-center`}>
        {hotelOptions.map((hotel, index) => (
          <HotelCardItem key={index} hotel={hotel} />
        ))}
      </div>
    </div>
  );
}

export default Hotels;