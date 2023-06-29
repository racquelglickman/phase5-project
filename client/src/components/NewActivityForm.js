import React, { useState, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './form.css'
import { MyContext } from './MyProvider'


function NewActivityForm() {

    const location = useLocation()
    const [trip, setTrip] = useState(location.state)

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [date, setDate] = useState(new Date(trip.start_date+'T00:00:00'));
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [cost, setCost] = useState(0)
    const [category, setCategory] = useState(0)
    const [notes, setNotes] = useState("")

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate()

    const { categories } = useContext(MyContext)
    const categoryNames = []
    for (let cat of categories) {
        categoryNames.push(cat.name)
    }

    function categoryID(catName) {
        for (let cat of categories) {
            if (cat.name === category) {
                return cat.id
            }
        }
    }

    const categoryOptions = categoryNames.map((cat) => {
        const capitalizedCat = cat.charAt(0).toUpperCase() + cat.slice(1)

        return <option key={cat} value={cat}>{capitalizedCat}</option>
    })

    function handleDateSelection(selectedDate) {
        console.log(selectedDate)
        setDate(selectedDate)
    }

    function handleTimeSelection(selectedTime) {
        console.log(selectedTime)
        setStartTime(selectedTime)
        // deal with if the minutes are only one digit - add a zero before, not after
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        console.log('new activity submitted')

        const newActivity = { 
            name: name,
            address: address,
            date: date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate(),
            start_time: startTime.getHours()+':'+startTime.getMinutes(),
            end_time: endTime,
            cost: parseInt(cost),
            notes: notes,
            category_id: categoryID(category),
            trip_id: trip.id,
        }
    
        console.log(newActivity)

        fetch('/activities', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(newActivity)
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            // onAddActivity(data);
            navigate(`/trip/${trip.id}`, { state: trip.id })
          })
    }

    return (
        <div className='actContainer'>
            <form className="actForm" onSubmit={handleSubmit}>
                <div className="actFormContent">
                    <label className="actLabel"
                    htmlFor="name">Name</label>
                    <input
                        className="actInput"
                        type="text"
                        id="name"
                        autoComplete="off"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label className="actLabel"
                    htmlFor="address">Address</label>
                    <input
                        className="actInput"
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <label className="actLabel"
                    htmlFor="date">Date</label>
                    <DatePicker 
                        className="actInput"
                        type="text"
                        id="date"
                        showIcon
                        selected={date} 
                        dateFormat="M/d/yyyy"
                        onChange={handleDateSelection} 
                        closeOnScroll={true}
                        includeDateIntervals={[
                            { start: new Date(trip.start_date+'T00:00:00'), end: new Date(trip.end_date+'T00:00:00') },
                          ]}
                    />
                    <label className="actLabel"
                    htmlFor="start_time">Start Time</label>
                    <DatePicker 
                        className='actInput'
                        id='start_time'
                        selected={startTime}
                        onChange={handleTimeSelection}
                        closeOnScroll={true}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                    />
                    {/* <input
                        className="actInput"
                        type="text"
                        id="start_time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                    /> */}
                    <label className="actLabel"
                    htmlFor="end_time">End Time</label>
                    <input
                        className="actInput"
                        type="text"
                        id="end_time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                    />
                    <label className="actLabel"
                    htmlFor="cost">Cost</label>
                    <input
                        className="actInput"
                        type="number"
                        id="cost"
                        value={cost}
                        onChange={(e) => setCost(e.target.value)}
                    />
                    <label className="actLabel"
                    htmlFor="category">Category</label>
                    <select 
                        className='actInput'
                        id='category'
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}>
                        <option>Select</option>
                        {categoryOptions}
                    </select>

                    <label className="actLabel activityNotes"
                    htmlFor="notes">Notes</label>
                    <textarea
                        className="actInput"
                        type="text"
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={6}
                    />
                    <button className="actButton" type="submit">{isLoading ? "Loading..." : "Save New Activity"}</button>
                </div>
        </form>
        </div>
        
    )
}

    export default NewActivityForm