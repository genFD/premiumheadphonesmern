import React, { useEffect, useState } from 'react';
import Button from '../../../components/button/Button';
import { assets } from '../../../assets/assets';
import { BiRename } from 'react-icons/bi';
import styled from 'styled-components';
// import './userEdit.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from '../../../context/user_context';
import { BackButton, Loader, Message } from '../../../components';
import { useProductsContext } from '../../../context/products_context';
import axios from 'axios';

const ProductEditPage = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const {
    fetchSingleProduct,
    single_product_loading: productLoading,
    single_product_error: productError,
    product,
    product_edit_loading: loadingEdit,
    product_edit_success: successEdit,
    product_edit_error: errorEdit,
    updateProduct,
  } = useProductsContext();

  useEffect(() => {
    if (successEdit) {
      navigate('/admin/productlist');
    } else {
      if (!product.name || product._id !== id) {
        fetchSingleProduct(id);
      } else {
        setName(product.pName);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [id, product, successEdit]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    updateProduct({
      _id: id,
      name,
      price,
      image,
      brand,
      category,
      description,
      countInStock,
    });
  };

  return productLoading ? (
    <Loader />
  ) : productError ? (
    <Message error='error'>There was an error</Message>
  ) : (
    <>
      <BackButton />
      <Wrapper>
        <div className='main'>
          <div class='wrapper'>
            <ul>
              <li>
                <Link to='/name'>
                  <BiRename className='icon' />
                  <p>Home</p>
                </Link>
              </li>
              <li class='active'>
                <a href='#'>
                  <i class='fas fa-tshirt icon'></i>
                  <p>Category</p>
                </a>
              </li>
              <li>
                <Link to='/name'>
                  <BiRename className='icon' />
                  <p>Home</p>
                </Link>
              </li>
              <li>
                <Link to='/name'>
                  <BiRename className='icon' />
                  <p>Home</p>
                </Link>
              </li>
            </ul>
          </div>
          <div>components</div>
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.main`
  .main {
    width: 100%;
    height: 100vh;
    border: 1px solid red;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .wrapper {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid red;
  }

  .wrapper ul {
    display: flex;
  }

  .wrapper ul li {
    width: 100px;
    margin-right: 25px;
    position: relative;
  }

  .wrapper ul li:before {
    content: '>';
    position: absolute;
    top: 25%;
    transform: translateY(-50%);
    right: -15px;
    font-size: 25px;
    font-weight: bold;
    color: var(--green);
  }

  .wrapper ul li:last-child {
    margin-right: 0;
  }

  .wrapper ul li:last-child:before {
    display: none;
  }

  .wrapper ul li a {
    text-align: center;
    color: #fff;
    font-size: 18px;
  }

  .wrapper ul li a .icon {
    display: block;
    width: 40px;
    height: 40px;
    line-height: 60px;
    margin: 0 auto 12px;
    font-size: 22px;
    text-align: center;
    background: var(--light-navy);
    color: var(--green);
    border-radius: 50%;
    box-shadow: 0px 3px 6px 0px var(--dark-navy);
  }

  .wrapper ul li.active a .icon {
    background: #fff;
    color: #2c3e50;
  }

  .wrapper ul li.active a {
    color: #2c3e50;
  }
`;

export default ProductEditPage;
