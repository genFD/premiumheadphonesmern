import React from 'react';
import { useProductsContext } from '../../context/products_context';
import { Link } from 'react-router-dom';
import { links } from '../../utils/constants';
import styled from 'styled-components';
import Socials from '../social-icons/Socials';
import CloseButton from '../Close-btn/CloseButton';
import { FaTimes } from 'react-icons/fa';
import Overlay from '../overlay/Overlay';
import Logo from '../logo/Logo';
import { CartButton } from '..';
import UserButton from '../userButton/UserButton';
import { useUserContext } from '../../context/user_context';

// const SideDrawer = () => {
//   const { isSideDrawerOpen, closeSideDrawer } = useProductsContext();

//   return (
//     <>
//       {isSideDrawerOpen ? <Overlay /> : null}
//       <aside
//         className={`side-drawer-menu ${
//           isSideDrawerOpen ? 'side-drawer-menu-open' : null
//         }`}>
//         <div>
//           <span className='close-btn-container'></span>
//           <CloseButton>
//             <FaTimes onClick={closeSideDrawer} />
//           </CloseButton>
//           <ul className='side-drawer-menu-links'>
//             <li>
//               <Link to='/'>Shop</Link>
//             </li>
//             <li>
//               <Link to='/about'>about</Link>
//             </li>
//             <li>
//               <Link to='/contact'>contact</Link>
//             </li>
//           </ul>
//           <Socials />
//         </div>
//       </aside>
//     </>
//   );
// };

const SideDrawer = () => {
  const { closeSideDrawer, isSideDrawerOpen } = useProductsContext();
  const { userInfo } = useUserContext();
  return (
    <SideDrawerContainer>
      {/* {isSideDrawerOpen ? <Overlay /> : null} */}
      <aside
        className={`${
          isSideDrawerOpen ? 'side-drawer show-side-drawer' : 'side-drawer'
        }`}>
        <div className='side-drawer-header'>
          <Logo />
          <button className='close-btn' type='button' onClick={closeSideDrawer}>
            <FaTimes />
          </button>
        </div>
        <ul className='links'>
          {links.map(({ id, text, url }) => {
            return (
              <li key={id}>
                <Link to={url} onClick={closeSideDrawer}>
                  {text}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className='user-cart-container'>
          <button className='profile-btn' onClick={closeSideDrawer}>
            <CartButton />
          </button>
          {userInfo ? (
            <Link to='/profile'>
              <button onClick={closeSideDrawer} className='profile-btn'>
                <span>{userInfo.name}</span>
              </button>
            </Link>
          ) : (
            <Link to='/login'>
              <button className='login-btn'>Login</button>
            </Link>
          )}
        </div>
        <Socials />
      </aside>
    </SideDrawerContainer>
  );
};

const SideDrawerContainer = styled.div`
  text-align: center;

  .profile-btn {
    background: transparent;
    border: transparent;
    color: var(--slate);
    font-family: var(--bodyFont);
    cursor: pointer;
  }
  .profile-btn:hover {
    color: var(--green);
  }

  .side-drawer-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
  }
  .close-btn {
    font-size: 2rem;
    background: transparent;
    border-color: transparent;
    transition: var(--transition);
    cursor: pointer;
    color: var(--red-dark);
  }
  .user-cart-container {
    display: flex;
    justify-content: center;
    margin-bottom: 5rem;
  }

  .close-btn:hover {
    color: var(--red-light);
  }
  .close-btn:active {
    transform: rotate(-765deg) translateY(5.5px);
  }
  .brand {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    margin-top: 0.3rem;
  }
  .brand h1 {
    font-family: var(--bodyFont);
    font-size: 1.3rem;
    font-weight: bold;
    color: var(--green);
    text-transform: uppercase;
    margin: 0;
  }
  .links {
    margin-bottom: 2rem;
  }
  .links a {
    display: block;
    text-align: left;
    font-size: 1rem;
    text-transform: capitalize;
    padding: 1rem 1.5rem;
    transition: var(--transition);
    letter-spacing: var(--spacing);
    font-family: var(--bodyFont);
    color: var(--slate);
  }

  .links a:hover {
    padding: 1rem 1.5rem;
    padding-left: 2rem;
    background: var(--dark-navy);
    color: var(--green);
    border-left: 1px solid var(--green);
  }
  .side-drawer {
    position: fixed;
    top: 0;
    left: 0;
    width: 350px;
    height: 100%;
    background: var(--light-navy);
    transition: var(--transition);
    transform: translate(-100%);
    z-index: -1;
  }
  .show-side-drawer {
    transform: translate(0);
    z-index: 999;
  }

  @media screen and (min-width: 992px) {
    .side-drawer {
      display: none;
    }
  }
`;

export default SideDrawer;

// .side-drawer-menu {
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 350px;
//   height: 100%;
//   background: var(--light-navy);
//   display: grid;
//   place-items: center;
//   transition: var(--transition);
//   transform: translateX(-300%);
//   z-index: 1000;
// }
// .side-drawer-menu div {
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   height: 70vh;
// }
// .side-drawer-menu-open {
//   transform: translateX(0);

// .side-drawer-menu-links {
//   text-align: center;
// }
// .side-drawer-menu-links a {
//   font-family: var(--bodyFont);
//   font-size: 1.3rem;
//   text-transform: uppercase;
//   -webkit-transition: var(--transition);
//   transition: var(--transition);
//   color: var(--slate);
//   letter-spacing: var(--lspacing);
//   display: inline-block;
//   margin-bottom: 3.5rem;
//   transition: var(--transition);
//   position: relative;
// }
// .side-drawer-menu-links a:hover {
//   border-left: 1px solid var(--green);
//   padding-left: 0.8rem;
// }

// .side-drawer-menu-links a:hover {
//   color: var(--green);
// }
