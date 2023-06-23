import React, { useMemo } from 'react'
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import './homePage.css'
import 'world-countries-capitals'
import Geocode from 'react-geocode'

function Map({ tripID }) {

  // const wcc = require('world-countries-capitals')
  // console.log(wcc.getCountryDetailsByName('portugal'))

  Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
  Geocode.setLanguage('en');

  Geocode.fromAddress("altis grand hotel").then(
    (response) => {
      const { lat, lng } = response.results[0].geometry.location;
      console.log(lat, lng);
    },
    (error) => {
      console.error(error);
    }
  );
  

    const { isLoaded } = useLoadScript({
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    });
    
    const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);

    return (
          <div className='googleMapContainer'>
              { !isLoaded ?
                null :
                <GoogleMap
                    mapContainerClassName="googleMap"
                    center={center}
                    zoom={10}
                />
              }
          </div>
    )
}

export default Map