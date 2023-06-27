import React, { useContext } from 'react'
import { MyContext } from './MyProvider'
import TripCard from './TripCard'
import './homePage.css';

function MyTrips() {

    const { user } = useContext(MyContext)

    const userTrips = user.trips.map((trip) => {
        return <TripCard key={trip.name} trip={trip}/>
    })

    return (
        <div className='myTripsContainer'>
            <h1>My Trips</h1>
            <div className='tripContainer'>
                {userTrips}
            </div>
        </div>
    )
}

export default MyTrips