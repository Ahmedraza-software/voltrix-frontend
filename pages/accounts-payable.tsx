import { Container, Typography, Card, CardContent } from '@mui/material';
import Layout from '@/components/Layout';
import Breadcrumb from '@/components/Breadcrumb';

export default function AccountsPayable() {
  return (
    <Layout title="Accounts Payable">
      <Container maxWidth="lg">
        <Breadcrumb
          items={[
            { label: 'Dashboard', href: '/' },
            { label: 'Finance & Accounts' },
            { label: 'Accounts Payable' },
          ]}
          prevHref="/billing-invoicing"
          nextHref="/costing-pl"
        />

        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>Accounts Payable</Typography>
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
