import { Container, Typography, Card, CardContent } from '@mui/material';
import Layout from '@/components/Layout';
import Breadcrumb from '@/components/Breadcrumb';

export default function RawMaterials() {
  return (
    <Layout title="Raw Materials">
      <Container maxWidth="lg">
        <Breadcrumb
          items={[
            { label: 'Dashboard', href: '/' },
            { label: 'Inventory & Warehouse' },
            { label: 'Raw Materials' },
          ]}
          prevHref="/purchase-orders"
          nextHref="/wip-finished-goods"
        />

        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>Raw Materials</Typography>
        <Card>
          <CardContent sx={{ py: 3 }}>
            <Typography variant="body2" sx={{ color: '#666666' }}>
              Coming soon...
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Layout>
  );
}
