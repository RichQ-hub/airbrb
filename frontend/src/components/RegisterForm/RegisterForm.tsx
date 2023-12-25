import React, { useState } from 'react';
import { AuthForm, InputField, SubmitButton } from '../../styles/AuthForm';

const IDS = {
  emailInput: 'email',
  nameInput: 'name',
  passwordInput: 'password',
  confirmPasswordInput: 'confirmPassword'
}

interface RegisterFormProps {
    onSubmit: (email: string, name: string, password: string, confirmPassword: string) => void;
}

const RegisterForm = (props: RegisterFormProps) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailValid, setEmailValid] = useState(true);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (email && emailValid && name && password && confirmPassword) {
      props.onSubmit(email, name, password, confirmPassword);
    }
  }

  const validateEmail = (email: string) => {
    console.log(email)
    setEmailValid((/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).test(email))
  }

  return (
    <AuthForm onSubmit={handleSubmit}>
      <InputField
          required
          id={IDS.emailInput}
          label='Email'
          variant='filled'
          type='text'
          value={email}
          helperText={emailValid ? '' : 'Invalid email address i.e. sample@gmail.com'}
          onBlur={(e) => validateEmail(e.target.value)}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          required
          id={IDS.nameInput}
          label='Name'
          variant='filled'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputField
          required
          id={IDS.passwordInput}
          label='Password'
          variant='filled'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputField
          required
          id={IDS.confirmPasswordInput}
          label='Confirm Password'
          variant='filled'
          type='password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <SubmitButton variant='contained' type='submit'>Submit</SubmitButton>
    </AuthForm>
  )
}

export default RegisterForm;
