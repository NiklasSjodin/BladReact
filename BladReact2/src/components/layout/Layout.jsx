import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header/DesktopHeader';
import MobileNavbar from '../Navbar/MobileNavbar';
import LoggedInHeader from '../Header/LoggedInHeader';
import Footer from '../Footer/DesktopFooter';

const Layout = () => {
	const location = useLocation();
	const token = localStorage.getItem('token');
	const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

	return (
		<div className='flex flex-col min-h-screen'>
			{!isAuthPage && (
				<>
					<div className='hidden md:block'>
						{token ? <LoggedInHeader /> : <Header />}
					</div>
				</>
			)}
			<main className='flex-grow'>
				<Outlet />
			</main>
			{!isAuthPage && (
				<>
					<div className='block md:hidden fixed bottom-0 w-full'>
						<MobileNavbar />
					</div>
					<div className='hidden md:block'>
						<Footer />
					</div>
				</>
			)}
		</div>
	);
};

export default Layout;
