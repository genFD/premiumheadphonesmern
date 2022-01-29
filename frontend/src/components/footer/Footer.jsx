import React from 'react';
import styled from 'styled-components';

import './Footer.css';
import Socials from '../social-icons/Socials';
const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <footer className='footer'>
      <Socials />
      <p>
        &copy; <span>{date}</span> Premium All rights reserved
      </p>
    </footer>
  );
};

const FooterTest = () => {
  return (
    <Wrapper>
      <p>
        &copy; {new Date().getFullYear()}
        <span>|</span>
        <span>Premium</span>
      </p>
      <span>|</span>
      <p>All rights reserved</p>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  height: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--dark-navy);
  /* border: 1px solid red; */
  text-align: center;

  span {
    color: var(--slate);
    font-family: var(--bodyFont);
    margin: 0 0.1rem;
  }
  .footer-pipe {
    height: 0.1rem;
    width: 0.1rem;
    background-color: var(--green);
  }
  p {
    color: var(--slate);
    margin: 0.1rem;
    font-weight: 400;
    text-transform: none;
    line-height: 1.25;
    font-family: var(--bodyFont);
    /* border: 1px solid red; */
  }
  @media (min-width: 776px) {
    flex-direction: row;
  }
`;

export default FooterTest;
