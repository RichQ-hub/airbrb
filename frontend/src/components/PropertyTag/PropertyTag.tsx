import React, { ReactNode } from 'react';
import { BulletPoint, StyledPropertyTag } from './styles';

interface PropertyTagProps {
    children: ReactNode;
}

const PropertyTag = (props: PropertyTagProps) => {
  const { children } = props;
  return (
    <StyledPropertyTag>
      <BulletPoint>&#11044;</BulletPoint>
      {children}
    </StyledPropertyTag>
  )
}

export default PropertyTag;
