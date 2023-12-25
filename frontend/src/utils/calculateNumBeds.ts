import { Bedroom } from '../schemas/schemas';

export const calculateNumBeds = (bedrooms: Bedroom[]) => {
  const numBeds = bedrooms.reduce((acc1, bedroom) => {
    return acc1 + bedroom.beds.reduce((acc2, bed) => {
      return bed.count + acc2;
    }, 0)
  }, 0)
  return numBeds;
}
