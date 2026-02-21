import { Container, Typography, Card, CardContent } from '@mui/material';
import Layout from '@/components/Layout';
import Breadcrumb from '@/components/Breadcrumb';

export default function Safety() {
  return (
    <Layout title="Safety">
      <Container maxWidth="lg">
        <Breadcrumb
          items={[
            { label: 'Dashboard', href: '/' },
            { label: 'Compliance, EHS & Legal' },
            { label: 'Safety' },
          ]}
          prevHref="/regulations"
          nextHref="/environmental"
        />

        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>Safety</Typography>
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
