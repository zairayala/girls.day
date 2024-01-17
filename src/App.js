import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MainNav from './common/MainNav';
import Home from './home/Home';
import React, { Component, useEffect } from 'react';
import Login from './Login';
import Register from './Register';
import { auth } from './firebase-config';
import { getApp } from 'firebase/app';


function App() {
  const [usuario, setUsuario] = React.useState(null);

  useEffect(() => {
      auth.onAuthStateChanged((fbUser) => {
          setUsuario(fbUser);
      })

  }, [])

  return (
    <>
      <BrowserRouter>

        <main id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main >

      </BrowserRouter>
    </>
  );
}

export default App;
