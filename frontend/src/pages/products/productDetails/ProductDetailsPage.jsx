import React, { useState, useEffect } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { HiSpeakerphone } from 'react-icons/hi';
import { BsArrowLeftSquare } from 'react-icons/bs';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { assets } from '../../../assets/assets';
import Button from '../../../components/button/Button';

// import { products } from '../../../data/data';
import './productdetails.css';
import Navbar from '../../../components/navbar/Navbar';

const ProductDetailsPage = () => {
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(0);

  const params = useParams();
  const id = params.id;
  const fetchProduct = async () => {
    const { data } = await axios.get(`/api/products/${id}`);
    setProduct(data);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const { name, imageDetails, price, description, countInStock } = product;
  const increment = () => {
    setQuantity((prev) => prev + 1);
  };
  const decrement = () => {
    setQuantity((prev) => prev - 1);
  };
  return (
    <>
      <section className='hero'>
        <div className='back-container'>
          <Link to='/'>
            <span>Back</span>
          </Link>
        </div>
        <div className='section-center hero-center'>
          <article className='hero-img'>
            <img src={imageDetails} alt='' className='hero-photo' />
          </article>
          <article className='hero-info'>
            <div className='presentation'>
              <h2 className='product-details-title'>{name}</h2>
              <p>{description}</p>
            </div>

            <div className='guarantee'>
              <HiSpeakerphone style={{ marginRight: 5 }} />
              <p>30 day Guarantee</p>
              <span className='divider'></span>
              <p>1 Year guarantee</p>
            </div>

            <div className='quantity'>
              <p>Quantity:</p>
              <div className='counter-container'>
                <button
                  className='count-btn'
                  type='button'
                  onClick={() => decrement()}>
                  <FaMinus style={{ color: '#64ffda', cursor: 'pointer' }} />
                </button>
                <div className='quantity-container'>
                  <p>{quantity < 0 ? 0 : quantity}</p>
                </div>
                <button
                  className='count-btn'
                  type='button'
                  onClick={() => increment()}>
                  <FaPlus
                    style={{ color: '#64ffda', cursor: 'pointer' }}
                    className='icon-qty'
                  />
                </button>
              </div>
            </div>

            <div className='price'>
              <p>${price}</p>
            </div>
            <div className='cta-container'>
              <Link to='/cart'>
                <Button countInStock={countInStock}>
                  {countInStock === 0 ? 'out of stock' : 'Add to cart'}
                </Button>
              </Link>
            </div>
          </article>
        </div>
      </section>
    </>
  );
};

export default ProductDetailsPage;
