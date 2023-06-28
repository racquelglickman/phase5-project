import React, { useContext, useState, useEffect } from 'react'
import Map from './Map'
import ItineraryList from './ItineraryList';
import { MyContext } from './MyProvider'
import './homePage.css';
import { useLocation } from 'react-router-dom';

function Home() {

    const { selectedTrip } = useContext(MyContext)

    const location = useLocation()
    const [tripID, setTripID] = useState(location.state)
    const [trip, setTrip] = useState()

    useEffect(() => {
        fetch(`/trips/${selectedTrip? selectedTrip.id : tripID}`)
            .then((res) => res.json())
            .then((data) => {
                setTrip(data)
            })
    }, [])

    return (
        <div className='homeContainer'>
            <div className='mainContainer'>
                <div className='headerContainer'>
                    {/* <div className='viewSelection'>
                        <p>radio button goes here</p>
                    </div> */}
                </div>
                <div className='contentContainer'>
                    <div className='itineraryContainer'>
                        {trip? <ItineraryList trip={trip}/> : null}     
                    </div>
                    <div className='mapContainer'>
                        {trip? <Map trip={trip}/> : null}
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Home