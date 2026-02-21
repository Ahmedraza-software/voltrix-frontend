import { Container, Typography, Card, CardContent } from '@mui/material';
import Layout from '@/components/Layout';
import Breadcrumb from '@/components/Breadcrumb';

export default function WIPFinishedGoods() {
  return (
    <Layout title="WIP & Finished Goods">
      <Container maxWidth="lg">
        <Breadcrumb
          items={[
            { label: 'Dashboard', href: '/' },
            { label: 'Inventory & Warehouse' },
            { label: 'WIP & Finished Goods' },
          ]}
          prevHref="/raw-materials"
          nextHref="/finished-goods"
        />

        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>WIP & Finished Goods</Typography>
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
