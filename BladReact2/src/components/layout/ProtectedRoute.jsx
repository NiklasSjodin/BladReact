import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const location = useLocation();

  if (!token) {
    // If not authenticated, redirect to root where LandingPageHandler will show MainPage
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
