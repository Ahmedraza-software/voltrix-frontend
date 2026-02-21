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
import { customerAPI } from '@/lib/api';
import Layout from '@/components/Layout';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    customer_id: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    credit_limit: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await customerAPI.list();
      setCustomers(response.data);
    } catch (error) {
      setMessage('Failed to fetch customers');
    }
  };

  const handleAddCustomer = async () => {
    try {
      await customerAPI.create({
        ...formData,
        credit_limit: parseFloat(formData.credit_limit),
      });
      setMessage('Customer created successfully');
      setOpenDialog(false);
      setFormData({ customer_id: '', name: '', email: '', phone: '', address: '', credit_limit: '' });
      fetchCustomers();
    } catch (error) {
      setMessage('Failed to create customer');
    }
  };

  return (
    <Layout title="Customers">
      <Container maxWidth="lg">
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" sx={{ margin: 0, fontWeight: 600 }}>Customers Management</Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setOpenDialog(true)}
          >
            Add Customer
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
                <TableCell sx={{ fontWeight: 600 }}>Customer ID</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Phone</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Credit Limit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((customer: any) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.customer_id}</TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>${customer.credit_limit.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontWeight: 600 }}>Add New Customer</DialogTitle>
          <DialogContent sx={{ pt: 2 }}>
            <Stack spacing={2}>
              <TextField label="Customer ID" fullWidth size="small" value={formData.customer_id} onChange={(e) => setFormData({ ...formData, customer_id: e.target.value })} />
              <TextField label="Name" fullWidth size="small" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              <TextField label="Email" type="email" fullWidth size="small" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              <TextField label="Phone" fullWidth size="small" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
              <TextField label="Address" fullWidth multiline rows={2} size="small" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
              <TextField label="Credit Limit" type="number" fullWidth size="small" value={formData.credit_limit} onChange={(e) => setFormData({ ...formData, credit_limit: e.target.value })} />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={handleAddCustomer} variant="contained">Create Customer</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Layout>
  );
}
