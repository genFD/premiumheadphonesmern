import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaOpencart, FaUserAstronaut } from 'react-icons/fa';
import { useProductsContext } from '../../context/products_context';
import { useCartContext } from '../../context/cart_context';
import UserButton from '../userButton/UserButton';

const CartButton = () => {
  const { cart } = useCartContext();
  return (
    <Wrapper className='cart-btn-wrapper'>
      <Link to='/cart' className='cart-btn'>
        <span className='cart-container'>
          <FaOpencart className='cart-icon' />
          <span className='cart-value'>{cart.length}</span>
        </span>
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  width: 100px;

  .cart-btn {
    color: var(--clr-grey-1);
    font-size: 1.5rem;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-1);
    display: flex;
    width: 0.4rem;
    align-items: center;
  }
  .cart-container {
    display: flex;
    align-items: center;
    position: relative;
    &:hover {
      color: var(--green);
    }
  }

  .cart-value {
    position: absolute;
    top: -10px;
    right: -16px;
    background: var(--clr-primary-5);
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.75rem;
    color: var(--clr-white);
    padding: 12px;
  }
`;

export default CartButton;
