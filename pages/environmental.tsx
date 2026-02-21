import { Container, Typography, Card, CardContent } from '@mui/material';
import Layout from '@/components/Layout';
import Breadcrumb from '@/components/Breadcrumb';

export default function Environmental() {
  return (
    <Layout title="Environmental">
      <Container maxWidth="lg">
        <Breadcrumb
          items={[
            { label: 'Dashboard', href: '/' },
            { label: 'Compliance, EHS & Legal' },
            { label: 'Environmental' },
          ]}
          prevHref="/safety"
          nextHref="/regulations"
        />

        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>Environmental</Typography>
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
