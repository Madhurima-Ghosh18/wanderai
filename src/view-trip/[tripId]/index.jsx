import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';


function Viewtrip() {

    const {tripId}=useParams();
    const [trip,setTrip]=useState([]);
    useEffect(()=>{
        tripId&&GetTripData();
    },[tripId])
    useEffect(() => {
        if (trip) {
          console.log("Trip Data:", JSON.stringify(trip, null, 2));
        }
      }, [trip]);
    /**
     * Used to get Trip Information from Firebase
     */
    const GetTripData=async()=>{
        const docRef=doc(db,'AITrips',tripId);
        const docSnap=await getDoc(docRef);

        if(docSnap.exists()){
            console.log("Document:",docSnap.data());
            setTrip(docSnap.data());
        }
        else{
            console.log("No Such Document");
            toast('No trip Found!')
        }
    }

  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
    <div className="space-y-8">
      {/* Information Section */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <InfoSection trip={trip} />
      </div>

      {/* Hotel Recommendations */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <Hotels trip={trip} />
      </div>

      {/* Places to Visit */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <PlacesToVisit trip={trip} />
      </div>
    </div>
  </div>
);
}

export default Viewtrip