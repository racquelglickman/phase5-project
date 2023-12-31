import React from 'react'
import ActivityCard from './ActivityCard'

function DayContainer({ day, activities, onDeleteActivity, dayStringFormat }) {

    const sortedActivities = activities.sort((a, b) => (parseInt(a.start_time.substring(0,2)) < parseInt(b.start_time.substring(0,2))) ? 1 : -1)

    const activityCards = activities.map((activity) => {
        return <ActivityCard key={activity.name} activity={activity} onDeleteActivity={onDeleteActivity} />
    })

    // need to turn these time strings into either numbers or date objects to sort them
    const sortedActivityCards = activityCards.sort((a,b) => (a.start_time < b.start_time) ? 1: -1)

    

    return (
        <div className='dayContainer'>
            <div className='dateHeading'>
                <p>{dayStringFormat(day)}</p>
            </div>
            {sortedActivityCards}
        </div>
    )
}

export default DayContainer