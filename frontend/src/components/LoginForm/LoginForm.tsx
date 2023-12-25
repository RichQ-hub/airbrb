import React, { useState } from 'react';
import { InputField, AuthForm, SubmitButton } from '../../styles/AuthForm';

const IDS = {
  emailInput: 'email',
  passwordInput: 'password',
}

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void
}

const LoginForm = (props: LoginFormProps) => {
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (email && password) {
      props.onSubmit(email, password);
    }
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
      onChange={(e) => setEmail(e.target.value)}
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
    <SubmitButton variant='contained' type='submit'>Submit</ SubmitButton>
  </AuthForm>
  )
}

export default LoginForm;
