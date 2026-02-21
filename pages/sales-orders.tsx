import { Container, Typography, Box, Card, CardContent } from '@mui/material';
import Layout from '@/components/Layout';

export default function SalesOrders() {
  return (
    <Layout title="Sales Orders">
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>Sales Orders Management</Typography>
        <Card>
          <CardContent sx={{ py: 3 }}>
            <Typography variant="body2" sx={{ color: '#666666' }}>
              Sales Orders module coming soon...
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Layout>
  );
}
