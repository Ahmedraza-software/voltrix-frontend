import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
} from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import Layout from '@/components/Layout';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    users: 0,
    employees: 0,
    vendors: 0,
    customers: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [users, employees, vendors, customers] = await Promise.all([
          api.get('/api/users'),
          api.get('/api/employees'),
          api.get('/api/vendors'),
          api.get('/api/customers'),
        ]);
        setStats({
          users: users.data.length,
          employees: employees.data.length,
          vendors: vendors.data.length,
          customers: customers.data.length,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();
  }, []);

  const menuItems = [
    { label: 'Dashboard', href: '/' },
    {
      category: 'HUMAN RESOURCES',
      items: [
        { label: 'HR & Payroll', href: '/hr-payroll' },
        { label: 'Attendance', href: '/attendance' },
        { label: 'Training', href: '/training' },
      ],
    },
    {
      category: 'MANUFACTURING & PRODUCTION',
      items: [
        { label: 'Production Planning', href: '/production-planning' },
        { label: 'Work Orders', href: '/work-orders' },
        { label: 'Shop Floor Control', href: '/shop-floor-control' },
      ],
    },
    {
      category: 'SALES & DISTRIBUTION',
      items: [
        { label: 'Dealer Management', href: '/dealer-management' },
        { label: 'Sales Orders', href: '/sales-orders' },
        { label: 'Logistics & Dispatch', href: '/logistics-dispatch' },
      ],
    },
    {
      category: 'PROCUREMENT & VENDORS',
      items: [
        { label: 'Vendor Management', href: '/vendor-management' },
        { label: 'Purchase Orders', href: '/purchase-orders' },
        { label: 'Raw Material Supply', href: '/raw-material-supply' },
      ],
    },
    {
      category: 'WARRANTY & SERVICE',
      items: [
        { label: 'Warranty Claims', href: '/warranty-claims' },
        { label: 'Repairs & Support', href: '/repairs-support' },
        { label: 'Customer Service', href: '/customer-service' },
      ],
    },
    {
      category: 'INVENTORY & WAREHOUSE',
      items: [
        { label: 'Raw Materials', href: '/raw-materials' },
        { label: 'WIP & Finished Goods', href: '/wip-finished-goods' },
        { label: 'Finished Goods', href: '/finished-goods' },
      ],
    },
    {
      category: 'FINANCE & ACCOUNTS',
      items: [
        { label: 'Billing & Invoicing', href: '/billing-invoicing' },
        { label: 'Accounts Payable', href: '/accounts-payable' },
        { label: 'Costing & P&L', href: '/costing-pl' },
      ],
    },
    {
      category: 'QUALITY MANAGEMENT',
      items: [
        { label: 'IQC / IPQC / FQC', href: '/quality-control' },
        { label: 'NCR & CAPA', href: '/ncr-capa' },
        { label: 'Testing & Compliance', href: '/testing-compliance' },
      ],
    },
    {
      category: 'COMPLIANCE, EHS & LEGAL',
      items: [
        { label: 'Safety', href: '/safety' },
        { label: 'Environmental', href: '/environmental' },
        { label: 'Regulations', href: '/regulations' },
      ],
    },
    {
      category: 'INTEGRATION & IOT',
      items: [
        { label: 'API Connectors', href: '/api-connectors' },
        { label: 'IoT Automation', href: '/iot-automation' },
        { label: 'Data Security', href: '/data-security' },
      ],
    },
    {
      category: 'ANALYTICS & DASHBOARDS',
      items: [
        { label: 'Reports', href: '/reports' },
        { label: 'KPI Analysis', href: '/kpi-analysis' },
        { label: 'BI & Insights', href: '/bi-insights' },
      ],
    },
    {
      category: 'MASTER DATA',
      items: [
        { label: 'Users', href: '/users' },
        { label: 'Employees', href: '/employees' },
        { label: 'Vendors', href: '/vendors' },
        { label: 'Customers', href: '/customers' },
        { label: 'Organizations', href: '/organizations' },
        { label: 'Plants', href: '/plants' },
        { label: 'Warehouses', href: '/warehouses' },
      ],
    },
  ];

  return (
    <Layout title="Dashboard">
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
          Dashboard
        </Typography>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ py: 2 }}>
                <Typography variant="body2" sx={{ color: '#666666', mb: 0.5 }}>
                  Total Users
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>{stats.users}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ py: 2 }}>
                <Typography variant="body2" sx={{ color: '#666666', mb: 0.5 }}>
                  Employees
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>{stats.employees}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ py: 2 }}>
                <Typography variant="body2" sx={{ color: '#666666', mb: 0.5 }}>
                  Vendors
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>{stats.vendors}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ py: 2 }}>
                <Typography variant="body2" sx={{ color: '#666666', mb: 0.5 }}>
                  Customers
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>{stats.customers}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}
