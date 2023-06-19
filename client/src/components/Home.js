import React, { useContext, useState, useEffect } from 'react'
import Map from './Map'
import ItineraryList from './ItineraryList';
import { MyContext } from './MyProvider'
import './homePage.css';

function Home() {
  return (
    <div className='homeContainer'>
        <div className='headerContainer'>
            <div className='viewSelection'>

            </div>
        </div>
        <div className='contentContainer'>
            <div className='itineraryContainer'>
                <ItineraryList />       
            </div>
            <div className='mapContainer'>
                Map goes here
            </div>
        </div>
    </div>
  )
}

export default Home