import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000', // JSON Server URL
  headers: { 'Content-Type': 'application/json' }
});

// -------------------- PRODUCTS --------------------
export const fetchProducts = (page = 1, limit = 10) => 
  API.get(`/products?_page=${page}&_limit=${limit}&_sort=id&_order=desc`);

export const fetchProductById = (id) => API.get(`/products/${id}`);

// Get total count of products for pagination
export const fetchProductsCount = () => API.get('/products').then(res => res.data.length);

// -------------------- USERS --------------------
export const loginUser = (email, password) =>
  API.get(`/users?email=${email}&password=${password}`);

export const registerUser = (userData) =>
  API.post('/users', userData);

export const updateUser = (userId, userData) =>
  API.patch(`/users/${userId}`, userData);

export default API;