import React from 'react';
import './infoSummary.css';

const InfoSummary = () => {
  return (
    <>
      <article className='container-info-summary'>
        <div className='info-summary contact'>
          <div className='info-summary-header'>
            <p className='info-summary-title'>Contact</p>
            <button>Change</button>
          </div>
          <p>email@example.com</p>
        </div>

        <div className='info-summary-divider'></div>

        <div className='info-summary ship'>
          <div className='info-summary-header'>
            <p className='info-summary-title'>Ship to</p>
            <button>Change</button>
          </div>
          <p>10 Marsh Wall, London E14 9GU, United Kingdom</p>
        </div>

        <div className='info-summary-divider'></div>

        <div className='info-summary method'>
          <div className='info-summary-header'>
            <p className='info-summary-title'>Method</p>
            {/* <button>Change</button> */}
          </div>
          <p>Free Standard Shipping (3-5 business days) · Free</p>
        </div>
      </article>
    </>
  );
};

export default InfoSummary;
