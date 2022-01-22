import React from 'react';
import {
  FaFacebookSquare,
  FaLinkedin,
  FaSquarespace,
  FaBehanceSquare,
  FaInstagram,
} from 'react-icons/fa';
import './social.css';

const Socials = () => {
  return (
    <ul className='social-icons'>
      <li>
        <a href='https://www.facebook.com'>
          <FaFacebookSquare className='social-icon' />
        </a>
      </li>
      <li>
        <a href='https://www.linkedin.com'>
          <FaLinkedin className='social-icon' />
        </a>
      </li>
      <li>
        <a href='https://www.squarespace.com'>
          <FaSquarespace className='social-icon' />
        </a>
      </li>
      <li>
        <a href='https://www.behance.com'>
          <FaBehanceSquare className='social-icon' />
        </a>
      </li>
      <li>
        <a href='https://www.instagram.com'>
          <FaInstagram className='social-icon' />
        </a>
      </li>
    </ul>
  );
};

export default Socials;
