import React, { useState, useEffect } from 'react'
import DayContainer from './DayContainer'

function ItineraryList() {

    const [activities, setActivities] = useState([])
    const [start, setStart] = useState()
    const [end, setEnd] = useState()

    useEffect(() => {
        fetch('/trips')
            .then((res) => res.json())
            .then((data) => {
                setStart(data[10]['start_date']+'T00:00:00')
                setEnd(data[10]['end_date']+'T00:00:00')
                setActivities(data[10]['activities'])
            })
    }, [])

    // turn yyyy-mm-dd into mm-dd-yyyy
    function stringFormat(string) {
        let array = string.split('-')
        for (let el of array) {
            if (el.length == 2 && el[0] == 0) {
                console.log(el)
                el = el[1]
                console.log(el)
            }
        }
        console.log(array)
        return `${array[1]}-${array[2]}-${array[0]}`
    }

    // UP TO HERE - need to replace array element 

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
            console.log(dateStringFormat)
        }

        return dayArray
    }

    for (const act of activities) {
        console.log(act.date)
        console.log(stringFormat(act.date))
    }

    let x = 0;
    let dayList = tripLength(start,end)
    let length = dayList.length;
    let dayElementArray = []
    for (let i = 0; i < length; i++) {
        const dateActivities = activities.filter((act) => {
            return stringFormat(act.date) == dayList[i]
        })
        console.log(dateActivities)
        dayElementArray.push(<DayContainer day={dayList[i]} activities={dateActivities}/>)
    }


    
    return (
        <div className='itineraryListContainer'>
            <div className='itineraryListHeader'>
                <h1>Trip Name goes here</h1>
                <h2>Trip dates etc.</h2>
            </div>
            {dayElementArray}
        </div>
    )
}

export default ItineraryList