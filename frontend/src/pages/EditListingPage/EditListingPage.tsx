import React, { useContext, useEffect, useState } from 'react'
import { AddBedBtn, ListingAddressInputWrapper, ListingInput, MainContent, TitleMain } from '../../styles/common';
import { Amenity, Bedroom, ListingDetail } from '../../schemas/schemas';
import { useNavigate, useParams } from 'react-router-dom';
import ListingsService from '../../api/ListingsService';
import { UserContext } from '../../context/UserContextProvider';
import useFormInputText from '../../hooks/useFormInputText';
import { CheckboxGrid, CheckboxGridItem, CreateListingBtn, ListingForm } from '../CreateListingPage/styles';
import ListingFormInputWrapper from '../../components/ListingFormInputWrapper';
import FileInput from '../../components/FileInput';
import { fileToDataUrl } from '../../utils/fileToDataUrl';
import BedroomCard from '../../components/BedroomInputCard';

const EditListingPage = () => {
  const { token } = useContext(UserContext);
  const { listingId } = useParams();
  const navigate = useNavigate();

  const [listing, setListing] = useState<ListingDetail>();
  const title = useFormInputText();
  const price = useFormInputText();
  const propertyType = useFormInputText();
  const numBathrooms = useFormInputText();
  const [bedrooms, setBedrooms] = useState<Bedroom[]>([]);
  const [thumbnail, setThumbnail] = useState<File>();
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [propertyImages, setPropertyImages] = useState<File[]>([]);

  // Address Values.
  const street = useFormInputText();
  const city = useFormInputText();
  const state = useFormInputText();
  const postcode = useFormInputText();
  const country = useFormInputText();

  /**
   * Fetches the former current values and sets them in each input field
   */
  useEffect(() => {
    const fetchListing = async () => {
      const listing = await ListingsService.getListingsDetails(Number(listingId));
      setListing(listing);

      title.setValue(listing.title);
      price.setValue(listing.price.toString());
      propertyType.setValue(listing.metadata.propertyType);
      numBathrooms.setValue(listing.metadata.numBathrooms.toString());
      street.setValue(listing.address.street);
      city.setValue(listing.address.city);
      state.setValue(listing.address.state);
      postcode.setValue(listing.address.postcode);
      country.setValue(listing.address.country);
      setBedrooms(listing.metadata.bedrooms);
      setAmenities(listing.metadata.amenities);
    }
    fetchListing();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const fileBase64 = thumbnail ? await fileToDataUrl(thumbnail) as string : '';

      const propertyImagesBase64 = await Promise.all<string>(
        propertyImages
          .map(async (imgFile) => {
            return await fileToDataUrl(imgFile) as string;
          })
      );

      await ListingsService.updateListing(token, Number(listingId), {
        title: title.value,
        address: {
          street: street.value,
          city: city.value,
          state: state.value,
          postcode: postcode.value,
          country: country.value,
        },
        thumbnail: fileBase64,
        price: Number(price.value),
        metadata: {
          propertyType: propertyType.value,
          numBathrooms: Number(numBathrooms.value),
          amenities,
          bedrooms,
          propertyImages: propertyImagesBase64,
        }
      })
    } catch (error) {
      console.log(error);
      // Set error modal here.
    }

    navigate('../../');
  }

  const handleAddBedroom = () => {
    const newBedrooms = bedrooms.slice();
    newBedrooms.push({
      name: `Bedroom ${bedrooms.length + 1}`,
      beds: [],
    })
    setBedrooms(newBedrooms);
  }

  const handleAddBedField = (bedroomIdx: number) => {
    const newBedrooms = bedrooms.slice();
    newBedrooms[bedroomIdx]?.beds.push({
      type: '',
      count: 0,
    })
    setBedrooms(newBedrooms);
  }

  const handleChangeBedType = (bedroomIdx: number, bedIdx: number, newType: string) => {
    const newBedrooms = bedrooms.slice();
    newBedrooms[bedroomIdx]!.beds[bedIdx]!.type! = newType;
    setBedrooms(newBedrooms);
  }

  const handleChangeBedCount = (bedroomIdx: number, bedIdx: number, newCount: number) => {
    const newBedrooms = bedrooms.slice();
    newBedrooms[bedroomIdx]!.beds[bedIdx]!.count = newCount;
    setBedrooms(newBedrooms);
  }

  const handleThumbnailUpload = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      setThumbnail(e.currentTarget.files[0]);
      e.currentTarget.value = '';
    }
  }

  const handlePropertyImagesUpload = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      setPropertyImages(Array.from(e.currentTarget.files));
      e.currentTarget.value = '';
    }
  }

  const handleToggleAmenity = (amenity: Amenity, checked: boolean) => {
    const newAmenities = amenities.slice();
    if (checked) {
      newAmenities.push(amenity);
      setAmenities(newAmenities);
    } else {
      setAmenities(newAmenities.filter((oldAmenity) => {
        return oldAmenity !== amenity;
      }))
    }
  }

  return (
    <MainContent>
      <TitleMain>Edit Listing for {listing?.title}</TitleMain>
      <ListingForm onSubmit={handleSubmit}>
        {/* Listing Name */}
        <ListingFormInputWrapper label='Name'>
          <ListingInput
            type='text'
            placeholder='Wayne Manor'
            required
            value={title.value}
            onChange={title.handleChange}
          />
        </ListingFormInputWrapper>

        {/* Thumbnail */}
        <ListingFormInputWrapper label='Thumbnail'>
          <FileInput
            inputId='thumbnail-input'
            isMultiple={false}
            selectedFiles={thumbnail ? [thumbnail] : []}
            handleFileUpload={handleThumbnailUpload}
            handleFileRemove={() => setThumbnail(undefined)}
          />
        </ListingFormInputWrapper>

        {/* Property Images */}
        <ListingFormInputWrapper label='Property Images'>
          <FileInput
            inputId='property-imgs-input'
            isMultiple={true}
            selectedFiles={propertyImages}
            handleFileUpload={handlePropertyImagesUpload}
            handleFileRemove={() => setPropertyImages([])}
          />
        </ListingFormInputWrapper>

        {/* Property Type */}
        <ListingFormInputWrapper label='Property Type'>
          <ListingInput
            type='text'
            placeholder='Apartment'
            required
            value={propertyType.value}
            onChange={propertyType.handleChange}
          />
        </ListingFormInputWrapper>

        {/* Pricing */}
        <ListingFormInputWrapper label='Price (Per Night)'>
          <ListingInput
            type='number'
            placeholder='299.99'
            required min='0'
            step='any'
            value={price.value}
            onChange={price.handleChange}
          />
        </ListingFormInputWrapper>

        {/* Address */}
        <ListingFormInputWrapper label='Address'>
          <ListingAddressInputWrapper>
            <ListingInput type='text' value={street.value} placeholder='Street' onChange={street.handleChange} />
            <ListingInput type='text' value={city.value} placeholder='City' onChange={city.handleChange} />
            <ListingInput type='text' value={state.value} placeholder='State' onChange={state.handleChange} />
            <ListingInput type='text' value={postcode.value} placeholder='Postcode' onChange={postcode.handleChange} />
            <ListingInput type='text' value={country.value} placeholder='Country' onChange={country.handleChange} />
          </ListingAddressInputWrapper>
        </ListingFormInputWrapper>

        {/* Number of Bathrooms */}
        <ListingFormInputWrapper label='Number of Bathrooms'>
          <ListingInput
            type='number'
            placeholder='1'
            min='0'
            required
            value={numBathrooms.value}
            onChange={numBathrooms.handleChange}
          />
        </ListingFormInputWrapper>

        {/* Bedroom Inputs */}
        <ListingFormInputWrapper label='Bedrooms'>
          <ul>
            {bedrooms.map((room, idx) => {
              const { beds } = room;
              return (
                <BedroomCard
                  key={idx}
                  beds={beds}
                  bedroomIdx={idx}
                  handleAddBedField={handleAddBedField}
                  handleChangeBedType={handleChangeBedType}
                  handleChangeBedCount={handleChangeBedCount}
                />
              )
            })}
          </ul>
          <AddBedBtn type='button' onClick={handleAddBedroom}>+ Add Bedroom</AddBedBtn>
        </ListingFormInputWrapper>

        {/* Amenities */}
        <ListingFormInputWrapper label='Amenities'>
          <CheckboxGrid>
            {Object.values(Amenity).map((amenity, idx) => {
              return (
                <CheckboxGridItem key={idx}>
                  <input
                    type='checkbox'
                    id={`amenity-${idx}`}
                    value={amenity}
                    checked={amenities.includes(amenity)}
                    onChange={(e) => {
                      handleToggleAmenity(amenity, e.currentTarget.checked);
                    }}
                  />
                  <label htmlFor={`amenity-${idx}`}>{amenity}</label>
                </CheckboxGridItem>
              )
            })}
          </CheckboxGrid>
        </ListingFormInputWrapper>

        <CreateListingBtn type='submit'>Update Listing</CreateListingBtn>
      </ListingForm>
    </MainContent>
  )
}

export default EditListingPage;
