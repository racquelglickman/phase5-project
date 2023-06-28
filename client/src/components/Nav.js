import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './navBar.css';
import { MyContext } from './MyProvider'


function Nav() {

    const { setUser, selectedTrip, setSelectedTrip } = useContext(MyContext)

    function handleLogout() {
      fetch("/logout", { method: "DELETE" })
        .then((res) => {
          if (res.ok) {
            setUser(null);
            navigate('/')
          }
      });
    }

    function handleNavigate() {
      navigate('/')
      setSelectedTrip()
    }

    function handleSelectedUser() {
      setSelectedTrip()
    }

    const navigate = useNavigate()

    return (
        <div className="navBar">
            <div className="navContent">
                <img src='/planit-logo.png' alt='logo' className='logo' onClick={handleNavigate}/>
                <div className='links'>
                  <div className='navBarCorner'>
                    <Link className='link myTripsLink' to='/' onClick={handleSelectedUser}>My Trips</Link>
                    <Link className="link logoutLink" onClick={handleLogout} >Logout</Link>
                  </div>
                  {selectedTrip?
                  <div className='navBarProper'>
                    <Link className='link' to={selectedTrip? `/trip/${selectedTrip.id}` : null} state={{selectedTrip: selectedTrip}}>Itinerary</Link>
                    <Link className='link' to={selectedTrip? `/trip/notebook/${selectedTrip.id}` : null} state={{selectedTrip: selectedTrip}}>Notebook</Link>
                  </div>
                  : null}
                </div>
            </div>
        </div>
    )
  }

export default Nav