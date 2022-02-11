import React, { useEffect, useState } from 'react';
import Button from '../../../components/button/Button';
import { assets } from '../../../assets/assets';
import { BiRename } from 'react-icons/bi';
import styled from 'styled-components';
// import './userEdit.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from '../../../context/user_context';
import { BackButton, Form, Loader, Message } from '../../../components';
import { useProductsContext } from '../../../context/products_context';
import axios from 'axios';
import { animated, Transition } from 'react-spring';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const ProductEditPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: '',
    description: '',
    price: 0,
    image: '',
    countInStock: 0,
  });
  const [uploading, setUploading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const {
    fetchSingleProduct,
    single_product_loading: productLoading,
    single_product_error: productError,
    single_product: product,
    product_edit_loading: loadingEdit,
    product_edit_success: successEdit,
    product_edit_error: errorEdit,
    product_update_loading: loadingUpdate,
    product_update_success: successUpdate,
    product_update_error: errorUpdate,
    resetUpdatedProduct,
    updateProduct,
    fetchProducts,
  } = useProductsContext();

  useEffect(() => {
    if (successUpdate) {
      resetUpdatedProduct();
      navigate('/admin/products');
      fetchProducts();
    } else {
      if (!product.name || product._id !== id) {
        fetchSingleProduct(id);
      } else {
        setFormData({
          name: product.name,
          price: product.price,
          image: product.image,
          brand: product.brand,
          category: product.category,
          countInStock: product.countInStock,
          description: product.description,
        });
      }
    }
  }, [id, product, successUpdate, navigate]);

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
      setFormData({
        ...formData,
        image: data,
      });
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
      ...formData,
    });
  };

  return productLoading ? (
    <Loader />
  ) : productError ? (
    <Message error='error'>There was an error</Message>
  ) : loadingUpdate ? (
    <Loader />
  ) : errorUpdate ? (
    <Message error='error'>There was an error</Message>
  ) : (
    <Wrapper>
      <BackButton />
      <Form
        setFormData={setFormData}
        formData={formData}
        submitHandler={submitHandler}
      />
    </Wrapper>
  );
};
const Wrapper = styled.section`
  height: calc(100vh - 5rem);
  /* margin-top: 6rem; */
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default ProductEditPage;
