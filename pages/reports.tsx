import { Container, Typography, Card, CardContent } from '@mui/material';
import Layout from '@/components/Layout';
import Breadcrumb from '@/components/Breadcrumb';

export default function Reports() {
  return (
    <Layout title="Reports">
      <Container maxWidth="lg">
        <Breadcrumb
          items={[
            { label: 'Dashboard', href: '/' },
            { label: 'Analytics & Dashboards' },
            { label: 'Reports' },
          ]}
          prevHref="/data-security"
          nextHref="/kpi-analysis"
        />

        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>Reports</Typography>
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
