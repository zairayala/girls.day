import React from 'react'
import './MainBanner.css'

export default function MainBanner() {
  return (
    <section id='main-banner'>
      <div className='container mb-5 mt-5'>
        <div className='banner-text mb-5'>
          <div className='mb-5'>
            <h1>Encuentra <span>amigas</span> para tus mejores <span>salidas...</span></h1>
            <h2>¡Tu próxima aventura comienza aquí!</h2>
          </div>
          <button className='button1'>
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg> ÚNETE A NOSOTRAS
          </button>
        </div>
        <div className="parent">
          <div className="item img1"> </div>
          <div className="item img2"> </div>
          <div className="item img3"> </div>
          <div className="item img4"> </div>
          <div className="item img5"> </div>
        </div>
      </div>
    </section>
  )
}
