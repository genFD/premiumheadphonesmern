import React from 'react';
import './message.css';

const Message = ({ children, success, error, neutral }) => {
  console.log(success);
  return (
    <div
      className={`alert ${
        success === 'success'
          ? 'success'
          : error === 'error'
          ? 'error'
          : neutral === 'neutral'
          ? 'neutral'
          : null
      }`}>
      {children}
    </div>
  );
};

export default Message;
