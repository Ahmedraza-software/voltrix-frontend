import { Container, Typography, Card, CardContent } from '@mui/material';
import Layout from '@/components/Layout';
import Breadcrumb from '@/components/Breadcrumb';

export default function KPIAnalysis() {
  return (
    <Layout title="KPI Analysis">
      <Container maxWidth="lg">
        <Breadcrumb
          items={[
            { label: 'Dashboard', href: '/' },
            { label: 'Analytics & Dashboards' },
            { label: 'KPI Analysis' },
          ]}
          prevHref="/reports"
          nextHref="/bi-insights"
        />

        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>KPI Analysis</Typography>
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
