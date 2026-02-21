import type { AppProps } from 'next/app';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Loader from '@/components/Loader';
import '../styles/globals.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#333333',
    },
    secondary: {
      main: '#333333',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
    divider: '#e0e0e0',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  typography: {
    fontFamily: "'Inter', 'Segoe UI', 'Helvetica Neue', sans-serif",
    h1: {
      fontSize: 'clamp(1.25rem, 5vw, 1.5rem)',
      fontWeight: 600,
    },
    h2: {
      fontSize: 'clamp(1.1rem, 4vw, 1.25rem)',
      fontWeight: 600,
    },
    h3: {
      fontSize: 'clamp(1rem, 3vw, 1.1rem)',
      fontWeight: 600,
    },
    h4: {
      fontSize: 'clamp(0.95rem, 2.5vw, 1rem)',
      fontWeight: 600,
    },
    h5: {
      fontSize: 'clamp(0.9rem, 2vw, 0.95rem)',
      fontWeight: 600,
    },
    h6: {
      fontSize: 'clamp(0.85rem, 1.5vw, 0.9rem)',
      fontWeight: 600,
    },
    body1: {
      fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)',
    },
    body2: {
      fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)',
    },
    caption: {
      fontSize: 'clamp(0.65rem, 1vw, 0.75rem)',
    },
    button: {
      fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)',
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: '1px solid #e0e0e0',
          boxShadow: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: '1px solid #e0e0e0',
          boxShadow: 'none',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#333333',
          border: 'none',
          boxShadow: 'none',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          border: '1px solid #e0e0e0',
          boxShadow: 'none',
          backgroundColor: '#ffffff',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)',
        },
        contained: {
          backgroundColor: '#333333',
          color: '#ffffff',
          border: 'none',
          '&:hover': {
            backgroundColor: '#555555',
            borderColor: '#333333',
          },
        },
        outlined: {
          borderColor: '#e0e0e0',
          color: '#333333',
          border: '1px solid #e0e0e0',
          '&:hover': {
            backgroundColor: '#f5f5f5',
            borderColor: '#e0e0e0',
          },
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          border: '1px solid #e0e0e0',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: '#e0e0e0',
          fontSize: 'clamp(0.65rem, 1vw, 0.8rem)',
          padding: 'clamp(0.5rem, 1vw, 1rem)',
        },
        head: {
          fontWeight: 600,
          backgroundColor: '#f5f5f5',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          border: '1px solid #e0e0e0',
          boxShadow: 'none',
          margin: 'auto',
          maxWidth: '90vw',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#e0e0e0',
            },
            '&:hover fieldset': {
              borderColor: '#333333',
            },
          },
          '& .MuiInputBase-input': {
            fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)',
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: 'transparent !important',
          },
          '&.Mui-selected:hover': {
            backgroundColor: '#f5f5f5 !important',
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: 'clamp(0.5rem, 2vw, 2rem)',
          paddingRight: 'clamp(0.5rem, 2vw, 2rem)',
        },
      },
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isLoading && <Loader />}
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
