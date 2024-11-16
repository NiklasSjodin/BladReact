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
		? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
		: '/api/placeholder/150/200';

	return (
		<div className='group flex-shrink-0 w-48 m-2 overflow-hidden'>
			<div className='relative aspect-[2/3] transition-all duration-300 group-hover:scale-105'>
				<img
					loading="lazy"
					src={coverUrl}
					alt={title}
					className='w-full h-full object-cover rounded-lg shadow-lg'
					onError={(e) => {
						e.target.src = '/api/placeholder/150/200';
					}}
				/>
				<div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg'>
					<div className='absolute bottom-0 p-4 text-white'>
						<h3 className='font-bold truncate'>{title}</h3>
						<p className='text-sm text-gray-300 truncate'>{author}</p>
					</div>
				</div>
			</div>
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
			className={`absolute top-1/2 -translate-y-1/2 z-20 
				bg-black/50 hover:bg-black/70 text-white p-4 
				backdrop-blur-sm transition-all duration-300
				${direction === 'left' 
					? 'left-2 rounded-l-xl' 
					: 'right-2 rounded-r-xl'}`}
		>
			{direction === 'left' ? '←' : '→'}
		</button>
	);

	return (
		<div className='flex flex-col'>
			<div className='flex items-center justify-between mb-4'>
				<h2 className='text-xl font-bold text-white'>{title}</h2>
				{viewAllLink && (
					<a href={viewAllLink} 
					   className='text-blue-400 hover:text-blue-300 transition-colors duration-200
								flex items-center gap-2'>
						View All
						<span>→</span>
					</a>
				)}
			</div>
			<div className='relative'
				onMouseEnter={() => setIsHovering(true)}
				onMouseLeave={() => setIsHovering(false)}>
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
    <div className='flex-shrink-0 w-48 m-2'>
        <div className='aspect-[2/3]'>
            <Skeleton className="w-full h-full rounded-lg" />
        </div>
        <div className='mt-2 space-y-2'>
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-2/3 h-3" />
        </div>
    </div>
);

const HeroSection = () => (
    <div className="relative h-[300px] mb-8 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600" />
        <div className="absolute inset-0 bg-[url('/hero-pattern.png')] opacity-10" />
        <div className="relative h-full flex items-center px-8">
            <div className="max-w-2xl">
                <h1 className="text-4xl font-bold text-white mb-4">
                    Welcome to Your Digital Library
                </h1>
                <p className="text-lg text-gray-200 mb-6">
                    Discover millions of books, from classics to the latest releases
                </p>
                <button className="bg-white text-blue-600 px-6 py-2 rounded-lg
                                 hover:bg-blue-50 transition-colors duration-200">
                    Start Exploring
                </button>
            </div>
        </div>
    </div>
);

// Main Home Component
export default function Home() {
	const [popularBooks, setPopularBooks] = useState([]);
	const [scifiBooks, setScifiBooks] = useState([]);
	const [fantasyBooks, setFantasyBooks] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const loadBooks = async () => {
			setIsLoading(true);
			const [popular, scifi, fantasy] = await Promise.all([
				FetchBooks('popular', 10),
				FetchBooks('science fiction', 10),
				FetchBooks('fantasy', 10)
			]);
			setPopularBooks(popular);
			setScifiBooks(scifi);
			setFantasyBooks(fantasy);
			setIsLoading(false);
		};
		loadBooks();
	}, []);

	return (
		<PageContainer>
			<HeroSection />
			<div className="space-y-8">
				<div className="pt-6 space-y-4">
					<h1 className='text-3xl font-bold text-white'>Welcome to Your Library</h1>
					<p className="text-gray-400">Discover your next favorite book</p>
				</div>

				<ScrollableContainer title="Popular Now" viewAllLink="/books/popular" itemWidth={192}>
					{isLoading ? (
						Array.from({ length: 10 }).map((_, index) => (
							<BookCardSkeleton key={index} />
						))
					) : popularBooks.map((book) => (
						<BookCard key={book.id} {...book} />
					))}
				</ScrollableContainer>

				<ScrollableContainer title="Science Fiction" viewAllLink="/books/scifi" itemWidth={192}>
					{isLoading ? (
						Array.from({ length: 10 }).map((_, index) => (
							<BookCardSkeleton key={index} />
						))
					) : scifiBooks.map((book) => (
						<BookCard key={book.id} {...book} />
					))}
				</ScrollableContainer>

				<ScrollableContainer title="Fantasy" viewAllLink="/books/fantasy" itemWidth={192}>
					{isLoading ? (
						Array.from({ length: 10 }).map((_, index) => (
							<BookCardSkeleton key={index} />
						))
					) : fantasyBooks.map((book) => (
						<BookCard key={book.id} {...book} />
					))}
				</ScrollableContainer>
			</div>
		</PageContainer>
	);
}
