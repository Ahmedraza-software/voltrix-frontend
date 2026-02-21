import { Container, Typography, Card, CardContent } from '@mui/material';
import Layout from '@/components/Layout';
import Breadcrumb from '@/components/Breadcrumb';

export default function DealerManagement() {
  return (
    <Layout title="Dealer Management">
      <Container maxWidth="lg">
        <Breadcrumb
          items={[
            { label: 'Dashboard', href: '/' },
            { label: 'Sales & Distribution' },
            { label: 'Dealer Management' },
          ]}
          prevHref="/shop-floor-control"
          nextHref="/sales-orders"
        />

        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>Dealer Management</Typography>
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
