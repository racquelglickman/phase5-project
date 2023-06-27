import React from 'react'
import ActivityCard from './ActivityCard'

function DayContainer({ day, activities, onDeleteActivity }) {

    const activityCards = activities.map((activity) => {
        return <ActivityCard key={activity.name} activity={activity} onDeleteActivity={onDeleteActivity}/>
    })

    // need to turn these time strings into either numbers or date objects to sort them
    const sortedActivityCards = activityCards.sort((a,b) => (a.start_time < b.start_time) ? 1: -1)

    function dayStringFormat(day) {
        const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const dateObject = new Date(day)
        const dateDay = weekday[dateObject.getDay()]
        const dateMonth = months[dateObject.getMonth()]
        const dateDate = dateObject.getDate()
        return dateDay+', '+dateMonth+' '+dateDate
    }

    dayStringFormat(day)

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