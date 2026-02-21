import { Container, Typography, Card, CardContent } from '@mui/material';
import Layout from '@/components/Layout';
import Breadcrumb from '@/components/Breadcrumb';

export default function NCRCAPA() {
  return (
    <Layout title="NCR & CAPA">
      <Container maxWidth="lg">
        <Breadcrumb
          items={[
            { label: 'Dashboard', href: '/' },
            { label: 'Quality Management' },
            { label: 'NCR & CAPA' },
          ]}
          prevHref="/quality-control"
          nextHref="/testing-compliance"
        />

        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>NCR & CAPA</Typography>
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
