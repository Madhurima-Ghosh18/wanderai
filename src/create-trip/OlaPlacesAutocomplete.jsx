import React, { useState, useEffect } from 'react';

const OlaPlacesAutocomplete = ({ apiKey, onPlaceSelect }) => {
  const [predictions, setPredictions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.olacabs.com/maps-api-js/v1/maps.js?key=${apiKey}`;
    script.async = true;

    const handleScriptLoad = () => setIsScriptLoaded(true);

    script.addEventListener('load', handleScriptLoad);
    document.body.appendChild(script);

    return () => {
      script.removeEventListener('load', handleScriptLoad);
      document.body.removeChild(script);
    };
  }, [apiKey]);


  const handleInputChange = async (e) => {
    e.preventDefault();
    const value = e.target.value;
    setInputValue(value);
    if (value.length > 2 && isScriptLoaded) {
      try {
        const response = await fetch(`https://maps.olacabs.com/maps-api/v1/autocomplete?input=${value}&key=${apiKey}`);
        console.log(response);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPredictions(data.predictions || []);
      } catch (error) {
        console.error('Error fetching predictions:', error);
        setPredictions([]);
      }
    } else {
      setPredictions([]);
    }
  };

  const handleSelectPlace = (place) => {
    setInputValue(place.description);
    setPredictions([]);
    if (onPlaceSelect) {
      onPlaceSelect(place);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search for a place"
        className="w-full p-2 border rounded"
      />
      {predictions.length > 0 && (
        <ul className="mt-2 border rounded shadow-lg bg-white z-10">
          {predictions.map((place) => (
            <li
              key={place.place_id}
              onClick={() => handleSelectPlace(place)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {place.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OlaPlacesAutocomplete;
