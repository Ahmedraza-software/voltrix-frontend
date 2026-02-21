import { Container, Typography, Card, CardContent } from '@mui/material';
import Layout from '@/components/Layout';
import Breadcrumb from '@/components/Breadcrumb';

export default function RepairsSupport() {
  return (
    <Layout title="Repairs & Support">
      <Container maxWidth="lg">
        <Breadcrumb
          items={[
            { label: 'Dashboard', href: '/' },
            { label: 'Warranty & Service' },
            { label: 'Repairs & Support' },
          ]}
          prevHref="/warranty-claims"
          nextHref="/customer-service"
        />

        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>Repairs & Support</Typography>
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
