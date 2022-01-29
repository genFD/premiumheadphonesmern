import React from 'react';
import './button.css';

const Button = ({ children, countInStock }) => {
  return (
    <button
      disabled={countInStock === 0}
      className={countInStock === 0 ? 'disabled' : 'btn'}>
      {children}
    </button>
  );
};

export default Button;
