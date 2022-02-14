import React, { useEffect } from 'react';
import { useProductsContext } from '../../context/products_context';
import './homepage.css';
import { Contact, FeaturedProducts, Hero, Services } from '../../components';
import { animated, Transition } from 'react-spring';
import { useUserContext } from '../../context/user_context';

const HomePage = () => {
  const { showNavBar } = useProductsContext();
  const { getUserDetails, user } = useUserContext();
  useEffect(() => {
    showNavBar();
    getUserDetails('profile');
  }, [user]);

  return (
    <>
      <Hero />
      <FeaturedProducts />
      <Services />
      <Contact />
    </>
  );
};

export const TransitionHome = ({ dropDown }) => {
  return (
    <>
      <Transition
        // items={dropDown}
        from={{ opacity: 0, translateY: -20 }}
        enter={{ opacity: 1, translateY: 0 }}
        leave={{ opacity: 0 }}
        // reverse={dropDown}
        delay={100}
        // config={config.molasses}
        // onRest={() => setShowInfo(!showInfo)}
      >
        {(styles, item) =>
          item && (
            <animated.div style={styles}>
              <HomePage />
            </animated.div>
          )
        }
      </Transition>
    </>
  );
};

export default HomePage;
