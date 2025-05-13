import { AuthProvider } from 'react-admin';

const API_URL = 'http://localhost:3001/api';

const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    // now goes to port 3001
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // backend expects { username, password }
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      throw new Error('Invalid credentials');
    }
    const { token } = await response.json();
    localStorage.setItem('token', token);
  },
  logout: () => {
    localStorage.removeItem('token');
    return Promise.resolve();
  },
  checkError: ({ status }) =>
    status === 401 ? Promise.reject() : Promise.resolve(),
  checkAuth: () =>
    localStorage.getItem('token') ? Promise.resolve() : Promise.reject(),
  getPermissions: () => Promise.resolve(),
};

export default authProvider;
