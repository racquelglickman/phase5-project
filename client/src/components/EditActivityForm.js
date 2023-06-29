import React, { useState, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './form.css'
import { MyContext } from './MyProvider'


function EditActivityForm() {

    const { categories, selectedTrip } = useContext(MyContext)

    const location = useLocation()
    const [activity, setActivity] = useState(location.state)
    console.log(activity)
    console.log(selectedTrip)


    const [name, setName] = useState(activity.name);
    const [address, setAddress] = useState(activity.address);
    const [date, setDate] = useState(new Date(activity.date+'T00:00:00'));
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState("")
    const [cost, setCost] = useState(activity.cost)
    const [category, setCategory] = useState(activity.cost)
    const [notes, setNotes] = useState(activity.notes)

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate()

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
        setDate(selectedDate)
    }

    function handleTimeSelection(selectedTime) {
        console.log(selectedTime)
        console.log(selectedTime.getHours(), selectedTime.getMinutes())
        setStartTime(selectedTime)
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        console.log('new activity submitted')
        let minutes = startTime.getMinutes()
        if (startTime.getMinutes() === 0) {
            minutes = '00'
        }
        console.log(minutes)

        const editedActivity = { 
            name: name,
            address: address,
            date: date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate(),
            cost: parseInt(cost),
            notes: notes,
            category_id: categoryID(category),
        }
    
        console.log(editedActivity)

        fetch(`/activities/${activity.id}`, {
          method: 'PATCH',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(editedActivity)
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            navigate(`/trip/${selectedTrip.id}`, { state: selectedTrip.id })
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
                            { start: new Date(selectedTrip.start_date+'T00:00:00'), end: new Date(selectedTrip.end_date+'T00:00:00') },
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
                    <button className="actButton" type="submit">{isLoading ? "Loading..." : "Save Activity"}</button>
                </div>
        </form>
        </div>
        
    )
}

    export default EditActivityForm