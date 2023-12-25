import React from 'react';
import Routes from './Routes';
import UserContextProvider from './context/UserContextProvider';
import GlobalStyles from './GlobalStyles';

import './App.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function App () {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <UserContextProvider>
        <GlobalStyles />
        <Routes />
      </UserContextProvider>
    </LocalizationProvider>
  );
}

export default App;
