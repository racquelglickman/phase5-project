import React from 'react'
import './homePage.css';
import { useNavigate } from 'react-router-dom'

function TripCard({ trip }) {

    const navigate = useNavigate()

    function handleClick() {
        navigate(`/trips/${trip.id}`, {state: trip.id})
    }

    return (
        <div className='tripCard' onClick={handleClick}>
            <p>{trip.name}</p>
        </div>
    )
}

export default TripCard