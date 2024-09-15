import {  GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};


  export const chatSession = model.startChat({
    generationConfig,
 // safetySettings: Adjust safety settings
 // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
      {
        role: "user",
        parts: [
          {text: "Generate Travel Plan for Loaction: Las Vegas, for 3 days for Couple with a Cheap budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates,rating, description and sugget itinerary with placeName, PlaceDetails, place Image Url, Geo Coordinates, ticket Pricing,Time t travel each of the location for 3 days with each day plan with best time to visit in Json format.\n"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n{\n  \"hotelOptions\": [\n    {\n      \"hotelName\": \"The D Las Vegas\",\n      \"hotelAddress\": \"301 Fremont Street, Las Vegas, NV 89101\",\n      \"price\": \"$50 - $100 per night\",\n      \"hotelImageUrl\": \"https://images.trvl-media.com/media/hotels/1000000/900000/898000/897900/897944/897944_104.jpg\",\n      \"geoCoordinates\": \"36.1699, -115.1423\",\n      \"rating\": 4.0,\n      \"description\": \"A budget-friendly hotel located in the heart of downtown Las Vegas, offering a casino, restaurants, and a lively atmosphere.\"\n    },\n    {\n      \"hotelName\": \"Circus Circus Hotel & Casino\",\n      \"hotelAddress\": \"2880 Las Vegas Blvd S, Las Vegas, NV 89109\",\n      \"price\": \"$40 - $80 per night\",\n      \"hotelImageUrl\": \"https://images.trvl-media.com/media/hotels/1000000/900000/898000/897900/897943/897943_104.jpg\",\n      \"geoCoordinates\": \"36.1150, -115.1712\",\n      \"rating\": 3.5,\n      \"description\": \"A classic Las Vegas hotel with a circus theme, featuring a casino, midway games, and budget-friendly accommodations.\"\n    },\n    {\n      \"hotelName\": \"Golden Nugget Hotel & Casino\",\n      \"hotelAddress\": \"129 E Fremont St, Las Vegas, NV 89101\",\n      \"price\": \"$60 - $120 per night\",\n      \"hotelImageUrl\": \"https://images.trvl-media.com/media/hotels/1000000/900000/898000/897900/897946/897946_104.jpg\",\n      \"geoCoordinates\": \"36.1695, -115.1424\",\n      \"rating\": 4.5,\n      \"description\": \"A luxurious hotel with a classic charm, offering a casino, multiple restaurants, a pool, and a shark tank.\"\n    }\n  ],\n  \"itinerary\": [\n    {\n      \"day\": 1,\n      \"plan\": [\n        {\n          \"placeName\": \"Fremont Street Experience\",\n          \"placeDetails\": \"A pedestrian mall featuring a canopy of lights and live entertainment. Enjoy free concerts, street performers, and the Viva Vision light show.\",\n          \"placeImageUrl\": \"https://www.vegasexperience.com/images/fremont-street-experience/fremont-street-experience-1.jpg\",\n          \"geoCoordinates\": \"36.1696, -115.1421\",\n          \"ticketPricing\": \"Free\",\n          \"timeToTravel\": \"2-3 hours\",\n          \"bestTime\": \"Evening\"\n        },\n        {\n          \"placeName\": \"The Neon Museum\",\n          \"placeDetails\": \"A museum showcasing historic neon signs from Las Vegas. Take a guided tour to learn about the city's history and admire the vibrant displays.\",\n          \"placeImageUrl\": \"https://www.neonmuseum.org/wp-content/uploads/2023/03/Neon-Museum-Las-Vegas-Nevada-Sign-Art-Photo-2-scaled.jpg\",\n          \"geoCoordinates\": \"36.1720, -115.1448\",\n          \"ticketPricing\": \"$25 - $35\",\n          \"timeToTravel\": \"1-2 hours\",\n          \"bestTime\": \"Afternoon\"\n        }\n      ]\n    },\n    {\n      \"day\": 2,\n      \"plan\": [\n        {\n          \"placeName\": \"Red Rock Canyon National Conservation Area\",\n          \"placeDetails\": \"A scenic drive through rugged red rock formations and stunning desert landscapes. Hike, rock climb, or simply enjoy the natural beauty.\",\n          \"placeImageUrl\": \"https://www.nps.gov/redr/planyourvisit/images/red-rock-canyon-01.jpg\",\n          \"geoCoordinates\": \"36.1421, -115.2987\",\n          \"ticketPricing\": \"$15 per vehicle\",\n          \"timeToTravel\": \"4-5 hours\",\n          \"bestTime\": \"Morning\"\n        },\n        {\n          \"placeName\": \"The LINQ Promenade\",\n          \"placeDetails\": \"An outdoor shopping and dining destination with a giant observation wheel. Enjoy the vibrant atmosphere, take a ride on the High Roller, and browse the shops.\",\n          \"placeImageUrl\": \"https://www.linqvegas.com/wp-content/uploads/2018/03/LINQ-Promenade-Exterior-Aerial-Night.jpg\",\n          \"geoCoordinates\": \"36.1140, -115.1704\",\n          \"ticketPricing\": \"Free\",\n          \"timeToTravel\": \"2-3 hours\",\n          \"bestTime\": \"Evening\"\n        }\n      ]\n    },\n    {\n      \"day\": 3,\n      \"plan\": [\n        {\n          \"placeName\": \"Bellagio Conservatory & Botanical Garden\",\n          \"placeDetails\": \"A stunning display of seasonal flowers, sculptures, and themed gardens. Enjoy the beauty and artistry of this free attraction.\",\n          \"placeImageUrl\": \"https://www.bellagio.com/content/dam/bellagio/media/images/conservatory/conservatory-gardens-spring-2023-hero.jpg\",\n          \"geoCoordinates\": \"36.1137, -115.1746\",\n          \"ticketPricing\": \"Free\",\n          \"timeToTravel\": \"1-2 hours\",\n          \"bestTime\": \"Morning\"\n        },\n        {\n          \"placeName\": \"The Strip\",\n          \"placeDetails\": \"Explore the iconic Las Vegas Strip, with its world-famous casinos, hotels, and entertainment venues. Take a walk, see a show, or gamble at one of the casinos.\",\n          \"placeImageUrl\": \"https://www.vegas.com/media/uploads/image/strip_las_vegas.jpg\",\n          \"geoCoordinates\": \"36.1147, -115.1726\",\n          \"ticketPricing\": \"Varies\",\n          \"timeToTravel\": \"Full day\",\n          \"bestTime\": \"Afternoon/Evening\"\n        }\n      ]\n    }\n  ]\n}\n```\n\n**Notes:**\n\n* This itinerary is a suggestion and can be adjusted based on your interests and preferences.\n* The hotel prices are approximate and can vary depending on the season and availability.\n* Consider using public transportation or walking to save on transportation costs.\n* Look for free attractions and activities to maximize your budget.\n* Take advantage of happy hour deals and discounts for meals and drinks.\n* Remember to check for free shows and events happening during your visit.\n\nThis information should help you plan a great and affordable trip to Las Vegas. Enjoy your vacation! \n"},
        ],
      },
    ],
  });

