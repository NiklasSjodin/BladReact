import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import logo from '../../images/books.png';
import { jwtDecode } from 'jwt-decode';
import { Switch } from "../ui/switch";
import { Searchbar } from '../Searchbar';
import { useNavigate } from 'react-router-dom';

export default function LoggedInHeader() {
	const [userName, setUserName] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const [isDarkMode, setIsDarkMode] = useState(() => {
		const savedTheme = localStorage.getItem('theme');
		if (savedTheme) {
			return savedTheme === 'dark';
		}
		return window.matchMedia('(prefers-color-scheme: dark)').matches;
	});
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			const decoded = jwtDecode(token);
			setUserName(
				decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
			);
		}
	}, []);

	useEffect(() => {
		if (isDarkMode) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
		localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
	}, [isDarkMode]);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (isOpen && !event.target.closest('.dropdown-container')) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [isOpen]);

	const handleSearch = async (term, type) => {
		try {
			let endpoint;
			switch (type) {
				case 'clubs':
					endpoint = `bookclubs/search?bookClubQuery=${term}`;
					break;
				case 'books':
					endpoint = `books/search?query=${term}`;
					break;
				case 'booklists':
					endpoint = `booklists/search?query=${term}`;
					break;
				case 'all':
					const [clubs, books, lists] = await Promise.all([
						fetch(`${API_URL}bookclubs/search?bookClubQuery=${term}`),
						fetch(`${API_URL}books/search?query=${term}`),
						fetch(`${API_URL}booklists/search?query=${term}`),
					]);
					// Combine and sort results
					return {
						clubs: await clubs.json(),
						books: await books.json(),
						lists: await lists.json(),
					};
				default:
					return [];
			}

			const response = await fetch(`${API_URL}${endpoint}`);
			if (!response.ok) return [];
			const result = await response.json();
			return Array.isArray(result) ? result : [];
		} catch (error) {
			console.error('Error searching:', error);
			return [];
		}
	};

	const handleSelectClub = (club) => {
		navigate(`/clubs/${club.id}`);
	};

	return (
		<header className='absolute w-full pt-1 pb-1 bg-bladtheme'>
			<div className='px-4 h-12 flex items-center'>
				<Link to='/'>
					<img
						src={logo}
						alt='Description of image'
						className='h-8 w-auto object-contain pr-1'
					/>
				</Link>
				<Link to='/' className='flex-1 font-general text-xl text-white'>
					blad.
				</Link>
				<div className='flex items-center space-x-4 ml-auto px-2'>
					<Link
						to='/clubs'
						className='transition-transform hover:border-b-2 hover:border-white'
					>
						Clubs
					</Link>
					<Link
						to='/explore'
						className='transition-transform hover:border-b-2 hover:border-white'
					>
						Explore
					</Link>
					<Link
						to='/library'
						className='transition-transform hover:border-b-2 hover:border-white'
					>
						Bibliotek
					</Link>
				</div>

				<div className='flex items-center space-x-4 ml-auto pl-2'>
					<Searchbar
						className='w-full max-w-xl bg-white rounded-full'
						onSearch={handleSearch}
						onSelectItem={handleSelectClub}
						searchType="all"
						placeholder="Search everything..."
					/>
					<div className='relative dropdown-container'>
						<div
							className='flex items-center space-x-2 cursor-pointer'
							onClick={() => setIsOpen(!isOpen)}
						>
							<Avatar>
								<AvatarImage src='/path/to/avatar.jpg' alt='User Avatar' />
								<AvatarFallback>U</AvatarFallback>
							</Avatar>
							<span className='transition-transform hover:border-b-2 hover:border-white'>
								{userName}
							</span>
						</div>
						{/* Dropdown menu */}
						{isOpen && (
							<div className='absolute right-0 w-48 mt-2 origin-top-right bg-white rounded-b-md shadow-xl dark:bg-gray-800 z-50 -mr-4'>
								<Link
									to='/profile' // Use Link for navigation
									onClick={() => setIsOpen(false)} // Close dropdown on link click
									className='block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white'
								>
									Profil
								</Link>
								<a
									href='#'
									className='block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white'
								>
									Klubbar
								</a>
								<a
									href='#'
									className='block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white'
								>
									Bokhylla
								</a>
								<a
									href='#'
									className='block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white'
								>
									Recensioner
								</a>
								<Link
									to='/account' // Use Link for navigation
									onClick={() => setIsOpen(false)} // Close dropdown on link click
									className='block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white'
								>
									Inställningar
								</Link>
								<Link
									to='/support' // Use Link for navigation
									onClick={() => setIsOpen(false)} // Close dropdown on link click
									className='block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white'
								>
									Support
								</Link>
								<a
									href='#'
									className='block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white'
								>
									Logga ut
								</a>
								<div className='flex items-center justify-between px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white'>
									<span>Dark Mode</span>
									<Switch
										checked={isDarkMode}
										onCheckedChange={(checked) => {
											setIsDarkMode(checked);
										}}
									/>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</header>
	);
}
