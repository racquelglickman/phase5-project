import React, { useEffect, useState, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import MyProvider from "./MyProvider";
import Home from "./Home";
import Nav from "./Nav";
import Error from "./Error";
import Login from "./Login";
import MyTrips from "./MyTrips";
import Map from "./Map";

function App() {
  return (
    <div>
      <MyProvider>
        <div className='navBar'>
          <Nav />
        </div>
        <Routes>
          <Route path="/trip" element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/mytrips' element={<MyTrips />} />
          <Route path='*' element={<Error />} />
          <Route path='/maps' element={<Map />} />
        </Routes>
      </MyProvider>
    </div>
      
    )
}

export default App;
