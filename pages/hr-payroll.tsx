import { Container, Typography, Card, CardContent, Button, Box, Grid, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack, MenuItem } from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import Layout from '@/components/Layout';
import Breadcrumb from '@/components/Breadcrumb';
import FormDrawer from '@/components/FormDrawer';
import { useEffect, useState } from 'react';
import api from '@/lib/api';

interface Employee {
  id: number;
  emp_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  date_of_joining: string;
  salary: number;
  status: string;
}

export default function HRPayroll() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    emp_id: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    department: '',
    designation: '',
    date_of_joining: '',
    salary: 0,
    status: 'Active',
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await api.get('/api/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const generateEmployeeId = () => {
    const nextId = employees.length + 1;
    return `EMP-${String(nextId).padStart(4, '0')}`;
  };

  const handleOpenDrawer = (employee?: Employee) => {
    if (employee) {
      setEditingId(employee.id);
      setFormData({
        emp_id: employee.emp_id,
        first_name: employee.first_name,
        last_name: employee.last_name,
        email: employee.email,
        phone: employee.phone,
        department: employee.department,
        designation: employee.designation,
        date_of_joining: employee.date_of_joining,
        salary: employee.salary,
        status: employee.status,
      });
    } else {
      setEditingId(null);
      setFormData({
        emp_id: generateEmployeeId(),
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        department: '',
        designation: '',
        date_of_joining: '',
        salary: 0,
        status: 'Active',
      });
    }
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
    setEditingId(null);
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        await api.put(`/api/employees/${editingId}`, formData);
      } else {
        await api.post('/api/employees', formData);
      }
      fetchEmployees();
      handleCloseDrawer();
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this employee?')) {
      try {
        await api.delete(`/api/employees/${id}`);
        fetchEmployees();
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'salary' ? parseFloat(value) : value,
    }));
  };

  return (
    <Layout title="HR & Payroll" drawerOpen={openDrawer}>
      <Container maxWidth="lg">
        <Breadcrumb
          items={[
            { label: 'Dashboard', href: '/' },
            { label: 'Human Resources' },
            { label: 'HR & Payroll' },
          ]}
          prevHref="/"
          nextHref="/attendance"
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 2 }}>
          <Button variant="contained" size="small" startIcon={<Add />} onClick={() => handleOpenDrawer()} sx={{ fontSize: '0.75rem', py: 0.5, px: 1.5 }}>
            Add Employee
          </Button>
        </Box>

        <Card sx={{ border: 'none', boxShadow: 'none' }}>
          <CardContent sx={{ p: 0 }}>
            <TableContainer component={Paper} sx={{ border: 'none', boxShadow: 'none' }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#fafafa' }}>
                    <TableCell sx={{ fontWeight: 400, color: '#333333', fontSize: '0.8rem', border: 'none', py: 1 }}>Employee ID</TableCell>
                    <TableCell sx={{ fontWeight: 400, color: '#333333', fontSize: '0.8rem', border: 'none', py: 1 }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 400, color: '#333333', fontSize: '0.8rem', border: 'none', py: 1 }}>Email</TableCell>
                    <TableCell sx={{ fontWeight: 400, color: '#333333', fontSize: '0.8rem', border: 'none', py: 1 }}>Department</TableCell>
                    <TableCell sx={{ fontWeight: 400, color: '#333333', fontSize: '0.8rem', border: 'none', py: 1 }}>Designation</TableCell>
                    <TableCell sx={{ fontWeight: 400, color: '#333333', fontSize: '0.8rem', border: 'none', py: 1 }}>Salary</TableCell>
                    <TableCell sx={{ fontWeight: 400, color: '#333333', fontSize: '0.8rem', border: 'none', py: 1 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 400, color: '#333333', fontSize: '0.8rem', border: 'none', py: 1 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employees.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} sx={{ textAlign: 'center', py: 3, color: '#999999', fontSize: '0.8rem', border: 'none' }}>
                        No employees found
                      </TableCell>
                    </TableRow>
                  ) : (
                    employees.map((employee, index) => (
                      <TableRow key={employee.id} sx={{ '&:hover': { backgroundColor: '#fafafa' } }}>
                        <TableCell sx={{ fontSize: '0.8rem', border: 'none', color: '#333333', py: 1 }}>{employee.emp_id}</TableCell>
                        <TableCell sx={{ fontSize: '0.8rem', border: 'none', color: '#333333', py: 1 }}>{employee.first_name} {employee.last_name}</TableCell>
                        <TableCell sx={{ fontSize: '0.8rem', border: 'none', color: '#333333', py: 1 }}>{employee.email}</TableCell>
                        <TableCell sx={{ fontSize: '0.8rem', border: 'none', color: '#333333', py: 1 }}>{employee.department}</TableCell>
                        <TableCell sx={{ fontSize: '0.8rem', border: 'none', color: '#333333', py: 1 }}>{employee.designation}</TableCell>
                        <TableCell sx={{ fontSize: '0.8rem', border: 'none', color: '#333333', py: 1 }}>PKR {employee.salary.toLocaleString()}</TableCell>
                        <TableCell sx={{ fontSize: '0.8rem', border: 'none', py: 1 }}>
                          <Box sx={{ display: 'inline-block', px: 1, py: 0.5, backgroundColor: employee.status === 'Active' ? '#f0f7f0' : '#fef0f0', borderRadius: '3px', color: employee.status === 'Active' ? '#2e7d32' : '#c62828', fontSize: '0.75rem', fontWeight: 500 }}>
                            {employee.status}
                          </Box>
                        </TableCell>
                        <TableCell sx={{ py: 1 }}>
                          <Stack direction="row" spacing={0.5}>
                            <Button size="small" variant="outlined" startIcon={<Edit />} onClick={() => handleOpenDrawer(employee)} sx={{ fontSize: '0.65rem', textTransform: 'none', borderColor: '#e0e0e0', color: '#333333', py: 0.3, px: 0.8 }}>
                              Edit
                            </Button>
                            <Button size="small" variant="outlined" color="error" startIcon={<Delete />} onClick={() => handleDelete(employee.id)} sx={{ fontSize: '0.65rem', textTransform: 'none', borderColor: '#e0e0e0', py: 0.3, px: 0.8 }}>
                              Delete
                            </Button>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        <FormDrawer open={openDrawer} onClose={handleCloseDrawer} title="Employee" onSave={handleSave} isEditing={editingId !== null}>
          <Stack spacing={2}>
            <TextField
              label="Employee ID"
              name="emp_id"
              value={formData.emp_id}
              onChange={handleInputChange}
              fullWidth
              size="small"
            />
            <TextField
              label="First Name"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              fullWidth
              size="small"
            />
            <TextField
              label="Last Name"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              fullWidth
              size="small"
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              size="small"
            />
            <TextField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              fullWidth
              size="small"
            />
            <TextField
              label="Department"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              fullWidth
              size="small"
            />
            <TextField
              label="Designation"
              name="designation"
              value={formData.designation}
              onChange={handleInputChange}
              fullWidth
              size="small"
            />
            <TextField
              label="Date of Joining"
              name="date_of_joining"
              type="date"
              value={formData.date_of_joining}
              onChange={handleInputChange}
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Salary"
              name="salary"
              type="number"
              value={formData.salary}
              onChange={handleInputChange}
              fullWidth
              size="small"
            />
            <TextField
              label="Status"
              name="status"
              select
              value={formData.status}
              onChange={handleInputChange}
              fullWidth
              size="small"
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
              <MenuItem value="On Leave">On Leave</MenuItem>
            </TextField>
          </Stack>
        </FormDrawer>
      </Container>
    </Layout>
  );
}
