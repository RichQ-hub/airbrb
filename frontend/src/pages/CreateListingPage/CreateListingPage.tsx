import React, { useContext, useState } from 'react';
import { AddBedBtn, ListingAddressInputWrapper, ListingInput, MainContent, TitleMain } from '../../styles/common';
import useFormInputText from '../../hooks/useFormInputText';
import { Amenity, Bedroom } from '../../schemas/schemas';
import BedroomCard from '../../components/BedroomInputCard';
import ListingFormInputWrapper from '../../components/ListingFormInputWrapper';
import ListingsService from '../../api/ListingsService';
import { UserContext } from '../../context/UserContextProvider';
import { CheckboxGrid, CheckboxGridItem, CreateListingBtn, ListingForm } from './styles';
import FileInput from '../../components/FileInput';
import { fileToDataUrl } from '../../utils/fileToDataUrl';
import { useNavigate } from 'react-router-dom';

const CreateListingPage = () => {
  const { token } = useContext(UserContext);

  const title = useFormInputText();
  const price = useFormInputText();
  const propertyType = useFormInputText();
  const numBathrooms = useFormInputText();
  const [bedrooms, setBedrooms] = useState<Bedroom[]>([]);
  const [thumbnail, setThumbnail] = useState<File>();
  const [amenities, setAmenities] = useState<Amenity[]>([]);

  // Address Values.
  const street = useFormInputText();
  const city = useFormInputText();
  const state = useFormInputText();
  const postcode = useFormInputText();
  const country = useFormInputText();

  const navigate = useNavigate();

  // const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const fileBase64 = thumbnail ? await fileToDataUrl(thumbnail) as string : '';

      await ListingsService.createListing(token, {
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
          propertyImages: [],
        }
      })
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }

    navigate('../');
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
      <TitleMain>Create A New Listing</TitleMain>
      <ListingForm onSubmit={handleSubmit}>
        {/* Listing Name */}
        <ListingFormInputWrapper label='Name'>
          <ListingInput type='text' placeholder='Wayne Manor' required onChange={title.handleChange} />
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

        {/* Property Type */}
        <ListingFormInputWrapper label='Property Type'>
          <ListingInput type='text' placeholder='Apartment' required onChange={propertyType.handleChange} />
        </ListingFormInputWrapper>

        {/* Pricing */}
        <ListingFormInputWrapper label='Price (Per Night)'>
          <ListingInput type='number' placeholder='299.99' required min='0' step='any' onChange={price.handleChange} />
        </ListingFormInputWrapper>

        {/* Address */}
        <ListingFormInputWrapper label='Address'>
          <ListingAddressInputWrapper>
            <ListingInput type='text' placeholder='Street' onChange={street.handleChange} />
            <ListingInput type='text' placeholder='City' onChange={city.handleChange} />
            <ListingInput type='text' placeholder='State' onChange={state.handleChange} />
            <ListingInput type='text' placeholder='Postcode' onChange={postcode.handleChange} />
            <ListingInput type='text' placeholder='Country' onChange={country.handleChange} />
          </ListingAddressInputWrapper>
        </ListingFormInputWrapper>

        {/* Number of Bathrooms */}
        <ListingFormInputWrapper label='Number of Bathrooms'>
          <ListingInput type='number' placeholder='1' min='0' required onChange={numBathrooms.handleChange} />
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

        <CreateListingBtn type='submit'>Create New Listing</CreateListingBtn>
      </ListingForm>
    </MainContent>
  )
}

export default CreateListingPage;
