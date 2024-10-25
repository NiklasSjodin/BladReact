import { Link } from 'react-router-dom';
import homeIcon from '../../images/icons8-home-32.png';
import bookIcon from '../../images/icons8-book.png';
import ideaIcon from '../../images/icons8-idea-24.png';
import readingIcon from '../../images/icons8-reading-24.png';
import userIcon from '../../images/icons8-user-32.png';

const MobileNavbar = () => {
	return (
		<footer className='w-full border-t-2 border-black p-8'>
			<nav className='container mx-auto flex justify-center items-center'>
				<ul className='flex space-x-4'>
					<li>
						<Link to='main' title='home'>
							<img src={homeIcon} alt='GitHub Logo' className='h-6 w-6' />
						</Link>
					</li>
					<li>
						<Link to='clubs' title='clubs'>
							<img src={readingIcon} alt='GitHub Logo' className='h-6 w-6' />
						</Link>
					</li>
					<li>
						<Link to='explore' title='explore'>
							<img src={ideaIcon} alt='GitHub Logo' className='h-6 w-6' />
						</Link>
					</li>
					<li>
						<Link to='books' title='books'>
							<img src={bookIcon} alt='GitHub Logo' className='h-6 w-6' />
						</Link>
					</li>
					<li>
						<Link to='profile' title='profile'>
							<img src={userIcon} alt='GitHub Logo' className='h-6 w-6' />
						</Link>
					</li>
				</ul>
			</nav>
		</footer>
	);
};

export default MobileNavbar;
