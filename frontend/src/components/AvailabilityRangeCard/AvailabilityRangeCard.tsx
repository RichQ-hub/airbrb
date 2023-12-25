import React from 'react';
import { DateContainer, DateRangeItem } from './styles';
import dayjs from 'dayjs';
import { DateRange } from '../../schemas/schemas';

interface AvailabilityRangeCardProps {
  dateRange: DateRange;
}

const AvailabilityRangeCard = (props: AvailabilityRangeCardProps) => {
  const { dateRange } = props;

  return (
    <DateRangeItem>
      <DateContainer>
        <h3>Start</h3>
        <p>{dayjs(dateRange.start).format('DD/MM/YYYY')}</p>
      </DateContainer>
      <DateContainer>
        <h3>End</h3>
        <p>{dayjs(dateRange.end).format('DD/MM/YYYY')}</p>
      </DateContainer>
    </DateRangeItem>
  )
}

export default AvailabilityRangeCard;
