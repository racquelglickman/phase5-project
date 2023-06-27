import React, { useContext } from 'react'
import './homePage.css';
import { useNavigate } from 'react-router-dom'
import { MyContext } from './MyProvider'
import MyTrips from './MyTrips';

function TripCard({ trip }) {

    const navigate = useNavigate()
    const { selectedTrip, setSelectedTrip } = useContext(MyContext)

    function handleClick() {
        setSelectedTrip(trip)
        navigate(`/trip/${trip.id}`, {state: trip.id})
    }
    
    return (
        <div className='tripCard' onClick={handleClick}>
            <p>{trip.name}</p>
        </div>
    )
}

export default TripCard