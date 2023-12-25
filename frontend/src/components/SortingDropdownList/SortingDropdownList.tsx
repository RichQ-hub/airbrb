import React, { useState } from 'react';
import { DropdownList, DropdownListContainer, SortingLabel, SortingOption } from './styles';

interface SortListingsProps {
    sortListings: (sortingOption: string) => void
}

const SortingDropdownList = (props: SortListingsProps) => {
  const [option, setOption] = useState('');

  const handleSorting = (sortingOption: string) => {
    console.log(sortingOption);
    setOption(sortingOption);
    props.sortListings(sortingOption);
  }

  return (
    <DropdownListContainer variant='filled'>
        <SortingLabel>Sort By Review Ratings</SortingLabel>
        <DropdownList variant='outlined' sx={{ color: 'white' }} value={option} onChange={(e) => handleSorting(e.target.value as string)}>
            <SortingOption value={'Highest to Lowest'}>Highest to Lowest</SortingOption>
            <SortingOption value={'Lowest to Highest'}>Lowest to Highest</SortingOption>
        </DropdownList>
    </DropdownListContainer>
  )
}

export default SortingDropdownList;
