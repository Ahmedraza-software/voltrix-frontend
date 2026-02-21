import { Container, Typography, Card, CardContent, Button, Box, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack, Collapse, IconButton, useMediaQuery, useTheme } from '@mui/material';
import Layout from '@/components/Layout';
import Breadcrumb from '@/components/Breadcrumb';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

interface POItem {
  material_code: string;
  description: string;
  quantity: number;
  unit_price: number;
}

interface ApprovedPO {
  po_number: string;
  po_id: number;
  vendor_name: string;
  total_amount: number;
  created_at: string;
  items: POItem[];
}

export default function RawMaterialSupply() {
  const [approvedPOs, setApprovedPOs] = useState<ApprovedPO[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedPO, setExpandedPO] = useState<number | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    fetchApprovedPOs();
  }, []);

  const fetchApprovedPOs = async () => {
    try {
      setLoading(true);
      const poResponse = await api.get('/api/purchase-orders');
      const vendorsResponse = await api.get('/api/vendors');
      const vendorsList = vendorsResponse.data;

      // Filter approved POs and group items
      const approvedPOs = poResponse.data.filter((po: any) => po.status === 'Approved');
      
      const groupedPOs: ApprovedPO[] = approvedPOs.map((po: any) => {
        const vendor = vendorsList.find((v: any) => v.id === po.vendor_id);
        const storedItems = JSON.parse(localStorage.getItem('poItems') || '{}');
        const poItems = storedItems[po.id] || [];

        return {
          po_number: po.po_number,
          po_id: po.id,
          vendor_name: vendor?.name || 'Unknown Vendor',
          total_amount: po.total_amount,
          created_at: po.created_at,
          items: poItems,
        };
      });

      setApprovedPOs(groupedPOs);
    } catch (error) {
      console.error('Error fetching approved POs:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (poId: number) => {
    setExpandedPO(expandedPO === poId ? null : poId);
  };

  return (
    <Layout title="Raw Material Supply">
      <Container maxWidth="lg" sx={{ width: '100%', px: { xs: 1, sm: 2, md: 3 } }}>
        <Breadcrumb
          items={[
            { label: 'Dashboard', href: '/' },
            { label: 'Procurement & Vendors' },
            { label: 'Raw Material Supply' },
          ]}
          prevHref="/purchase-orders"
          nextHref="/warranty-claims"
        />

        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' } }}>Raw Material Supply - Approved POs</Typography>
        
        {loading ? (
          <Card>
            <CardContent sx={{ py: 3 }}>
              <Typography variant="body2" sx={{ color: '#666666', fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>
                Loading...
              </Typography>
            </CardContent>
          </Card>
        ) : approvedPOs.length === 0 ? (
          <Card>
            <CardContent sx={{ py: 3 }}>
              <Typography variant="body2" sx={{ color: '#666666', fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>
                No approved purchase orders found
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Box>
            {approvedPOs.map((po) => (
              <Card key={po.po_id} sx={{ mb: 1 }}>
                <CardContent sx={{ pb: 1, pt: 1, px: { xs: 1, sm: 2 }, '&:last-child': { pb: 1 } }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', flexWrap: 'wrap', gap: 1 }} onClick={() => toggleExpand(po.po_id)}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 }, flex: 1, minWidth: { xs: '100%', sm: 'auto' } }}>
                      <IconButton size="small" sx={{ p: { xs: 0.2, sm: 0.3 } }} onClick={() => toggleExpand(po.po_id)}>
                        {expandedPO === po.po_id ? <KeyboardArrowUp fontSize="small" /> : <KeyboardArrowDown fontSize="small" />}
                      </IconButton>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>{po.po_number}</Typography>
                        <Typography variant="caption" sx={{ color: '#666', fontSize: { xs: '0.6rem', sm: '0.65rem' } }}>Vendor: {po.vendor_name}</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ textAlign: 'right', minWidth: { xs: '100%', sm: 130 } }}>
                      <Typography variant="caption" sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>PKR {po.total_amount.toLocaleString()}</Typography>
                      <Typography variant="caption" sx={{ color: '#666', fontSize: { xs: '0.6rem', sm: '0.65rem' }, display: 'block' }}>
                        {po.created_at ? new Date(po.created_at).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }) : 'N/A'}
                      </Typography>
                    </Box>
                    <Box sx={{ minWidth: { xs: '100%', sm: 70 }, textAlign: { xs: 'left', sm: 'right' }, pr: { xs: 0, sm: 1 } }}>
                      <Typography variant="caption" sx={{ color: '#666', fontSize: { xs: '0.6rem', sm: '0.65rem' } }}>{po.items.length} items</Typography>
                    </Box>
                  </Box>
                </CardContent>
                <Collapse in={expandedPO === po.po_id} timeout="auto" unmountOnExit>
                  <Box sx={{ p: { xs: 0.5, sm: 1 }, backgroundColor: '#f9f9f9', borderTop: '1px solid #eee', overflowX: 'auto' }}>
                    <TableContainer>
                      <Table size="small">
                        <TableHead>
                          <TableRow sx={{ backgroundColor: '#f0f0f0' }}>
                            <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.75rem' }, py: { xs: 0.3, sm: 0.5 }, whiteSpace: 'nowrap' }}>Code</TableCell>
                            {!isMobile && <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.75rem' }, py: { xs: 0.3, sm: 0.5 }, whiteSpace: 'nowrap' }}>Description</TableCell>}
                            <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.75rem' }, py: { xs: 0.3, sm: 0.5 }, textAlign: 'right', whiteSpace: 'nowrap' }}>Qty</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.75rem' }, py: { xs: 0.3, sm: 0.5 }, textAlign: 'right', whiteSpace: 'nowrap' }}>Price</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.75rem' }, py: { xs: 0.3, sm: 0.5 }, textAlign: 'right', whiteSpace: 'nowrap' }}>Total</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {po.items.map((item, idx) => (
                            <TableRow key={idx} sx={{ '&:last-child td': { border: 0 } }}>
                              <TableCell sx={{ fontSize: { xs: '0.6rem', sm: '0.7rem' }, py: { xs: 0.3, sm: 0.5 }, whiteSpace: 'nowrap' }}>{item.material_code}</TableCell>
                              {!isMobile && <TableCell sx={{ fontSize: { xs: '0.6rem', sm: '0.7rem' }, py: { xs: 0.3, sm: 0.5 } }}>{item.description}</TableCell>}
                              <TableCell sx={{ fontSize: { xs: '0.6rem', sm: '0.7rem' }, py: { xs: 0.3, sm: 0.5 }, textAlign: 'right', whiteSpace: 'nowrap' }}>{item.quantity}</TableCell>
                              <TableCell sx={{ fontSize: { xs: '0.6rem', sm: '0.7rem' }, py: { xs: 0.3, sm: 0.5 }, textAlign: 'right', whiteSpace: 'nowrap' }}>PKR {item.unit_price.toLocaleString()}</TableCell>
                              <TableCell sx={{ fontSize: { xs: '0.6rem', sm: '0.7rem' }, py: { xs: 0.3, sm: 0.5 }, textAlign: 'right', fontWeight: 600, whiteSpace: 'nowrap' }}>PKR {(item.quantity * item.unit_price).toLocaleString()}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                </Collapse>
              </Card>
            ))}
          </Box>
        )}
      </Container>
    </Layout>
  );
}
