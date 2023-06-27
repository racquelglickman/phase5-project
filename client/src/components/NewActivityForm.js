import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function NewActivityForm() {

    const location = useLocation()
    const [trip, setTrip] = useState(location.state)

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [cost, setCost] = useState(0)
    const [category, setCategory] = useState('')
    const [notes, setNotes] = useState("")

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate()

    const categories = ['flight', 'train', 'car', 'bus', 'tour', 'hike', 'water', 'explore', 'logistics']
    const categoryOptions = categories.map((cat) => {
        const capitalizedCat = cat.charAt(0).toUpperCase() + cat.slice(1)

        return <option key={cat} value={cat}>{capitalizedCat}</option>
    })

    function tripDates() {
        console.log('trip dates are the range')
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        console.log('new activity submitted')

        const newActivity = { 
            name: name,
            address: address,
            date: date,
            start_time: startTime,
            end_time: endTime,
            cost: parseInt(cost),
            notes: notes,
            category_id: parseFloat(category),
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
                        selected={date} 
                        showTimeSelect
                        filterDate={tripDates}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        onChange={(selectedDate) => console.log(selectedDate)} 
                    />
                    <label className="actLabel"
                    htmlFor="start_time">Start Time</label>
                    <input
                        className="actInput"
                        type="text"
                        id="start_time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                    />
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
                    <input
                        className="actInput"
                        type="text"
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                    <button className="actButton" type="submit">{isLoading ? "Loading..." : "Save New Activity"}</button>
                </div>
        </form>
        </div>
        
    )
    }

    export default NewActivityForm