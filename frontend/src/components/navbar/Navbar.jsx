import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaOpencart,
  FaTimes,
  FaFacebookSquare,
  FaLinkedin,
  FaSquarespace,
  FaBehanceSquare,
  FaInstagram,
} from 'react-icons/fa';

import { assets } from '../../assets/assets';
import './Navbar.css';
import Button from '../button/Button';
import Socials from '../social-icons/Socials';
import CloseButton from '../Close-btn/CloseButton';
import Overlay from '../overlay/Overlay';

const Navbar = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [cartDrawerIsOpen, setCartDrawerIsOpen] = useState(false);
  const [fixedNavbar, setFixedNavbar] = useState(false);

  const navbarFixer = () => {
    if (window.pageYOffset > 80) {
      setFixedNavbar(true);
    } else {
      setFixedNavbar(false);
    }
  };
  window.addEventListener('scroll', () => {
    navbarFixer();
  });
  return (
    <>
      {cartDrawerIsOpen ? <Overlay /> : null}
      {drawerIsOpen ? <Overlay /> : null}
      <nav className={`nav ${fixedNavbar ? 'active' : null}`}>
        <div className='nav-center'>
          <div className='nav-header'>
            <button
              className='nav-btn'
              onClick={() => setDrawerIsOpen(!drawerIsOpen)}>
              <svg
                width='26'
                height='18'
                viewBox='0 0 26 18'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M13 17.5H0.25V14.6667H13V17.5ZM25.75 10.4167H0.25V7.58333H25.75V10.4167ZM25.75 3.33333H13V0.5H25.75V3.33333Z'
                  fill='#64ffda'
                />
              </svg>
            </button>
            <div className='brand'>
              <h1>Premium</h1>
            </div>
            <ul className='nav-links'>
              <li>
                <Link to='/'>Shop</Link>
              </li>
              <li>
                <Link to='/about' className='menu-link'>
                  about
                </Link>
              </li>
              <li>
                <Link to='/contact' className='menu-link'>
                  contact
                </Link>
              </li>
            </ul>
            <button
              className='cart'
              onClick={() => setCartDrawerIsOpen(!cartDrawerIsOpen)}>
              <FaOpencart cursor='pointer' color='#64ffda' size='1.5rem' />
            </button>
          </div>
        </div>
      </nav>
      <aside
        className={`side-drawer-menu ${
          drawerIsOpen ? 'side-drawer-menu-open' : null
        }`}>
        <div>
          <span className='close-btn-container'></span>
          <CloseButton>
            <FaTimes onClick={() => setDrawerIsOpen(!drawerIsOpen)} />
          </CloseButton>
          <ul className='side-drawer-menu-links'>
            <li>
              <Link to='/'>Shop</Link>
            </li>
            <li>
              <Link to='/about'>about</Link>
            </li>
            <li>
              <Link to='/contact'>contact</Link>
            </li>
          </ul>
          <Socials />
        </div>
      </aside>
      <aside
        className={`side-drawershoppingcart ${
          cartDrawerIsOpen ? 'side-drawershoppingcart-open' : null
        }`}>
        <span className='close-btn-container'></span>
        <CloseButton>
          <FaTimes onClick={() => setCartDrawerIsOpen(!cartDrawerIsOpen)} />
        </CloseButton>
        <Button>Secure checkout</Button>
      </aside>
    </>
  );
};

export default Navbar;
