import React from 'react';
import styled from 'styled-components';
import './loader.css';
const Loader = () => {
  return (
    <Wrapper>
      <div className='center'>
        <div className='ring'></div>
        <span className='loading'>loading...</span>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  transform: translateY(50%);
  .center {
    min-height: 100vh;
    margin: 0;
    padding: 0;
    background-color: var(--navy);
    color: var(--green);
    text-align: center;
    display: flex;
    /* align-items: center; */
    justify-content: center;
    font-family: 'Josefin Sans', sans-serif;
  }
  .ring {
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    animation: ring 2s linear infinite;
  }
  @keyframes ring {
    0% {
      transform: rotate(0deg);
      box-shadow: 1px 5px 2px lightblue;
    }
    50% {
      transform: rotate(180deg);
      box-shadow: 1px 5px 2px #e65c00;
    }
    0% {
      transform: rotate(360deg);
      box-shadow: 1px 5px 2px #64ffda;
    }
  }

  .ring::before {
    position: absolute;
    content: '';
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    border-radius: 50%;
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
  }

  .loading {
    color: var(--green);
    font-size: 20px;
    text-transform: uppercase;
    letter-spacing: 1px;
    line-height: 200px;
    animation: text 2s ease-in-out infinite;
  }
  @keyframes text {
    100% {
      color: #0a192f;
    }
  }
`;

export default Loader;
