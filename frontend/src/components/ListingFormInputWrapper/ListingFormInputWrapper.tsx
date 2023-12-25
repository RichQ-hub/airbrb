import React, { ReactNode } from 'react'
import { ListingFormInputStyled } from './styles';

interface ListingFormInputWrapperProps {
  label: string;
  children: ReactNode;
}

const ListingFormInputWrapper = (props: ListingFormInputWrapperProps) => {
  const { label, children } = props;

  return (
    <ListingFormInputStyled>
      <h2>{label}</h2>
      {children}
    </ListingFormInputStyled>
  )
}

export default ListingFormInputWrapper;
