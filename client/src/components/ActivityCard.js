import React from 'react'

  function ActivityCard( {activity} ) {
      return (
          <div className='activityCard'>
              <div className='activityTime'>
                  <p>time</p>
              </div>
              <div className='activityIcon'>
                  <p>icon</p>
              </div>
              <div className='activityDetails'>
                  <h4>{activity.name}</h4>
                  <p>{activity.notes}</p>
              </div>
              
          </div>
      )
  }

export default ActivityCard