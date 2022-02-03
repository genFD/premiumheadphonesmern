import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MenuButton } from '..';
import Logo from '../logo/Logo';

const NavbarLogin = () => {
  return (
    <NavContainer>
      <div className='nav'>
        <div className='nav-center'>
          <div className='nav-header'>
            <Logo />
          </div>
        </div>
      </div>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;

  .nav {
    width: 100vw;
    height: 5rem;
    display: flex;
    align-items: center;
    transition: var(--transition);
  }
  .nav:hover {
    background: var(--light-navy);
  }

  .nav.active {
    background: rgba(var(--light-navy), 0.2);
    backdrop-filter: blur(40px);
    box-shadow: var(--shadow-3);
    position: fixed;
    z-index: 500;
  }

  .nav-center {
    width: 90vw;
    margin: 0 auto;
    max-width: var(--max-width);
    /* border: 1px solid red; */
  }
  .nav-header {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default NavbarLogin;
