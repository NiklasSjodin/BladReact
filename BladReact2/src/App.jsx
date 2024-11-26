import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Layout from './components/layout/Layout';
import MainPage from './pages/MainPage/MainPage';
import LogInPage from './pages/LogInPage';
import SignUpPage from './pages/SignUpPage';
import FAQPage from './pages/FAQpage';
import PrivacyPolicy from './pages/PrivacyPage';
import ContactUs from './pages/ContactUsPage';
import TermsOfService from './pages/TermsOfServicePage';
import Home from './pages/LoggedIn/Home/Home';
import ProtectedRoute from './components/layout/ProtectedRoute';
import UserProfile from './pages/LoggedIn/UserProfile';
import UserProfileSettings from './pages/LoggedIn/UserProfileEditSettings';
import Support from './pages/LoggedIn/Support';
import BookView from './components/Books/BookView';
import Clubs from './pages/LoggedIn/Clubs/Clubs';
import Explore from './pages/LoggedIn/Explore/Explore';
import Library from './pages/LoggedIn/LibraryPage/Library';
import LibraryBookList from './pages/LoggedIn/LibraryPage/LibraryBookList';
import BookClubDetail from './pages/LoggedIn/Clubs/BookClubDetail';
import LandingPageHandler from './components/LandingPageHandler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ForumView from './pages/LoggedIn/Clubs/ForumView';
import ProfilePage from './pages/LoggedIn/Profile/Profile';

const queryClient = new QueryClient();

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<Router>
				<Routes>
					<Route path='/' element={<Layout />}>
						<Route index element={<LandingPageHandler />} />
						<Route path='login' element={<LogInPage />} />
						<Route path='signup' element={<SignUpPage />} />
						<Route path='faq' element={<FAQPage />} />
						<Route path='privacy' element={<PrivacyPolicy />} />
						<Route path='termsofservice' element={<TermsOfService />} />
						<Route path='contact' element={<ContactUs />} />
			
						{/* Skyddad rutt för Home-sidan */}
						<Route
							path='account'
							element={
								<ProtectedRoute>
									<UserProfile />
								</ProtectedRoute>
							}
						/>
						<Route
							path='profile'
							element={
								<ProtectedRoute>
									<ProfilePage />
								</ProtectedRoute>
							}
						/>
						<Route
							path='settings'
							element={
								<ProtectedRoute>
									<UserProfileSettings />
								</ProtectedRoute>
							}
						/>
						<Route
							path='support'
							element={
								<ProtectedRoute>
									<Support />
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
							path='/clubs/:id'
							element={
								<ProtectedRoute>
									<BookClubDetail />
								</ProtectedRoute>
							}
						/>
						<Route
							path='explore'
							element={
								<ProtectedRoute>
									<Explore />
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
							path='book/:isbn'
							element={
								<ProtectedRoute>
									<BookView/>
								</ProtectedRoute>
							}
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
						<Route
							path='/clubs/:bookClubId/forums/:forumId'
							element={
								<ProtectedRoute>
									<ForumView />
								</ProtectedRoute>
							}
						/>
					</Route>
				</Routes>
			</Router>
		</QueryClientProvider>
	);
};

export default App;
