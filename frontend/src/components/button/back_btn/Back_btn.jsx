import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Back_btn = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <div className='back-container'>
        <span onClick={() => navigate(-1)}>Back</span>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .back-btn {
    position: absolute;
    left: 10%;
    top: 10%;
    display: none;
  }
  .back-container span {
    display: none;
  }
  @media (min-width: 768px) {
    .back-btn {
      display: block;
      font-size: 2rem;
      margin-top: 2rem;
    }
    .back-btn:hover {
      color: var(--green);
      cursor: pointer;
    }
    .back-container span {
      color: var(--slate);
      position: absolute;
      left: 8%;
      top: 14%;
      width: 4rem;
      height: 2rem;
      background-color: var(--light-navy);
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.2s;
      cursor: pointer;
    }
    .back-container span:hover {
      background-color: var(--dark-navy);
      color: var(--green);
    }

    .back-container span::before {
      content: '';
      position: absolute;
      border-left: 1rem solid transparent;
      border-right: 1rem solid var(--green);
      border-bottom: 1rem solid transparent;
      border-top: 1rem solid transparent;
      top: 50%;
      left: -2rem;
      transform: translateY(-50%);
    }
  }
`;
export default Back_btn;
