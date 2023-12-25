import React, { useContext, useState } from 'react'
import { UserContext } from '../../context/UserContextProvider';
import { useNavigate } from 'react-router-dom';

import { FormDiv, FormLink, Heading } from '../../styles/AuthForm';
import { MainContent } from '../../styles/common';
import UserAuth from '../../api/UserAuth';
import RegisterForm from '../../components/RegisterForm';
import AlertBox from '../../components/AlertBox';

const RegisterPage = () => {
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState('');
  const user = useContext(UserContext);
  const navigate = useNavigate()

  const register = async (email: string, name: string, password: string, confirmPassword: string) => {
    if (confirmPassword !== password) {
      setAlert(true);
      setAlertContent('Passwords did not match')
      return;
    }

    try {
      const result = await UserAuth.registerUser({
        email, password, name
      })

      console.log(user.token);
      user.setToken(result.token);
      user.setEmail(email);
      localStorage.setItem('token', result.token);
      localStorage.setItem('email', email);
      navigate('/listings/public');
    } catch (error) {
      setAlert(true);
      setAlertContent((error as Error).message);
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
      <Heading>Register</Heading>
      <RegisterForm onSubmit={register}/>
      <p>Already have an account? <FormLink href='/auth/login'>Log In</FormLink></p>
    </FormDiv>
    </MainContent>
  )
}

export default RegisterPage;
