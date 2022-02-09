import React from 'react';
import styled from 'styled-components';
import { FaCheck, FaEdit, FaTimes, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Table = ({ users }) => {
  const deleteHandler = () => {
    console.log('deleted');
  };
  return (
    <Wrapper>
      <h3>Users</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ADMIN</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td
                  className={`status ${
                    user.isAdmin ? 'status_green' : 'status_red'
                  }`}>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: 'green' }} />
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
                <div className='btn-container'>
                  <td>
                    <Link to={`/admin/user/${user._id}/edit`}>
                      <button className='btn-style edit-btn'>
                        <FaEdit />
                      </button>
                    </Link>
                    <button
                      className='btn-style delete-btn'
                      variant='danger'
                      onClick={() => deleteHandler(user._id)}>
                      <FaTrash />
                    </button>
                  </td>
                </div>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  table {
    border-collapse: collapse;
    box-shadow: 0 5px 10px var(--dark-navy);
    background: var(--light-navy);
    text-align: left;
    overflow: hidden;

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

export default Table;
