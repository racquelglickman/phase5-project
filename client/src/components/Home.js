import React, { useContext, useState, useEffect } from 'react'
import Map from './Map'
import ItineraryList from './ItineraryList';
import { MyContext } from './MyProvider'
import './homePage.css';
import { useLocation } from 'react-router-dom';

function Home() {

    const { selectedTrip, setSelectedTrip } = useContext(MyContext)

    const location = useLocation()
    // console.log(location.state)
    const [tripID, setTripID] = useState(null)
    const [trip, setTrip] = useState()
    // check what location.state is and then set things appropriately

    useEffect(() => {
        if (typeof(location.state) === 'number') {
            console.log('this is the trip id')
            setTripID(location.state)
        } else {
            console.log('this is the selectedTrip object')
            setTrip(location.state['selectedTrip'])
        }

    }, [])

    useEffect(() => {
        if (tripID !== null) {
        
            fetch(`/trips/${typeof(location.state) === 'number' ? tripID : location.state['selectedTrip'].id}`)
                .then((res) => res.json())
                .then((data) => {
                    setTrip(data)
                });
            }
        
    }, [tripID])

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