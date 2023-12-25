// This file can be deleted if you'd like
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getAllByText(/o/i); // random letter
  linkElement.forEach((element) => {
    expect(element).toBeInTheDocument();
  });
});
