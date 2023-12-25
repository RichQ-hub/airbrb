import React, { useContext, useState } from 'react'
import UserAuth from '../../api/UserAuth';
import { UserContext } from '../../context/UserContextProvider';
import { useNavigate } from 'react-router-dom';
import { MainContent } from '../../styles/common';

import { Heading, FormDiv, FormLink } from '../../styles/AuthForm';
import LoginForm from '../../components/LoginForm';
import AlertBox from '../../components/AlertBox';

const LoginPage = () => {
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState('');
  const user = useContext(UserContext);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      const result = await UserAuth.loginUser({ email, password })
      console.log(result.token);
      localStorage.setItem('token', result.token); // So that token persists on page reload.
      localStorage.setItem('email', email);
      user.setToken(result.token);
      user.setEmail(email);
      navigate('/listings/public');
    } catch (error) {
      setAlertContent((error as Error).message);
      setAlert(true);
    }
  }

  const closeAlert = () => {
    setAlert(false);
    setAlertContent('');
  }

  return (
    <MainContent>
      {alert
        ? <AlertBox alertContent={alertContent} onClick={closeAlert}/>
        : null
        }
      <FormDiv>
        <Heading variant='h2'>Log In</Heading>
        <LoginForm onSubmit={login}/>
        <p>Don&apos;t have an account?<FormLink id='register-link' href='/auth/register'>Sign Up</ FormLink></p>
      </FormDiv>
    </MainContent>
  )
}

export default LoginPage;
