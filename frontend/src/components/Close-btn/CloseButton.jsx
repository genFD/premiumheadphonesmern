import React, { Children } from 'react';
import { FaTimes } from 'react-icons/fa';
import './closebtn.css';

const CloseButton = ({ children }) => {
  return <button className='close-btn'>{children}</button>;
};

export default CloseButton;
