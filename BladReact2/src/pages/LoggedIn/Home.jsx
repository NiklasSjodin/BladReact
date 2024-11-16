import React, { useState, useEffect, useRef } from 'react';
import { PageContainer } from '../../components/layout/PageContainer';
import { Skeleton } from "@/components/ui/skeleton"

// SectionHeader Component
const SectionHeader = ({ title, viewAllLink }) => (
	<div className='flex items-center justify-between mb-4'>
		<h2 className='text-xl font-bold text-white'>{title}</h2>
		{viewAllLink && (
			<a href={viewAllLink} className='text-blue-300 hover:text-blue-100'>
				View All
			</a>
		)}
	</div>
);

// BookCard Component
const BookCard = ({ title, author, coverId }) => {
	const coverUrl = coverId
		? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` // Changed to -M.jpg
		: '/api/placeholder/150/200';

	console.log('BookCard Props:', { title, author, coverId, coverUrl }); // Debug log

	return (
		<div className='flex-shrink-0 w-48 h-64 m-2 rounded-lg bg-gray-200 flex flex-col items-center justify-center p-2'>
			<img
				src={coverUrl}
				alt={title}
				className='w-full h-48 object-cover rounded'
				onError={(e) => {
					e.target.src = '/api/placeholder/150/200';
				}}
			/>
			<p className='mt-2 text-sm text-center font-medium truncate w-full'>
				{title}
			</p>
			<p className='mt-1 text-xs text-center text-gray-600 truncate w-full'>
				{author}
			</p>
		</div>
	);
};

// ScrollableContainer Component
const ScrollableContainer = ({ children, itemWidth, title, viewAllLink }) => {
	const scrollContainerRef = useRef(null);
	const [isHovering, setIsHovering] = useState(false);
	const scrollTimeoutRef = useRef(null);
	const lastScrollTime = useRef(0);
	const accumulatedDelta = useRef(0);

	useEffect(() => {
		const container = scrollContainerRef.current;

		const handleWheel = (e) => {
			if (isHovering) {
				e.preventDefault();

				const now = Date.now();
				const timeDelta = now - lastScrollTime.current;
				lastScrollTime.current = now;

				if (scrollTimeoutRef.current) {
					clearTimeout(scrollTimeoutRef.current);
				}

				accumulatedDelta.current += e.deltaY;

				const baseScrollAmount = 1.5;
				let scrollMultiplier;

				if (timeDelta < 50) {
					scrollMultiplier = 0.5;
				} else if (timeDelta < 100) {
					scrollMultiplier = 0.75;
				} else {
					scrollMultiplier = 1;
				}

				const scrollAmount = e.deltaY * baseScrollAmount * scrollMultiplier;

				container.scrollBy({
					left: scrollAmount,
					behavior: timeDelta < 50 ? 'auto' : 'smooth',
				});

				scrollTimeoutRef.current = setTimeout(() => {
					accumulatedDelta.current = 0;
				}, 150);
			}
		};

		if (container) {
			container.addEventListener('wheel', handleWheel, { passive: false });
			return () => {
				container.removeEventListener('wheel', handleWheel);
			};
		}
	}, [isHovering]);

	const handleScroll = (direction) => {
		const container = scrollContainerRef.current;
		if (!container) return;

		const visibleItems = Math.floor(container.clientWidth / itemWidth);
		const scrollAmount = itemWidth * visibleItems;

		container.scrollBy({
			left: direction === 'left' ? -scrollAmount : scrollAmount,
			behavior: 'smooth',
		});
	};

	const ScrollButton = ({ direction, onClick }) => (
		<button
			onClick={onClick}
			className={`absolute top-1/2 transform -translate-y-1/2 z-20 bg-gray-700 hover:bg-gray-600 text-white p-2 ${
				direction === 'left' ? 'left-0 rounded-r-lg' : 'right-0 rounded-l-lg'
			}`}
		>
			{direction === 'left' ? '<' : '>'}
		</button>
	);

	return (
		<div className='flex flex-col'>
			<SectionHeader title={title} viewAllLink={viewAllLink} />
			<div
				className='relative'
				onMouseEnter={() => setIsHovering(true)}
				onMouseLeave={() => setIsHovering(false)}
			>
				<ScrollButton direction='left' onClick={() => handleScroll('left')} />

				<div
					className='overflow-x-auto scrollbar-hide'
					ref={scrollContainerRef}
					style={{
						scrollbarWidth: 'none',
						msOverflowStyle: 'none',
						WebkitOverflowScrolling: 'touch',
					}}
				>
					<div className='flex'>{children}</div>
				</div>

				<ScrollButton direction='right' onClick={() => handleScroll('right')} />
			</div>
		</div>
	);
};

// Books Service
const FetchBooks = async (searchQuery = '', limit = 10) => {
	try {
		// Add loading state
		console.time('API Request');
		const response = await fetch(
			`https://openlibrary.org/search.json?q=${searchQuery || 'popular'}&limit=${limit}`
		);
		const data = await response.json();
		console.timeEnd('API Request');
		
		// Take only the first 'limit' number of books before mapping
		console.time('Data Mapping');
		const mappedBooks = data.docs
			.slice(0, limit)  // Limit the array first
			.map((book) => ({
				id: book.key,
				title: book.title || 'Untitled',
				author: book.author_name?.[0] || 'Unknown',
				coverId: book.cover_i,
			}));
		console.timeEnd('Data Mapping');
			
		return mappedBooks;
	} catch (error) {
		console.error('Error fetching books:', error);
		return [];
	}
};

// Add a BookCardSkeleton component
const BookCardSkeleton = () => (
    <div className='flex-shrink-0 w-48 h-64 m-2 rounded-lg bg-gray-200 flex flex-col items-center justify-center p-2'>
        <Skeleton className="w-full h-48 rounded" />
        <Skeleton className="mt-2 w-full h-4" />
        <Skeleton className="mt-1 w-3/4 h-3" />
    </div>
);

// Main Home Component
export default function Home() {
	const [books, setBooks] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const loadBooks = async () => {
			setIsLoading(true);
			const fetchedBooks = await FetchBooks('', 10);
			setBooks(fetchedBooks);
			setIsLoading(false);
		};
		loadBooks();
	}, []);

	return (
		<PageContainer>
			<h1 className='text-2xl font-bold text-white pt-6'>Welcome home</h1>

			<ScrollableContainer
				title='Popular Books'
				viewAllLink='/books'
				itemWidth={192}
			>
				{isLoading ? (
					// Show multiple skeleton cards while loading
					Array.from({ length: 10 }).map((_, index) => (
						<BookCardSkeleton key={index} />
					))
				) : books.length > 0 ? (
					books.map((book) => (
						<BookCard
							key={book.id}
							title={book.title}
							author={book.author}
							coverId={book.coverId}
						/>
					))
				) : (
					<div className="text-white">No books found</div>
				)}
			</ScrollableContainer>
		</PageContainer>
	);
}
