import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';

function NewTripForm() {
    const [name, setName] = useState("");
    const [destination, setDestination] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("")

    const location = useLocation()
    const [trip, setTrip] = useState(location.state)
    console.log(trip)

    const [isLoading, setIsLoading] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        console.log('new activity submitted')
    }

    return (
        <form className="authForm" onSubmit={handleSubmit}>
                <div className="authFormContent">
                    <label className="authLabel"
                    htmlFor="name">Trip Name</label>
                    <input
                        className="authInput"
                        type="text"
                        id="name"
                        autoComplete="off"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label className="authLabel"
                    htmlFor="destination">Trip Destination</label>
                    <input
                        className="authInput"
                        type="text"
                        id="destination"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                    />
                    <label className="authLabel"
                    htmlFor="start_date">Start Date</label>
                    <input
                        className="authInput"
                        type="text"
                        id="start_date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <label className="authLabel"
                    htmlFor="end_date">End Date</label>
                    <input
                        className="authInput"
                        type="text"
                        id="end_date"
                        autoComplete="off"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                    <button className="authButton" type="submit">{isLoading ? "Loading..." : "Save New Trip"}</button>
                </div>
        </form>
    )
}

export default NewTripForm