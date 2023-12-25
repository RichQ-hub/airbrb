import styled, { css } from 'styled-components';

const statusIcon = css`
    font-family: Roboto;
    border-radius: 3px;
    padding: 3px 5px;
    text-align: center;
    color: black;
    font-size: 0.8em;
    font-weight: bold;
    margin-left: 10px;
`;

export const AcceptedIcon = styled.div`
    ${statusIcon}
    background-color: rgb(90, 192, 81);
`;

export const PendingIcon = styled.div`
    ${statusIcon}
    background-color: rgb(62, 93, 151);
`;

export const RejectedIcon = styled.div`
    ${statusIcon}
    background-color: rgb(240, 48, 71);
`;
