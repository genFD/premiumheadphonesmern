import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import styled from 'styled-components';
import {
  Name,
  Brand,
  Category,
  Description,
  Price,
  Image,
  CountInStock,
} from '..';
const Form = ({ formData, setFormData, submitHandler }) => {
  const [page, setPage] = useState(0);
  // const [formData, setFormData] = useState({
  //   name: '',
  //   brand: '',
  //   category: '',
  //   description: '',
  //   price: '',
  //   image: '',
  //   countInStock: '',
  // });
  const formTitles = [
    "What's the name of your product?",
    'How about a brand name?',
    'What category best fits your product?',
    'Please describe your product',
    'How much?',
    'Choose an Image',
    'How many items do you have in stock?',
  ];
  const PageDisplay = () => {
    return page === 0 ? (
      <Name formData={formData} setFormData={setFormData} />
    ) : page === 1 ? (
      <Brand formData={formData} setFormData={setFormData} />
    ) : page === 2 ? (
      <Category formData={formData} setFormData={setFormData} />
    ) : page === 3 ? (
      <Description formData={formData} setFormData={setFormData} />
    ) : page === 4 ? (
      <Price formData={formData} setFormData={setFormData} />
    ) : page === 5 ? (
      <Image formData={formData} setFormData={setFormData} />
    ) : (
      <CountInStock formData={formData} setFormData={setFormData} />
    );
  };

  return (
    <Wrapper>
      <div className='progressbar'>
        <div
          style={{
            width:
              page === 0
                ? '14.28%'
                : page === 1
                ? '28.57%'
                : page === 2
                ? '42.84%'
                : page === 3
                ? '57.12%'
                : page === 4
                ? '71.4%'
                : page === 5
                ? '85.68%'
                : '100%',
          }}></div>
      </div>
      <div className='form-container'>
        <header>
          <h2>{formTitles[page]}</h2>
        </header>
        <div className='content'>{PageDisplay()}</div>
        <footer>
          <button
            className='btn'
            disabled={page <= 0}
            onClick={() => setPage((curr) => curr - 1)}>
            Previous
          </button>
          <button
            className='btn'
            onClick={(e) => {
              if (page === formTitles.length - 1) {
                submitHandler(e);
              } else {
                setPage((curr) => curr + 1);
              }
            }}>
            {page === formTitles.length - 1 ? 'Submit' : 'Continue'}
          </button>
        </footer>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  /* PROGRESS BAR */
  .progressbar {
    width: 500px;
    height: 10px;
    background-color: var(--lightest-navy);
    margin: 0 auto 50px auto;
    border-radius: var(--radius);
  }

  .progressbar div {
    width: 33.3%;
    height: 100%;
    background-color: var(--green);
    border-radius: var(--radius);
  }
  .form-container {
    /* width: 500px; */
    background-color: var(--light-navy);
    padding: 3rem;
    border-radius: var(--radius);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: var(--shadow-3);
  }
  header h2 {
    font-family: var(--bodyFont);
    font-size: 2rem;
    text-align: center;
    margin-bottom: 30px;
  }

  footer {
    /* border: 1px solid red; */
    margin-top: 2rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  @media (min-width: 768px) {
    .form-container {
      width: 680px;
    }
  }
`;

export default Form;
