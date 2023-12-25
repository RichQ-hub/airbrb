import React, { useContext, useState } from 'react';
import { Booking, Review } from '../../schemas/schemas';
import ListingsService from '../../api/ListingsService';
import { UserContext } from '../../context/UserContextProvider';
import useFormInputText from '../../hooks/useFormInputText';
import Modal from '../Modal';
import { ModalCloseBtn, ModalHeader, ModalTitle } from '../../styles/common';
import { CommentTextarea, ReviewInputContainer, ReviewModalContainer, ReviewModalForm, ReviewModalSubmitBtn } from './styles';
import StarRatingInput from './StarRatingInput';

interface ReviewModalProps {
  listingId: string;
  userBookings: Booking[];
  handleAddReview: (newReview: Review) => void;
  handleCloseModal: () => void;
}

const ReviewModal = (props: ReviewModalProps) => {
  const { listingId, userBookings, handleAddReview, handleCloseModal } = props;

  const user = useContext(UserContext);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const comment = useFormInputText();

  /**
   * Form submission that creates a new review.
   */
  const handleSubmitNewReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // A user must have an accepted booking to make them eligible
    // to leave a review on this listing.
    const validBooking = userBookings.find((booking) => {
      return booking.status === 'accepted';
    });

    if (validBooking) {
      const newReview: Review = {
        author: user.email,
        rating: selectedRating,
        comment: comment.value,
      }
      await ListingsService.createReview(
        user.token,
        parseInt(listingId, 10),
        validBooking.id,
        {
          review: newReview,
        }
      );
      handleAddReview(newReview);
      handleCloseModal();
    } else {
      alert('You must have a booking with a status of \'Accepted\' to be able to leave a review');
    }
  }

  const handleChangeRating = (newRating: number) => {
    setSelectedRating(newRating);
  }

  return (
    <Modal>
      <ReviewModalContainer>
        <ModalHeader>
          <ModalTitle>Set Availability Ranges</ModalTitle>
          <ModalCloseBtn type='button' onClick={handleCloseModal}>X</ModalCloseBtn>
        </ModalHeader>
        <ReviewModalForm onSubmit={handleSubmitNewReview}>
          <ReviewInputContainer>
            <label htmlFor=''>Select Rating</label>
            <StarRatingInput
              maxRating={5}
              selectedRating={selectedRating}
              handleChangeRating={handleChangeRating}
            />
          </ReviewInputContainer>
          <ReviewInputContainer>
            <label htmlFor='review-modal__comment'>Comment</label>
            <CommentTextarea
              id='review-modal__comment'
              placeholder='This was an experience...'
              onChange={comment.handleChange}
            />
          </ReviewInputContainer>
          <ReviewModalSubmitBtn type='submit'>Create New Review</ReviewModalSubmitBtn>
        </ReviewModalForm>
      </ReviewModalContainer>
    </Modal>
  )
}

export default ReviewModal;
