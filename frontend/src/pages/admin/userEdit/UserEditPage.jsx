import React, { useEffect, useState } from 'react';
import Button from '../../../components/button/Button';
import { assets } from '../../../assets/assets';
import styled from 'styled-components';
// import './userEdit.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from '../../../context/user_context';
import { BackButton, Loader, Message } from '../../../components';

const UserEditPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    user_edit_loading: editloading,
    user_edit_success: editsuccess,
    user_edit_error: editerror,
    user_details: user,
    user_details_loading: loading,
    user_details_error: error,
    getUserDetails,
    updateUser,
  } = useUserContext();

  useEffect(() => {
    if (editsuccess) {
      navigate('/admin/users');
    } else {
      if (!user.name || user._id !== id) {
        getUserDetails(id);
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [id, user, editsuccess]);

  const submitHandler = (e) => {
    e.preventDefault();
    updateUser({ _id: id, name, email, isAdmin });
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message error='error'>{error}</Message>
  ) : (
    <>
      <BackButton />
      <Wrapper>
        <div className='user-edit-container'>
          <h2>Edit user</h2>
          {editloading && <Loader />}
          {editerror && <Message error='error'>There was an error</Message>}
          <div className='user-info-container'>
            <div className='form-container'>
              <form onSubmit={submitHandler}>
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
                    type='name'
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
                <div className='checkbox-control'>
                  <label>Admin Access</label>
                  <input
                    type='checkbox'
                    label='Is Admin'
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                  />
                </div>
                <div className='btn-container'>
                  <button className='btn'>Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};
const Wrapper = styled.div`
  .user-edit-container {
    height: 100vh;
    padding: 3rem;
    border-radius: var(--radius);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: var(--shadow-3);
  }
  .form-container {
    background-color: var(--light-navy);
    padding: 3rem;
    border-radius: var(--radius);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: var(--shadow-3);
  }
  .form-container h1 {
    font-family: var(--bodyFont);
    font-size: 2rem;
    text-align: center;
    margin-bottom: 30px;
  }
  .form-control {
    position: relative;
    margin: 40px 40px;
    width: 300px;
  }
  .checkbox-control {
    margin-bottom: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 1.5rem;
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
`;

export default UserEditPage;
