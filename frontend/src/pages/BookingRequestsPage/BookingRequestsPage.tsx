import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookingRequestsCard from '../../components/BookingRequestsCard';
import BookingService from '../../api/BookingService';
import { UserContext } from '../../context/UserContextProvider';
import { Booking } from '../../schemas/schemas';
import { MainContent, TitleMain } from '../../styles/common';
import BookingHistoryTable from '../../components/BookingHistoryTable';
import { BookingHistoryContainer, BookingHistoryInfo, BookingRequestHistoryContainer, BookingRequestsContainer, RefreshButton, Subheading } from './styles';
import ListingsService from '../../api/ListingsService';
import { calcDuration } from '../../utils/calcDuration';

const PENDING = 'pending';
const ACCEPTED = 'accepted';

const BookingRequestsPage = () => {
  const { listingId } = useParams();
  const { token } = useContext(UserContext);
  const [bookingRequests, setBookingRequests] = useState<Booking []>([]);
  const [bookingHistory, setBookingHistory] = useState<Booking []>([]);
  const [annualProfit, setAnnualProfit] = useState<number>(0);
  const [publishTime, setPublishTime] = useState<number>(0);
  const [daysBooked, setDaysBooked] = useState<number>(0);
  const [bookingStatusChanged, setBookingStatusChanged] = useState(false);
  const currentDate = new Date()
  const currentYear = new Date().getFullYear();

  /**
   * Checks whether a given date is in the current year
   */
  const isCurrentYear = (startDate: string) => {
    const date = new Date(startDate);
    const bookingYear = date.getFullYear().toString();
    return bookingYear === currentYear.toString();
  }

  /**
   * Calculates the profit of the current year
   */
  const calcAnnualProfit = () => {
    const acceptedBookingProfit = bookingHistory.filter((booking) => {
      return booking.status === ACCEPTED && isCurrentYear(booking.dateRange.start);
    })
      .map(booking => booking.totalPrice)

    const profit = acceptedBookingProfit.reduce((sum, profit) => sum + profit, 0)
    setAnnualProfit(profit);
  }

  /**
   * Calculates the number of days that the current listing has been published
   */
  const calcPublishTime = async () => {
    const listingDetail = await ListingsService.getListingsDetails(Number(listingId));
    const daysSincePublished = calcDuration(listingDetail.postedOn, currentDate.toISOString());
    setPublishTime(Math.floor(daysSincePublished));
  }

  /**
   * Calculates the number of days that the current listing has been booked
   */
  const calcDaysBooked = () => {
    const totalDaysBooked = bookingHistory
      .filter((booking) => {
        return booking.status === ACCEPTED && isCurrentYear(booking.dateRange.start);
      })
      .reduce((totalDays, booking) => {
        const days = calcDuration(booking.dateRange.start, booking.dateRange.end)
        return totalDays + days;
      }, 0)
    setDaysBooked(Math.floor(totalDaysBooked))
  }

  const updateBookingRequestsHistory = () => {
    setBookingStatusChanged(true);
  }

  // store all pending booking requests in bookingRequests
  const getBookingRequests = async () => {
    const allBookings = await BookingService.getAllBookings(token);
    const requests = allBookings.filter((booking) => {
      return booking.listingId === listingId && booking.status === PENDING;
    })
    setBookingRequests(requests);
  }

  // store all booking requests with status of accepted or declined in bookingHistory
  const getBookingHistory = async () => {
    const allBookings = await BookingService.getAllBookings(token);
    const requests = allBookings.filter((booking) => {
      return booking.listingId === listingId && booking.status !== PENDING;
    })
    setBookingHistory(requests);
  }

  useEffect(() => {
    getBookingRequests()
    getBookingHistory();
    setBookingStatusChanged(false);
  }, [bookingStatusChanged])

  useEffect(() => {
    calcAnnualProfit();
    calcPublishTime();
    calcDaysBooked();
    setBookingStatusChanged(false);
  }, [bookingHistory]);

  return (
    <MainContent>
      <TitleMain>Booking History</TitleMain>
      <BookingRequestHistoryContainer>
        <BookingHistoryContainer>
          <BookingHistoryTable bookings={bookingHistory}/>
          <Subheading>Listing Insights</Subheading>
          <div>
            <BookingHistoryInfo>
              <div>
                <svg viewBox="0 0 24 24" fill="none" height='1em' width='1em' xmlns="http://www.w3.org/2000/svg" stroke="#f2f2f2">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="#fafafa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M12 6V12" stroke="#fafafa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M16.24 16.24L12 12" stroke="#fafafa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                </path></g>
                </svg>
                <span>Publish Time</span>
              </div>
              {publishTime} Days
            </BookingHistoryInfo>
            <BookingHistoryInfo>
              <div>
                <svg viewBox="0 0 24 24" fill="none" height='1em' xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 9H21M9 15L11 17L15 13M7 3V5M17 3V5M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                <span>Days Booked</span>
              </div>
              {daysBooked} Days
            </BookingHistoryInfo>
          </div>
          <BookingHistoryInfo>
            <div>
              <svg fill="#ffffff" height="1em" width="1em" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 330 330"
                xmlSpace="preserve" stroke="#ffffff">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier"> <g id="XMLID_229_">
                <path id="XMLID_230_" d="M329.946,13.925c-0.017-0.237-0.033-0.474-0.061-0.708c-0.029-0.239-0.069-0.476-0.109-0.713 c-0.042-0.252-0.083-0.504-0.138-0.752c-0.049-0.22-0.11-0.436-0.169-0.654c-0.067-0.253-0.134-0.507-0.215-0.754 c-0.07-0.218-0.155-0.432-0.236-0.647c-0.09-0.236-0.176-0.473-0.277-0.703c-0.098-0.225-0.21-0.444-0.32-0.665 c-0.105-0.211-0.207-0.424-0.321-0.629c-0.124-0.223-0.263-0.438-0.398-0.656c-0.123-0.196-0.243-0.393-0.376-0.583 c-0.141-0.204-0.295-0.4-0.447-0.598c-0.15-0.196-0.301-0.391-0.46-0.578c-0.149-0.176-0.31-0.345-0.468-0.515 c-0.186-0.198-0.372-0.393-0.568-0.582c-0.066-0.063-0.123-0.133-0.19-0.195c-0.099-0.091-0.205-0.167-0.305-0.254 c-0.205-0.181-0.413-0.356-0.628-0.526c-0.183-0.144-0.368-0.282-0.557-0.416c-0.206-0.148-0.417-0.291-0.631-0.428 c-0.206-0.132-0.413-0.258-0.624-0.379c-0.21-0.121-0.424-0.235-0.64-0.346c-0.221-0.113-0.442-0.221-0.667-0.321 c-0.221-0.099-0.443-0.191-0.668-0.279c-0.229-0.09-0.459-0.175-0.691-0.253c-0.23-0.077-0.463-0.148-0.697-0.214 c-0.237-0.067-0.476-0.129-0.716-0.184c-0.233-0.054-0.468-0.101-0.705-0.144c-0.253-0.046-0.507-0.084-0.763-0.117 c-0.227-0.029-0.454-0.053-0.684-0.072c-0.274-0.022-0.549-0.035-0.823-0.042C315.262,0.017,315.133,0,315,0h-60 c-8.284,0-15,6.716-15,15s6.716,15,15,15h25.669l-91.085,98.371l-38.978-38.978c-2.882-2.883-6.804-4.448-10.892-4.391 c-4.076,0.078-7.945,1.811-10.717,4.801l-125,134.868c-5.631,6.076-5.271,15.566,0.805,21.198 c2.888,2.676,6.545,3.999,10.193,3.999c4.03,0,8.05-1.615,11.006-4.803L140.41,121.624l38.983,38.983 c2.884,2.884,6.847,4.483,10.895,4.391c4.077-0.078,7.948-1.814,10.718-4.806L300,53.278V75c0,8.284,6.716,15,15,15 c8.284,0,15-6.716,15-15V15c0-0.094-0.012-0.184-0.014-0.277C329.981,14.457,329.965,14.191,329.946,13.925z"></path> <path id="XMLID_231_" d="M315,300H15c-8.284,0-15,6.716-15,15c0,8.284,6.716,15,15,15h300c8.284,0,15-6.716,15-15 C330,306.716,323.284,300,315,300z">
                </path> </g> </g>
              </svg>
              <span>Annual Profit</span>
            </div>
            <div>
              ${annualProfit}
            </div>
          </BookingHistoryInfo>
        </BookingHistoryContainer>

        <BookingRequestsContainer>
          {bookingRequests.length > 0
            ? <>
              <Subheading>
                <h3>Pending Booking Requests</h3>
                <RefreshButton onClick={getBookingRequests}>
                  <svg fill="#ffffff" height='1rem' version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 383.748 383.748" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M62.772,95.042C90.904,54.899,137.496,30,187.343,30c83.743,0,151.874,68.13,151.874,151.874h30 C369.217,81.588,287.629,0,187.343,0c-35.038,0-69.061,9.989-98.391,28.888C70.368,40.862,54.245,56.032,41.221,73.593 L2.081,34.641v113.365h113.91L62.772,95.042z"></path> <path d="M381.667,235.742h-113.91l53.219,52.965c-28.132,40.142-74.724,65.042-124.571,65.042 c-83.744,0-151.874-68.13-151.874-151.874h-30c0,100.286,81.588,181.874,181.874,181.874c35.038,0,69.062-9.989,98.391-28.888 c18.584-11.975,34.707-27.145,47.731-44.706l39.139,38.952V235.742z"></path> </g> </g></svg>
                  <p>Refresh</p>
                </RefreshButton>
              </Subheading>
              {bookingRequests.map((request, index) => {
                const { id, dateRange, totalPrice, status } = request;
                return (
                <BookingRequestsCard
                  key={index}
                  token={token}
                  bookingId={id}
                  dateRange={dateRange}
                  totalPrice={totalPrice}
                  status={status}
                  handleBookingRequestsRespond={updateBookingRequestsHistory}
                />
                )
              })}
            </>
            : <Subheading>
                <h3>No Pending Requests</h3>
                <RefreshButton onClick={getBookingRequests}>
                  <svg fill="#ffffff" height='1rem' version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 383.748 383.748" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M62.772,95.042C90.904,54.899,137.496,30,187.343,30c83.743,0,151.874,68.13,151.874,151.874h30 C369.217,81.588,287.629,0,187.343,0c-35.038,0-69.061,9.989-98.391,28.888C70.368,40.862,54.245,56.032,41.221,73.593 L2.081,34.641v113.365h113.91L62.772,95.042z"></path> <path d="M381.667,235.742h-113.91l53.219,52.965c-28.132,40.142-74.724,65.042-124.571,65.042 c-83.744,0-151.874-68.13-151.874-151.874h-30c0,100.286,81.588,181.874,181.874,181.874c35.038,0,69.062-9.989,98.391-28.888 c18.584-11.975,34.707-27.145,47.731-44.706l39.139,38.952V235.742z"></path> </g> </g></svg>
                  <p>Refresh</p>
                </RefreshButton>
              </Subheading>
          }
        </BookingRequestsContainer>
      </BookingRequestHistoryContainer>
    </MainContent>
  )
}

export default BookingRequestsPage;
