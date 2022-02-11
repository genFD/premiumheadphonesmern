import React from 'react';
import styled from 'styled-components';

const ProductPrice = ({ formData, setFormData }) => {
  return (
    <Wrapper>
      <div className='form-control'>
        <input
          type='number'
          value={formData.price}
          onChange={(e) =>
            setFormData({
              ...formData,
              price: e.target.value,
            })
          }
        />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .form-control {
    position: relative;
    margin: 40px 40px;
    width: 400px;
    /* border: 1px solid red; */
  }
  .form-control input {
    background-color: transparent;
    border: 0;
    border-bottom: 2px var(--slate) solid;
    display: block;
    width: 100%;
    /* padding: 15px 0; */
    font-size: 20px;
    font-family: inherit;
    color: #fff;
  }
  .form-control input:focus,
  .form-control input:valid {
    outline: 0;
    border-bottom-color: var(--green);
  }

  @media screen and (max-width: 600px) {
    .form-control {
      width: 90%;
    }
    .form-control input {
      width: 80%;
    }
  }
`;
export default ProductPrice;
