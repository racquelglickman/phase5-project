import React, { useState, useContext, useEffect } from 'react'
import './form.css'
import { MyContext } from './MyProvider'
import { useLocation } from 'react-router-dom';


function Notebook() {

    const [notebook, setNotebook] = useState('')
    const location = useLocation()

    const { setSelectedTrip } = useContext(MyContext)
    const [trip, setTrip] = useState(null)

    useEffect(() => {
      console.log(location.state)
      setSelectedTrip(location.state['selectedTrip'])
      
      fetch(`/trips/${location.state['selectedTrip'].id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setTrip(data)
          setNotebook(data.notebook)
        })

    }, [])

    function handleSubmit(e) {
      e.preventDefault();
      console.log('need to patch to backend')
      fetch(`/trips/${trip.id}`, {
        method: 'PATCH',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({notebook: notebook})
        })
        .then((res) => res.json())
        .then((data) => {
          console.log('patch was successful')
          console.log(data)
        })
    }

    return (
        <div className='notebookContainer'>
            <form className='notebookForm' onSubmit={handleSubmit}>
              <label>
                Trip Notebook:
              </label>
              <textarea 
                  name='tripNotebook' 
                  className='tripNotebook'
                  rows={20}
                  value={notebook}
                  onChange={(e) => setNotebook(e.target.value)}
              />
              <div className='notebookButtonContainer'>
                  <button
                    type='submit'
                    className = 'notebookButton'
                  >Save
                  </button>
              </div>
            </form>
        </div>
    )
}

export default Notebook