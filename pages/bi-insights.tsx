import { Container, Typography, Card, CardContent } from '@mui/material';
import Layout from '@/components/Layout';
import Breadcrumb from '@/components/Breadcrumb';

export default function BIInsights() {
  return (
    <Layout title="BI & Insights">
      <Container maxWidth="lg">
        <Breadcrumb
          items={[
            { label: 'Dashboard', href: '/' },
            { label: 'Analytics & Dashboards' },
            { label: 'BI & Insights' },
          ]}
          prevHref="/kpi-analysis"
          nextHref="/users"
        />

        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>BI & Insights</Typography>
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
