import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Footer/DesktopFooter';
import Header from '../Header/DesktopHeader';
import MobileHeader from '../Header/MobileHeader';
import MainPageHeader from '../Header/MainPageHeader';
import MobileNavbar from '../Navbar/MobileNavbar';

const Layout = () => {

	const location = useLocation();


	return (
		<div className='flex flex-col h-screen overflow-hidden'>
			{location.pathname === '/login' ? (
				<></>
			) : (
				<>
					{/* <div className='block md:hidden sm:hidden'>
						<MobileHeader />
					</div> */}
					<div className='hidden md:block'>
						<Header />
					</div>
				</>
			)}
			<main className='flex-grow overflow-auto'>
				<Outlet />
			</main>
			{location.pathname === '/login' ? (
				<></>
			) : (
				<>
					<div className='block lg:hidden'>
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
