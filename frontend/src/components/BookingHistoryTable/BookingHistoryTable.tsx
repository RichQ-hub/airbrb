import React from 'react';
import { Paper, TableHead, TableBody, TableRow } from '@mui/material'
import { BookingTable, BookingTableCell, BookingTableContainer } from './styles';

import { Booking } from '../../schemas/schemas';
import BookingStatus from '../BookingStatus';
import { calcDuration } from '../../utils/calcDuration';

interface BookingHistoryProps {
    bookings: Booking [];
}

const BookingHistoryTable = (props: BookingHistoryProps) => {
  return (
    <BookingTableContainer component={Paper}>
        <BookingTable>
          <TableHead>
            <TableRow>
                <BookingTableCell>Booking Id</BookingTableCell>
                <BookingTableCell>Date</BookingTableCell>
                <BookingTableCell>Duration (Days)</BookingTableCell>
                <BookingTableCell>Total Price ($)</BookingTableCell>
                <BookingTableCell>Guest Name</BookingTableCell>
                <BookingTableCell>Status</BookingTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {props.bookings.map((booking, index) => (
                <TableRow key={index}>
                    <BookingTableCell>{booking.id}</BookingTableCell>
                    <BookingTableCell>{booking.dateRange.start.substring(0, 10)} to {booking.dateRange.end.substring(0, 10)}</BookingTableCell>
                    <BookingTableCell>{calcDuration(booking.dateRange.start, booking.dateRange.end)}</BookingTableCell>
                    <BookingTableCell>{booking.totalPrice}</BookingTableCell>
                    <BookingTableCell>{booking.owner}</BookingTableCell>
                    <BookingTableCell><BookingStatus status={booking.status}/></BookingTableCell>
                </TableRow>
            ))}
          </TableBody>
        </BookingTable>
    </BookingTableContainer>
  )
}

export default BookingHistoryTable;
