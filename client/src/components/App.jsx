import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
// import './App.css';
import { Home, Navbar } from '.';
import { Signup, Login } from './AuthForm';
// import { me } from './axios-services/auth';
import { useAuth } from '../custom-hooks';

function App() {
  const { token, isLoggedIn, logout, user } = useAuth();
  // const [user, setUser] = useState({});

  // const [token, settoken] = useState(localStorage['fit-token'] || '');
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   if (token) {
  //     const getMe = async () => {
  //       const result = await me(token);
  //       setUser(result);
  //     };
  //     getMe();
  //   }
  // }, []);

  // console.log(`This is user: ${user.username} loggedIn?: ${isLoggedIn}`);
  return (
    <div className='App'>
      <Navbar />
      <>
        This is token: {token} loggedIn?: {isLoggedIn.toString()}, username is:{' '}
        {user.username}
      </>
      <button onClick={logout}>Logout</button>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/login' element={Login} />
        <Route path='/signup' element={Signup} />
        <Route path='*' element={<h1>no route here!</h1>} />
      </Routes>
    </div>
  );
}

export default App;
