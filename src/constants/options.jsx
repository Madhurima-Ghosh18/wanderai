export const SelectTravelesList = [
    {
        id: 1,
        title: 'Solo Adventure',
        desc: 'An explorer venturing alone',
        icon: '✈️',
        people: '1 Person'
    },
    {
        id: 2,
        title: 'Couple’s Getaway',
        desc: 'Two travelers exploring together',
        icon: '🥂',
        people: '2 People'
    },
    {
        id: 3,
        title: 'Family Trip',
        desc: 'A family enjoying fun-filled adventures',
        icon: '🏡',
        people: '3 to 5 People'
    },
    {
        id: 4,
        title: 'Friends’ Outing',
        desc: 'A group of thrill-seekers',
        icon: '⛵',
        people: '5 to 10 People'
    },
];
export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Economical',
        desc: 'Focus on budget-friendly options',
        icon: '💵',
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'Maintain a balanced budget',
        icon: '💰',
    },
    {
        id: 3,
        title: 'Luxury',
        desc: 'Indulge without concern for cost',
        icon: '💸',
    },
];

export const AI_PROMPT = `Generate Travel Plan for Location : {location}, for {totalDays} Days for {traveler} with a {budget} budget, give me Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, Place address, ticket Pricing, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.`;

// Function to replace placeholders in the AI_PROMPT
export function generateAIPrompt(data) {
  return AI_PROMPT.replace(/{(\w+)}/g, (match, key) => {
    return data[key] || match;
  });
}