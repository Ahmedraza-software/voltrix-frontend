import { Drawer, Box, Typography, Button, Stack } from '@mui/material';

interface FormDrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  onSave: () => void;
  isEditing: boolean;
  children: React.ReactNode;
}

export default function FormDrawer({ open, onClose, title, onSave, isEditing, children }: FormDrawerProps) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiBackdrop-root': {
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
        },
        '& .MuiDrawer-paper': {
          width: 400,
          boxShadow: 'none',
          borderLeft: '1px solid #e0e0e0',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        },
      }}
    >
      <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
        <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '0.95rem' }}>
          {isEditing ? `Edit ${title}` : `Add New ${title}`}
        </Typography>
      </Box>

      <Box sx={{ p: 2, overflowY: 'auto', height: 'calc(100vh - 140px)' }}>
        {children}
      </Box>

      <Box sx={{ p: 2, borderTop: '1px solid #e0e0e0', display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
        <Button onClick={onClose} variant="outlined" sx={{ fontSize: '0.8rem', textTransform: 'none' }}>
          Cancel
        </Button>
        <Button onClick={onSave} variant="contained" sx={{ fontSize: '0.8rem', textTransform: 'none' }}>
          {isEditing ? 'Update' : 'Create'}
        </Button>
      </Box>
    </Drawer>
  );
}
