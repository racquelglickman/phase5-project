import React, { useMemo } from 'react'
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import './homePage.css'

function Map() {

  console.log(process.env.Reac)

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