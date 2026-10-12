import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0b0b0d',
      paper: '#161619',
    },
    text: {
      primary: '#f7f7f8',
      secondary: '#a8a8b3',
    },
    primary: {
      main: '#E50914', // Netflix red
    },
    secondary: {
      main: '#FFFFFF',
    },
    divider: 'rgba(255,255,255,0.12)',
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
        '@keyframes pulse': {
          '0%, 100%': { opacity: 0.45, transform: 'translateX(-20%)' },
          '50%': { opacity: 1, transform: 'translateX(45%)' },
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
