import { Container, Typography, Card, CardContent } from '@mui/material';
import Layout from '@/components/Layout';
import Breadcrumb from '@/components/Breadcrumb';

export default function TestingCompliance() {
  return (
    <Layout title="Testing & Compliance">
      <Container maxWidth="lg">
        <Breadcrumb
          items={[
            { label: 'Dashboard', href: '/' },
            { label: 'Quality Management' },
            { label: 'Testing & Compliance' },
          ]}
          prevHref="/ncr-capa"
          nextHref="/safety"
        />

        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>Testing & Compliance</Typography>
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
