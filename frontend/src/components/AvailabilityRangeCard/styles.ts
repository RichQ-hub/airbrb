import styled from 'styled-components'
import { FlexAlignCentre, FontRajdhani } from '../../styles/common'

export const DateRangeItem = styled.li`
  ${FlexAlignCentre}
  padding: 0.6rem 2rem;
  justify-content: space-between;
  border-bottom: 1px solid #5794CC;
`

export const DateContainer = styled.div`
  ${FlexAlignCentre}
  flex-direction: column;

  h3 {
    ${FontRajdhani}
    color: #6DB5F7;
    font-size: 0%.8rem;
  }

  p {
    font-size: 1rem;
  }
`
