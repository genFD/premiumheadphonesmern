import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/button/Button';

const Cards = ({ image, name, price, id, countInStock }) => {
  return (
    <article className='card'>
      <div className='card-img-container'>
        <img src={image} alt='' />
      </div>
      <div className='card-content-container'>
        <h3>{name}</h3>
        <h4 className='card-price'>${price}</h4>
        <Link to={`/products/${id}`}>
          <Button>More details</Button>
        </Link>
      </div>
    </article>
  );
};

export default Cards;
