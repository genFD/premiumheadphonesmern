import React from 'react';
import styled from 'styled-components';
import { FaCheck, FaEdit, FaPlus, FaTimes, FaTrash } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/user_context';
import { formatPrice } from '../../utils/helpers';
import { useProductsContext } from '../../context/products_context';
import { useEffect } from 'react';

const TableProducts = () => {
  const { products, deleteProduct, createProduct } = useProductsContext();

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      deleteProduct(id);
    }
  };
  const createHandler = () => {
    createProduct();
  };
  return (
    <Wrapper>
      <header>
        <h3>PRODUCTS</h3>
        <button onClick={createHandler} className='btn'>
          <FaPlus /> Create product
        </button>
      </header>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th>BRAND</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            return (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{formatPrice(product.price)}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <Link to={`/admin/product/${product._id}/edit`}>
                    <button className='btn-style edit-btn'>
                      <FaEdit />
                    </button>
                  </Link>
                  <button
                    className='btn-style delete-btn'
                    variant='danger'
                    onClick={() => deleteHandler(product._id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  h3 {
    margin: 0;
  }
  button {
    /* margin-bottom: 1rem; */
  }
  table {
    border-collapse: collapse;
    box-shadow: 0 5px 10px var(--dark-navy);
    background: var(--light-navy);
    text-align: left;
    overflow: hidden;
    margin-top: 1rem;

    thead {
      box-shadow: 0 5px 10px var(--dark-navy);
    }
    th {
      padding: 1rem 2rem;
      text-transform: uppercase;
      letter-spacing: 0.1rem;
      font-size: 0.7rem;
      font-weight: 900;
    }
    td {
      padding: 1rem 2rem;
    }
    a {
      text-decoration: none;
      color: var(--green);
    }
    .btn-container {
      /* border-radius: var(--radius); */
      padding: 0.2rem 0.3rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: var(--lightest-navy);
    }
    .btn-style {
      background: transparent;
      border: none;
      cursor: pointer;
      margin-right: 0.5rem;
    }
    .edit-btn {
      color: var(--green);
      transition: var(--transition);
    }
    .edit-btn:hover {
      color: lightskyblue;
    }
    .delete-btn {
      color: var(--red-dark);
      transition: var(--transition);
    }
    .delete-btn:hover {
      color: tomato;
    }
  }
`;

export default TableProducts;
