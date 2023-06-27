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
            navigate('/')
          }
      });
    }

    function handleNavigate() {
      navigate('/')
    }

    const navigate = useNavigate()

    return (
        <div className="navBar">
            <div className="navContent">
                <img src='/planit-logo.png' alt='logo' className='logo' onClick={handleNavigate}/>
                <div className='links'>
                  <Link className='link' to='/'>My Trips</Link>
                  <Link className="link logoutLink" onClick={handleLogout} >Logout</Link>
                </div>
            </div>
        </div>
    )
  }

export default Nav