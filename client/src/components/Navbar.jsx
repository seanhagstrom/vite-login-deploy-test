import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../custom-hooks';

const Navbar = () => {
  const { isLoggedIn } = useAuth();
  // if (isLoggedIn) {
  //   return (
  //     <nav>
  //       <NavLink to='/'>Home</NavLink>
  //       <NavLink to='/login'>Logout</NavLink>
  //       <NavLink to='/signup'>Profile</NavLink>
  //     </nav>
  //   );
  // } else {
  //   return (
  //     <nav>
  //       <NavLink to='/'>Home</NavLink>
  //       <NavLink to='/login'>Login</NavLink>
  //       <NavLink to='/signup'>Register</NavLink>
  //     </nav>
  //   );
  // }

  return isLoggedIn ? (
    <nav>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/login'>Logout</NavLink>
      <NavLink to='/signup'>Profile</NavLink>
    </nav>
  ) : (
    <nav>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/login'>Login</NavLink>
      <NavLink to='/signup'>Register</NavLink>
    </nav>
  );
};

export default Navbar;
