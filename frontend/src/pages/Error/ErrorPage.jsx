import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <section>
      <h1>404</h1>
      <h3>Sorry, the page cannot be found</h3>
      <Link to='/' className='btn'>
        back home
      </Link>
    </section>
  );
};

export default ErrorPage;
