import React, { useEffect, useState } from 'react';
import { FaTimes, FaUserAstronaut } from 'react-icons/fa';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { animated, Transition } from 'react-spring';
import styled from 'styled-components';
import { assets } from '../../../assets/assets';
import { Loader, Message } from '../../../components';
import { useOrderContext } from '../../../context/order_context';
import { useUserContext } from '../../../context/user_context';
import { formatPrice } from '../../../utils/helpers';

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };
  const navigate = useNavigate();

  const {
    userInfo,
    user,
    loading,
    error,
    getUserDetails,
    updateUserProfile,
    success,
    resetUserProfile,
  } = useUserContext();

  const {
    listMyOrders,
    order_my_list_loading: loadingOrders,
    order_my_list_error: errorOrders,
    myorders: orders,
  } = useOrderContext();

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else if (!user.name) {
      getUserDetails('profile');
      //  listMyOrders();
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [userInfo, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    password !== confirmPassword
      ? setMessage('Passwords do not match')
      : updateUserProfile(
          updateUserProfile({ id: user._id, name, email, password })
        );
  };
  return (
    <Wrapper>
      <section>
        <div className='profile-container'>
          <header className='bloc-tabs'>
            <button
              className={toggleState === 1 ? 'tabs active-tabs' : 'tabs'}
              onClick={() => toggleTab(1)}>
              Profile
            </button>
            <button
              className={toggleState === 2 ? 'tabs active-tabs' : 'tabs'}
              onClick={() => toggleTab(2)}>
              Orders
            </button>
          </header>
          {loading && <Loader />}
          {error && <Message error='error'>{error.message}</Message>}
          {message && <Message error='error'>{message}</Message>}
          {success && <Message success='success'>"Profile updated"</Message>}
          <div className='content-tabs'>
            <div
              className={
                toggleState === 1 ? 'content  active-content' : 'content'
              }>
              <h2>Edit your profile</h2>
              <hr />
              <form onSubmit={submitHandler}>
                <div className='form-control'>
                  <input
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <label>
                    {assets.firstName.split('').map((letter, idx) => {
                      return (
                        <span
                          key={idx}
                          style={{ transitionDelay: `${idx * 50}ms` }}>
                          {letter}
                        </span>
                      );
                    })}
                  </label>
                </div>
                <div className='form-control'>
                  <input
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label>
                    {assets.email.split('').map((letter, idx) => {
                      return (
                        <span
                          key={idx}
                          style={{ transitionDelay: `${idx * 50}ms` }}>
                          {letter}
                        </span>
                      );
                    })}
                  </label>
                </div>
                <div className='form-control'>
                  <input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <label>
                    {assets.password.split('').map((letter, idx) => {
                      return (
                        <span
                          key={idx}
                          style={{ transitionDelay: `${idx * 50}ms` }}>
                          {letter}
                        </span>
                      );
                    })}
                  </label>
                </div>
                <div className='form-control'>
                  <input
                    type='password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <label>
                    {assets.confirmPass.split('').map((letter, idx) => {
                      return (
                        <span
                          key={idx}
                          style={{ transitionDelay: `${idx * 50}ms` }}>
                          {letter}
                        </span>
                      );
                    })}
                  </label>
                </div>
                <div className='btn-container'>
                  <button className='btn'>Update</button>
                </div>
              </form>
            </div>

            <div
              className={
                toggleState === 2 ? 'content  active-content' : 'content'
              }>
              <h2>List of orders</h2>
              <hr />
              <div className='table-container'>
                <table className='table'>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>USER</th>
                      <th>DATE</th>
                      <th>TOTAL</th>
                      <th>PAID</th>
                      <th>DELIVERED</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td data-label='ID'>{order._id}</td>
                        <td>{order.user && order.user.name}</td>
                        <td data-label='DATE'>
                          {order.createdAt.substring(0, 10)}
                        </td>

                        <td data-label='TOTAL'>
                          {formatPrice(order.totalPrice)}
                        </td>
                        <td data-label='PAID'>
                          {order.isPaid ? (
                            order.paidAt.substring(0, 10)
                          ) : (
                            <FaTimes style={{ color: 'red' }} />
                          )}
                        </td>
                        <td data-label='DELIVERED'>
                          {order.isDelivered ? (
                            order.deliveredAt.substring(0, 10)
                          ) : (
                            <FaTimes style={{ color: 'red' }} />
                          )}
                        </td>
                        <td>
                          <Link to={`/order/${order._id}`}>
                            <button className='small-btn'>Details</button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

export const Wrapper = styled.section`
  section {
    height: calc(100vh + 5rem);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 3rem;
    margin-bottom: 2rem;
  }

  .profile-container {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 800px;
    min-width: 400px;
    height: 600px;
    height: 70%;
    background: var(--light-navy);
    margin: 50px auto 0;
    word-break: break-all;
    border: 1px solid rgba(0, 0, 0, 0.274);
  }

  .bloc-tabs {
    display: flex;
  }
  .tabs {
    padding: 15px;
    text-align: center;
    width: 50%;
    background: rgba(128, 128, 128, 0.075);
    cursor: pointer;
    border-bottom: 1px solid rgba(0, 0, 0, 0.274);
    box-sizing: content-box;
    position: relative;
    outline: none;
    color: var(--white);
    font-family: var(--bodyFont);
  }
  .tabs:not(:last-child) {
    border-right: 1px solid rgba(0, 0, 0, 0.274);
  }

  .active-tabs {
    background: var(--navy);
    border-bottom: 1px solid transparent;
  }

  .active-tabs::before {
    content: '';
    display: block;
    position: absolute;
    top: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% + 2px);
    height: 5px;
    background: var(--green);
  }
  button {
    border: none;
  }
  .content-tabs {
    flex-grow: 1;
  }
  .content {
    background: var(--light-navy);
    padding: 20px;
    width: 100%;
    height: 100%;
    display: none;
  }
  .content h2 {
    padding: 0px 0 5px 0px;
    text-transform: uppercase;
    text-align: center;
    font-size: 1rem;
  }
  .content hr {
    width: 100%;
    height: 2px;
    background: #222;
    margin-bottom: 25px;
    display: none;
  }
  .content p {
    width: 100%;
    height: 100%;
  }
  .active-content {
    display: block;
  }
  form {
    /* flex-wrap: wrap; */
  }
  .form-control {
    position: relative;
    margin: 40px 40px;
    width: 300px;
  }
  .form-control input {
    background-color: transparent;
    border: 0;
    border-bottom: 2px var(--slate) solid;
    display: block;
    width: 100%;
    padding: 15px 0;
    font-size: 14px;
    font-family: inherit;
    color: #fff;
    margin-bottom: 60px;
  }
  .form-control input:focus,
  .form-control input:valid {
    outline: 0;
    border-bottom-color: var(--green);
  }

  .form-control label {
    position: absolute;
    top: 15px;
    left: 0;
  }
  .form-control label span {
    display: inline-block;
    font-size: 18px;
    min-width: 5px;
    transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
  .form-control input:focus + label span,
  .form-control input:valid + label span {
    color: var(--green);
    transform: translateY(-30px);
  }
  .btn {
    cursor: pointer;
    display: inline-block;
    width: 100%;
    background-color: var(--lightest-navy);
    padding: 15px;
    font-family: inherit;
    font-size: 1rem;
    border: 0;
    border-radius: var(--radius);
    color: #fff;
  }
  .btn:hover {
    background-color: var(--green);
    color: var(--dark-navy);
  }
  .btn-container {
    width: 80%;
    margin: 0 auto;
  }
  .btn:focus {
    outline: 0;
  }
  .btn:active {
    transform: scale(0.98);
  }
  @media screen and (max-width: 600px) {
    .form-control {
      width: 90%;
    }
    .form-control input {
      width: 80%;
    }
  }
  .table-container {
    /* padding: 0 10%; */
    /* border: 1px solid red; */
  }
  .table {
    border: 1px solid lightblue;
    width: 100%;
    border-collapse: collapse;
  }
  .table thead {
    background: var(--dark-navy);
  }
  .table thead tr th {
    font-size: 0.75rem;
    padding: 12px;
    vertical-align: top;
    opacity: 1;
    letter-spacing: 0.35px;
    border: 2px solid var(--lightest-navy);
  }
  .table tbody tr td {
    font-size: 0.75rem;
    padding: 8px;
    text-align: center;
    border: 1px solid var(--lightest-navy);
  }
  .table tbody tr td .small-btn {
    width: 80px;
    display: inline-block;
    text-decoration: none;
    text-align: center;
    vertical-align: middle;
    user-select: none;
    border: 1px solid transparent;
    color: var(--green);
    border: 1px solid var(--green);
    background: var(--dark-navy);
    border-radius: var(--bradius);
    cursor: pointer;
    opacity: 1;
  }
  @media (max-width: 768px) {
    .table thead {
      display: none;
    }
    .table,
    .table tbody,
    .table tr,
    .table td {
      display: block;
      width: 100%;
    }
    .table tr {
      margin-bottom: 15px;
    }
    .table tbody tr td {
      text-align: right;
      padding-left: 50%;
    }
    .table td::before {
      content: attr(data-label);
      position: absolute;
      left: 0;
      width: 50%;
      padding-left: 35px;
      font-weight: 600;
      font-size: 14px;
      text-align: left;
    }
  }
`;
export default ProfilePage;
