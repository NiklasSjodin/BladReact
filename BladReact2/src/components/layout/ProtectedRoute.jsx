import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  // Om token saknas, omdirigera till inloggningssidan
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Om token finns, rendera barnkomponenten (den skyddade sidan)
  return children;
};

export default ProtectedRoute;
