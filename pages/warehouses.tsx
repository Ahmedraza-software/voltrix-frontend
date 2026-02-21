import { Container, Typography, Box, Card, CardContent } from '@mui/material';
import Layout from '@/components/Layout';

export default function Warehouses() {
  return (
    <Layout title="Warehouses">
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>Warehouses Management</Typography>
        <Card>
          <CardContent sx={{ py: 3 }}>
            <Typography variant="body2" sx={{ color: '#666666' }}>
              Warehouses module coming soon...
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Layout>
  );
}
