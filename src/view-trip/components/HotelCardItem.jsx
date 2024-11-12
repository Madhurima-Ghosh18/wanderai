// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';

// function HotelCardItem({ hotel }) {
//   const [photoUrl, setPhotoUrl] = useState('/hotel.jpg');

//   useEffect(() => {
//     if (hotel && hotel.hotelImageUrl) {
//       setPhotoUrl(hotel.hotelImageUrl);
//     } else if (hotel) {
//       GetPlacePhoto();
//     }
//   }, [hotel]);

//   const GetPlacePhoto = async () => {
//     const data = {
//       textQuery: hotel?.hotelName
//     };
//     try {
//       const resp = await GetPlaceDetails(data);
//       if (resp.data.places[0]?.photos?.[3]?.name) {
//         const newPhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
//         setPhotoUrl(newPhotoUrl);
//       }
//     } catch (error) {
//       console.error("Error fetching photo:", error);
//       setPhotoUrl('/hotel.jpg');
//     }
//   };

//   return (
//     <Link to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.hotelName)},${encodeURIComponent(hotel.hotelAddress)}`} target='_blank' rel="noopener noreferrer">
//       <div className='hover:scale-105 transition-all cursor-pointer bg-white rounded-xl shadow-md overflow-hidden'>
//         <img
//           src={photoUrl}
//           alt={hotel.hotelName || "Hotel"}
//           className='h-[180px] w-full object-cover'
//           onError={(e) => {
//             e.target.onerror = null;
//             e.target.src = '/hotel.jpg';
//           }}
//         />
//         <div className='p-4 flex flex-col gap-2'>
//           <h2 className='font-semibold text-lg text-gray-800'>{hotel.hotelName}</h2>
//           <p className='text-sm text-gray-600'>📍 {hotel.hotelAddress}</p>
//           <p className='text-sm font-medium text-green-600'>💰 {hotel.price}</p>
//           <p className='text-sm font-medium text-amber-500'>⭐ {hotel.rating} star</p>
//         </div>
//       </div>
//     </Link>
//   );
// }

// export default HotelCardItem;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPlaceImages } from '@/service/GlobalApi';

function HotelCardItem({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState('/hotel.jpg');

  useEffect(() => {
    if (hotel && hotel.hotelName) {
      fetchPlaceImage(hotel.hotelName);
    }
  }, [hotel]);

  const fetchPlaceImage = async (hotelName) => {
    const imageUrl = await fetchPlaceImages(hotelName);
    setPhotoUrl(imageUrl || '/hotel.jpg');
  };

  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query=' + hotel.hotelName + "," + hotel?.hotelAddress} target='_blank' >
      <div className='hover:scale-105 transition-all cursor-pointer bg-white rounded-xl shadow-md overflow-hidden'>
        <img
          src={photoUrl}
          alt={hotel.hotelName || "Hotel"}
          className='h-[180px] w-full object-cover'
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/hotel.jpg';
          }}
        />
        <div className='p-4 flex flex-col gap-2'>
          <h2 className='font-semibold text-lg text-gray-800'>{hotel.hotelName}</h2>
          <p className='text-sm text-gray-600'>📍 {hotel.hotelAddress}</p>
          <p className='text-sm text-gray-500'>{hotel.description}</p>
          <p className='text-sm font-medium text-green-600'>💰 {hotel.price}</p>
          <p className='text-sm font-medium text-amber-500'>⭐ {hotel.rating} star</p>
        </div>
      </div>
    </Link>
  );
}

export default HotelCardItem;