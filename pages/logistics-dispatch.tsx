import { Container, Typography, Card, CardContent } from '@mui/material';
import Layout from '@/components/Layout';
import Breadcrumb from '@/components/Breadcrumb';

export default function LogisticsDispatch() {
  return (
    <Layout title="Logistics & Dispatch">
      <Container maxWidth="lg">
        <Breadcrumb
          items={[
            { label: 'Dashboard', href: '/' },
            { label: 'Sales & Distribution' },
            { label: 'Logistics & Dispatch' },
          ]}
          prevHref="/sales-orders"
          nextHref="/vendor-management"
        />

        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>Logistics & Dispatch</Typography>
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
