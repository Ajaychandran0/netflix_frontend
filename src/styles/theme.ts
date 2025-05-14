import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#E50914', // Netflix red
    },
    secondary: {
      main: '#FFFFFF',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',
        },
        body: {
          margin: 0,
          padding: 0,
          backgroundColor: '#141414',
          color: '#fff',
          overflowX: 'hidden',
          overflowY: 'auto',
        },
        '*': {
          margin: 0,
          padding: 0,
          boxSizing: 'inherit',
        },
      },
    },
  },
});

export default theme;