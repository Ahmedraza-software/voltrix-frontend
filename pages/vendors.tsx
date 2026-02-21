import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Stack,
  Alert,
  Typography,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { vendorAPI } from '@/lib/api';
import Layout from '@/components/Layout';

export default function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    vendor_id: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const response = await vendorAPI.list();
      setVendors(response.data);
    } catch (error: any) {
      setMessage('Failed to fetch vendors');
      console.error('Fetch error:', error);
    }
  };

  const handleAddVendor = async () => {
    try {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.phone) {
        setMessage('Please fill in all required fields (Name, Email, Phone)');
        return;
      }

      // Auto-generate vendor_id if not provided
      const vendorData = {
        ...formData,
        vendor_id: formData.vendor_id || `VND-${Date.now()}`,
      };

      await vendorAPI.create(vendorData);
      setMessage('Vendor created successfully');
      setOpenDialog(false);
      setFormData({ vendor_id: '', name: '', email: '', phone: '', address: '', city: '' });
      fetchVendors();
    } catch (error: any) {
      setMessage(error.response?.data?.detail || 'Failed to create vendor');
    }
  };

  return (
    <Layout title="Vendors">
      <Container maxWidth="lg">
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" sx={{ margin: 0, fontWeight: 600 }}>Vendors Management</Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setOpenDialog(true)}
          >
            Add Vendor
          </Button>
        </Box>

        {message && (
          <Alert severity={message.includes('Failed') ? 'error' : 'success'} sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell sx={{ fontWeight: 600 }}>Vendor ID</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Phone</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>City</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vendors.map((vendor: any) => (
                <TableRow key={vendor.id}>
                  <TableCell>{vendor.vendor_id}</TableCell>
                  <TableCell>{vendor.name}</TableCell>
                  <TableCell>{vendor.email}</TableCell>
                  <TableCell>{vendor.phone}</TableCell>
                  <TableCell>{vendor.city}</TableCell>
                  <TableCell>{vendor.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontWeight: 600 }}>Add New Vendor</DialogTitle>
          <DialogContent sx={{ pt: 2 }}>
            <Stack spacing={2}>
              <TextField label="Vendor ID (Optional)" fullWidth size="small" value={formData.vendor_id} onChange={(e) => setFormData({ ...formData, vendor_id: e.target.value })} placeholder="Auto-generated if empty" />
              <TextField label="Name" fullWidth size="small" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              <TextField label="Email" type="email" fullWidth size="small" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              <TextField label="Phone" fullWidth size="small" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
              <TextField label="Address" fullWidth multiline rows={2} size="small" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
              <TextField label="City" fullWidth size="small" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={handleAddVendor} variant="contained">Create Vendor</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Layout>
  );
}
