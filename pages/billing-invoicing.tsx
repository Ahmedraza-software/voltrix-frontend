import { Container, Typography, Card, CardContent } from '@mui/material';
import Layout from '@/components/Layout';
import Breadcrumb from '@/components/Breadcrumb';

export default function BillingInvoicing() {
  return (
    <Layout title="Billing & Invoicing">
      <Container maxWidth="lg">
        <Breadcrumb
          items={[
            { label: 'Dashboard', href: '/' },
            { label: 'Finance & Accounts' },
            { label: 'Billing & Invoicing' },
          ]}
          prevHref="/finished-goods"
          nextHref="/accounts-payable"
        />

        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>Billing & Invoicing</Typography>
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
