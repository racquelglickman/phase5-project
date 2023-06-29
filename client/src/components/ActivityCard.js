import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './homePage.css'

  function ActivityCard({ activity, onDeleteActivity }) {

    const [editNotesValue, setEditNotesValue] = useState(activity.notes);
    const [isEditing, setIsEditing] = useState(false)

    const navigate = useNavigate()

    function handleDelete() {
        console.log('deleting activity')
        console.log(activity.id)
        fetch(`/activities/${activity.id}`, {
                method: 'DELETE',
            })
            .then(() => {
                console.log('successfully deleted');
                onDeleteActivity(activity.id);
      });
    }

    function timeFormat(time) {

        if ((time.length === 4 && time.charAt(2) === ':') || (time.length === 3 && time.charAt(1) === ':')) {
            time = time + '0'
        }

        if (parseInt(time.substring(0,2)) < 12) {
            if (time.charAt(0) === '0') {
                return time.substring(1,5)+' am'
            }
            else {
                return time.substring(0,5)+' am'
            }
        } else if (parseInt(time.substring(0,2)) === 12) {
            return time.substring(0,5)+' pm'
        }
        else {
            return parseInt(time.substring(0,2))-12+':'+time.substring(3,5)+' pm'
        }
    }

    function handleEdit() {
        console.log('editing', activity)
        setIsEditing(true)
        // navigate(`/editactivity`, { state: activity })
    }

    function handleSubmitEditNotes(e) {
        e.preventDefault();
        console.log('submit notes')

        fetch(`/activities/${activity.id}`, {
            method: 'PATCH',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({notes: editNotesValue})
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              setIsEditing(false)
            //   navigate(`/trip/${selectedTrip.id}`, { state: selectedTrip.id })
            })
    }

    const bulletedNotes = activity.notes.split('\n')
    const bulletedNotesElements = bulletedNotes.filter(bullet => bullet.length > 0).map((bullet) => {
        return <p key={bullet}>  • {bullet}</p>
    })

    return (
        <div className='activityCard'>
            <div className='activityCardContent'>
                <div className='activityTime'>
                    <p>{timeFormat(activity.start_time)}</p>
                </div>
                {/* <div className='activityIcon'>
                    <p>icon</p>
                </div> */}
                <div className='activityDetails'>
                        <h4>{activity.name}</h4>
                        {isEditing? 
                        <div >
                            <form className='editNotes' onSubmit={handleSubmitEditNotes}>
                                <textarea
                                    value={editNotesValue}
                                    rows={6}
                                    onChange={(e) => setEditNotesValue(e.target.value)}
                                > 
                                </textarea>
                                <button
                                    className='actButton'
                                    type='submit'
                                >Save</button>
                            </form>
                        </div>
                        :bulletedNotesElements} 
                </div>
            </div>
            <div className='activityCardButtons'>
                <button className='activityCardButton' onClick={handleEdit}>⠒</button>
                <button className='activityCardButton' onClick={handleDelete}>🗑</button>
            </div>
            
        </div>
    )
  }

export default ActivityCard