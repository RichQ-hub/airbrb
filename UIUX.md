# UI/UX

## Consistency

- Published and hosted listing cards, and even review cards have consistent
layout and design.

## Safety

- Confirmation modal feature added to provide an extra layer of security for
dangerouse actions such as deleting a listing or booking.

## Learnability

- Inputs contain placeholders in create and edit listing pages.

## Constraints

- Reservation button is disabled if the user is not logged in or if they are viewing their own booking.
- Creation of a new review cannot be made if the user has not had an 'accepted' booking, and if they are viewing their own booking.
- Hosted listing page is not visible if a user is not logged in.
- Hosted listing route and corresponding child routes cannot be manually set in the URL, in which case the user will be redirected back to the public listing page if they do try to set the URL.

## Effectiveness

- Navigation bar is present on all pages.
- All relevant actions for deleting, editing, viewing bookings and making the listing go live is all present in the hosted listing card.