import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import MainPage from './pages/MainPage/MainPage';
import LogInPage from './pages/LogInPage';
import SignUpPage from './pages/SignUpPage';
import FAQPage from './pages/FAQpage';
import PrivacyPolicy from './pages/PrivacyPage';
import ContactUs from './pages/ContactUsPage';
import TermsOfService from './pages/TermsOfServicePage';
import Home from './pages/LoggedIn/Home';
import ProtectedRoute from './components/layout/ProtectedRoute';
import UserProfile from './pages/LoggedIn/UserProfile';
import UserProfileSettings from './pages/LoggedIn/UserProfileEditSettings';
import Support from './pages/LoggedIn/Support';
import Clubs from './pages/LoggedIn/Clubs';

import Library from './pages/LoggedIn/LibraryPage/Library';
import LibraryBookList from './pages/LoggedIn/LibraryPage/LibraryBookList';

const App = () => {
	return (
		<>
			<Router>
				<Routes>
					<Route path='/' element={<Layout />}>
						<Route index element={<MainPage />} />
						<Route path='login' element={<LogInPage />} />
						<Route path='signup' element={<SignUpPage />} />
						<Route path='faq' element={<FAQPage />} />
						<Route path='privacy' element={<PrivacyPolicy />} />
						<Route path='termsofservice' element={<TermsOfService />} />
						<Route path='contact' element={<ContactUs />} />
						<Route path='account' element={<UserProfile />} />
						<Route path='settings' element={<UserProfileSettings />} />
						<Route path='support' element={<Support />} />
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
									<Clubs />
								</ProtectedRoute>
							}
						/>
						<Route
							path='explore'
							element={<ProtectedRoute>{/* <Explore /> */}</ProtectedRoute>}
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
							element={<ProtectedRoute>{/* <Account /> */}</ProtectedRoute>}
						/>
						<Route
							path='booklist'
							element={
								<ProtectedRoute>
									<Library />
								</ProtectedRoute>
							}
						/>
						<Route
							path='booklist/:id'
							element={
								<ProtectedRoute>
									<LibraryBookList />
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
