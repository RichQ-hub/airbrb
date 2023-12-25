import { styled } from 'styled-components';
import { FontRajdhani } from '../../styles/common'

export const PubishedListingCard = styled.div`
    cursor: pointer;
    font-family: Roboto;
    display: flex;
    background-color: rgb(5, 14, 27, 0.9);
    border-radius: 5px;
    padding: 20px;
    margin-bottom: 20px;
    line-height: 1.7em;
    &:hover {
        outline: 1px solid #fff;
    }

    @media (max-width: 500px) {
        flex-direction: column;
    }
`;

export const ListingTitle = styled.h2`
    ${FontRajdhani}
    color: rgb(254, 118, 41);
`;

export const ListingThumbnail = styled.img`
    width: 30%;
    border-radius: 5px;
    margin-right: 20px;
    @media (max-width: 500px) {
        width: 100%;
    }
`;

export const ListingInfoDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const ListingAddress = styled.div`
    font-weight: lighter;
`;

export const ListingPrice = styled.div`
    font-weight: 700;
    text-decoration: underline;
    color: #77C6FF;
`;

export const ListingReviews = styled.div`
    display: flex;
    margin-bottom: 30px;
`;

export const TotalReviews = styled.div`
    font-weight: lighter;
    font-style: italic;
    font-size: 0.9em;
    margin-left: 10px;
`;

export const StatusDiv = styled.div`
    display: flex;
    line-height: normal
`;
