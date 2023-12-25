import React from 'react';
import { Bed } from '../../schemas/schemas';
import BedInputField from './BedInputField';
import { StyledBedroomCard } from './styles';
import { AddBedBtn } from '../../styles/common';

interface BedroomCardProps {
  beds: Bed[];
  bedroomIdx: number;
  handleAddBedField: (bedroomIdx: number) => void;
  handleChangeBedType: (bedroomIdx: number, bedIdx: number, newType: string) => void;
  handleChangeBedCount: (bedroomIdx: number, bedIdx: number, newCount: number) => void;
}

const BedroomCard = (props: BedroomCardProps) => {
  const {
    beds,
    bedroomIdx,
    handleAddBedField,
    handleChangeBedType,
    handleChangeBedCount
  } = props;

  return (
    <StyledBedroomCard>
      <h3>Bedroom {bedroomIdx + 1}</h3>
      <ul>
        {beds.map((bed, idx) => {
          const { type, count } = bed;
          return (
            <BedInputField
              key={idx}
              type={type}
              count={count}
              bedroomIdx={bedroomIdx}
              bedIdx={idx}
              handleChangeBedType={handleChangeBedType}
              handleChangeBedCount={handleChangeBedCount}
            />
          )
        })}
      </ul>
      <AddBedBtn type='button' onClick={() => handleAddBedField(bedroomIdx)}>+ Add Bed</AddBedBtn>
    </StyledBedroomCard>
  )
}

export default BedroomCard;
