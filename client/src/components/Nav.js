import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './navBar.css';
import { MyContext } from './MyProvider'


function Nav() {

    const { setUser } = useContext(MyContext)

    function handleLogout() {
      fetch("/logout", { method: "DELETE" })
        .then((res) => {
          if (res.ok) {
            setUser(null);
          }
      });
    }

    const navigate = useNavigate()



    return (
        <div className="navBar">
            <img />
            <div className="navContent">
                <h1 className='tagLine'>Nav Bar</h1>
                <div className='links'>
                  <Link onClick={handleLogout} className="link logoutLink">Logout</Link>
                  <Link to='/mytrips'>My Trips</Link>
                  <Link to='/'>Home</Link>
                </div>
            </div>
        </div>
    )
  }

export default Nav