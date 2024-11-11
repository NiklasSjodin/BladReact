import React, { useEffect, useState, useRef } from 'react';
import 'react-horizontal-scrolling-menu/dist/styles.css';

function BookCard({ title, author, coverId }) {
	const coverUrl = coverId
		? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
		: '/api/placeholder/150/200';

	return (
		<div className='flex-shrink-0 w-48 h-64 m-2 rounded-lg bg-gray-200 flex flex-col items-center justify-center p-2'>
			<img
				src={coverUrl}
				alt={title}
				className='w-full h-48 object-cover rounded'
			/>
			<p className='mt-2 text-sm text-center font-medium truncate w-full'>
				{title}
			</p>
			<p className='mt-1 text-xs text-center text-gray-600 truncate w-full'>
				{author}
			</p>
		</div>
	);
}

const ScrollButton = ({ direction, onClick }) => {
	return (
		<button
			onClick={onClick}
			className={`absolute top-1/2 transform -translate-y-1/2 z-20 bg-gray-700 hover:bg-gray-600 text-white p-2 ${
				direction === 'left' ? 'left-0 rounded-r-lg' : 'right-0 rounded-l-lg'
			}`}
		>
			{direction === 'left' ? '←' : '→'}
		</button>
	);
};

export default function Home() {
	const [books, setBooks] = useState([]);
	const scrollContainerRef = useRef(null);
	const [isHovering, setIsHovering] = useState(false);
	const scrollTimeoutRef = useRef(null);
	const lastScrollTime = useRef(0);
	const accumulatedDelta = useRef(0);

	useEffect(() => {
		const fetchBooks = async () => {
			try {
				const response = await fetch(
					'https://openlibrary.org/search.json?q=javascript&limit=10'
				);
				const data = await response.json();
				const fetchedBooks = data.docs.map((book) => ({
					id: book.key,
					title: book.title,
					author: book.author_name ? book.author_name[0] : 'Unknown',
					coverId: book.cover_i,
				}));
				setBooks(fetchedBooks);
			} catch (error) {
				console.error('Error fetching books:', error);
			}
		};

		fetchBooks();
	}, []);

	useEffect(() => {
		const container = scrollContainerRef.current;

		const handleWheel = (e) => {
			if (isHovering) {
				e.preventDefault();

				const now = Date.now();
				const timeDelta = now - lastScrollTime.current;
				lastScrollTime.current = now;

				// Clear any pending smooth scroll
				if (scrollTimeoutRef.current) {
					clearTimeout(scrollTimeoutRef.current);
				}

				// Accumulate scroll delta
				accumulatedDelta.current += e.deltaY;

				// Base scroll amount - reduced from previous version
				const baseScrollAmount = 1.5;

				// Apply dampening for fast scrolls
				let scrollMultiplier;
				if (timeDelta < 50) {
					// Fast scrolling - apply stronger dampening
					scrollMultiplier = 0.5;
				} else if (timeDelta < 100) {
					// Medium speed scrolling
					scrollMultiplier = 0.75;
				} else {
					// Slow, deliberate scrolling
					scrollMultiplier = 1;
				}

				// Calculate final scroll amount
				const scrollAmount = e.deltaY * baseScrollAmount * scrollMultiplier;

				// Apply the scroll with smooth behavior for better control
				container.scrollBy({
					left: scrollAmount,
					behavior: timeDelta < 50 ? 'auto' : 'smooth',
				});

				// Reset accumulated delta after a delay
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

		const cardWidth = 208;
		const visibleCards = Math.floor(container.clientWidth / cardWidth);
		const scrollAmount = cardWidth * visibleCards;

		container.scrollBy({
			left: direction === 'left' ? -scrollAmount : scrollAmount,
			behavior: 'smooth',
		});
	};

	return (
		<div className='bg-gradient-to-br from-gray-500 to-black min-h-screen'>
			<div className='flex flex-col items-center'>
				<main className='w-full max-w-screen-lg px-4'>
					<h1 className='text-2xl font-bold text-white pt-6'>Welcome home</h1>

					<div className='mt-8 max-w-7xl'>
						<div className='flex items-center justify-between mb-4'>
							<h2 className='text-xl font-bold text-white'>Trending</h2>
							<a href='#' className='text-blue-300 hover:text-blue-100'>
								View All
							</a>
						</div>

						<div
							className='relative'
							onMouseEnter={() => setIsHovering(true)}
							onMouseLeave={() => setIsHovering(false)}
						>
							<ScrollButton
								direction='left'
								onClick={() => handleScroll('left')}
							/>

							<div
								className='overflow-x-auto scrollbar-hide'
								ref={scrollContainerRef}
								style={{
									scrollbarWidth: 'none',
									msOverflowStyle: 'none',
									WebkitOverflowScrolling: 'touch',
								}}
							>
								<div className='flex'>
									{books.map((book) => (
										<BookCard
											key={book.id}
											title={book.title}
											author={book.author}
											coverId={book.coverId}
										/>
									))}
								</div>
							</div>

							<ScrollButton
								direction='right'
								onClick={() => handleScroll('right')}
							/>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}
