import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import logo from '../../images/books.png';
import { fetchBooksThroughSearchbar } from '../../services/SearchbarService';

const SearchResultsItem = ({ book }) => (
	<div className='flex items-center space-x-4 p-2 border-b'>
		{book.coverId && (
			<img
				src={`https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`}
				alt={book.title}
				className='h-20 w-14 object-cover rounded'
			/>
		)}
		<div>
			<h3 className='font-medium'>{book.title}</h3>
			<p className='text-gray-500'>{book.author}</p>
		</div>
	</div>
);

export default function LoggedInHeader() {
	const [searchQuery, setSearchQuery] = useState('');
	const [searchResults, setSearchResults] = useState([]);

	const handleSearch = async (event) => {
		if (event.key === 'Enter') {
			const results = await fetchBooksThroughSearchbar(searchQuery);
			setSearchResults(results);
		}
	};

	return (
		<header className='pt-1 pb-1 bg-slate-600'>
			<div className='px-4 h-12 flex items-center'>
				<Link to='/home'>
					<img
						src={logo}
						alt='Description of image'
						className='h-8 w-auto object-contain pr-1'
					/>
				</Link>
				<Link to='/home' className='flex-1 font-comico'>
					blad.
				</Link>
				<div className='flex items-center space-x-4 ml-auto px-2'>
					<Link to='/clubs'>Clubs</Link>
					<Link to='/explore'>Explore</Link>
					<Link to='/library'>Bibliotek</Link>
				</div>

				<div className='flex items-center space-x-4 ml-auto pl-2'>
					<input
						type='text'
						placeholder='Sökbar för allt?'
						className='border rounded-md px-2 py-1 w-64'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						onKeyDown={handleSearch}
					/>
					<Avatar>
						<AvatarImage src='/path/to/avatar.jpg' alt='User Avatar' />
						<AvatarFallback>U</AvatarFallback>
					</Avatar>
					<Link to='/account'>Username</Link>
				</div>
			</div>

			{searchResults.length > 0 && (
				<div className='px-4 mt-2'>
					<h2 className='text-lg font-medium mb-2'>Search Results</h2>
					<div className='border rounded-md overflow-hidden'>
						{searchResults.map((book) => (
							<SearchResultsItem key={book.id} book={book} />
						))}
					</div>
				</div>
			)}
		</header>
	);
}
