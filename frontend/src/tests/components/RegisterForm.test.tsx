import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import RegisterForm from '../../components/RegisterForm';
import React from 'react';

const INPUT = {
  email: 'test@gmail.com',
  name: 'test',
  password: '123'
}

const noop = () => {
  // empty function
}

describe('RegisterPage', () => {
  const submit = jest.fn();
  it('renders the register page', () => {
    render(
      <RegisterForm onSubmit={noop}/>
    );
    expect(screen.getByRole('textbox', { name: 'Email' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Name' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    expect(screen.getByLabelText(/^password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();

    // checks input type
    expect(screen.getByRole('textbox', { name: 'Email' })).toHaveAttribute('type', 'text');
    expect(screen.getByRole('textbox', { name: 'Name' })).toHaveAttribute('type', 'text');
    expect(screen.getByLabelText(/^password/i)).toHaveAttribute('type', 'password');
    expect(screen.getByLabelText(/confirm password/i)).toHaveAttribute('type', 'password');
  })

  it('renders all input fields as required', () => {
    render(
        <RegisterForm onSubmit={noop}/>
    );
    expect(screen.getByRole('textbox', { name: 'Email' })).toBeRequired();
    expect(screen.getByRole('textbox', { name: 'Name' })).toBeRequired();
    const passwordFields = screen.getAllByLabelText(/password/i);

    passwordFields.forEach((field) => {
      expect(field).toBeRequired();
    })
  });

  it('renders helper text when user type in a invalid email address', () => {
    render(
        <RegisterForm onSubmit={noop}/>
    );
    const emailField = screen.getByRole('textbox', { name: 'Email' });
    fireEvent.blur(emailField, { target: { value: 'invalid.com' } });

    expect(screen.getByText(/invalid email address i\.e\. sample@gmail\.com/i)).toBeInTheDocument();
  })

  it('should not submit the form when required fields are empty', () => {
    render(
        <RegisterForm onSubmit={submit}/>
    );

    // clicks submit when the form is empty
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    expect(submit).not.toHaveBeenCalled();

    // clicks submit when some required fields are empty e.g. missing confirm password
    fireEvent.change(screen.getByRole('textbox', { name: 'Email' }), INPUT.email);
    fireEvent.change(screen.getByRole('textbox', { name: 'Name' }), { target: { value: INPUT.name } });
    fireEvent.change(screen.getByLabelText(/^password/i), { target: { value: INPUT.password } })
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    expect(submit).not.toHaveBeenCalled();
  })

  it('register is successful', async () => {
    render(
        <RegisterForm onSubmit={submit}/>
    );

    fireEvent.change(screen.getByRole('textbox', { name: 'Email' }), { target: { value: INPUT.email } });
    fireEvent.change(screen.getByRole('textbox', { name: 'Name' }), { target: { value: INPUT.name } });
    fireEvent.change(screen.getByLabelText(/^password/i), { target: { value: INPUT.password } })
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: INPUT.password } })

    await fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    expect(submit).toHaveBeenCalledTimes(1);
    expect(submit).toHaveBeenCalledWith(INPUT.email, INPUT.name, INPUT.password, INPUT.password);
  })
})
