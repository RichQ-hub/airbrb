import React from 'react';
import { StyledDatePicker } from '../../styles/common';
import { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

interface DateInputProps {
  label: string;
  format: string;
  disablePast: boolean;
  value: Dayjs;
  minDate: Dayjs | null;
  onChange: (newValue: any) => void;
}

const DateInput = (props: DateInputProps) => {
  const {
    label,
    format,
    disablePast,
    value,
    minDate,
    onChange
  } = props;
  return (
    <StyledDatePicker
      label={label}
      format={format}
      disablePast={disablePast}
      value={value}
      minDate={minDate}
      onChange={onChange}
    />
  )
}

export default DateInput;
