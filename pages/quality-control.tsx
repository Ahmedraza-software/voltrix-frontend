import { Container, Typography, Card, CardContent } from '@mui/material';
import Layout from '@/components/Layout';
import Breadcrumb from '@/components/Breadcrumb';

export default function QualityControl() {
  return (
    <Layout title="IQC / IPQC / FQC">
      <Container maxWidth="lg">
        <Breadcrumb
          items={[
            { label: 'Dashboard', href: '/' },
            { label: 'Quality Management' },
            { label: 'IQC / IPQC / FQC' },
          ]}
          prevHref="/costing-pl"
          nextHref="/ncr-capa"
        />

        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>IQC / IPQC / FQC</Typography>
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
