import React, { useEffect, useState, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Nav from "./Nav";
import Error from "./Error";

function App() {
  return (
    <div>
      <Nav/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </div>
      
    )
}

export default App;
