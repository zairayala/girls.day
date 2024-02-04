import React, { useEffect, useState } from 'react'
import MainBanner from './MainBanner'
import MainNav from '../common/MainNav'
import { auth } from '../firebase-config';
import Meetings from '../Meetings';
import Search from '../Search';


export default function Home() {

  const [user, setUser] = React.useState(null);
 
  useEffect(() => {
    auth.onAuthStateChanged((fbUser) => {
      setUser(fbUser);
    })
  }, [user])

  const signOut = () => {
    auth.signOut();
  }

  return (
    <>
      <MainNav />
      {!user && (<MainBanner />)}
      {user && (<Search />)}
      <Meetings user={user} />
      {user && (<button onClick={signOut} type='button' id="log-out" className='btn-logout'>CERRAR SESIÓN</button>)}
    </>
  )
}
