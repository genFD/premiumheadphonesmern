import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../../../assets/assets';
import { useCartContext } from '../../../context/cart_context';
import Button from '../../../components/button/Button';
// import './shippingInfo.css';
import styled from 'styled-components';
import { BackButton } from '../../../components';

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
    <Wrapper>
      <BackButton />
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
            <Link to='/payment'></Link>
            <button className='btn'>Go to checkout</button>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  .shipping-information-container {
    /* border: 4px solid lightslategrey; */
    min-height: calc(100vh - 5rem);
    margin-top: 8rem;
    margin-bottom: 3rem;
    width: 40vw;
    min-width: 400px;
    padding: 2rem;
    background: var(--light-navy);
  }
  .form-container p {
    text-align: center;
    margin: 0 auto;
    background: var(--dark-navy);
  }
  .form-control {
    position: relative;
    margin: 40px 0;
  }
  .form-control input {
    background-color: transparent;
    border: 0;
    border-bottom: 2px var(--slate) solid;
    display: block;
    width: 100%;
    padding: 15px 0;
    font-size: 14px;
    font-family: inherit;
    color: #fff;
    margin-bottom: 60px;
  }
  .form-control input:focus,
  .form-control input:valid {
    outline: 0;
    border-bottom-color: var(--green);
  }

  .form-control label {
    position: absolute;
    top: 15px;
    left: 0;
  }
  .form-control label span {
    display: inline-block;
    font-size: 18px;
    min-width: 5px;
    transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
  .form-control input:focus + label span,
  .form-control input:valid + label span {
    color: var(--green);
    transform: translateY(-30px);
  }
`;

export default ShippingInfo;
