import React from 'react';
import styled from 'styled-components';
const Logo = () => {
  return (
    <Wrapper>
      <h1>Premium</h1>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  h1 {
    font-family: var(--bodyFont);
    font-size: 1.3rem;
    font-weight: bold;
    color: var(--green);
    text-transform: uppercase;
    margin: 0;
  }
`;

export default Logo;
