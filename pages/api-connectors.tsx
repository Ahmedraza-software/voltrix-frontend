import { Container, Typography, Card, CardContent } from '@mui/material';
import Layout from '@/components/Layout';
import Breadcrumb from '@/components/Breadcrumb';

export default function APIConnectors() {
  return (
    <Layout title="API Connectors">
      <Container maxWidth="lg">
        <Breadcrumb
          items={[
            { label: 'Dashboard', href: '/' },
            { label: 'Integration & IoT' },
            { label: 'API Connectors' },
          ]}
          prevHref="/regulations"
          nextHref="/iot-automation"
        />

        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>API Connectors</Typography>
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
