import { Container, Typography, Box, Card, CardContent } from '@mui/material';
import Layout from '@/components/Layout';

export default function Organizations() {
  return (
    <Layout title="Organizations">
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>Organizations Management</Typography>
        <Card>
          <CardContent sx={{ py: 3 }}>
            <Typography variant="body2" sx={{ color: '#666666' }}>
              Organizations module coming soon...
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Layout>
  );
}
