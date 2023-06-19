import React, { useEffect, useState, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import MyProvider from "./MyProvider";
import Home from "./Home";
import Nav from "./Nav";
import Error from "./Error";

function App() {
  return (
    <div>
      <MyProvider>
        <Nav/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </MyProvider>
    </div>
      
    )
}

export default App;
