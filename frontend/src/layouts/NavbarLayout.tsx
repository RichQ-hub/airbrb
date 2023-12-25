import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import { Bg } from '../styles/common';

const NavbarLayout = () => {
  return (
    <>
      <Navbar />
      <Bg>
        <Outlet />
      </Bg>
    </>
  )
}

export default NavbarLayout;
