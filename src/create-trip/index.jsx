import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { toast } from 'sonner';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";

import { AI_PROMPT, generateAIPrompt, SelectBudgetOptions, SelectTravelesList } from '@/constants/options';
import { db } from '@/service/firebaseConfig';
import { chatSession } from '@/service/AIModal';

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: name === 'location' ? { label: value.value.description, place_id: value.value.place_id } : value
    }));
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.error("Login Error:", error)
  });

  const GetUserProfile = async (tokenInfo) => {
    try {
      const resp = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo.access_token}`,
            Accept: 'application/json'
          }
        }
      );
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      OnGenerateTrip();
    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast.error("Failed to fetch user profile");
    }
  };

  const OnGenerateTrip = async () => {

    if(formData.noOfDays>3){
      toast.error("Please enter Trip Days less than 5.");
      return;
    }
    const user = localStorage.getItem('user');

    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (!formData.location || !formData.noOfDays || !formData.budget || !formData.traveler) {
      toast.error("Please fill all details");
      return;
    }

    setLoading(true);
    toast('Please wait... We are working on it...');

    try {
      const FINAL_PROMPT = generateAIPrompt({
        location: formData.location.label,
        totalDays: formData.noOfDays,
        traveler: formData.traveler,
        budget: formData.budget
      });

      const result = await chatSession.sendMessage(FINAL_PROMPT);
      console.log("AI Response:", result?.response?.text());
      
      await SaveAiTrip(result?.response?.text());
    } catch (error) {
      console.error("Error generating trip:", error);
      toast.error("Failed to generate trip. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const SaveAiTrip = async (TripData) => {
    try {
      console.log("Trip Data:", TripData);
      console.log("User Data:", localStorage.getItem('user'));
      console.log("Form Data:", formData);
      const user = JSON.parse(localStorage.getItem('user'));
      const docId = Date.now().toString();

      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        tripData: JSON.parse(TripData),
        userEmail: user?.email,
        id: docId
      });

      navigate('/view-trip/' + docId);
    } catch (error) {
      console.error("Error saving trip:", error);
      toast.error("Failed to save trip");
    }
  };

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us your travel preferences ⛰️🏖️🏕️🌴</h2>
      <p className='mt-3 text-gray-500 text-xl'>Simply share a few details, and our trip planner will create a personalized itinerary tailored to your preferences.</p>

      <div className='mt-20 flex flex-col gap-10'>
      <div>
  <h2 className='text-xl my-3 font-medium'>What is your destination of choice?📍</h2>
    <GooglePlacesAutocomplete apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY} selectProps={{
    place,
    onChange:(place)=> {setPlace(place);handleInputChange('location', place);console.log("Place",place);},
  }}/>
</div>

        <div>
          <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?📆</h2>
          <Input 
            placeholder='Ex. 3' 
            type="number"
            onChange={(e) => handleInputChange('noOfDays', e.target.value)}
          />
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>What's Your Budget?🫰</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectBudgetOptions.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange('budget', item.title)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                ${formData.budget === item.title ? 'shadow-lg border-brown-600' : ''}`}
              >
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg text-orange-500'>{item.title}</h2>
                <h2 className='text-sm text-black'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>Who will you be traveling with on your next adventure?👨‍👧‍👦</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectTravelesList.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange('traveler', item.people)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                ${formData.traveler === item.people ? 'shadow-lg border-brown-600' : ''}`}
              >
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg text-orange-500'>{item.title}</h2>
                <h2 className='text-sm text-black'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='my-10 justify-end flex'>
        <Button
          disabled={loading}
          onClick={OnGenerateTrip}
        >
          {loading ? <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : 'Generate Trip'}
        </Button>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="Logo" />
              <h2 className='font-bold text-lg mt-7'>Sign In With Google</h2>
              <p>Sign in to the App with Google authentication securely</p>

              <Button
                onClick={() => login()}
                className="w-full mt-5 flex gap-4 items-center"
              >
                <FcGoogle className='h-7 w-7' />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
