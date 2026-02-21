import { Container, Typography, Card, CardContent } from '@mui/material';
import Layout from '@/components/Layout';
import Breadcrumb from '@/components/Breadcrumb';

export default function ProductionPlanning() {
  return (
    <Layout title="Production Planning">
      <Container maxWidth="lg">
        <Breadcrumb
          items={[
            { label: 'Dashboard', href: '/' },
            { label: 'Manufacturing & Production' },
            { label: 'Production Planning' },
          ]}
          prevHref="/training"
          nextHref="/work-orders"
        />

        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>Production Planning</Typography>
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
