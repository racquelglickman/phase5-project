import React from 'react'

  function ActivityCard({ activity, onDeleteActivity }) {

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
        if (parseInt(time.substring(0,2)) <= 12) {
            if (time.charAt(0) === '0') {
                return time.substring(1,5)+' am'
            }
            else {
                return time.substring(0,5)+' am'
            }
        } else {
            return parseInt(time.substring(0,2))-12+':00 pm'
        }
    }

    timeFormat(activity.start_time)

    function handleEdit() {
        console.log('editing', activity)
    }

    return (
        <div className='activityCard'>
            <div className='activityCardContent'>
                <div className='activityTime'>
                    <p>{timeFormat(activity.start_time)}</p>
                </div>
                <div className='activityIcon'>
                    <p>icon</p>
                </div>
                <div className='activityDetails'>
                        <h4>{activity.name}</h4>
                        <p>{activity.notes}</p>
                        {/* <p>▿</p> */}
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