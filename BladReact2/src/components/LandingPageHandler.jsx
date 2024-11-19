import MainPage from '../pages/MainPage/MainPage';
import Home from '../pages/LoggedIn/Home/Home';

const LandingPageHandler = () => {
  const token = localStorage.getItem('token');
  
  return token ? <Home /> : <MainPage />;
};

export default LandingPageHandler; 