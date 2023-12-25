import React, { useState } from 'react';
import Modal from '../Modal';
import { DatePickersContainer, ModalCloseBtn, ModalContainer, ModalHeader, ModalTitle, StyledDatePicker } from '../../styles/common';
import { AddDateRangeBtn, AvailabilityDateInputForm, DateRangeList, PublishBtn } from './styles';
import dayjs, { Dayjs } from 'dayjs';
import { DateRange } from '../../schemas/schemas';
import AvailabilityRangeCard from '../AvailabilityRangeCard';

interface PublishListingModalProps {
  listingId: number;
  handlePublishListing: (listingId: number, availibilities: DateRange[]) => void;
  handleCloseModal: () => void;
}

/**
 * Modal that allows the user to input availability date ranges that a listing
 * can be booked.
 */
const PublishListingModal = (props: PublishListingModalProps) => {
  const {
    listingId,
    handlePublishListing,
    handleCloseModal
  } = props;

  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs().add(2, 'day'));
  const [availabilityRanges, setAvailabilityRanges] = useState<DateRange[]>([]);

  const handleAddAvailabilityRange = () => {
    if (!startDate?.isValid() || !endDate?.isValid()) {
      alert('Please set valid dates.')
      return
    }

    const newRanges = availabilityRanges.slice();
    newRanges.push({
      start: startDate.toISOString(),
      end: endDate.toISOString(),
    })
    setAvailabilityRanges(newRanges);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handlePublishListing(listingId, availabilityRanges);
    handleCloseModal();
  }

  return (
    <Modal>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>Set Availability Ranges</ModalTitle>
          <ModalCloseBtn type='button' onClick={handleCloseModal}>X</ModalCloseBtn>
        </ModalHeader>

        {/* Modal Body */}

        {/* Input Section */}
        <AvailabilityDateInputForm onSubmit={handleSubmit}>
          <DatePickersContainer>
            <StyledDatePicker
              label='Start Date'
              format='DD/MM/YYYY'
              disablePast
              value={startDate}
              onChange={(newValue: Dayjs | null) => setStartDate(newValue)}
            />
            <StyledDatePicker
              label='End Date'
              format='DD/MM/YYYY'
              value={endDate}
              minDate={startDate!.add(1, 'day')}
              onChange={(newValue: Dayjs | null) => setEndDate(newValue)}
            />
          </DatePickersContainer>
          <AddDateRangeBtn type='button' onClick={handleAddAvailabilityRange}>Add Date Range</AddDateRangeBtn>
          <DateRangeList>
            {availabilityRanges.map((range, idx) => {
              return (
                <AvailabilityRangeCard
                  key={idx}
                  dateRange={range}
                />
              )
            })}
          </DateRangeList>
          <PublishBtn type='submit'>Publish Listing</PublishBtn>
        </AvailabilityDateInputForm>
      </ModalContainer>
    </Modal>
  )
}

export default PublishListingModal;
