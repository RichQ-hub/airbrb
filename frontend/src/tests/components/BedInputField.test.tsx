import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import BedInputField from '../../components/BedroomInputCard/BedInputField';

describe('Bed Input Field', () => {
  const handleChangeBedType = jest.fn();
  const handleChangeBedCount = jest.fn();

  it('renders both input fields', () => {
    render(
      <BedInputField
        type='King'
        count={3}
        bedroomIdx={40}
        bedIdx={41}
        handleChangeBedCount={handleChangeBedCount}
        handleChangeBedType={handleChangeBedType}
      />
    )
    expect(screen.getByLabelText('bed-type')).toBeInTheDocument();
    expect(screen.getByLabelText('bed-count')).toBeInTheDocument();
  })

  it('renders correct heading text', () => {
    render(
      <BedInputField
        type='King'
        count={3}
        bedroomIdx={40}
        bedIdx={41}
        handleChangeBedCount={handleChangeBedCount}
        handleChangeBedType={handleChangeBedType}
      />
    )
    expect(screen.getByRole('heading', { name: 'Bed 42' })).toBeInTheDocument();
  })

  it('renders the correct initial value', () => {
    render(
      <BedInputField
        type='King'
        count={3}
        bedroomIdx={40}
        bedIdx={41}
        handleChangeBedCount={handleChangeBedCount}
        handleChangeBedType={handleChangeBedType}
      />
    )
    const inputField = screen.getByRole('textbox', { name: 'bed-type' });
    expect(inputField).toHaveValue('King');
  })

})