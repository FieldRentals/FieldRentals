import createTheme from '@mui/material/styles/createTheme';

const theme = createTheme({
  palette: {
    primary: {
      green: '#6A9C89',
      yellow: '#F6E96B',
      white: '#F5F5F5',
      black: '#323232',
      blue: '#A1ECCE'
    },
    background: {
      grey: '#E1E1E1',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    h1: {
      fontSize: '2rem',
    },
  },
});

export default theme;
