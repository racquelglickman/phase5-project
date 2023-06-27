import React, { useState } from 'react'
import './form.css'

function Notebook() {

    const [notebook, setNotebook] = useState('')
    function handleSubmit(e) {
      e.preventDefault();
      console.log('need to patch to backend')
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