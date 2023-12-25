import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --primary-orange: #FE7629;
    --primary-brand-color: #FF385C;
    --listing-card-bg: rgba(5, 14, 27, 0.90);
    --star-rating-color: #F4C72A;
    --create-color: #98FB5C;
    --file-upload-btn: #47cdf8;
    --file-upload-card: #3c82c4;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    /* The default font family is Roboto. */
    font-family: Roboto, sans-serif;
    font-weight: 400;
    color: white;
  }

  a {
    text-decoration: none;
  }

  li {
    list-style: none;
  }

  button {
    cursor: pointer;
    border: none;
  }
`

export default GlobalStyles;
