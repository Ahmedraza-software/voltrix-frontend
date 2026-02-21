import { Container, Typography, Card, CardContent } from '@mui/material';
import Layout from '@/components/Layout';
import Breadcrumb from '@/components/Breadcrumb';

export default function CostingPL() {
  return (
    <Layout title="Costing & P&L">
      <Container maxWidth="lg">
        <Breadcrumb
          items={[
            { label: 'Dashboard', href: '/' },
            { label: 'Finance & Accounts' },
            { label: 'Costing & P&L' },
          ]}
          prevHref="/accounts-payable"
          nextHref="/quality-control"
        />

        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>Costing & P&L</Typography>
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
