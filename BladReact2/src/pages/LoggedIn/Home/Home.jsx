import React, { useState, useEffect, useRef, useMemo } from 'react';
import { PageContainer } from '../../../components/layout/PageContainer';
import { Skeleton } from '@/components/ui/skeleton';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useBookCover } from '../../../hooks/useBookCover';
import { CardSkeleton } from '../../../components/CardSkeleton';
import BookCard from '../../../components/BookCard';
import { SectionHeader } from '../../../components/Sections/SectionHeader';
import { fetchBooks } from '../../../services/BooksService';
import ScrollableContainer from '../../../components/Sections/ScrollableContainer';
import HeroSection from '../../../components/Sections/HeroSection';
import { jwtDecode } from 'jwt-decode';
import { useAuthFetch } from '@/services/useAuthFetch';
import { VITE_AZURE_API_URL } from '@/services/api';

/**
 * Main Home Component
 * Manages the homepage layout and data fetching
 * Features:
 * - Hero section
 * - Popular books section
 * - Genre-specific book sections (SciFi, Fantasy)
 * - Loading states with skeletons
 */
export default function Home() {
	const [popularBooks, setPopularBooks] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [userName, setUserName] = useState('');
	const { authFetch } = useAuthFetch();
	const query = 'earth';
	const API_URL = VITE_AZURE_API_URL;

	useEffect(() => {
		const loadBooks = async () => {
			setIsLoading(true);
			try {
				const response = await authFetch(
					`${API_URL}/googlebooks/search/General?SearchTerm=${query}&PageSize=10`
				);
				const mappedBooks = response.data.map((book, index) => ({
					id: book.externalId || `temp-id-${index}`,
					isbn: book.isbn,
					title: book.title || 'Untitled',
					author: book.author || 'Unknown',
					coverId: book.thumbnail,
					publishYear: book.year,
					language: book.language,
					subjects: book.genres ? [book.genres] : [],
				}));
				console.log('Mapped books:', mappedBooks);
				setPopularBooks(mappedBooks);
			} catch (error) {
				console.error('Error loading books:', error);
			} finally {
				setIsLoading(false);
			}
		};

		loadBooks();
	}, [authFetch]);

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			const decoded = jwtDecode(token);
			setUserName(
				decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
			);
		}
	}, []);

	// Create a stable array of skeleton items
	const skeletonItems = useMemo(
		() => Array.from({ length: 10 }, (_, index) => index),
		[]
	);

	return (
		<PageContainer>
			<HeroSection />
			<div className='space-y-8 pb-24 pt-16'>
				<div className='pt-6 space-y-4'>
					<h1 className='text-3xl font-bold text-bladLightTextColor'>
						{
							[
								`Hej ${userName}!`,
								`Välkommen ${userName}!`,
								`God dag ${userName}!`,
								`Tjena ${userName}!`,
								`Hallå ${userName}!`,
							][Math.floor(Math.random() * 5)]
						}
					</h1>
					<p className='text-gray-1000'>
						{
							[
								'Dags att hitta din nästa favoritbok!',
								'Vad ska du läsa idag?',
								'Nya bokäventyr väntar!',
								'Redo för en ny läsupplevelse?',
								'Låt oss utforska bokvärlden!',
							][Math.floor(Math.random() * 5)]
						}
					</p>
				</div>

				<ScrollableContainer
					title='Trendande böcker'
					viewAllLink={{
						pathname: '/books/search',
						search: `?query=${query}`,
						state: {
							apiUrl: `${API_URL}/googlebooks/search/General?SearchTerm=${query}&pageSize=25`,
							searchQuery: query
						}
					}}
					itemWidth={192}
				>
					{isLoading
						? skeletonItems.map((index) => (
								<CardSkeleton key={`skeleton-${index}`} />
						  ))
						: popularBooks.map((book, index) => (
								<BookCard key={book.isbn || `fallback-${index}`} {...book} />
						  ))}
				</ScrollableContainer>
			</div>
		</PageContainer>
	);
}