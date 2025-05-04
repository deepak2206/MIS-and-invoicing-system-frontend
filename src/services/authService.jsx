import axios from './axios';

export const register = (userData) => axios.post('/api/auth/register', userData);

// export const login = (userData) => axios.post('/api/auth/login', userData);


export const login = async (userData) => {
  try {
    const res = await axios.post('/api/auth/login', userData);
    return res;
  } catch (err) {
    console.error('Login error:', err.response);
    throw err;
  }
};
