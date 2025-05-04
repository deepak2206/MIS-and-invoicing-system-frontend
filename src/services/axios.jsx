import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://mis-backend-8mrz.onrender.com'
});


export default instance;
