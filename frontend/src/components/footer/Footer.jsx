import React from 'react';
import './Footer.css';
import Socials from '../social-icons/Socials';
const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <footer className='footer'>
      <Socials />
      <p>
        &copy; <span>{date}</span> Premium All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
