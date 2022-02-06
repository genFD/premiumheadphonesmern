import React from 'react';
import styled from 'styled-components';

const Message = ({ children, success, error, neutral }) => {
  return (
    <Wrapper>
      <div
        className={`alert ${
          success === 'success'
            ? 'success'
            : error === 'error'
            ? 'error'
            : neutral === 'neutral'
            ? 'neutral'
            : null
        }`}>
        {children}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .alert {
    margin: 4rem auto;
    width: 100%;
    height: 6rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 1rem;
  }
  .error {
    background-color: crimson;
    color: #0a192f;
  }
  .success {
    background-color: #64ffda;
    color: #0a192f;
  }
  .neutral {
    background-color: transparent;
    color: #64ffda;
  }
`;

export default Message;
