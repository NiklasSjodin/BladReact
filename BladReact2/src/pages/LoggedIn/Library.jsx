import Footer from '@/components/Footer/DesktopFooter';
import { Link } from 'react-router-dom';

export default function Library() {
	return (
		<>
			<div className='flex flex-col min-h-screen'>
				<main className='flex-grow'>
					<h1>Library</h1>
				</main>
				<Footer />
			</div>
		</>
	);
}
