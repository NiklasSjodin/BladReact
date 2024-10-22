import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const Layout = () => {
	return (
		<div className='flex flex-col h-screen overflow-hidden'>
			<Header />
			<main className='flex-grow overflow-auto'>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export default Layout;
