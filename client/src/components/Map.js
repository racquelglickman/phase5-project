import React, { useState, useEffect, useMemo } from 'react'
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import './homePage.css'
import 'world-countries-capitals'
import Geocode from 'react-geocode'
import uuid from 'react-uuid';

function Map({ trip }) {
  console.log(trip)

  // const wcc = require('world-countries-capitals')
  // const capital = wcc.getCountryDetailsByName(trip.location)[0].capital

  Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);

  // const coordinates = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);

  const [center, setCenter] = useState()
  const [coordinates, setCoordinates] = useState([])

useEffect(() => {
    Geocode.fromAddress(trip.location).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng)
        setCenter({lat: lat, lng: lng})
      },
      (error) => {
        console.error(error);
      }
    );

    // console.log(trip.activities.length)
    // for (let i = 0; i < trip.activities.length; i++) {
    //   console.log(trip.activities[i].address)
    //   // this is a promise
    //   console.log(Geocode.fromAddress(trip.activities[i].address))
    //   Geocode.fromAddress(trip.activities[i].address).then(
    //     (response) => {
    //       console.log(response)
    //       const { lat, lng } = response.results[0].geometry.location;
    //       console.log(lat, lng)
    //       setCoordinates([...coordinates, {lat: lat, lng: lng}])
    //       console.log('next coordinate')
    //     },
    //     (error) => {
    //       console.error(error);
    //     }
    //   );
    // }

    const geocodeFunction = async (address) => {
      const response = await Geocode.fromAddress(address)
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

    geocodeActivities()

      
}, [trip]) 
  

  


  // console.log(coordinates)
  const activityMarkers = coordinates.map((coord) => {
    return <Marker key={uuid()} position={coord}/>
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
              >
                <Marker position={center} />
                {/* <Marker position={coordinates[0]} /> */}
                {activityMarkers}
              </GoogleMap>
            }
        </div>
  )
}

export default Map