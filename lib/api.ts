import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Users
export const userAPI = {
  create: (data: any) => api.post('/api/users', data),
  list: () => api.get('/api/users'),
  get: (id: number) => api.get(`/api/users/${id}`),
};

// Organizations
export const organizationAPI = {
  create: (data: any) => api.post('/api/organizations', data),
  list: () => api.get('/api/organizations'),
  get: (id: number) => api.get(`/api/organizations/${id}`),
};

// Plants
export const plantAPI = {
  create: (data: any) => api.post('/api/plants', data),
  list: () => api.get('/api/plants'),
  get: (id: number) => api.get(`/api/plants/${id}`),
};

// Warehouses
export const warehouseAPI = {
  create: (data: any) => api.post('/api/warehouses', data),
  list: () => api.get('/api/warehouses'),
};

// Employees
export const employeeAPI = {
  create: (data: any) => api.post('/api/employees', data),
  list: () => api.get('/api/employees'),
  get: (id: number) => api.get(`/api/employees/${id}`),
};

// Vendors
export const vendorAPI = {
  create: (data: any) => api.post('/api/vendors', data),
  list: () => api.get('/api/vendors'),
  get: (id: number) => api.get(`/api/vendors/${id}`),
};

// Raw Materials
export const rawMaterialAPI = {
  create: (data: any) => api.post('/api/raw-materials', data),
  list: () => api.get('/api/raw-materials'),
};

// Customers
export const customerAPI = {
  create: (data: any) => api.post('/api/customers', data),
  list: () => api.get('/api/customers'),
  get: (id: number) => api.get(`/api/customers/${id}`),
};

// Work Orders
export const workOrderAPI = {
  create: (data: any) => api.post('/api/work-orders', data),
  list: () => api.get('/api/work-orders'),
};

// Sales Orders
export const salesOrderAPI = {
  create: (data: any) => api.post('/api/sales-orders', data),
  list: () => api.get('/api/sales-orders'),
};

// Purchase Orders
export const purchaseOrderAPI = {
  create: (data: any) => api.post('/api/purchase-orders', data),
  list: () => api.get('/api/purchase-orders'),
};

export default api;
