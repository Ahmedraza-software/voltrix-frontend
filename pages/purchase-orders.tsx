import { Container, Typography, Card, CardContent, Button, Box, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, useMediaQuery, useTheme } from '@mui/material';
import { Edit, Delete, Add, Download } from '@mui/icons-material';
import Layout from '@/components/Layout';
import Breadcrumb from '@/components/Breadcrumb';
import FormDrawer from '@/components/FormDrawer';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import jsPDF from 'jspdf';

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

interface PurchaseOrderItem {
  id?: string;
  material_code: string;
  description: string;
  quantity: number;
  unit_price: number;
}

interface PurchaseOrder {
  id: number;
  po_number: string;
  vendor_id: number;
  vendor_name: string;
  total_amount: number;
  status: string;
  created_at: string;
  items?: PurchaseOrderItem[];
}

export default function PurchaseOrders() {
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    vendor_id: '',
    items: [] as PurchaseOrderItem[],
    status: 'Draft',
  });
  const [currentItem, setCurrentItem] = useState<PurchaseOrderItem>({
    id: '',
    material_code: '',
    description: '',
    quantity: 0,
    unit_price: 0,
  });
  const [viewingPO, setViewingPO] = useState<PurchaseOrder | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const loadData = async () => {
      await fetchVendors();
      await fetchPurchaseOrders();
    };
    loadData();
  }, []);

  const fetchPurchaseOrders = async () => {
    try {
      const response = await api.get('/api/purchase-orders');
      const vendorsResponse = await api.get('/api/vendors');
      const vendorsList = vendorsResponse.data;
      
      // Map vendor_id to vendor_name by looking up in vendors list
      const ordersWithVendorNames = response.data.map((po: any) => {
        const vendor = vendorsList.find((v: any) => v.id === po.vendor_id);
        return {
          ...po,
          vendor_name: vendor?.name || 'Unknown Vendor',
        };
      });
      setPurchaseOrders(ordersWithVendorNames);
      console.log('Purchase orders refreshed:', ordersWithVendorNames);
    } catch (error: any) {
      console.error('Error fetching purchase orders:', error);
      if (error.response?.status === 404) {
        console.log('No purchase orders found or endpoint not available');
      }
    }
  };

  const fetchVendors = async () => {
    try {
      const response = await api.get('/api/vendors');
      setVendors(response.data);
    } catch (error: any) {
      console.error('Error fetching vendors:', error);
      setVendors([]);
    }
  };

  const handleOpenDrawer = (po?: PurchaseOrder) => {
    if (po) {
      setEditingId(po.id);
      // Load items from localStorage when editing
      const storedItems = JSON.parse(localStorage.getItem('poItems') || '{}');
      const poItems = storedItems[po.id] || [];
      setFormData({
        vendor_id: po.vendor_id.toString(),
        items: poItems,
        status: po.status,
      });
    } else {
      setEditingId(null);
      setFormData({
        vendor_id: '',
        items: [],
        status: 'Draft',
      });
    }
    setCurrentItem({
      id: '',
      material_code: '',
      description: '',
      quantity: 0,
      unit_price: 0,
    });
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
    setEditingId(null);
  };

  const handleSave = async () => {
    try {
      if (!formData.vendor_id) {
        alert('Please select a vendor');
        return;
      }

      // Only require items when creating a new PO, not when editing
      if (!editingId && formData.items.length === 0) {
        alert('Please add at least one item');
        return;
      }

      const total_amount = formData.items.length > 0 
        ? formData.items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0)
        : 0;
      
      const data = {
        vendor_id: parseInt(formData.vendor_id),
        total_amount,
        status: formData.status,
      };

      let poId: number;
      if (editingId) {
        await api.put(`/api/purchase-orders/${editingId}`, data);
        poId = editingId;
      } else {
        const response = await api.post('/api/purchase-orders', data);
        poId = response.data.id;
      }

      // Store items in localStorage for display (only if items exist)
      if (formData.items.length > 0) {
        const poItems = {
          [poId]: formData.items,
        };
        const existingItems = JSON.parse(localStorage.getItem('poItems') || '{}');
        localStorage.setItem('poItems', JSON.stringify({ ...existingItems, ...poItems }));
      }

      // Refresh data immediately
      await fetchPurchaseOrders();
      handleCloseDrawer();
    } catch (error: any) {
      console.error('Error saving purchase order:', error);
      alert(error.response?.data?.detail || 'Error saving purchase order');
    }
  };

  const handleDelete = async (id: number) => {
    setDeleteTargetId(id);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (deleteTargetId) {
      try {
        await api.delete(`/api/purchase-orders/${deleteTargetId}`);
        fetchPurchaseOrders();
        setDeleteConfirmOpen(false);
        setDeleteTargetId(null);
      } catch (error) {
        console.error('Error deleting purchase order:', error);
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

  const handleItemInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentItem(prev => ({
      ...prev,
      [name]: name === 'quantity' || name === 'unit_price' ? parseFloat(value) : value,
    }));
  };

  const handleAddItem = () => {
    if (!currentItem.material_code || !currentItem.description || currentItem.quantity <= 0 || currentItem.unit_price <= 0) {
      alert('Please fill in all item fields with valid values');
      return;
    }
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { ...currentItem, id: Date.now().toString() }],
    }));
    setCurrentItem({
      id: '',
      material_code: '',
      description: '',
      quantity: 0,
      unit_price: 0,
    });
  };

  const handleRemoveItem = (id: string | undefined) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id),
    }));
  };

  const handleViewPO = (po: PurchaseOrder) => {
    // Load items from localStorage
    const storedItems = JSON.parse(localStorage.getItem('poItems') || '{}');
    const poItems = storedItems[po.id] || [];
    setViewingPO({ ...po, items: poItems });
  };

  const handleCloseViewPO = () => {
    setViewingPO(null);
  };

  const handleDownloadPDF = () => {
    if (!viewingPO) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let yPosition = 10;

    // Header with logo
    doc.setFontSize(16);
    doc.text('PURCHASE ORDER', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 10;

    // PO Details
    doc.setFontSize(10);
    doc.text(`PO Number: ${viewingPO.po_number}`, 10, yPosition);
    yPosition += 6;
    doc.text(`Date: ${viewingPO.created_at ? new Date(viewingPO.created_at).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }) : 'N/A'}`, 10, yPosition);
    yPosition += 6;
    doc.text(`Time: ${viewingPO.created_at ? new Date(viewingPO.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }) : 'N/A'}`, 10, yPosition);
    yPosition += 6;
    doc.text(`Status: ${viewingPO.status}`, 10, yPosition);
    yPosition += 10;

    // Vendor Details
    doc.setFontSize(10);
    doc.text('VENDOR:', 10, yPosition);
    yPosition += 6;
    doc.text(viewingPO.vendor_name, 10, yPosition);
    yPosition += 10;

    // Items Table
    const tableData: any[] = [];
    if (viewingPO.items && viewingPO.items.length > 0) {
      viewingPO.items.forEach((item) => {
        tableData.push([
          item.material_code,
          item.description,
          item.quantity.toString(),
          `PKR ${item.unit_price.toLocaleString()}`,
          `PKR ${(item.quantity * item.unit_price).toLocaleString()}`,
        ]);
      });
    }

    // Add table
    (doc as any).autoTable({
      head: [['Code', 'Description', 'Qty', 'Unit Price', 'Total']],
      body: tableData,
      startY: yPosition,
      margin: 10,
      theme: 'grid',
      headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0], fontStyle: 'bold' },
      bodyStyles: { textColor: [0, 0, 0] },
      columnStyles: {
        2: { halign: 'right' },
        3: { halign: 'right' },
        4: { halign: 'right' },
      },
    });

    // Get final Y position after table
    yPosition = (doc as any).lastAutoTable.finalY + 10;

    // Total
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.text(`TOTAL: PKR ${viewingPO.total_amount.toLocaleString()}`, pageWidth - 10, yPosition, { align: 'right' });

    // Footer
    doc.setFontSize(8);
    doc.setFont(undefined, 'normal');
    doc.text(`Generated on ${new Date().toLocaleString()}`, pageWidth / 2, pageHeight - 10, { align: 'center' });

    // Download
    doc.save(`PO-${viewingPO.po_number}.pdf`);
  };

  return (
    <Layout title="Purchase Orders" drawerOpen={openDrawer}>
      <Container maxWidth="lg" sx={{ width: '100%', px: { xs: 1, sm: 2, md: 3 } }}>
        <Breadcrumb
          items={[
            { label: 'Dashboard', href: '/' },
            { label: 'Procurement & Vendors' },
            { label: 'Purchase Orders' },
          ]}
          prevHref="/vendor-management"
          nextHref="/raw-material-supply"
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 2 }}>
          <Button variant="contained" size="small" startIcon={<Add />} onClick={() => handleOpenDrawer()} sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' }, py: { xs: 0.4, sm: 0.5 }, px: { xs: 1, sm: 1.5 } }}>
            Add PO
          </Button>
        </Box>

        <Card sx={{ border: 'none', boxShadow: 'none', overflowX: 'auto' }}>
          <CardContent sx={{ p: { xs: 0.5, sm: 1, md: 2 } }}>
            <TableContainer component={Paper} sx={{ border: 'none', boxShadow: 'none', overflowX: 'auto' }}>
              <Table size={isMobile ? 'small' : 'medium'}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#fafafa' }}>
                    <TableCell sx={{ fontWeight: 400, color: '#333333', fontSize: { xs: '0.65rem', sm: '0.75rem', md: '0.8rem' }, border: 'none', py: { xs: 0.5, sm: 1 }, whiteSpace: 'nowrap' }}>PO Number</TableCell>
                    {!isMobile && <TableCell sx={{ fontWeight: 400, color: '#333333', fontSize: { xs: '0.65rem', sm: '0.75rem', md: '0.8rem' }, border: 'none', py: { xs: 0.5, sm: 1 }, whiteSpace: 'nowrap' }}>Vendor</TableCell>}
                    <TableCell sx={{ fontWeight: 400, color: '#333333', fontSize: { xs: '0.65rem', sm: '0.75rem', md: '0.8rem' }, border: 'none', py: { xs: 0.5, sm: 1 }, whiteSpace: 'nowrap' }}>Amount</TableCell>
                    {!isMobile && <TableCell sx={{ fontWeight: 400, color: '#333333', fontSize: { xs: '0.65rem', sm: '0.75rem', md: '0.8rem' }, border: 'none', py: { xs: 0.5, sm: 1 }, whiteSpace: 'nowrap' }}>Date</TableCell>}
                    <TableCell sx={{ fontWeight: 400, color: '#333333', fontSize: { xs: '0.65rem', sm: '0.75rem', md: '0.8rem' }, border: 'none', py: { xs: 0.5, sm: 1 }, whiteSpace: 'nowrap' }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 400, color: '#333333', fontSize: { xs: '0.65rem', sm: '0.75rem', md: '0.8rem' }, border: 'none', py: { xs: 0.5, sm: 1 }, whiteSpace: 'nowrap' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {purchaseOrders.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={isMobile ? 4 : 6} sx={{ textAlign: 'center', py: 3, color: '#999999', fontSize: { xs: '0.65rem', sm: '0.75rem' }, border: 'none' }}>
                        No purchase orders found
                      </TableCell>
                    </TableRow>
                  ) : (
                    purchaseOrders.map((po) => (
                      <TableRow key={po.id} sx={{ '&:hover': { backgroundColor: '#fafafa' } }}>
                        <TableCell sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem', md: '0.8rem' }, border: 'none', color: '#333333', py: { xs: 0.5, sm: 1 }, whiteSpace: 'nowrap' }}>{po.po_number}</TableCell>
                        {!isMobile && <TableCell sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem', md: '0.8rem' }, border: 'none', color: '#333333', py: { xs: 0.5, sm: 1 }, whiteSpace: 'nowrap' }}>{po.vendor_name}</TableCell>}
                        <TableCell sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem', md: '0.8rem' }, border: 'none', color: '#333333', py: { xs: 0.5, sm: 1 }, whiteSpace: 'nowrap' }}>PKR {po.total_amount.toLocaleString()}</TableCell>
                        {!isMobile && <TableCell sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem', md: '0.8rem' }, border: 'none', color: '#333333', py: { xs: 0.5, sm: 1 }, whiteSpace: 'nowrap' }}>
                          {new Date(po.created_at).toLocaleDateString()}
                        </TableCell>}
                        <TableCell sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem', md: '0.8rem' }, border: 'none', py: { xs: 0.5, sm: 1 } }}>
                          <Box sx={{ display: 'inline-block', px: { xs: 0.5, sm: 1 }, py: { xs: 0.25, sm: 0.5 }, backgroundColor: po.status === 'Approved' ? '#f0f7f0' : po.status === 'Draft' ? '#fff3e0' : '#fef0f0', borderRadius: '3px', color: po.status === 'Approved' ? '#2e7d32' : po.status === 'Draft' ? '#f57c00' : '#c62828', fontSize: { xs: '0.6rem', sm: '0.7rem' }, fontWeight: 500, whiteSpace: 'nowrap' }}>
                            {po.status}
                          </Box>
                        </TableCell>
                        <TableCell sx={{ py: { xs: 0.5, sm: 1 } }}>
                          <Stack direction="row" spacing={{ xs: 0.25, sm: 0.5 }}>
                            <Button size="small" variant="outlined" onClick={() => handleViewPO(po)} sx={{ fontSize: { xs: '0.55rem', sm: '0.65rem' }, textTransform: 'none', borderColor: '#e0e0e0', color: '#333333', py: { xs: 0.2, sm: 0.3 }, px: { xs: 0.4, sm: 0.8 }, minWidth: 'auto' }}>
                              View
                            </Button>
                            <Button size="small" variant="outlined" startIcon={isMobile ? undefined : <Edit />} onClick={() => handleOpenDrawer(po)} sx={{ fontSize: { xs: '0.55rem', sm: '0.65rem' }, textTransform: 'none', borderColor: '#e0e0e0', color: '#333333', py: { xs: 0.2, sm: 0.3 }, px: { xs: 0.4, sm: 0.8 }, minWidth: 'auto' }}>
                              {isMobile ? 'E' : 'Edit'}
                            </Button>
                            <Button size="small" variant="outlined" color="error" startIcon={isMobile ? undefined : <Delete />} onClick={() => handleDelete(po.id)} sx={{ fontSize: { xs: '0.55rem', sm: '0.65rem' }, textTransform: 'none', borderColor: '#e0e0e0', py: { xs: 0.2, sm: 0.3 }, px: { xs: 0.4, sm: 0.8 }, minWidth: 'auto' }}>
                              {isMobile ? 'D' : 'Delete'}
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

        <FormDrawer open={openDrawer} onClose={handleCloseDrawer} title="Purchase Order" onSave={handleSave} isEditing={editingId !== null}>
          <Stack spacing={2}>
            <TextField
              label="Vendor"
              name="vendor_id"
              select
              value={formData.vendor_id}
              onChange={handleInputChange}
              fullWidth
              size="small"
              required
            >
              {vendors.map((vendor) => (
                <MenuItem key={vendor.id} value={vendor.id}>
                  {vendor.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Status"
              name="status"
              select
              value={formData.status}
              onChange={handleInputChange}
              fullWidth
              size="small"
            >
              <MenuItem value="Draft">Draft</MenuItem>
              <MenuItem value="Approved">Approved</MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
            </TextField>

            <Box sx={{ mt: 3, mb: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>Add Items</Typography>
              <Stack spacing={2}>
                <TextField
                  label="Material Code"
                  name="material_code"
                  value={currentItem.material_code}
                  onChange={handleItemInputChange}
                  fullWidth
                  size="small"
                  placeholder="e.g., MAT-001"
                />
                <TextField
                  label="Description"
                  name="description"
                  value={currentItem.description}
                  onChange={handleItemInputChange}
                  fullWidth
                  size="small"
                  placeholder="Item description"
                />
                <TextField
                  label="Quantity"
                  name="quantity"
                  type="number"
                  value={currentItem.quantity}
                  onChange={handleItemInputChange}
                  fullWidth
                  size="small"
                  inputProps={{ step: '0.01' }}
                />
                <TextField
                  label="Unit Price"
                  name="unit_price"
                  type="number"
                  value={currentItem.unit_price}
                  onChange={handleItemInputChange}
                  fullWidth
                  size="small"
                  inputProps={{ step: '0.01' }}
                />
                <Button variant="outlined" onClick={handleAddItem} fullWidth>
                  Add Item
                </Button>
              </Stack>
            </Box>

            {formData.items.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Items Added</Typography>
                <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableCell sx={{ fontSize: '0.75rem', fontWeight: 600 }}>Code</TableCell>
                        <TableCell sx={{ fontSize: '0.75rem', fontWeight: 600 }}>Description</TableCell>
                        <TableCell sx={{ fontSize: '0.75rem', fontWeight: 600 }}>Qty</TableCell>
                        <TableCell sx={{ fontSize: '0.75rem', fontWeight: 600 }}>Unit Price</TableCell>
                        <TableCell sx={{ fontSize: '0.75rem', fontWeight: 600 }}>Total</TableCell>
                        <TableCell sx={{ fontSize: '0.75rem', fontWeight: 600 }}>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {formData.items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell sx={{ fontSize: '0.75rem' }}>{item.material_code}</TableCell>
                          <TableCell sx={{ fontSize: '0.75rem' }}>{item.description}</TableCell>
                          <TableCell sx={{ fontSize: '0.75rem' }}>{item.quantity}</TableCell>
                          <TableCell sx={{ fontSize: '0.75rem' }}>PKR {item.unit_price.toLocaleString()}</TableCell>
                          <TableCell sx={{ fontSize: '0.75rem' }}>PKR {(item.quantity * item.unit_price).toLocaleString()}</TableCell>
                          <TableCell sx={{ fontSize: '0.75rem' }}>
                            <Button size="small" color="error" onClick={() => handleRemoveItem(item.id)}>
                              Remove
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow sx={{ backgroundColor: '#f9f9f9', fontWeight: 600 }}>
                        <TableCell colSpan={4} sx={{ fontSize: '0.75rem', fontWeight: 600, textAlign: 'right' }}>Total Amount:</TableCell>
                        <TableCell sx={{ fontSize: '0.75rem', fontWeight: 600 }}>PKR {formData.items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0).toLocaleString()}</TableCell>
                        <TableCell />
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}
          </Stack>
        </FormDrawer>

        {/* PO Receipt View Dialog */}
        <Dialog open={!!viewingPO} onClose={handleCloseViewPO} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontWeight: 600, fontSize: '1.1rem', textAlign: 'center', pb: 1 }}>
          </DialogTitle>
          <DialogContent sx={{ pt: 2 }}>
            {viewingPO && (
              <Box sx={{ fontFamily: 'monospace', fontSize: '0.85rem', lineHeight: 1.8 }}>
                {/* Header */}
                <Box sx={{ textAlign: 'center', mb: 2, pb: 2, borderBottom: '2px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                  <Box sx={{ width: 80, height: 80 }}>
                    <img src="/logo-white.png" alt="ERP Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>PURCHASE ORDER</Typography>
                  </Box>
                </Box>

                {/* PO Details */}
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>PO Number:</Typography>
                    <Typography variant="body2">{viewingPO.po_number}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>Date:</Typography>
                    <Typography variant="body2">
                      {viewingPO.created_at ? (() => {
                        try {
                          const date = new Date(viewingPO.created_at);
                          if (isNaN(date.getTime())) return 'N/A';
                          return date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
                        } catch {
                          return 'N/A';
                        }
                      })() : 'N/A'}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>Time:</Typography>
                    <Typography variant="body2">
                      {viewingPO.created_at ? (() => {
                        try {
                          const date = new Date(viewingPO.created_at);
                          if (isNaN(date.getTime())) return 'N/A';
                          return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
                        } catch {
                          return 'N/A';
                        }
                      })() : 'N/A'}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5, alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>Status:</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: viewingPO.status === 'Approved' ? '#2e7d32' : viewingPO.status === 'Draft' ? '#f57c00' : '#c62828' }}>
                      {viewingPO.status}
                    </Typography>
                  </Box>
                </Box>

                {/* Vendor Details */}
                <Box sx={{ mb: 2, pb: 2, borderBottom: '1px solid #ddd' }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>VENDOR:</Typography>
                  <Typography variant="body2">{viewingPO.vendor_name}</Typography>
                </Box>

                {/* Items Table */}
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 2fr 0.8fr 1fr 1fr', gap: 1, mb: 1, pb: 1, borderBottom: '1px solid #333', fontWeight: 600 }}>
                    <Typography variant="caption">Code</Typography>
                    <Typography variant="caption">Description</Typography>
                    <Typography variant="caption" sx={{ textAlign: 'right' }}>Qty</Typography>
                    <Typography variant="caption" sx={{ textAlign: 'right' }}>Unit Price</Typography>
                    <Typography variant="caption" sx={{ textAlign: 'right' }}>Total</Typography>
                  </Box>
                  {viewingPO.items && viewingPO.items.length > 0 ? (
                    viewingPO.items.map((item, idx) => (
                      <Box key={idx} sx={{ display: 'grid', gridTemplateColumns: '1fr 2fr 0.8fr 1fr 1fr', gap: 1, mb: 0.5, fontSize: '0.8rem' }}>
                        <Typography variant="caption">{item.material_code}</Typography>
                        <Typography variant="caption">{item.description}</Typography>
                        <Typography variant="caption" sx={{ textAlign: 'right' }}>{item.quantity}</Typography>
                        <Typography variant="caption" sx={{ textAlign: 'right' }}>PKR {item.unit_price.toLocaleString()}</Typography>
                        <Typography variant="caption" sx={{ textAlign: 'right' }}>PKR {(item.quantity * item.unit_price).toLocaleString()}</Typography>
                      </Box>
                    ))
                  ) : (
                    <Typography variant="caption" sx={{ color: '#999' }}>No items found</Typography>
                  )}
                </Box>

                {/* Total */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2, pb: 2, borderTop: '2px solid #333', borderBottom: '2px solid #333', pt: 1 }}>
                  <Box sx={{ width: '50%' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.95rem' }}>
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>TOTAL:</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>PKR {viewingPO.total_amount.toLocaleString()}</Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Footer */}
                <Box sx={{ textAlign: 'center', mt: 2, pt: 2, borderTop: '1px solid #ddd', fontSize: '0.75rem', color: '#666' }}>
                  <Typography variant="caption" sx={{ display: 'block' }}>Generated on {new Date().toLocaleString()}</Typography>
                </Box>
              </Box>
            )}
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={handleCloseViewPO} variant="outlined">Close</Button>
            <Button onClick={handleDownloadPDF} variant="contained" startIcon={<Download />}>
              Download PDF
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)} maxWidth="xs" fullWidth>
          <DialogTitle sx={{ fontWeight: 600, color: '#d32f2f' }}>Delete Purchase Order</DialogTitle>
          <DialogContent sx={{ pt: 2 }}>
            <Typography>Are you sure you want to delete this purchase order? This action cannot be undone.</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
            <Button onClick={confirmDelete} variant="contained" color="error">Delete</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Layout>
  );
}
