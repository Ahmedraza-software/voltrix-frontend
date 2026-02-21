import { Container, Typography, Card, CardContent } from '@mui/material';
import Layout from '@/components/Layout';
import Breadcrumb from '@/components/Breadcrumb';

export default function ShopFloorControl() {
  return (
    <Layout title="Shop Floor Control">
      <Container maxWidth="lg">
        <Breadcrumb
          items={[
            { label: 'Dashboard', href: '/' },
            { label: 'Manufacturing & Production' },
            { label: 'Shop Floor Control' },
          ]}
          prevHref="/work-orders"
          nextHref="/dealer-management"
        />

        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>Shop Floor Control</Typography>
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
