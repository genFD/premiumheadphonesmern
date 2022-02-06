import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartContext } from '../../context/cart_context';
import './infoSummary.css';

const InfoSummary = () => {
  const { shippingAddress } = useCartContext();
  const navigate = useNavigate();
  return (
    <>
      <article className='container-info-summary'>
        <div className='info-summary contact'>
          <div className='info-summary-header'>
            <p className='info-summary-title'>Contact</p>
            <button onClick={() => navigate(-1)}>Change</button>
          </div>
          <p>{shippingAddress.email}</p>
        </div>

        <div className='info-summary-divider'></div>

        <div className='info-summary ship'>
          <div className='info-summary-header'>
            <p className='info-summary-title'>Ship to</p>
            <button onClick={() => navigate(-1)}>Change</button>
          </div>
          <p>
            {shippingAddress.address}
            <span> </span>
            {shippingAddress.city}
            <span> </span>
            {shippingAddress.country}
            <span> </span>
            {shippingAddress.postalCode}
          </p>
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
