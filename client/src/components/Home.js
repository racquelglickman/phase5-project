import React, { useContext, useState, useEffect } from 'react'
import Map from './Map'
import './homePage.css';

function Home() {
  return (
    <div className='homeContainer'>
        <div className='headerContainer'>

        </div>
        <div className='contentContainer'>
            <div className='itineraryContainer'>
                Itinerary Calendar or Itinerary Calendar        
            </div>
            <div className='mapContainer'>
                Map goes here
            </div>
        </div>
    </div>
  )
}

export default Home