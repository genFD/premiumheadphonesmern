import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { useCartContext } from '../../context/cart_context';
import Button from '../button/Button';
import './shippingInfo.css';

const ShippingInfo = () => {
  const { shippingAddress, saveShippingAddress } = useCartContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState(shippingAddress.email);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostal] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const submitHandler = (e) => {
    e.preventDefault();
    saveShippingAddress({ email, address, city, country, postalCode });
    navigate('/payment');
  };

  return (
    <div className='shipping-information-container'>
      <div className='form-container'>
        <p>Contact information</p>
        <form onSubmit={submitHandler}>
          <div className='contact-information'>
            <div className='form-control'>
              <input
                type='text'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label>
                {assets.email.split('').map((letter, idx) => {
                  return (
                    <span
                      key={idx}
                      style={{ transitionDelay: `${idx * 50}ms` }}>
                      {letter}
                    </span>
                  );
                })}
              </label>
            </div>
          </div>

          <p>Shipping Address</p>
          <div className='shipping-address'>
            <div className='form-control'>
              <input
                type='text'
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
              <label>
                {assets.country.split('').map((letter, idx) => {
                  return (
                    <span
                      key={idx}
                      style={{
                        transitionDelay: `${idx * 50}ms`,
                      }}>
                      {letter}
                    </span>
                  );
                })}
              </label>
            </div>
            <div className='form-control'>
              <input
                type='text'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
              <label>
                {assets.address.split('').map((letter, idx) => {
                  return (
                    <span
                      key={idx}
                      style={{ transitionDelay: `${idx * 50}ms` }}>
                      {letter}
                    </span>
                  );
                })}
              </label>
            </div>

            <div className='form-control'>
              <input
                type='text'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
              <label>
                {assets.city.split('').map((letter, idx) => {
                  return (
                    <span
                      key={idx}
                      style={{ transitionDelay: `${idx * 50}ms` }}>
                      {letter}
                    </span>
                  );
                })}
              </label>
            </div>

            <div className='form-control'>
              <input
                type='text'
                value={postalCode}
                onChange={(e) => setPostal(e.target.value)}
                required
              />
              <label>
                {assets.postalCode.split('').map((letter, idx) => {
                  return (
                    <span
                      key={idx}
                      style={{ transitionDelay: `${idx * 50}ms` }}>
                      {letter}
                    </span>
                  );
                })}
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShippingInfo;
