import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css';


const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user);

  return !sessionUser ? (
    <nav>
      <a href='/dashboard'>
        <img
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Robinhood_logo.svg/640px-Robinhood_logo.svg.png'
          alt=''
        />
      </a>
      <div className='nav-right'>
        <ul className='nav-right-ul'>
          <li>
            <NavLink to='/' exact={true} activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  ) : (
    <nav>
      <a href='/dashboard'>
        <img
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Robinhood_logo.svg/640px-Robinhood_logo.svg.png'
          alt=''
        />
      </a>
      <div className='nav-search-bar'>
        {/* <SearchBar /> */}
        <div>search bar</div>
      </div>
      <div className='nav-right'>
        <ul className='nav-right-ul'>
          <li>
            <NavLink to='/dashboard' exact={true} activeClassName='active'>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to='/users' exact={true} activeClassName='active'>
              Users
            </NavLink>
          </li>
          <li>
            <LogoutButton />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
