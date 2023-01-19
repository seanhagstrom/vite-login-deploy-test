import React, { useContext } from 'react';
import AuthProvider, { AuthContext } from '../context/AuthContext';

const Home = () => {
  // const { pizza, name } = useContext(AuthContext);
  return (
    <>
      <div>Home goes here!</div>
      <p>This is where routines could go in your Fitness App.</p>
    </>
  );
};

export default Home;
