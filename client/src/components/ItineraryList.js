import React, { useState, useEffect } from 'react'
import DayContainer from './DayContainer'

function ItineraryList() {

    const [activities, setActivities] = useState([])
    const [start, setStart] = useState()
    const [end, setEnd] = useState()
    const [trip, setTrip] = useState()

    useEffect(() => {
        fetch('/trips')
            .then((res) => res.json())
            .then((data) => {
                setStart(data[10]['start_date']+'T00:00:00')
                setEnd(data[10]['end_date']+'T00:00:00')
                setActivities(data[10]['activities'])
                setTrip(data[10])
            })
    }, [])

    // turn yyyy-mm-dd into mm-dd-yyyy
    function stringFormat(string) {
        let array = string.split('-')
        for (let i = 0; i < array.length; i++) {

            if (array[i].length === 2 && array[i][0] === '0') {
                const newElement = array[i].substring(1)
                array.splice(i,1,newElement)
            }
        }
        return `${array[1]}-${array[2]}-${array[0]}`
    }

    function tripLength(start, end) {
        const date1 = new Date(start)
        const date2 = new Date(end)
        
        const dif = Math.abs(date2-date1)
        const difDays = dif/(1000 * 3600 * 24)

        const dayArray = []
        for (let i = 0; i < difDays + 1; i++) {

            const dateStringFormat = stringFormat(`${date1.getFullYear()}-${date1.getMonth()+1}-${date1.getDate()}`)

            date1.setDate(date1.getDate() + 1);

            dayArray.push(dateStringFormat)
        }

        return dayArray
    }
    let x = 0;
    let dayList = tripLength(start,end)
    let length = dayList.length;
    let dayElementArray = []
    for (let i = 0; i < length; i++) {
        const dateActivities = activities.filter((act) => {
            return stringFormat(act.date) === dayList[i]
        })
        dayElementArray.push(<DayContainer day={dayList[i]} activities={dateActivities}/>)
    }


    
    return (
        <div className='itineraryListContainer'>
            <div className='itineraryListHeader'>
                {/* <h1>{trip.name}</h1>
                <h2>{stringFormat(trip.start_date)}  -  {stringFormat(trip.end_date)}</h2> */}
            </div>
            {dayElementArray}
        </div>
    )
}

export default ItineraryList