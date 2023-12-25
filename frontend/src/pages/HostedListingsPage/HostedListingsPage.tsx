import React, { useContext, useEffect, useState } from 'react';
import { LoadingSpinner, MainContent, TitleMain } from '../../styles/common';
import ListingsService from '../../api/ListingsService';
import HostedListingCard from '../../components/HostedListingCard';
import { GridLayout, HostedListingsHeader, ListingCreateBtn } from './styles';
import { DateRange, HostedListing } from '../../schemas/schemas';
import { UserContext } from '../../context/UserContextProvider';
import PublishListingModal from '../../components/PublishListingModal';

const HostedListingsPage = () => {
  const user = useContext(UserContext);
  const [listings, setListings] = useState<HostedListing[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpenAvailabilityId, setIsOpenAvailabilityId] = useState<number | null>(null);

  /**
   * Fetches all the data to display on the hosted listing card.
   */
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const allListings = await ListingsService.getAllListings();

      const hostedListings = await Promise.all<HostedListing>(
        allListings
          .filter((listing) => {
            return listing.owner === user.email;
          })
          .map(async (userListing) => {
            const listingDetails = await ListingsService.getListingsDetails(userListing.id);
            return {
              listingId: userListing.id,
              ...listingDetails,
            };
          })
      );

      setListings(hostedListings);
      setLoading(false);
    }
    fetchData();
  }, []);

  /**
   * Removes listing from the hosted listings state.
   * @param {number} listingId
   */
  const handleDeleteListing = async (listingId: number) => {
    await ListingsService.deleteListing(user.token, listingId);
    const oldListings = listings.slice();
    const newListings = oldListings.filter((listing) => {
      return listing.listingId !== listingId;
    })
    setListings(newListings);
  }

  /**
   * Stores either the listingId in state, signifying that the availability modal
   * should be open, or null, signifying that the modal should be closed.
   */
  const toggleAvailabilityModal = (listingId: number | null) => {
    setIsOpenAvailabilityId(listingId);
  }

  /**
   * Sets the published status of a particular listing in the client.
   */
  const changePublishedStatus = (listingId: number, isPublished: boolean) => {
    const newListings = listings.slice();
    const newListing = newListings.find((listing) => listing.listingId === listingId);
    if (newListing) {
      newListing.published = isPublished;
    }
    setListings(newListings);
  }

  /**
   * Sends a request for a hosted listing to go live in the backend.
   */
  const handlePublishListing = async (listingId: number, availibilities: DateRange[]) => {
    await ListingsService.publishListing(user.token, listingId, {
      availability: availibilities,
    })
    changePublishedStatus(listingId, true);
  }

  /**
   * Sends a request for a hosted listing to end a live session in the backend.
   */
  const handleUnpublishListing = async (listingId: number) => {
    await ListingsService.unpublishListing(user.token, listingId);
    changePublishedStatus(listingId, false);
  }

  return (
    <MainContent>
      <TitleMain>Hosted Listings</TitleMain>
      <section>
        <HostedListingsHeader>
          <h2>{listings.length} Listings Found</h2>
          <ListingCreateBtn to='create'>+ Create New Listing</ListingCreateBtn>
        </HostedListingsHeader>

        <GridLayout>
          {loading
            ? (<LoadingSpinner height={40}/>)
            : (listings.map((listing, idx) => {
                const { listingId, title, thumbnail, price, metadata, reviews, published } = listing;
                return (
                  <HostedListingCard
                    key={idx}
                    listingId={listingId}
                    title={title}
                    thumbnail={thumbnail}
                    price={price}
                    metadata={metadata}
                    reviews={reviews}
                    published={published}
                    handleUnpublishListing={handleUnpublishListing}
                    toggleAvailabilityModal={toggleAvailabilityModal}
                    handleDeleteListing={handleDeleteListing}
                  />
                )
              })
              )
          }
        </GridLayout>
      </section>

      {/* Availability Modal */}
      {
        isOpenAvailabilityId &&
        <PublishListingModal
          listingId={isOpenAvailabilityId}
          handlePublishListing={handlePublishListing}
          handleCloseModal={() => toggleAvailabilityModal(null)}
        />
      }
    </MainContent>
  )
}

export default HostedListingsPage;
