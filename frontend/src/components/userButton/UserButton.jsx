import React, { useState } from 'react';
import { FaUserAstronaut } from 'react-icons/fa';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import { Link } from 'react-router-dom';
import { animated, Transition } from 'react-spring';
import styled from 'styled-components';
import { useUserContext } from '../../context/user_context';

const UserButton = ({ title }) => {
  const [dropDown, setDropDown] = useState(false);
  return (
    <Wrapper>
      <button
        onClick={() => setDropDown(!dropDown)}
        type='button'
        className='auth-btn'>
        <span className='login-container'>
          <FaUserAstronaut />
          {dropDown ? (
            <TiArrowSortedDown size='20' className='ArrowSorted' />
          ) : (
            <TiArrowSortedUp size='20' className='ArrowSorted' />
          )}
          <span className='login-value'>{title}</span>
        </span>
      </button>
      {dropDown && (
        <TransitionDropDown dropDown={dropDown} setDropDown={setDropDown} />
      )}
    </Wrapper>
  );
};
const TransitionDropDown = ({ dropDown, setDropDown }) => {
  return (
    <>
      <Transition
        items={dropDown}
        from={{ opacity: 0, translateY: -20 }}
        enter={{ opacity: 1, translateY: 0 }}
        leave={{ opacity: 0 }}
        reverse={dropDown}
        delay={100}
        // config={config.molasses}
        // onRest={() => setShowInfo(!showInfo)}
      >
        {(styles, item) =>
          item && (
            <animated.div style={styles}>
              <DropDown setDropDown={setDropDown} />
            </animated.div>
          )
        }
      </Transition>
    </>
  );
};

const DropDown = ({ setDropDown }) => {
  const { logout } = useUserContext();
  return (
    <DropDownWrapper>
      <article>
        <Link onClick={() => setDropDown(false)} to='/profile'>
          <span>Profile</span>
        </Link>
        <span onClick={() => logout()}>Logout</span>
      </article>
    </DropDownWrapper>
  );
};
const DropDownWrapper = styled.div`
  article {
    width: 6rem;
    height: 5rem;
    background: var(--light-navy);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    transition: var(--transition);
    border-bottom: 1px solid var(--green);
  }

  span {
    color: var(--slate);
    transition: var(--transition);
    cursor: pointer;
  }
  span:hover {
    color: var(--green);
  }
`;

const Wrapper = styled.div`
  .login-container {
    width: 3rem;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    position: relative;
    width: auto;
    &:hover {
      color: var(--green);
    }
  }

  .login-value {
    /* border: 1px solid red; */
    position: absolute;
    top: -10px;
    right: -75px;
    background: var(--clr-primary-5);
    width: auto;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    color: var(--clr-white);
    padding: 12px;
  }
  .auth-btn {
    background: transparent;
    border-color: transparent;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--slate);
    letter-spacing: var(--spacing);
    /* display: none; */
  }

  @media (min-width: 768px) {
    .auth-btn {
      display: block;
    }
  }
`;
export default UserButton;
