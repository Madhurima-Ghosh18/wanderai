import React from 'react'
import PlaceCardItem from './PlaceCardItem'

function PlacesToVisit({trip}) {
  return (
    <div className='bg-gray-50 p-6 rounded-xl'>
      <h2 className='font-bold text-2xl text-gray-800 mb-6'>Places to Visit</h2>
      <div>
        {trip.tripData?.itinerary.map((item, index) => (
          <React.Fragment key={index}>
            <div className='mt-8'>
              <h2 className='font-semibold text-xl text-indigo-600 mb-4'>Day {item.day}</h2>
              <div className='grid md:grid-cols-2 gap-6'>
                {item.plan.map((place, placeIndex) => (
                  <div key={placeIndex} className='bg-white p-4 rounded-lg shadow-md'>
                    <h2 className='font-medium text-sm mb-2'>
                      <span className='text-gray-700'>Best Time:</span> <span className='text-orange-600 font-semibold'>{place.timeTravel}</span>
                    </h2>
                    <PlaceCardItem place={place} />
                  </div>
                ))}
              </div>
            </div>
            {index < trip.tripData.itinerary.length - 1 && (
              <hr className="my-8 border-t border-gray-300" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default PlacesToVisit