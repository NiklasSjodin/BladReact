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
import { Local_API_URL } from '@/services/api';

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
	const popularQuery = 'a court';

	useEffect(() => {
		const loadBooks = async () => {
			setIsLoading(true);
			try {
				const response = await authFetch(
					`${Local_API_URL}/googlebooks/search/General?SearchTerm=${popularQuery}`
				);
				const mappedBooks = response.data.map((book, index) => ({
					id: book.externalId || `temp-id-${index}`,
					isbn: book.isbn,
					title: book.title || 'Untitled',
					author: book.author || 'Unknown',
					coverId: book.thumbnail,
					publishYear: book.year,
					language: book.language,
					subjects: book.genres ? [book.genres] : []
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
	const skeletonItems = useMemo(() => 
		Array.from({ length: 10 }, (_, index) => index), 
		[]
	);

	return (
		<PageContainer>
			<HeroSection />
			<div className='space-y-8 pb-24 pt-16'>
				<div className='pt-6 space-y-4'>
					<h1 className='text-3xl font-bold text-bladLightTextColor'>
						Welcome {userName}
					</h1>
					<p className='text-gray-400'>Discover your next favorite book</p>
				</div>

				<ScrollableContainer
					title='Popular Now'
					viewAllLink='/books/popular'
					itemWidth={192}
				>
					{isLoading ? (
						skeletonItems.map((index) => (
							<CardSkeleton key={`skeleton-${index}`} />
						))
					) : (
						popularBooks.map((book, index) => (
							<BookCard 
								key={book.isbn || `fallback-${index}`} 
								{...book} 
							/>
						))
					)}
				</ScrollableContainer>
			</div>
		</PageContainer>
	);
}
