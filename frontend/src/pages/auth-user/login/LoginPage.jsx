import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useUserContext } from '../../../context/user_context';
import { useProductsContext } from '../../../context/products_context';

import { Loader, Message } from '../../../components';
import { assets } from '../../../assets/assets';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  const {
    user_loading: loading,
    user_error: error,
    userInfo,
    login,
  } = useUserContext();

  const redirect = location.search ? location.search.split('=')[1] : '/';
  const { hideNavBar } = useProductsContext();
  useEffect(() => {
    hideNavBar();
    if (userInfo) {
      // history.push(redirect);
      navigate(redirect);
    }
  }, [navigate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <Wrapper>
      <div className='login-container'>
        <div className='form-container'>
          <h1>Login</h1>
          {error && <Message error='error'>{error}</Message>}
          {loading && <Loader />}
          <form onSubmit={submitHandler}>
            <div className='form-control'>
              <input
                type='email'
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
            <div className='form-control'>
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label>
                {assets.password.split('').map((letter, idx) => {
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
            <div className='btn-container'>
              <button className='btn'>Login</button>
            </div>
            <p className='text'>
              Don't have an account?
              <Link
                to={redirect ? `/register?redirect=${redirect}` : '/redirect'}
                style={{
                  color: '#ffff',
                  textDecoration: 'none',
                  marginLeft: '.5rem',
                }}>
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .login-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    overflow: hidden;
    margin: 0;
    background: var(--navy);
  }

  .form-container {
    background-color: var(--light-navy);
    padding: 3rem;
    border-radius: var(--radius);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: var(--shadow-3);
  }
  .form-container h1 {
    font-family: var(--bodyFont);
    font-size: 2rem;
    text-align: center;
    margin-bottom: 30px;
  }

  .form-container a {
    text-decoration: none;
    color: #fff;
    cursor: pointer;
    margin-left: 1rem;
  }
  .form-container:hover a {
    color: var(--green);
  }

  .btn {
    cursor: pointer;
    display: inline-block;
    width: 100%;
    background-color: var(--slate);
    padding: 15px;
    font-family: inherit;
    font-size: 1rem;
    border: 0;
    border-radius: var(--radius);
    color: #fff;
  }
  .btn:hover {
    background-color: var(--green);
    color: var(--dark-navy);
  }
  .btn-container {
    width: 80%;
    margin: 0 auto;
  }
  .btn:focus {
    outline: 0;
  }
  .btn:active {
    transform: scale(0.98);
  }
  .text {
    margin-top: 30px;
    text-align: center;
  }
  .form-control {
    position: relative;
    margin: 40px 40px;
    width: 300px;
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
  /* .form-control label {
  display: inline-block;
  font-size: 18px;
  min-width: 5px;
  transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
} */
  .form-control input:focus + label span,
  .form-control input:valid + label span {
    color: var(--green);
    transform: translateY(-30px);
  }
  /* .form-control input:focus + label,
.form-control input:valid + label {
  color: lightblue;
  transform: translateY(-30px);
} */

  @media screen and (max-width: 600px) {
    .form-container {
      width: 80vw;
    }
    .form-control {
      width: 90%;
    }
    .form-control input {
      width: 80%;
    }
  }
`;

export default LoginPage;
