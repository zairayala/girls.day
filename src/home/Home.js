import React, { useEffect, useState } from 'react'
import MainBanner from './MainBanner'
import MainNav from '../common/MainNav'
import { auth } from '../firebase-config';
import Meetings from '../Meetings';
import Search from '../Search';


export default function Home() {
  const [user, setUser] = React.useState(null);
  const [userLogued, setUserLogued] = useState(false);
  const signOut = () => {
    auth.signOut();
}
  useEffect(() => {

      auth.onAuthStateChanged((fbUser) => {
        setUser(fbUser);
          setUserLogued(fbUser); 
      })
  }, [])
  
  return (
    <>
    <MainNav />
    {!userLogued && (<MainBanner />)}
    {userLogued && (<Search />)}
    <Meetings />
    {userLogued && (<button onClick={signOut} type='button' id="log-out" className='btn-logout'>CERRAR SESIÓN</button>)}
    </>
  )
}
