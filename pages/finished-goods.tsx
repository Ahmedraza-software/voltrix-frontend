import { Container, Typography, Card, CardContent } from '@mui/material';
import Layout from '@/components/Layout';
import Breadcrumb from '@/components/Breadcrumb';

export default function FinishedGoods() {
  return (
    <Layout title="Finished Goods">
      <Container maxWidth="lg">
        <Breadcrumb
          items={[
            { label: 'Dashboard', href: '/' },
            { label: 'Inventory & Warehouse' },
            { label: 'Finished Goods' },
          ]}
          prevHref="/wip-finished-goods"
          nextHref="/billing-invoicing"
        />

        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>Finished Goods</Typography>
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
