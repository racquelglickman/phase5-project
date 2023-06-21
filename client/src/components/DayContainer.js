import React from 'react'
import ActivityCard from './ActivityCard'

function DayContainer({ day, activities }) {

    const activityCards = activities.map((activity) => {
        return <ActivityCard activity={activity}/>
    })

    // need to turn these time strings into either numbers or date objects to sort them
    const sortedActivityCards = activityCards.sort((a,b) => (a.start_time < b.start_time) ? 1: -1)

    return (
        <div className='dayContainer'>
            <div className='dateHeading'>
                <p>{day}</p>
            </div>
            <p>{sortedActivityCards}</p>
        </div>
    )
    }

export default DayContainer