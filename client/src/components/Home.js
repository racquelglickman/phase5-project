import React, { useContext, useState, useEffect } from 'react'
import Map from './Map'
import ItineraryList from './ItineraryList';
import { MyContext } from './MyProvider'
import './homePage.css';
import { useLocation } from 'react-router-dom';

function Home() {

    const { selectedTrip, setSelectedTrip } = useContext(MyContext)

    const location = useLocation()
    console.log(location.state)
    const [tripID, setTripID] = useState(location.state)
    const [trip, setTrip] = useState()
    // check what location.state is and then set things appropriately
    if (typeof(location.state) === 'number') {
        console.log('this is the trip id')
        // setTripID(location.state)
    } else {
        console.log('this is the selectedTrip object')
    }
    

    useEffect(() => {

        console.log('selected', selectedTrip)
        console.log('tripID', tripID)
        fetch(`/trips/${tripID}`)
            .then((res) => res.json())
            .then((data) => {
                setTrip(data)
                setSelectedTrip(data)
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