import React, { useState, useContext } from 'react'
import './form.css'
import { MyContext } from './MyProvider'

function Notebook() {

    const [notebook, setNotebook] = useState('')

    const { selectedTrip } = useContext(MyContext)

    function handleSubmit(e) {
      e.preventDefault();
      console.log('need to patch to backend')
    }

    console.log(selectedTrip)

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