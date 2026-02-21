import { Container, Typography, Card, CardContent } from '@mui/material';
import Layout from '@/components/Layout';
import Breadcrumb from '@/components/Breadcrumb';

export default function CustomerService() {
  return (
    <Layout title="Customer Service">
      <Container maxWidth="lg">
        <Breadcrumb
          items={[
            { label: 'Dashboard', href: '/' },
            { label: 'Warranty & Service' },
            { label: 'Customer Service' },
          ]}
          prevHref="/repairs-support"
          nextHref="/raw-materials"
        />

        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>Customer Service</Typography>
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
