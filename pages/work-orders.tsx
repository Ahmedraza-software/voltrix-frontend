import { Container, Typography, Box, Card, CardContent } from '@mui/material';
import Layout from '@/components/Layout';
import Breadcrumb from '@/components/Breadcrumb';

export default function WorkOrders() {
  return (
    <Layout title="Work Orders">
      <Container maxWidth="lg">
        <Breadcrumb
          items={[
            { label: 'Dashboard', href: '/' },
            { label: 'Manufacturing & Production' },
            { label: 'Work Orders' },
          ]}
          prevHref="/production-planning"
          nextHref="/shop-floor-control"
        />
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>Work Orders</Typography>
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
