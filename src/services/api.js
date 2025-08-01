import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000' // JSON Server URL
});

// Products
export const fetchProducts = () => API.get('/products');
export const fetchProductById = (id) => API.get(`/products/${id}`);

// Users
export const loginUser = (email, password) => 
  API.get(`/users?email=${email}&password=${password}`);

export const registerUser = (userData) => API.post('/users', userData);

export default API;