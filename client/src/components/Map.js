import React, { useState, useEffect, useMemo } from 'react'
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import './homePage.css'
import 'world-countries-capitals'
import Geocode from 'react-geocode'

function Map({ trip }) {

  const wcc = require('world-countries-capitals')
  const capital = wcc.getCountryDetailsByName(trip.location)[0].capital

  Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);

  const coordinates = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);

  function doSomething(lat, lng) {
    console.log('these are the coordinates:', lat, lng)
  }

  Geocode.fromAddress(capital).then(
    (response) => {
      const { lat, lng } = response.results[0].geometry.location;
      doSomething(lat, lng)
      console.log('hi')
    },
    (error) => {
      console.error(error);
    }
  );


  function getCoordinates(place) {
    console.log('turning address or name of place into coordinates')

  }

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  return (
        <div className='googleMapContainer'>
            { !isLoaded ?
              null :
              <GoogleMap
                  mapContainerClassName="googleMap"
                  center={coordinates}
                  zoom={10}
              >
                <Marker position={coordinates} />
              </GoogleMap>
            }
        </div>
  )
}

export default Map