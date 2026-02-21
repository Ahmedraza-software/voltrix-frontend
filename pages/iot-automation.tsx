import { Container, Typography, Card, CardContent } from '@mui/material';
import Layout from '@/components/Layout';
import Breadcrumb from '@/components/Breadcrumb';

export default function IoTAutomation() {
  return (
    <Layout title="IoT Automation">
      <Container maxWidth="lg">
        <Breadcrumb
          items={[
            { label: 'Dashboard', href: '/' },
            { label: 'Integration & IoT' },
            { label: 'IoT Automation' },
          ]}
          prevHref="/api-connectors"
          nextHref="/data-security"
        />

        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>IoT Automation</Typography>
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
