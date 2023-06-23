import React, { useContext, useState, useEffect } from 'react'
import Map from './Map'
import ItineraryList from './ItineraryList';
import { MyContext } from './MyProvider'
import './homePage.css';
import { useLocation } from 'react-router-dom';
import Nav from './Nav';

function Home() {

    const location = useLocation()
    const [tripID, setTripID] = useState(location.state)

    return (
        <div className='homeContainer'>
            <div className='mainContainer'>
                <div className='headerContainer'>
                    <div className='viewSelection'>
                        <p>radio button goes here</p>
                    </div>
                </div>
                <div className='contentContainer'>
                    <div className='itineraryContainer'>
                        <ItineraryList tripID={tripID}/>       
                    </div>
                    <div className='mapContainer'>
                        <Map tripID={tripID}/>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Home