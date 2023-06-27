import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './homePage.css';
import DayContainer from './DayContainer'

function ItineraryList({ trip }) {

    const [activities, setActivities] = useState(trip['activities'])
    const [start, setStart] = useState(trip['start_date']+'T00:00:00')
    const [end, setEnd] = useState(trip['end_date']+'T00:00:00')

    const navigate = useNavigate()

    function onDeleteActivity(deletedID) {
        setActivities(activities.filter((act) => {
            return act.id != deletedID;
        }))
    }

    function handleAddActivity() {
        console.log('adding activity to this trip', trip.name)
        navigate(`/newactivity`, { state: trip })
    }

    function tripLength(start, end) {
        const date1 = new Date(start)
        const date2 = new Date(end)

        
        const dif = Math.abs(date2-date1)
        const difDays = dif/(1000 * 3600 * 24)

        const dayArray = []
        for (let i = 0; i < difDays + 1; i++) {

            const dateStringFormat = date1.toLocaleDateString('en-us')

            date1.setDate(date1.getDate() + 1);

            dayArray.push(dateStringFormat)
        }

        return dayArray
    }

    // turn yyyy-mm-dd into mm/dd/yyyy
    function stringFormat(string) {
        let array = string.split('-')
        for (let i = 0; i < array.length; i++) {

            if (array[i].length === 2 && array[i][0] === '0') {
                const newElement = array[i].substring(1)
                array.splice(i,1,newElement)
            }
        }
        return `${array[1]}/${array[2]}/${array[0]}`
    }

    let x = 0;
    let dayList = tripLength(start,end)
    let length = dayList.length;
    let dayElementArray = []
    for (let i = 0; i < length; i++) {
        const dateActivities = activities.filter((act) => {
            return stringFormat(act.date) === dayList[i]
        })
        dayElementArray.push(<DayContainer key={dayList[i]} day={dayList[i]} activities={dateActivities} onDeleteActivity={onDeleteActivity}/>)
    }


    
    return (
        <div className='itineraryListContainer'>
            <div className='itineraryListHeader'>
                {trip? 
                <div>
                    <h1>{trip.name}</h1>
                    <h4>{stringFormat(trip.start_date)}  -  {stringFormat(trip.end_date)}</h4>
                </div>
                : null}
                <div className='addButton'>
                    <button onClick={handleAddActivity}>➕</button>
                </div>
                
            </div>
            {dayElementArray}
        </div>
    )
}

export default ItineraryList