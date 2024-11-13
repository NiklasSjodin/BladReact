import { Outlet, useLocation } from 'react-router-dom';
// import Footer from '../Footer/DesktopFooter';
import Header from '../Header/DesktopHeader';
// import MobileHeader from '../Header/MobileHeader';
// import MainPageHeader from '../Header/MainPageHeader';
import MobileNavbar from '../Navbar/MobileNavbar';
import LoggedInHeader from '../Header/LoggedInHeader';
import Footer from '../Footer/DesktopFooter';

const Layout = () => {

	const location = useLocation();


	return (
		<div className='flex flex-col min-h-screen'>
			{location.pathname === '/login' ? (
				<></>
			) : location.pathname === '/signup' ? (
				<></>
			) : location.pathname === '/' ? (
				<div className='hidden md:block'>
					<Header />
				</div>
			) : (
				<>
					<div className='hidden md:block'>
						<LoggedInHeader />
					</div>
				</>
			)}
			<main className='flex-grow'>
				<Outlet />
			</main>
			{location.pathname === '/login' ? (
				<>
				</>
			) : (
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
