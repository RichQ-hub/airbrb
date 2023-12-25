import { fireEvent, render, screen } from '@testing-library/react';
import SearchBar from '../../components/SearchBar'
import React from 'react';

const noop = () => {
  // empty function
}

const event = {
  target: { value: 'test' }
};

describe('SearchBar', () => {
  const handleSearch = jest.fn()
  it('renders a search bar with a search field and button', () => {
    render(<SearchBar onSearch={noop}/>);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  })

  it('triggers onChange event handler when input value changes', () => {
    render(<SearchBar onSearch={noop}/>);
    const inputField = screen.getByRole('textbox');
    expect(inputField).toHaveValue('');
    fireEvent.change(inputField, event)
    expect(inputField).toHaveValue('test')

    // placeholder should be replaced by the input value
    const placeHolder = screen.queryByPlaceholderText(/e.g. listing name or address/i);
    expect(placeHolder).toHaveValue('test');
  })

  it('should not trigger handle search when the input field is empty', () => {
    render(<SearchBar onSearch={handleSearch}/>);
    const searchButton = screen.getByRole('button');
    fireEvent.click(searchButton);
    expect(handleSearch).not.toHaveBeenCalled();
  })

  it('triggers handleSearch event handler when search button is clicked', () => {
    render(<SearchBar onSearch={handleSearch}/>);
    const inputField = screen.getByRole('textbox');
    const searchButton = screen.getByRole('button');
    fireEvent.change(inputField, event)
    fireEvent.click(searchButton);
    expect(handleSearch).toHaveBeenCalledTimes(1);
    expect(handleSearch).toHaveBeenCalledWith(event.target.value);
  })
});
