import React, { ReactNode } from 'react';
import { AcceptedIcon, PendingIcon, RejectedIcon } from './styles'

interface StatusProps {
    status: string;
}

const BookingStatus = (props: StatusProps) => {
  const { status } = props;
  const statusIcon: ReactNode[] = [];

  if (status === 'accepted') {
    statusIcon.push(<AcceptedIcon>Accepted</AcceptedIcon>);
  } else if (status === 'pending') {
    statusIcon.push(<PendingIcon>Pending</PendingIcon>);
  } else {
    statusIcon.push(<RejectedIcon>Rejected</RejectedIcon>);
  }

  return (
    <div className='status-tag' key={status}>{statusIcon}</div>
  )
}

export default BookingStatus;
