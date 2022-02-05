import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { links } from '../../utils/constants';
import NavbarLogin from '../navbarLogin/NavbarLogin';
import { useProductsContext } from '../../context/products_context';

import './Navbar.css';
import MenuButton from '../MenuButton/MenuButton';
import CartButton from '../cart/CartButton';
import Logo from '../logo/Logo';
import UserButton from '../userButton/UserButton';
import { useUserContext } from '../../context/user_context';

const Navbar = () => {
  const [fixedNavbar, setFixedNavbar] = useState(false);
  const { userInfo } = useUserContext();
  const navbarFixer = () => {
    if (window.pageYOffset > 80) {
      setFixedNavbar(true);
    } else {
      setFixedNavbar(false);
    }
  };
  window.addEventListener('scroll', () => {
    navbarFixer();
  });
  const { openSideDrawer, hideNav } = useProductsContext();
  return hideNav ? (
    <NavbarLogin />
  ) : (
    <NavContainer>
      <div className={`nav ${fixedNavbar ? 'active' : null}`}>
        <div className='nav-center'>
          <div className='nav-header'>
            <Link to='/'>
              <Logo />
            </Link>
            <button
              type='button'
              className='nav-toggle'
              onClick={openSideDrawer}>
              <MenuButton />
            </button>
          </div>
          <ul className='nav-links'>
            {links.map(({ id, text, url }) => {
              return (
                <li key={id}>
                  <Link to={url}>{text}</Link>
                </li>
              );
            })}
          </ul>
          <div className='nav-info'>
            <CartButton />
            {userInfo ? (
              <UserButton title={userInfo.name} />
            ) : (
              <Link to='/login'>
                <button className='login-btn'>Login</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  .hide-navbar {
    display: none;
  }
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;

  .login-btn {
    font-family: var(--bodyFont);
    border: 0;
    background: transparent;
    color: var(--green);
    cursor: pointer;
  }

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
    justify-content: space-between;
  }
  .nav-toggle {
    background: transparent;
    border: transparent;
    cursor: pointer;
    z-index: 100;
  }
  .nav-links {
    display: none;
  }
  .nav-info {
    display: none;
    /* border: 1px solid red; */
  }

  .brand {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .brand h1 {
    font-family: var(--bodyFont);
    font-size: 1.3rem;
    font-weight: bold;
    color: var(--green);
    text-transform: uppercase;
    margin: 0;
  }

  .cart-btn-wrapper {
    display: none;
  }
  @media (min-width: 992px) {
    .nav-toggle {
      display: none;
    }
    .nav-center {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
    }
    .nav-links {
      display: flex;
      justify-content: center;
      li {
        margin: 0 0.5rem;
      }
      a {
        color: var(--slate);
        font-size: 1rem;
        text-transform: capitalize;
        letter-spacing: var(--spacing);
        padding: 0.5rem;
        transition: var(--transition);
        &:hover {
          border-left: 1px solid var(--green);
          color: var(--green);
        }
      }
    }
    .cart-btn-wrapper {
      display: grid;
    }
    .nav-info {
      display: flex;
    }
  }
`;

export default Navbar;
