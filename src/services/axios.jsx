import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://mis-backend-8mrz.onrender.com',
  withCredentials: false // Set to true if using credentials
});


export default instance;
