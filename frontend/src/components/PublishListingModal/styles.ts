import { DatePicker } from '@mui/x-date-pickers';
import styled from 'styled-components';
import { FlexAlignCentre, FontRajdhani } from '../../styles/common';

export const AvailabilityDateInputForm = styled.form`
  margin-bottom: 1rem;
`

export const AddDateRangeBtn = styled.button`
  ${FontRajdhani}
  width: 100%;
  padding: 0.6rem 1rem;
  margin-bottom: 1.2rem;
  background-color: var(--file-upload-btn);
  font-size: 1rem;

  &:hover {
    opacity: 0.7;
  }
`

export const DateRangeList = styled.ul`
  background-color: #000916;
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #5794CC;
  margin-bottom: 1.2rem;
`

export const PublishBtn = styled(AddDateRangeBtn)`
  background-color: var(--primary-orange);
`
