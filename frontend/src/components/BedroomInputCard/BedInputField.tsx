import React from 'react';
import { ListingInput } from '../../styles/common';
import { StyledBedInputField } from './styles';

interface BedInputFieldProps {
  type: string;
  count: number;
  bedroomIdx: number;
  bedIdx: number;
  handleChangeBedType: (bedroomIdx: number, bedIdx: number, newType: string) => void;
  handleChangeBedCount: (bedroomIdx: number, bedIdx: number, newCount: number) => void;
}

const BedInputField = (props: BedInputFieldProps) => {
  const {
    type,
    count,
    bedroomIdx,
    bedIdx,
    handleChangeBedType,
    handleChangeBedCount
  } = props;

  return (
    <StyledBedInputField>
      <h4>Bed {bedIdx + 1}</h4>
      <ListingInput aria-label='bed-type' type='text' placeholder='King' value={type} onChange={(e) => {
        handleChangeBedType(bedroomIdx, bedIdx, e.currentTarget.value);
      }} />
      <ListingInput aria-label='bed-count' type='number' placeholder='Number of Beds' value={count} onChange={(e) => {
        const newCount = parseInt(e.currentTarget.value, 10);
        handleChangeBedCount(bedroomIdx, bedIdx, newCount);
      }} />
    </StyledBedInputField>
  )
}

export default BedInputField;
