import React, { useContext } from 'react';
import { UserContext } from '../context/UserContextProvider';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { token } = useContext(UserContext);

  if (!token) {
    return <Navigate to='/' />
  }

  return <Outlet />
}

export default ProtectedRoute;
