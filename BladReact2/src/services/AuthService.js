export const createAuthService = () => {
  const getToken = () => localStorage.getItem('token');

  const isAuthenticated = () => getToken() !== null;

  const login = async (credentials) => {
    try {
      const response = await fetch('https://localhost:7076/api/accounts/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(credentials)
      });

      if (!response.ok) {
        return false;
      }

      const data = await response.json();

      if (data.success && data.token) {
        localStorage.setItem('token', data.token);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return { getToken, isAuthenticated, login, logout };
};