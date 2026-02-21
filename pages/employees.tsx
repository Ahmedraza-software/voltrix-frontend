import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Stack,
  Alert,
  Typography,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { employeeAPI } from '@/lib/api';
import Layout from '@/components/Layout';

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    emp_id: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    department: '',
    designation: '',
    date_of_joining: '',
    salary: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await employeeAPI.list();
      setEmployees(response.data);
    } catch (error) {
      setMessage('Failed to fetch employees');
    }
    setLoading(false);
  };

  const handleAddEmployee = async () => {
    try {
      const payload = {
        ...formData,
        salary: parseFloat(formData.salary),
        date_of_joining: new Date(formData.date_of_joining).toISOString(),
      };
      await employeeAPI.create(payload);
      setMessage('Employee created successfully');
      setOpenDialog(false);
      setFormData({
        emp_id: '',
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        department: '',
        designation: '',
        date_of_joining: '',
        salary: '',
      });
      fetchEmployees();
    } catch (error) {
      setMessage('Failed to create employee');
    }
  };

  return (
    <Layout title="Employees">
      <Container maxWidth="lg">
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" sx={{ margin: 0, fontWeight: 600 }}>Employees Management</Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setOpenDialog(true)}
          >
            Add Employee
          </Button>
        </Box>

        {message && (
          <Alert severity={message.includes('Failed') ? 'error' : 'success'} sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}

        <TableContainer 
          component={Paper} 
          className="custom-scrollbar" 
          sx={{ 
            overflowX: 'auto',
            '&::-webkit-scrollbar': {
              height: '3px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#f0f0f0',
              borderRadius: '2px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#e0e0e0',
            },
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell sx={{ fontWeight: 600 }}>Employee ID</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Department</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Designation</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((emp: any) => (
                <TableRow key={emp.id}>
                  <TableCell>{emp.emp_id}</TableCell>
                  <TableCell>{`${emp.first_name} ${emp.last_name}`}</TableCell>
                  <TableCell>{emp.email}</TableCell>
                  <TableCell>{emp.department}</TableCell>
                  <TableCell>{emp.designation}</TableCell>
                  <TableCell>{emp.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontWeight: 600 }}>Add New Employee</DialogTitle>
          <DialogContent sx={{ pt: 2 }}>
            <Stack spacing={2}>
              <TextField
                label="Employee ID"
                fullWidth
                size="small"
                value={formData.emp_id}
                onChange={(e) => setFormData({ ...formData, emp_id: e.target.value })}
              />
              <TextField
                label="First Name"
                fullWidth
                size="small"
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
              />
              <TextField
                label="Last Name"
                fullWidth
                size="small"
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
              />
              <TextField
                label="Email"
                type="email"
                fullWidth
                size="small"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <TextField
                label="Phone"
                fullWidth
                size="small"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              <TextField
                label="Department"
                fullWidth
                size="small"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              />
              <TextField
                label="Designation"
                fullWidth
                size="small"
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
              />
              <TextField
                label="Date of Joining"
                type="date"
                fullWidth
                size="small"
                InputLabelProps={{ shrink: true }}
                value={formData.date_of_joining}
                onChange={(e) => setFormData({ ...formData, date_of_joining: e.target.value })}
              />
              <TextField
                label="Salary"
                type="number"
                fullWidth
                size="small"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={handleAddEmployee} variant="contained">
              Create Employee
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Layout>
  );
}
