import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import MainPage from './pages/MainPage/MainPage';
import LogInPage from './pages/LogInPage';
import SignUpPage from './pages/SignUpPage';

function App() {

  return (
		<>
		<Router>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<MainPage />} />
					<Route path="login" element={<LogInPage />} />
					<Route path="signup" element={<SignUpPage />} />
				</Route>
			</Routes>
		</Router>
		</>
	);
}

export default App
