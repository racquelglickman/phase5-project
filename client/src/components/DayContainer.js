import React from 'react'
import ActivityCard from './ActivityCard'

function DayContainer({ day, activities }) {

    const activityCards = activities.map((activity) => {
        return <ActivityCard activity={activity}/>
    })

    return (
        <div className='dayContainer'>
            <div className='dateHeading'>
                <p>{day}</p>
            </div>
            <p>{activityCards}</p>
        </div>
    )
    }

export default DayContainer