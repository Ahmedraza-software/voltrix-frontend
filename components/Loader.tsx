import { Box, CircularProgress } from '@mui/material';

export default function Loader() {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        zIndex: 9999,
      }}
    >
      <CircularProgress
        sx={{
          color: '#333333',
        }}
      />
    </Box>
  );
}
