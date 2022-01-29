import React from 'react';
import './loader.css';
const Loader = () => {
  return (
    <div className='center'>
      <div className='ring'></div>
      <span className='loading'>loading...</span>
    </div>
  );
};

export default Loader;
