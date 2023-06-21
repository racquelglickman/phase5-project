import React, { useContext } from 'react'
import { MyContext } from './MyProvider'


function MyTrips() {

    const { user } = useContext(MyContext)
    console.log(user.trips)

    const userTrips = user.trips.map((trip) => {
        return <p>{trip.name}</p>
    })

    return (
        <div>
            <div>
                <p>{userTrips}</p>
            </div>
        </div>
    )
}

export default MyTrips