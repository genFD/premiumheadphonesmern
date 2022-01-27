import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../../../assets/assets';
import Button from '../../../components/button/Button';
import './shippingInfo.css';

const ShippingInfo = () => {
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostal] = useState('');
  const [country, setCountry] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <div className='shipping-information-container'>
      <div className='form-container'>
        <p>Contact information</p>
        <form action=''>
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
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <label>
                {assets.firstName.split('').map((letter, idx) => {
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
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <label>
                {assets.lastName.split('').map((letter, idx) => {
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

            <div className='form-control'>
              <input
                type='text'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <label>
                {assets.phone.split('').map((letter, idx) => {
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
          <Link to='/payment'>
            <Button type='submit'>Continue to payment</Button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ShippingInfo;
