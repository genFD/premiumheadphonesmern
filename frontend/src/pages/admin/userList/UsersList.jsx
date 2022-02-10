import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Loader, Message } from '../../../components';
import { Table } from '../../../components';
import { useUserContext } from '../../../context/user_context';

const UsersList = () => {
  const navigate = useNavigate();
  const {
    user_list_loading: loading,
    users_list: users,
    user_list_error: error,
    listUsers,
    userInfo,
    user_delete_success: successdelete,
  } = useUserContext();

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      listUsers();
    } else {
      navigate('/login');
    }
  }, [successdelete]);

  return (
    <Wrapper>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message error='error'>There was an error</Message>
      ) : (
        <article className='main'>
          <Table users={users} />
        </article>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .main {
    height: 100vh;
    display: grid;
    justify-content: center;
    align-items: center;
    width: 100%;
    /* margin-top: 8rem; */
  }
`;

export default UsersList;
