import React from 'react';
import { Bedroom } from '../../schemas/schemas';
import { BedListItem, StyledBedroomDetailCard } from './styles';

interface BedroomDetailCardProps {
  bedroom: Bedroom;
  number: number;
}

const BedroomDetailCard = (props: BedroomDetailCardProps) => {
  const { bedroom, number } = props;
  return (
    <StyledBedroomDetailCard>
      <h3>Bedroom {number + 1}</h3>
      <ul>
        {bedroom.beds.map((bed, idx) => {
          return (
            <BedListItem key={idx}>
              {bed.count} {bed.type} beds
            </BedListItem>
          )
        })}
      </ul>
    </StyledBedroomDetailCard>
  )
}

export default BedroomDetailCard;
