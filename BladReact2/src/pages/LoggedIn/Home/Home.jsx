import React, { useState, useEffect, useRef } from 'react';
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
	const [scifiBooks, setScifiBooks] = useState([]);
	const [fantasyBooks, setFantasyBooks] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const loadBooks = async () => {
			setIsLoading(true);
			try {
				const [popular, scifi, fantasy] = await Promise.all([
					fetchBooks({ searchQuery: 'popular', limit: 10 }),
					fetchBooks({ searchQuery: 'science fiction', limit: 10 }),
					fetchBooks({ searchQuery: 'fantasy', limit: 10 }),
				]);

				setPopularBooks(popular);
				setScifiBooks(scifi);
				setFantasyBooks(fantasy);
			} catch (error) {
				console.error('Error loading books:', error);
			} finally {
				setIsLoading(false);
			}
		};

		loadBooks();
	}, []);

	return (
		<PageContainer>
			<HeroSection />
			<div className='space-y-8 pb-24 pt-16'>
				<div className='pt-6 space-y-4'>
					<h1 className='text-3xl font-bold text-bladLightTextColor'>
						Welcome to Your Library
					</h1>
					<p className='text-gray-400'>Discover your next favorite book</p>
				</div>

				<ScrollableContainer
					title='Popular Now'
					viewAllLink='/books/popular'
					itemWidth={192}
				>
					{isLoading
						? Array.from({ length: 10 }).map((_, index) => (
								<CardSkeleton key={index} />
						  ))
						: popularBooks.map((book) => <BookCard key={book.id} {...book} />)}
				</ScrollableContainer>

			</div>
		</PageContainer>
	);
}
