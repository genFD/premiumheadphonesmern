import React, { useEffect, useState } from 'react';
import { FaTimes, FaUserAstronaut } from 'react-icons/fa';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
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
  const [isAdmin, setIsAdmin] = useState('');
  const [password, setPassword] = useState('');
  const [showProfileInfo, setShowProfileInfo] = useState(true);
  const [showOrdersInfo, setShowOrdersInfo] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const { id } = useParams();

  const {
    userInfo,
    user_details: user,
    user_details_loading: loading,
    user_details_error: error,
    getUserDetails,
    updateUserProfile,
    user_update_success: success,
  } = useUserContext();

  const {
    listMyOrders,
    order_my_list_loading: loadingOrder,
    order_my_list_error: errorOrders,
  } = useOrderContext();

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      if (!user.name) {
        getUserDetails('profile');
        listMyOrders();
      } else if (userInfo && location.pathname.includes('edit')) {
        getUserDetails(id);
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [userInfo, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    updateUserProfile({ id: user._id, name, email, password });
  };

  const viewProfileHandler = () => {
    setShowProfileInfo(true);
    setShowOrdersInfo(false);
  };
  const viewOrdersHandler = () => {
    setShowOrdersInfo(true);
    setShowProfileInfo(false);
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message className='error'>{error}</Message>
  ) : (
    <>
      <Wrapper>
        <section className='lg-container'>
          <article className='profile-container lg-screen'>
            <header className='profile-container-header'>
              <div className='img-container'>
                <FaUserAstronaut size='100' className='profile-icon' />
              </div>
              <span>{user.name}</span>
              <ul className='profile-option-list'>
                <li
                  onClick={viewProfileHandler}
                  className='profile-option-link'>
                  <span>Edit Public profile</span>
                </li>
                <li onClick={viewOrdersHandler} className='profile-option-link'>
                  <span>View orders</span>
                </li>
              </ul>
            </header>

            <div className='profile-orders-container'>
              {showProfileInfo && (
                <TransitionProfileInfo
                  submitHandler={submitHandler}
                  name={name}
                  setName={setName}
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                />
              )}
              {showOrdersInfo && <TransitionProfileOrders />}
            </div>
          </article>
        </section>

        <section className='sm-screen-profile-container  sm-screen'>
          <header className='profile-container-header'>
            <div className='img-container'>
              <FaUserAstronaut size='50' className='profile-icon' />
            </div>
            {/* <span>{user.name}</span> */}
          </header>
          <div className='content-switch-btn-container'>
            <button onClick={viewProfileHandler}>Edit Profile</button>
            <button onClick={viewOrdersHandler}>Show Orders</button>
          </div>
          {showProfileInfo && (
            <TransitionProfileInfo
              submitHandler={submitHandler}
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              success={success}
            />
          )}
          {showOrdersInfo && <TransitionProfileOrders />}
        </section>
      </Wrapper>
    </>
  );
};

const TransitionProfileInfo = ({
  submitHandler,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  success,
}) => {
  return (
    <>
      <Transition
        items={ProfileInfo}
        from={{ opacity: 0, translateX: -20 }}
        enter={{ opacity: 1, translateX: 0 }}
        leave={{ opacity: 0 }}
        reverse={ProfileInfo}
        delay={100}
        // config={config.molasses}
        // onRest={() => setShowInfo(!showInfo)}
      >
        {(styles, item) =>
          item && (
            <animated.div style={styles}>
              <ProfileInfo
                submitHandler={submitHandler}
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                success={success}
              />
            </animated.div>
          )
        }
      </Transition>
    </>
  );
};

const TransitionProfileOrders = () => {
  return (
    <>
      <Transition
        items={ProfileOrders}
        from={{ opacity: 0, translateX: 20 }}
        enter={{ opacity: 1, translateX: 0 }}
        leave={{ opacity: 0 }}
        reverse={ProfileOrders}
        delay={100}
        // config={config.molasses}
        // onRest={() => setShowInfo(!showInfo)}
      >
        {(styles, item) =>
          item && (
            <animated.div style={styles}>
              <ProfileOrders />
            </animated.div>
          )
        }
      </Transition>
    </>
  );
};

const ProfileInfo = ({
  submitHandler,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  success,
}) => {
  return (
    <article className='profile-form-container'>
      <header className='profile-form-container-header'>
        <div className='header-content'>
          <h3>Public profile</h3>
          <p>Add information about yourself</p>
        </div>
      </header>
      <div className='form-container'>
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
                  <span key={idx} style={{ transitionDelay: `${idx * 50}ms` }}>
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
                  <span key={idx} style={{ transitionDelay: `${idx * 50}ms` }}>
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
                  <span key={idx} style={{ transitionDelay: `${idx * 50}ms` }}>
                    {letter}
                  </span>
                );
              })}
            </label>
          </div>
          <div className='btn-container'>
            <button className='btn'>Save</button>
          </div>
        </form>
      </div>
      {success && (
        <Message success='success'>
          Profile Updated! <br /> Please reload the page ...
        </Message>
      )}
    </article>
  );
};
const ProfileOrders = () => {
  const {
    myorders: orders,
    order_my_list_loading: loading,
    order_my_list_error: error,
  } = useOrderContext();

  return (
    <article className='profile-form-container'>
      <header className='profile-form-container-header'>
        <div className='header-content'>
          <h3>Orders</h3>
          <p>This is your orders</p>
        </div>
      </header>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message error='error'>There was an error</Message>
      ) : (
        <div className='form-container'>
          <ul className='sm-screen-orders-content'>
            {orders.map((order) => {
              return (
                <li key={order._id}>
                  <article className='order-content'>
                    <p>Id:{order._id}</p>
                    <p>Created on: {order.createdAt.substring(0, 10)}</p>
                    <p>Amount: {formatPrice(order.totalPrice)}</p>
                    <p>
                      Paid on:
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <FaTimes style={{ color: 'red' }} />
                      )}
                    </p>
                    <p>
                      Delivered:
                      {order.isDelivered
                        ? order.deliveredAt.substring(0, 10)
                        : '  No'}
                    </p>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </article>
  );
};

export const Wrapper = styled.section`
  height: calc(100vh + 12rem);
  display: flex;
  justify-content: center;

  /* background: red; */
  /* align-items: center; */

  .lg-screen {
    display: none;
  }

  .sm-screen-profile-container {
    margin-top: 6rem;
    height: auto;
    width: 90vw;
    border: 1px solid var(--dark-slate);
    min-width: 350px;
    margin-bottom: 2rem;
  }
  .profile-option-list {
    display: none;
  }

  p {
    margin: 0;
  }

  .img-container {
    width: auto;
    height: auto;
    border-radius: 50%;
    padding: 1rem;
    background: var(--light-navy);
  }

  .profile-icon {
    color: var(--green);
  }

  .profile-container-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding-top: 0.5rem;
  }

  .content-switch-btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .content-switch-btn-container button {
    padding: 1rem 1.5rem;
    background: var(--light-navy);
    color: var(--slate);
    border: transparent;
    cursor: pointer;
    transition: var(--transition);
    font-family: var(--bodyFont);
    font-size: 16px;
  }

  .content-switch-btn-container button:focus {
    background: var(--lightest-navy);
    color: var(--green);
    border-bottom: 1px solid var(--green);
  }

  .profile-form-container-header {
    border: 1px solid var(--dark-slate);
    height: auto;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
  }

  .header-content {
    display: flex;
    flex-direction: column;
  }

  header h3 {
    text-align: center;
    margin: 0;
  }

  //orders
  .sm-screen-orders-content {
    display: flex;
    flex-direction: column;
    /* *** footer push */
    margin-bottom: 10rem;
  }

  .order-content {
    padding: 1rem 1.5rem;
    transition: var(--transition);
    border: 1px solid var(--green);
  }

  //edit profile
  .profile-form-container {
    padding: 1rem;
    border-radius: var(--radius);
    box-shadow: var(--shadow-4);
    margin-top: 2rem;
  }

  .form-container {
    width: 100%;
    padding: 1rem;
  }
  .form-container input {
    background-color: transparent;
    border: 0;
    border-bottom: 1px var(--dark-slate) solid;
    display: block;
    width: 100%;
    padding: 15px 0;
    font-size: 14px;
    font-family: inherit;
    color: #fff;
  }

  @media (min-width: 768px) {
    .lg-screen {
      display: block;
    }
    .sm-screen-profile-container {
      display: none;
    }
    .lg-container {
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .profile-container-header {
      border: 1px solid var(--dark-slate);
    }
    .sm-screen-orders-content {
      flex-direction: row;
    }

    .profile-orders-container {
      width: 100%;
    }

    .profile-option-list {
      display: block;
      margin-top: 2rem;
    }
    .profile-form-container {
      width: 100%;
    }
    .sm-screen-orders-content {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }

    .profile-option-link {
      display: block;
      text-align: left;
      font-size: 1rem;
      text-transform: capitalize;
      padding: 1rem 1.5rem;
      transition: var(--transition);
      letter-spacing: var(--spacing);
      font-family: var(--bodyFont);
      color: var(--slate);
      cursor: pointer;
    }

    .profile-option-link:hover {
      padding: 1rem 1.5rem;
      padding-left: 2rem;
      background: var(--dark-navy);
      color: var(--green);
      border-left: 1px solid var(--green);
    }

    .profile-container {
      margin-top: 6rem;
      height: auto;
      width: 75vw;
      display: grid;
      grid-template-columns: 250px auto;
      border: 1px solid var(--dark-slate);
    }
  }
`;
export default ProfilePage;
