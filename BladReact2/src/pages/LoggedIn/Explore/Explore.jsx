import React, { useState, useEffect, useRef } from 'react';
import { PageContainer } from '../../../components/layout/PageContainer';
import { CardSkeleton } from '../../../components/CardSkeleton';
import BookCard from '../../../components/BookCard';
import ScrollableContainer from '../../../components/Sections/ScrollableContainer';
import { Searchbar } from '../../../components/Searchbar';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthFetch } from '@/services/useAuthFetch';
import { VITE_AZURE_API_URL } from '@/services/api';
import ExploreHeroSection from '../../../components/Sections/ExploreHeroSection';

export default function Explore() {
	const [searchResults, setSearchResults] = useState([]);
	const [genreBooks, setGenreBooks] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [selectedGenre, setSelectedGenre] = useState(null);
	const navigate = useNavigate();
	const { authFetch } = useAuthFetch();
	const API_URL = VITE_AZURE_API_URL;
	const genreRefs = useRef({});

	const genres = [
		{ 
			id: 'fantasy', 
			name: 'Fantasy',
			query: 'lord of the rings OR fifth season OR fantasy'
		},
		{ 
			id: 'scifi', 
			name: 'Science Fiction',
			query: 'philip k dick OR dune OR foundation OR space'
		},
		{ 
			id: 'mystery', 
			name: 'Mystery',
			query: 'mystery OR sherlock holmes OR detective OR crime'
		},
		{ 
			id: 'romance', 
			name: 'Romance',
			query: 'romance OR pride and prejudice OR love story'
		},
		{ 
			id: 'thriller', 
			name: 'Thriller',
			query: 'thriller OR suspense OR psychological'
		},

	];

	useEffect(() => {
		genres.forEach((genre) => {
			genreRefs.current[genre.id] = genreRefs.current[genre.id] || React.createRef();
		});
	}, []);

	const handleGenreClick = (genreId) => {
		setSelectedGenre(genreId);
		genreRefs.current[genreId]?.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
	};

	useEffect(() => {
		const loadBooks = async () => {
			setIsLoading(true);
			try {
				const genrePromises = genres.map((genre) => {
					const encodedQuery = encodeURIComponent(genre.query);
					return authFetch(`${API_URL}/googlebooks/search/General?SearchTerm=${encodedQuery}&PageSize=5`);
				});
				
				const results = await Promise.all(genrePromises);

				const booksMap = {};
				genres.forEach((genre, index) => {
					const mappedBooks = results[index].data
						.map((book) => ({
							id: book.externalId || `temp-id-${index}`,
							isbn: book.isbn,
							title: book.title || 'Untitled',
							author: book.author || 'Unknown',
							coverId: book.thumbnail,
							publishYear: book.year,
							language: book.language,
							subjects: book.genres ? [book.genres] : [],
						}))
						.sort(() => Math.random() - 0.5)
						.slice(0, 5);
					booksMap[genre.id] = mappedBooks;
				});

				setGenreBooks(booksMap);
			} catch (error) {
				console.error('Error loading books:', error);
			} finally {
				setIsLoading(false);
			}
		};

		loadBooks();
	}, [authFetch]);

	const handleSearch = async (term) => {
		try {
			const response = await authFetch(`${API_URL}/googlebooks/search/General?SearchTerm=${term}&PageSize=10`);
			setSearchResults(response.data || []);
			return response.data;
		} catch (error) {
			console.error('Error searching books:', error);
			return [];
		}
	};

	const handleSelectBook = (book) => {
		navigate(`/books/${book.id}`);
	};

	return (
		<PageContainer>
			<ExploreHeroSection />
			<div className='space-y-8 pb-24'>
				<div className='pt-6 space-y-4 z-10 pb-4'>
					<h1 className='text-3xl font-bold text-bladLightTextColor'>
						Upptäck dina nästa favoritböcker
					</h1>
					<p className='text-gray-400'>Upptäck böcker genom genrer eller sök efter specifika böcker</p>

					<div className='flex w-full max-w-md'>
						<Searchbar
							onSearch={handleSearch}
							searchResults={searchResults}
							onSelectItem={handleSelectBook}
							searchType='books'
							placeholder='Sök böcker...'
						/>
					</div>

					<div className='flex flex-wrap gap-2 pt-4'>
						{genres.map((genre) => (
							<button
								key={genre.id}
								onClick={() => handleGenreClick(genre.id)}
								className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
									${selectedGenre === genre.id
										? 'bg-blue-600 text-white'
										: 'bg-gray-700 text-gray-200 hover:bg-gray-600'
									}`}
							>
								{genre.name}
							</button>
						))}
					</div>
				</div>

				{genres.map((genre) => (
					<div key={genre.id} ref={genreRefs.current[genre.id]}>
						<div className="px-4">
							<div className="flex justify-between items-center mb-4">
								<h2 className="text-xl font-semibold text-bladLightTextColor">
									{genre.name}
								</h2>
								<Link
									to={{
										pathname: '/books/search',
										search: `?query=${genre.query}`,
									}}
									state={{
										apiUrl: `${API_URL}/googlebooks/search/General?SearchTerm=${encodeURIComponent(genre.query)}&pageSize=20`,
										searchQuery: genre.name
									}}
									className="text-sm text-blue-500 hover:text-blue-600 transition-colors"
								>
									Visa alla
								</Link>
							</div>
							<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
								{isLoading
									? Array.from({ length: 5 }).map((_, index) => (
											<CardSkeleton key={index} />
									  ))
									: genreBooks[genre.id]?.map((book) => (
										<BookCard
											key={book.isbn || book.id}
											{...book}
										/>
									))}
							</div>
						</div>
					</div>
				))}
			</div>
		</PageContainer>
	);
}
