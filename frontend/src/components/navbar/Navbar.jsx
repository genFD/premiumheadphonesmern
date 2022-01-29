import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { links } from '../../utils/constants';
import { FaOpencart, FaUserAstronaut } from 'react-icons/fa';
import { useProductsContext } from '../../context/products_context';

import './Navbar.css';
import MenuButton from '../MenuButton/MenuButton';
import CartButton from '../cart/CartButton';
import Logo from '../logo/Logo';

const Navbar = () => {
  const { openSideDrawer, openCartDrawer } = useProductsContext();

  const [fixedNavbar, setFixedNavbar] = useState(false);

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
  return (
    <>
      <nav className={`nav ${fixedNavbar ? 'active' : null}`}>
        <div className='nav-center'>
          <div className='nav-header'>
            <button className='nav-btn' onClick={openSideDrawer}>
              <Logo />
            </button>
            <div className='brand'>
              <Link to='/'>
                <h1>Premium</h1>
              </Link>
            </div>
            <ul className='nav-links'>
              <li>
                <Link to='/'>Shop</Link>
              </li>
              <li>
                <Link to='/about' className='menu-link'>
                  about
                </Link>
              </li>
              <li>
                <Link to='/contact' className='menu-link'>
                  contact
                </Link>
              </li>
            </ul>
            <ul className='cart-login-icon-container'>
              <li>
                <button className='cart' onClick={openCartDrawer}>
                  <FaOpencart cursor='pointer' color='#64ffda' size='1.5rem' />
                </button>
              </li>
              <li>
                <button className='cart'>
                  <FaUserAstronaut
                    cursor='pointer'
                    color='#64ffda'
                    size='1.3rem'
                  />
                </button>
              </li>
              <li>
                <span className='nav-sign-in'>Sign in</span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
const NavbarTest = () => {
  const { openSideDrawer, openCartDrawer } = useProductsContext();
  return (
    <NavContainer>
      <div className='nav-center'>
        <div className='nav-header'>
          <Link to='/'>
            <Logo />
          </Link>
          <button type='button' className='nav-toggle' onClick={openSideDrawer}>
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
        <CartButton />
      </div>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  .nav-center {
    width: 90vw;
    margin: 0 auto;
    max-width: var(--max-width);
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
  }
  .nav-links {
    display: none;
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
  }
`;
// export default Navbar
export default NavbarTest;
