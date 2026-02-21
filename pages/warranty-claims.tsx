import { Container, Typography, Card, CardContent } from '@mui/material';
import Layout from '@/components/Layout';
import Breadcrumb from '@/components/Breadcrumb';

export default function WarrantyClaims() {
  return (
    <Layout title="Warranty Claims">
      <Container maxWidth="lg">
        <Breadcrumb
          items={[
            { label: 'Dashboard', href: '/' },
            { label: 'Warranty & Service' },
            { label: 'Warranty Claims' },
          ]}
          prevHref="/raw-material-supply"
          nextHref="/repairs-support"
        />

        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>Warranty Claims</Typography>
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
