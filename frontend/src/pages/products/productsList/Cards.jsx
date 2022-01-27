import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/button/Button';
import { products } from '../../../data/data';

const Cards = ({ image, name, price, id }) => {
  return (
    <article className='card'>
      <div className='card-img-container'>
        <img src={image} alt='' />
      </div>
      <div className='card-content-container'>
        <h3>{name}</h3>
        <h4 className='card-price'>${price}</h4>
        <Link to={`/products/${id}`} target='_blank'>
          <Button>More details</Button>
        </Link>
      </div>
    </article>
  );
};

export default Cards;
