import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import './MainNav.css';
import logo from '../assets/logo.png'

export default function MainNav() {

  return (
    <section id='main-nav'>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <img src={logo} alt="" className='img-fluid' />
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link aria-current="page" to="/login"><button class="button2">Login</button></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">Register</Link>
            </li>
          </ul>
        </div>
      </nav>
    </section>
  )
}
