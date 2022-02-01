import React from 'react';
import { GiSoundOn } from 'react-icons/gi';
import { TiMicrophone } from 'react-icons/ti';
import { FiBatteryCharging } from 'react-icons/fi';

export const links = [
  {
    id: 1,
    text: 'home',
    url: '/',
  },
  {
    id: 2,
    text: 'products',
    url: '/products',
  },
  {
    id: 3,
    text: 'about',
    url: '/about',
  },
];

export const services = [
  {
    id: 1,
    icon: <GiSoundOn />,
    title: 'ANC',
    text: 'Active noise control (ANC), is a method for reducing unwanted sound by the addition of a second sound specifically designed to cancel the first',
  },
  {
    id: 2,
    icon: <FiBatteryCharging />,
    title: 'Battery life',
    text: 'Up to 30-hour battery life with quick charging (10 min charge for 5 hours of playback)',
  },
  {
    id: 3,
    icon: <TiMicrophone />,
    title: 'Built-in Mic',
    text: 'Speak-to-chat technology automatically reduces volume during conversations, superior call quality with precise voice pickup',
  },
];

// export const products_url = 'https://course-api.com/react-store-products';

// export const single_product_url = `https://course-api.com/react-store-single-product?id=`;

export const products_url = '/api/products/';
