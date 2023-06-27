import React, { useEffect, useState, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import MyProvider from "./MyProvider";
import Home from "./Home";
import Nav from "./Nav";
import Error from "./Error";
import Login from "./Login";
import MyTrips from "./MyTrips";
import Map from "./Map";
import NewActivityForm from "./NewActivityForm";
import Notebook from "./Notebook";

function App() {
  return (
    <div className="appDiv">
      <MyProvider>
        <div className='navBarContainer'>
          <Nav />
        </div>
        <Routes>
          <Route path="/trip/:id" element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<Error />} />
          <Route path='/newactivity' element={<NewActivityForm />}/>
          <Route path='/' element={<MyTrips />} />
          <Route path='/notebook' element={<Notebook />}/>
        </Routes>
      </MyProvider>
    </div>
      
    )
}

export default App;
