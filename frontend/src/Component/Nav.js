import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';


const Nav = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  return (
    <div>
      <nav className="navbar py-0 my-0 bg-light navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand text-primary fs-6" href="/home"><i className="far fa-envelope"></i>  sparklejewelles@gmail.com</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
             
              <li className="nav-item px-2">
                <a className="nav-link text-primary fs-6" href="/Contact">Contact</a>
              </li>
              <li className="nav-item px-2">
                <a className="nav-link text-primary fs-6" href="/about">About Us</a>
              </li>
              <li className="nav-item px-2">
                <a className="nav-link text-primary fs-6" href="/pro">All Pro</a>
              </li>
             
            </ul>
          </div>

        </div>
      </nav>
      <hr className='m-0 mx-5' />
      <nav className="navbar py-0 my-0 navbar-expand-lg">
        <div className="container">
          <a href="/"><img src='Images/logo.png' className='logo' alt='LOGO' /></a>
          <ul className="navbar-nav ms-auto mb-lg-0">
            <li className="nav-item px-3">
              <a className="nav-link text-primary" href="/search"><i class="fas fa-search"></i></a>
            </li>
            <li className="nav-item px-3">
              <a className="nav-link text-primary" href="/trendy">Trendy</a>
            </li>

            { !isAuthenticated && ( 
                    <> 
                    <li className="nav-item px-4">
                    <a className="nav-link text-primary" href="/Login">Login</a>
                  </li>
                  <li className="nav-item px-4">
                    <a className="nav-link text-primary" href="/Register">SignUp</a>
                  </li>
                  </> ) } 
           
          </ul>

        </div>
      </nav>
    </div>
  )
}

export default Nav