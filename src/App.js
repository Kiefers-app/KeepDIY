import React, { useState, useEffect } from 'react';
//import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import SetMapPage from './screens/app-map'
import LiveMapPage from './screens/tracker'


function App() {


  return (
    // <HashRouter>
    //   <Routes>
    //     <Route path="/setlocation" element={<SetMapPage/>} />
    //     <Route path="/tracker" element={<LiveMapPage/>} />
    //     <Route path="/login" element={<LoginPage setPrivData={setPrivData} onLogin={handleLogin} />} />
    //     <Route path="/verify" element={<VerifyPage />} />
    //     <Route path="/home/*" element={goOnline ? <HomePage whoChat={whoChat} chatOpen={chatOpen} private_Date={private_Date} onLogout={handleLogout} /> : <Navigate to="/login" />} />
    //     <Route path="/" element={<Navigate to="/login" />} />
    //   </Routes>
    // </HashRouter>

<Router>
  <Routes>
    <Route path="/setlocation" element={<SetMapPage/>} />
    <Route path="/tracker" element={<LiveMapPage/>} />
    <Route path="/" element={<LiveMapPage/>} />
  </Routes>
</Router>




  );
}

export default App;
