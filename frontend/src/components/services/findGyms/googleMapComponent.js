import React, { useState, useEffect } from 'react';
import { GoogleMap, MarkerF } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px',
};

const GoogleMapComponent = ({ gymsData }) => {
  const [hoveredGym, setHoveredGym] = useState(null); // Track the hovered marker
  const [clickedGym, setClickedGym] = useState(null); // Track the clicked marker
  const [currentLocation, setCurrentLocation] = useState(null); // Store current location
  const [mapCenter, setMapCenter] = useState(null); // State to store map center
  const [roadDistance, setRoadDistance] = useState(null); // Store road distance of clicked gym

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
          setMapCenter({ lat: latitude, lng: longitude }); // Set map center to current location
        },
        (error) => {
          console.error('Error getting location: ', error);
          setMapCenter(calculateCenter(gymsData));
        }
      );
    } else {
      console.error('Geolocation not available');
      setMapCenter(calculateCenter(gymsData));
    }
  }, [gymsData]);

  if (!gymsData || gymsData.length === 0) {
    return <div>No gyms data available</div>;
  }

  // Calculate the center of the map dynamically based on the gym coordinates
  const calculateCenter = (gymsData) => {
    const total = gymsData.reduce(
      (acc, gym) => {
        acc.lat += gym.lat;
        acc.lng += gym.lng;
        return acc;
      },
      { lat: 0, lng: 0 }
    );
    return {
      lat: total.lat / gymsData.length,
      lng: total.lng / gymsData.length,
    };
  };

  const handleMouseEnter = (gym) => {
    setHoveredGym(gym); // Set hovered gym
  };

  const handleMouseLeave = () => {
    setHoveredGym(null); // Clear hovered gym
  };

  const handleMarkerClick = (gym) => {
    setClickedGym(gym); // Set clicked gym for mobile
    if (currentLocation) {
      // Calculate road distance if current location is available
      calculateRoadDistance(currentLocation, gym);
    }
  };

  const calculateRoadDistance = (start, end) => {
    const directionsService = new window.google.maps.DirectionsService();

    // Prepare request for Directions API
    const request = {
      origin: start,  // Current location
      destination: end, // Gym location
      travelMode: window.google.maps.TravelMode.DRIVING, // Use DRIVING for road distance
    };

    // Get directions
    directionsService.route(request, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        const distance = result.routes[0].legs[0].distance.text; // Extract distance
        setRoadDistance(distance); // Store the road distance
      } else {
        console.error('Directions request failed due to ', status);
      }
    });
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={mapCenter || { lat: 0, lng: 0 }}  // Fallback center if currentLocation isn't available
      zoom={14}
    >
      {/* Display the current location marker with yellow and blue color */}
      {currentLocation && (
        <MarkerF
          position={currentLocation}
          title="Your Location"
          icon={{
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: "yellow",  // Yellow color for the circle
            fillOpacity: 1,
            strokeColor: "blue",  // Blue border
            strokeWeight: 3,
          }}
        />
      )}

      {/* Display the gym markers */}
      {gymsData.map((gym, index) => (
        <MarkerF
          key={index}
          position={{ lat: gym.lat, lng: gym.lng }}
          title={gym.name}
          onMouseEnter={() => handleMouseEnter(gym)} // Trigger hover on desktop
          onMouseLeave={handleMouseLeave} // Clear hover on desktop
          onClick={() => handleMarkerClick(gym)} // Trigger click on mobile
        >
          {(hoveredGym === gym || clickedGym === gym) && (
            <div
              style={{
                position: 'absolute',
                color: 'black',
                top: '450px',
                left: '10px',
                backgroundColor: 'white',
                padding: '5px',
                borderRadius: '3px',
                fontSize: '12px',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
              }}
            >
              <div>{gym.name}</div>
              {clickedGym === gym && roadDistance && (
                <div>Road Distance: {roadDistance}</div> 
              )}
            </div>
          )}
        </MarkerF>
      ))}
    </GoogleMap>
  );
};

export default React.memo(GoogleMapComponent);
