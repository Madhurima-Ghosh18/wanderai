// import { Button } from '@/components/ui/button'
// import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
// import React, { useEffect, useState } from 'react'
// import { FaMapLocationDot } from "react-icons/fa6";
// import { Link } from 'react-router-dom';

// function PlaceCardItem({place}) {
//   // const [photoUrl,setPhotoUrl]=useState();

//   // useEffect(()=>{
//   //   place&&GetPlacePhoto();
//   // },[place])

//   // const GetPlacePhoto=async()=>{
//   //   const data={
//   //     textQuery:place.placeName
//   //   }
//   //   const result=await GetPlaceDetails(data).then(resp=>{
//   //     const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
//   //     setPhotoUrl(PhotoUrl);
//   //   })
//   // }
  
//   return (
//     <Link to={'https://www.google.com/maps/search/?api=1&query='+place.placeName} target='_blank'>
//       <div className='bg-white border border-gray-200 rounded-xl p-4 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-lg cursor-pointer'>
//         {/* <img 
//           src={photoUrl?photoUrl:'/place.jpg'}
//           className='w-[130px] h-[130px] rounded-xl object-cover'
//           alt={place.placeName}
//         /> */}
//          <img src={place.placeImageUrl ? place.placeImageUrl : '/place.jpg'} className='w-[130px] h-[130px] rounded-xl object-cover' />

//         <div className='flex flex-col justify-between flex-grow'>
//           <div>
//             <h2 className='font-bold text-lg text-gray-800'>{place.placeName}</h2>
//             <p className='text-sm text-gray-600'><b>📍 {place.placeAddress}</b></p>
//             <p className='text-sm text-gray-500 mt-3'>{place.placeDetails}</p>
//           </div>
//           <div className='mt-2'>
//             <p className='font-medium text-green-600 mt-1'>🎟️ {place.ticketPricing}</p>
//           </div>
//         </div>
//       </div>
//     </Link>
//   )
// }

// export default PlaceCardItem
import { fetchPlaceImages } from '@/service/GlobalApi'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function PlaceCardItem({ place }) {
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    if (place && place.placeName) {
      fetchPlaceImage(place.placeName);
    }
  }, [place]);

  const fetchPlaceImage = async (placeName) => {
    const imageUrl = await fetchPlaceImages(placeName);
    setPhotoUrl(imageUrl || '/place.jpg');
  };

  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query=' + place.placeName + "," + place?.placeAddress} target='_blank' >
      <div className='bg-white border border-gray-200 rounded-xl p-4 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-lg cursor-pointer'>
        <img
          src={photoUrl}
          className='w-[130px] h-[130px] rounded-xl object-cover'
          alt={place.placeName}
        />
        <div className='flex flex-col justify-between flex-grow'>
          <div>
            <h2 className='font-bold text-lg text-gray-800'>{place.placeName}</h2>
            <p className='text-sm text-gray-600'><b>📍 {place.placeAddress}</b></p>
            <p className='text-sm text-gray-500 mt-3'>{place.placeDetails}</p>
          </div>
          <div className='mt-2'>
            <p className='font-medium text-green-600 mt-1'>🎟️ {place.ticketPricing}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;