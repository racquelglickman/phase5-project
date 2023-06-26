import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';

function NewActivityForm() {

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [cost, setCost] = useState(0)
    const [category, setCategory] = useState('')
    const [notes, setNotes] = useState("")


    const location = useLocation()
    const [trip, setTrip] = useState(location.state)

    const [isLoading, setIsLoading] = useState(false);

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
            // onAddPlant(data);
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
                    <input
                        className="actInput"
                        type="text"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
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
                    <input
                        className="actInput"
                        type="text"
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
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