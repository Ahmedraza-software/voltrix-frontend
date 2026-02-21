import { Container, Typography, Card, CardContent, Button, Box, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack, MenuItem, useMediaQuery, useTheme } from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import Layout from '@/components/Layout';
import Breadcrumb from '@/components/Breadcrumb';
import FormDrawer from '@/components/FormDrawer';
import { useEffect, useState } from 'react';
import api from '@/lib/api';

interface Vendor {
  id: number;
  vendor_id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  rating: number;
  status: string;
}

export default function VendorManagement() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    vendor_id: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
  });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const response = await api.get('/api/vendors');
      setVendors(response.data);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    }
  };

  const generateVendorId = () => {
    const nextId = vendors.length + 1;
    return `VEN-${String(nextId).padStart(4, '0')}`;
  };

  const handleOpenDrawer = (vendor?: Vendor) => {
    if (vendor) {
      setEditingId(vendor.id);
      setFormData({
        vendor_id: vendor.vendor_id,
        name: vendor.vendor_name,
        email: vendor.email,
        phone: vendor.phone,
        address: vendor.address,
        city: vendor.city,
      });
    } else {
      setEditingId(null);
      setFormData({
        vendor_id: generateVendorId(),
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
      });
    }
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
    setEditingId(null);
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        await api.put(`/api/vendors/${editingId}`, formData);
      } else {
        await api.post('/api/vendors', formData);
      }
      fetchVendors();
      handleCloseDrawer();
    } catch (error: any) {
      console.error('Error saving vendor:', error);
      alert(error.response?.data?.detail || 'Error saving vendor');
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this vendor?')) {
      try {
        await api.delete(`/api/vendors/${id}`);
        fetchVendors();
      } catch (error) {
        console.error('Error deleting vendor:', error);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Layout title="Vendor Management" drawerOpen={openDrawer}>
      <Container maxWidth="lg">
        <Breadcrumb
          items={[
            { label: 'Dashboard', href: '/' },
            { label: 'Procurement & Vendors' },
            { label: 'Vendor Management' },
          ]}
          prevHref="/"
          nextHref="/purchase-orders"
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 2 }}>
          <Button variant="contained" size="small" startIcon={<Add />} onClick={() => handleOpenDrawer()} sx={{ fontSize: '0.75rem', py: 0.5, px: 1.5 }}>
            Add Vendor
          </Button>
        </Box>

        <Card sx={{ border: 'none', boxShadow: 'none' }}>
          <CardContent sx={{ p: 0 }}>
            <TableContainer component={Paper} sx={{ border: 'none', boxShadow: 'none' }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#fafafa' }}>
                    <TableCell sx={{ fontWeight: 400, color: '#333333', fontSize: '0.8rem', border: 'none', py: 1 }}>Vendor ID</TableCell>
                    <TableCell sx={{ fontWeight: 400, color: '#333333', fontSize: '0.8rem', border: 'none', py: 1 }}>Vendor Name</TableCell>
                    <TableCell sx={{ fontWeight: 400, color: '#333333', fontSize: '0.8rem', border: 'none', py: 1 }}>Email</TableCell>
                    <TableCell sx={{ fontWeight: 400, color: '#333333', fontSize: '0.8rem', border: 'none', py: 1 }}>Phone</TableCell>
                    <TableCell sx={{ fontWeight: 400, color: '#333333', fontSize: '0.8rem', border: 'none', py: 1 }}>City</TableCell>
                    <TableCell sx={{ fontWeight: 400, color: '#333333', fontSize: '0.8rem', border: 'none', py: 1 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 400, color: '#333333', fontSize: '0.8rem', border: 'none', py: 1 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {vendors.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} sx={{ textAlign: 'center', py: 3, color: '#999999', fontSize: '0.8rem', border: 'none' }}>
                        No vendors found
                      </TableCell>
                    </TableRow>
                  ) : (
                    vendors.map((vendor) => (
                      <TableRow key={vendor.id} sx={{ '&:hover': { backgroundColor: '#fafafa' } }}>
                        <TableCell sx={{ fontSize: '0.8rem', border: 'none', color: '#333333', py: 1 }}>{vendor.vendor_id}</TableCell>
                        <TableCell sx={{ fontSize: '0.8rem', border: 'none', color: '#333333', py: 1 }}>{vendor.name}</TableCell>
                        <TableCell sx={{ fontSize: '0.8rem', border: 'none', color: '#333333', py: 1 }}>{vendor.email}</TableCell>
                        <TableCell sx={{ fontSize: '0.8rem', border: 'none', color: '#333333', py: 1 }}>{vendor.phone}</TableCell>
                        <TableCell sx={{ fontSize: '0.8rem', border: 'none', color: '#333333', py: 1 }}>{vendor.city}</TableCell>
                        <TableCell sx={{ fontSize: '0.8rem', border: 'none', py: 1 }}>
                          <Box sx={{ display: 'inline-block', px: 1, py: 0.5, backgroundColor: vendor.status === 'Active' ? '#f0f7f0' : '#fef0f0', borderRadius: '3px', color: vendor.status === 'Active' ? '#2e7d32' : '#c62828', fontSize: '0.75rem', fontWeight: 500 }}>
                            {vendor.status}
                          </Box>
                        </TableCell>
                        <TableCell sx={{ py: 1 }}>
                          <Stack direction="row" spacing={0.5}>
                            <Button size="small" variant="outlined" startIcon={<Edit />} onClick={() => handleOpenDrawer(vendor)} sx={{ fontSize: '0.65rem', textTransform: 'none', borderColor: '#e0e0e0', color: '#333333', py: 0.3, px: 0.8 }}>
                              Edit
                            </Button>
                            <Button size="small" variant="outlined" color="error" startIcon={<Delete />} onClick={() => handleDelete(vendor.id)} sx={{ fontSize: '0.65rem', textTransform: 'none', borderColor: '#e0e0e0', py: 0.3, px: 0.8 }}>
                              Delete
                            </Button>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        <FormDrawer open={openDrawer} onClose={handleCloseDrawer} title="Vendor" onSave={handleSave} isEditing={editingId !== null}>
          <Stack spacing={2}>
            <TextField
              label="Vendor ID"
              name="vendor_id"
              value={formData.vendor_id}
              onChange={handleInputChange}
              fullWidth
              size="small"
              disabled
            />
            <TextField
              label="Vendor Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              size="small"
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              size="small"
            />
            <TextField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              fullWidth
              size="small"
            />
            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              fullWidth
              size="small"
            />
            <TextField
              label="City"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              fullWidth
              size="small"
            />
          </Stack>
        </FormDrawer>
      </Container>
    </Layout>
  );
}
