import { Container, Typography, Card, CardContent } from '@mui/material';
import Layout from '@/components/Layout';
import Breadcrumb from '@/components/Breadcrumb';

export default function DataSecurity() {
  return (
    <Layout title="Data Security">
      <Container maxWidth="lg">
        <Breadcrumb
          items={[
            { label: 'Dashboard', href: '/' },
            { label: 'Integration & IoT' },
            { label: 'Data Security' },
          ]}
          prevHref="/iot-automation"
          nextHref="/reports"
        />

        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>Data Security</Typography>
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
