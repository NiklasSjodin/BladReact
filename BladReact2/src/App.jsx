import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import MainPage from './pages/MainPage/MainPage';
import LogInPage from './pages/LogInPage';
import SignUpPage from './pages/SignUpPage';
import Home from './pages/LoggedIn/Home';
import ProtectedRoute from './components/layout/ProtectedRoute';
import Library from './pages/LoggedIn/Library';

const App = () => {
	return (
		<>
			<Router>
				<Routes>
					<Route path='/' element={<Layout />}>
						<Route index element={<MainPage />} />
						<Route path='login' element={<LogInPage />} />
						<Route path='signup' element={<SignUpPage />} />
						{/* Skyddad rutt för Home-sidan */}
						<Route
							path='home'
							element={
								<ProtectedRoute>
									<Home />
								</ProtectedRoute>
							}
						/>
						<Route
							path='clubs'
							element={
								<ProtectedRoute>
									{/* <Clubs /> */}
								</ProtectedRoute>
							}
						/>
						<Route
							path='explore'
							element={
								<ProtectedRoute>
									{/* <Explore /> */}
								</ProtectedRoute>
							}
						/>
						<Route
							path='library'
							element={
								<ProtectedRoute>
									<Library />
								</ProtectedRoute>
							}
						/>
						<Route
							path='account'
							element={
								<ProtectedRoute>
									{/* <Account /> */}
								</ProtectedRoute>
							}
						/>
					</Route>
				</Routes>
			</Router>
		</>
	);
};

export default App;
