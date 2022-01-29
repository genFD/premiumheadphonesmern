import React from 'react';
import CloseButton from '../Close-btn/CloseButton';
import { FaTimes } from 'react-icons/fa';
import Overlay from '../overlay/Overlay';
import Button from '../button/Button';
import { useProductsContext } from '../../context/products_context';

const CartDrawer = () => {
  const { isCartDrawerOpen, closeCartDrawer } = useProductsContext();
  return (
    <>
      {isCartDrawerOpen ? <Overlay /> : null}
      <aside
        className={`side-drawershoppingcart ${
          isCartDrawerOpen ? 'side-drawershoppingcart-open' : null
        }`}>
        <span className='close-btn-container'></span>
        <CloseButton>
          <FaTimes onClick={closeCartDrawer} />
        </CloseButton>
        <Button>Secure checkout</Button>
      </aside>
    </>
  );
};

export default CartDrawer;
