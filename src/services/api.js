import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000',
  headers: { 
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

API.interceptors.response.use(
  response => response.data,
  error => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Products
export const fetchProducts = (page = 1, limit = 10) => 
  API.get(`/products?_page=${page}&_limit=${limit}&_sort=id&_order=desc`);

export const fetchProductById = (id) => API.get(`/products/${id}`);

export const fetchProductsCount = () => API.get('/products').then(data => data.length || 0);

// Users
export const loginUser = (email, password) =>
  API.get(`/users?email=${email}&password=${password}`).then(data => data[0] || null);

export const registerUser = (userData) =>
  API.post('/users', userData);

export const updateUser = (userId, userData) =>
  API.patch(`/users/${userId}`, userData);

// Orders
export const fetchOrdersByUser = (userId) => 
  API.get(`/orders?userId=${userId}&_sort=date&_order=desc`);

export const createOrder = (orderData) => 
  API.post('/orders', orderData);

export const updateOrder = (orderId, updates) => 
  API.patch(`/orders/${orderId}`, updates);

export const deleteOrder = (orderId) => 
  API.delete(`/orders/${orderId}`);

export const getOrderById = (orderId) =>
  API.get(`/orders/${orderId}`);

export default API;