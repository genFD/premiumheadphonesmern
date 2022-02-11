import React from 'react';
import styled from 'styled-components';
import { FaCheck, FaEdit, FaPlus, FaTimes, FaTrash } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/user_context';
import { formatPrice } from '../../utils/helpers';
import { useProductsContext } from '../../context/products_context';
import { useEffect } from 'react';
import { useOrderContext } from '../../context/order_context';

const TableOrders = () => {
  const {
    orders,
    deliverOrder,
    listOrders,
    order_deliver_success: successDeliver,
  } = useOrderContext();
  const { userInfo } = useUserContext();
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      listOrders();
    }
  }, [userInfo, successDeliver, orders]);

  return (
    <Wrapper>
      <header>
        <h3>Orders</h3>
      </header>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>USER</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>PAID</th>
            <th>DELIVERED</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            return (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{formatPrice(order.totalPrice)}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  <button
                    disabled={order.isDelivered === true}
                    className={order.isDelivered === true ? 'disabled' : 'btn'}
                    onClick={() => deliverOrder(order)}>
                    {order.isDelivered === true ? ' delivered' : 'deliver'}
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

    .disabled {
      padding: 10px 30px;
      color: white;
      border: none;
      text-decoration: none;
      background: #233554;
      border-radius: var(--br);
      text-transform: uppercase;
      letter-spacing: 1px;
      cursor: pointer;
    }
  }
`;

export default TableOrders;
