// import axios from "axios"

// const BASE_URL='https://places.googleapis.com/v1/places:searchText'

// const config={
//     headers:{
//         'Content-Type':'application/json',
//         'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
//         'X-Goog-FieldMask':[
//             'places.photo',
//             'places.displayName',
//             'places.id'
//         ]
//     }
// }

// export const GetPlaceDetails=(data)=>axios.post(BASE_URL,data,config)

// export const PHOTO_REF_URL='https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key='+import.meta.env.VITE_GOOGLE_PLACE_API_KEY


import axios from 'axios';

// Unsplash API key
const UNSPLASH_API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;

// Unsplash API base URL
const UNSPLASH_BASE_URL = 'https://api.unsplash.com';

// Function to fetch images from Unsplash based on a search query
export const fetchPlaceImages = async (query) => {
  try {
    const response = await axios.get(`${UNSPLASH_BASE_URL}/search/photos`, {
      params: {
        query: query,
        client_id: UNSPLASH_API_KEY,
        per_page: 1, // Fetch only 1 image
      },
    });

    if (response.data.results.length > 0) {
      return response.data.results[0].urls.regular; // Return the URL of the first image
    } else {
      return null; // Return null if no images are found
    }
  } catch (error) {
    console.error('Error fetching Unsplash images:', error);
    return null;
  }
};