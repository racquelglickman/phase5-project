import React, { useState, useEffect } from 'react'
import { GoogleMap, Marker, useLoadScript, InfoWindow } from "@react-google-maps/api";
import './homePage.css'
import 'world-countries-capitals'
import Geocode from 'react-geocode'
import uuid from 'react-uuid';

function Map({ trip }) {
  // console.log(trip)

  Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);

  const [center, setCenter] = useState()
  const [coordinates, setCoordinates] = useState([])
  const [mapRef, setMapRef] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [infoWindowData, setInfoWindowData] = useState();

  // useEffect(() => {
      
  // }, [trip]) 

  const onMapLoad = (map) => {
    setMapRef(map);

    Geocode.fromAddress(trip.location).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        // console.log(lat, lng)
        setCenter({lat: lat, lng: lng})
      },
      (error) => {
        console.error(error);
      }
    );

    const geocodeFunction = async (address) => {
      const response = await Geocode.fromAddress(address)
      console.log(response)
      const { lat, lng } = response.results[0].geometry.location;
      console.log(lat, lng)
      setCoordinates(coordinates => [...coordinates, {lat:lat, lng:lng}])
  }

    const geocodeActivities = async () => {
      for (let i = 0; i < trip.activities.length; i++) {
        console.log(trip.activities[i].address)
        await geocodeFunction(trip.activities[i].address)
        console.log('promise is resolved')
      }
      console.log('ALL activities were geocoded')
    }

    geocodeActivities();

  };

  const handleMarkerClick = (id, lat, lng, address) => {
    mapRef?.panTo({ lat, lng });
    setInfoWindowData({ id, address });
    setIsOpen(true);
  };

  function onDeleteActivity() {
    console.log('pass this down to re-set coordinates without that one')
  }


  // console.log(coordinates)
  const activityMarkers = coordinates.map((coord) => {
    return <Marker 
              key={uuid()} 
              position={coord} 
              // onClick={() => handleMarkerClick(id, coord['lat'], coord['lng'])}
            >
              {/* {isOpen && infoWindowData?.id === ind && (
                  <InfoWindow
                    onCloseClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    <h3>{infoWindowData.name}</h3>
                  </InfoWindow>
              )} */}
          </Marker>
    
  })

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  return (
        <div className='googleMapContainer'>
            { !isLoaded ?
              null :
              <GoogleMap
                  mapContainerClassName="googleMap"
                  center={center}
                  zoom={6}
                  onLoad={onMapLoad}
              >
                {/* <Marker position={center} /> */}
                {activityMarkers}
              </GoogleMap>
            }
        </div>
  )
}

export default Map