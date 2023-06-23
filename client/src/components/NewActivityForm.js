import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';

function NewActivityForm() {

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [cost, setCost] = useState(0)
    const [notes, setNotes] = useState("")


    const location = useLocation()
    const [trip, setTrip] = useState(location.state)

    const [isLoading, setIsLoading] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        console.log('new activity submitted')
    }

    return (
        <form className="authForm" onSubmit={handleSubmit}>
                <div className="authFormContent">
                    <label className="authLabel"
                    htmlFor="name">Name</label>
                    <input
                        className="authInput"
                        type="text"
                        id="name"
                        autoComplete="off"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label className="authLabel"
                    htmlFor="address">Address</label>
                    <input
                        className="authInput"
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <label className="authLabel"
                    htmlFor="date">Date</label>
                    <input
                        className="authInput"
                        type="text"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <label className="authLabel"
                    htmlFor="start_time">Start Time</label>
                    <input
                        className="authInput"
                        type="text"
                        id="start_time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                    />
                    <label className="authLabel"
                    htmlFor="end_time">End Time</label>
                    <input
                        className="authInput"
                        type="text"
                        id="end_time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                    />
                    <label className="authLabel"
                    htmlFor="cost">Cost</label>
                    <input
                        className="authInput"
                        type="number"
                        id="cost"
                        value={cost}
                        onChange={(e) => setCost(e.target.value)}
                    />
                    <label className="authLabel activityNotes"
                    htmlFor="notes">Notes</label>
                    <input
                        className="authInput"
                        type="text"
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                    <button className="authButton" type="submit">{isLoading ? "Loading..." : "Save New Activity"}</button>
                </div>
        </form>
    )
    }

    export default NewActivityForm