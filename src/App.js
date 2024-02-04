import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MainNav from './common/MainNav';
import Home from './home/Home';
import React, { Component, useEffect } from 'react';
import Login from './Login';
import Register from './Register';
import { auth, db } from './firebase-config';
import { getApp } from 'firebase/app';
import { doc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


function App() {
  const [user, setUser] = React.useState(null);

  useEffect(() => {
      auth.onAuthStateChanged((fbUser) => {
        setUser(fbUser);
      })

  }, [])

  return (
    <>
      <BrowserRouter>

        <main id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login action="login"/>} />
            <Route path="/register" element={<Login action="register"/>} />
          </Routes>
        </main >

      </BrowserRouter>
    </>
  );
}

export default App;