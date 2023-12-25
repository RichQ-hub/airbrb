import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import dayjs from 'dayjs';
import React from 'react';
import DateInput from '../../components/DateInput';

describe('Date Picker', () => {
  it('renders calender picker on button click', async () => {
    render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateInput
          label='Start Date'
          value={dayjs('01/02/2023', 'DD/MM/YYYY')}
          format='DD/MM/YYYY'
          disablePast={false}
          minDate={dayjs()}
          onChange={jest.fn()}
        />
      </LocalizationProvider>
    );
    expect(screen.queryByRole('dialog')).toBeNull();
    const button = screen.getByRole('button');
    fireEvent.click(button);
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  })

  it('shows error state on invalid date', () => {
    render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateInput
          label='Start Date'
          value={dayjs('04/02/2023', 'DD/MM/YYYY')}
          minDate={dayjs('04/02/2023', 'DD/MM/YYYY')}
          format='DD/MM/YYYY'
          disablePast={false}
          onChange={jest.fn()}
        />
      </LocalizationProvider>
    );
    const dateInput = screen.getByLabelText('Start Date');
    expect(dateInput).toBeValid();
    fireEvent.change(dateInput, { target: { value: '03/02/2023' } })
    expect(dateInput).not.toBeValid();
  })

  it('past dates are disabled', async () => {
    render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateInput
          label='Start Date'
          value={dayjs('04/02/2023', 'DD/MM/YYYY')}
          minDate={dayjs('04/02/2023', 'DD/MM/YYYY')}
          format='DD/MM/YYYY'
          disablePast={false}
          onChange={jest.fn()}
        />
      </LocalizationProvider>
    );

    expect(screen.queryByRole('dialog')).toBeNull();
    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => screen.getByRole('dialog'));
    expect(screen.getByText('3')).toBeDisabled(); // Button with a 3 (Feb 3) should be disabled.
  })

  it('remains open when selecting an invalid date', async () => {
    render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateInput
          label='Start Date'
          value={dayjs('04/02/2023', 'DD/MM/YYYY')}
          minDate={dayjs('04/02/2023', 'DD/MM/YYYY')}
          format='DD/MM/YYYY'
          disablePast={false}
          onChange={jest.fn()}
        />
      </LocalizationProvider>
    );

    expect(screen.queryByRole('dialog')).toBeNull();
    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => screen.getByRole('dialog'));
    fireEvent.click(screen.getByText('3'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

  })

  it('closes dialog on valid date selection', async () => {
    render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateInput
          label='Start Date'
          value={dayjs('04/02/2023', 'DD/MM/YYYY')}
          minDate={dayjs('04/02/2023', 'DD/MM/YYYY')}
          format='DD/MM/YYYY'
          disablePast={false}
          onChange={jest.fn()}
        />
      </LocalizationProvider>
    );
  
    expect(screen.queryByRole('dialog')).toBeNull();
    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => screen.getByRole('dialog'));
    fireEvent.click(screen.getByText('20'));
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    })
  })

})