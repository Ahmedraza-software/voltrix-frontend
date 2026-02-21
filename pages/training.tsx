import { Container, Typography, Card, CardContent } from '@mui/material';
import Layout from '@/components/Layout';
import Breadcrumb from '@/components/Breadcrumb';

export default function Training() {
  return (
    <Layout title="Training">
      <Container maxWidth="lg">
        <Breadcrumb
          items={[
            { label: 'Dashboard', href: '/' },
            { label: 'Human Resources' },
            { label: 'Training' },
          ]}
          prevHref="/attendance"
          nextHref="/production-planning"
        />

        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>Training</Typography>
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
