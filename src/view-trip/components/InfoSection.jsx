// import React, { useEffect, useState } from 'react'
// import { Button } from '@/components/ui/button'
// import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi'
// import { FiDownload } from "react-icons/fi"
// import { useParams } from 'react-router-dom'
// import { toast } from 'sonner'

// function InfoSection({trip}) {
//   const [photoUrl, setPhotoUrl] = useState('/placeholder.jpg')
//   const { tripId } = useParams()

//   useEffect(() => {
//     trip && GetPlacePhoto()
//   }, [trip])

//   const GetPlacePhoto = async () => {
//     if (trip?.userSelection?.location?.label) {
//       const data = {
//         textQuery: trip.userSelection.location.label
//       }
//       try {
//         const resp = await GetPlaceDetails(data)
//         if (resp.data.places[0]?.photos?.[3]?.name) {
//           const newPhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name)
//           setPhotoUrl(newPhotoUrl)
//         }
//       } catch (error) {
//         console.error("Error fetching photo:", error)
//       }
//     }
//   }

//   const generateTripDocument = () => {
//     let content = `Trip to ${trip?.userSelection?.location?.label || 'Unnamed Location'}\n\n`;
//     content += `Duration: ${trip?.userSelection?.noOfDays || 'N/A'} Day(s)\n`;
//     content += `Budget: ${trip?.userSelection?.budget || 'N/A'}\n`;
//     content += `Number of Travelers: ${trip?.userSelection?.traveler || 'N/A'}\n\n`;

//     content += "Hotel Recommendations:\n";
//     trip?.tripData?.hotelOptions?.forEach((hotel, index) => {
//       content += `${index + 1}. ${hotel.hotelName || 'Unnamed Hotel'}\n`;
//       content += `   Address: ${hotel.hotelAddress || 'N/A'}\n`;
//       content += `   Price: ${hotel.price || 'N/A'}\n`;
//       content += `   Rating: ${hotel.rating || 'N/A'} star\n\n`;
//     });

//     content += "Places to Visit:\n";
//     trip?.tripData?.itinerary?.forEach((day) => {
//       content += `Day ${day.day || 'N/A'}:\n`;
//       day.plan.forEach((place, index) => {
//         content += `${index + 1}. ${place.placeName || 'Unnamed Place'}\n`;
//         content += `   Address: ${place.placeAddress || 'N/A'}\n`;
//         content += `   Best Time: ${place.bestTime || 'N/A'}\n`;
//         content += `   Time to Travel: ${place.timeToTravel || 'N/A'}\n`;
//         content += `   Ticket Pricing: ${place.ticketPricing || 'N/A'}\n`;
//         content += `   Details: ${place.placeDetails || 'N/A'}\n\n`;
//       });
//     });

//     return content;
//   }

//   const downloadTripDocument = () => {
//     const content = generateTripDocument();
//     const element = document.createElement("a");
//     const file = new Blob([content], {type: 'text/plain'});
//     element.href = URL.createObjectURL(file);
//     element.download = `Trip_to_${trip?.userSelection?.location?.label || 'Unnamed_Location'}.txt`;
//     document.body.appendChild(element);
//     element.click();
//     document.body.removeChild(element);
//     toast.success('Trip details downloaded successfully!');
//   }

//   return (
//     <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
//       <img src={photoUrl} className='h-[340px] w-full object-cover' alt="Location" />
//       <div className='p-6'>
//         <div className='flex justify-between items-center flex-wrap gap-4'>
//           <div className='flex flex-col gap-4'>
//             <h2 className='font-bold text-2xl text-gray-800'>{trip?.userSelection?.location?.label || 'Unnamed Location'}</h2>
//             <div className='flex gap-3 flex-wrap'>
//               <span className='px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm'>📅 {trip?.userSelection?.noOfDays || 'N/A'} Day(s)</span>
//               <span className='px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm'>💰 {trip?.userSelection?.budget || 'N/A'} Budget</span>
//               <span className='px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm'>🥂 No. Of Traveler: {trip?.userSelection?.traveler || 'N/A'}</span>
//             </div>
//           </div>
//           <Button 
//             className="bg-indigo-600 hover:bg-indigo-700 text-white"
//             onClick={downloadTripDocument}
//           >
//             <FiDownload className="mr-2" /> Download Trip Details
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default InfoSection
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { fetchPlaceImages } from '@/service/GlobalApi'
import { FiDownload } from "react-icons/fi"
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

const InfoSection = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState('/placeholder.jpg')
  const { tripId } = useParams()

  useEffect(() => {
    if (trip && trip.userSelection && trip.userSelection.location) {
      fetchPlaceImage(trip.userSelection.location.label)
    }
  }, [trip])

  const fetchPlaceImage = async (locationName) => {
    const imageUrl = await fetchPlaceImages(locationName);
    setPhotoUrl(imageUrl || '/placeholder.jpg');
  }

  const generateTripDocument = () => {
    let content = `Trip to ${trip?.userSelection?.location?.label || 'Unnamed Location'}\n\n`;
    content += `Duration: ${trip?.userSelection?.noOfDays || 'N/A'} Day(s)\n`;
    content += `Budget: ${trip?.userSelection?.budget || 'N/A'}\n`;
    content += `Number of Travelers: ${trip?.userSelection?.traveler || 'N/A'}\n\n`;

    content += "Hotel Recommendations:\n";
    trip?.tripData?.hotelOptions?.forEach((hotel, index) => {
      content += `${index + 1}. ${hotel.hotelName || 'Unnamed Hotel'}\n`;
      content += `   Address: ${hotel.hotelAddress || 'N/A'}\n`;
      content += `   Price: ${hotel.price || 'N/A'}\n`;
      content += `   Rating: ${hotel.rating || 'N/A'} star\n\n`;
    });

    content += "Places to Visit:\n";
    trip?.tripData?.itinerary?.forEach((day) => {
      content += `Day ${day.day || 'N/A'}:\n`;
      day.plan.forEach((place, index) => {
        content += `${index + 1}. ${place.placeName || 'Unnamed Place'}\n`;
        content += `   Address: ${place.placeAddress || 'N/A'}\n`;
        content += `   Time to Travel: ${place.timeTravel || 'N/A'}\n`;
        content += `   Ticket Pricing: ${place.ticketPricing || 'N/A'}\n`;
        content += `   Details: ${place.placeDetails || 'N/A'}\n\n`;
      });
    });

    return content;
  }

  const downloadTripDocument = () => {
    const content = generateTripDocument();
    const element = document.createElement("a");
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `Trip_to_${trip?.userSelection?.location?.label || 'Unnamed_Location'}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success('Trip details downloaded successfully!');
  }

  return (
    <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
      <img src={photoUrl} className='h-[340px] w-full object-cover' alt="Location" />
      <div className='p-6'>
        <div className='flex justify-between items-center flex-wrap gap-4'>
          <div className='flex flex-col gap-4'>
            <h2 className='font-bold text-2xl text-gray-800'>{trip?.userSelection?.location?.label || 'Unnamed Location'}</h2>
            <div className='flex gap-3 flex-wrap'>
              <span className='px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm'>📅 {trip?.userSelection?.noOfDays || 'N/A'} Day(s)</span>
              <span className='px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm'>💰 {trip?.userSelection?.budget || 'N/A'} Budget</span>
              <span className='px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm'>🥂 No. Of Traveler: {trip?.userSelection?.traveler || 'N/A'}</span>
            </div>
          </div>
          <Button
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
            onClick={downloadTripDocument}
          >
            <FiDownload className="mr-2" /> Download Trip Details
          </Button>
        </div>
      </div>
    </div>
  )
}

export default InfoSection