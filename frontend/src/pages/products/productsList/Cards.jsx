import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/button/Button';
import { products } from '../../../data/data';

const Cards = () => {
  const image = products[0].image;
  return (
    <img src={image} alt='' />
    // <article className='card'>
    //   <div className='card-container'>
    //     <div className='card-img-container'>
    //       <img src={products[0].image} alt='' />
    //     </div>
    //     <div className='card-content-container'>
    //       <h3>{products[0].name}</h3>
    //       <h2 className='card-price'>
    //         ${products[0].price}
    //         <div className='card-btn-container'>
    //           <Link to={`/products/${'id'}`}>
    //             <button className='card-btn'>More details</button>
    //             <Button>Buy now</Button>
    //           </Link>
    //         </div>
    //       </h2>
    //     </div>
    //   </div>
    // </article>
  );
};

export default Cards;
