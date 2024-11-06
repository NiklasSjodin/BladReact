import React, { useEffect, useState } from 'react';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';

// Component to render each book cover in the scrolling menu
function BookCard({ title, coverId }) {
	const coverUrl = coverId
		? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
		: 'https://via.placeholder.com/150'; // Fallback if no cover is available

	return (
		<div className='flex-shrink-0 w-48 h-64 m-2 rounded-lg bg-gray-200 flex flex-col items-center justify-center p-2'>
			<img
				src={coverUrl}
				alt={title}
				className='w-full h-48 object-cover rounded'
			/>
			<p className='mt-2 text-center'>{title}</p>
		</div>
	);
}

export default function Home() {
	const [books, setBooks] = useState([]);

	useEffect(() => {
		// Fetch data from Open Library's search API
		const fetchBooks = async () => {
			try {
				const response = await fetch(
					`https://openlibrary.org/search.json?q=javascript&limit=10`
				);
				const data = await response.json();
				// Map over the returned data to extract needed information
				const fetchedBooks = data.docs.map((book) => ({
					id: book.key,
					title: book.title,
					coverId: book.cover_i, // Open Library's cover ID
				}));
				setBooks(fetchedBooks);
			} catch (error) {
				console.error('Error fetching books:', error);
			}
		};

		fetchBooks();
	}, []);

	return (
		<>
			<div className='flex flex-col min-h-screen'>
				<main className='flex-grow'>
					<h1>Welcome home</h1>

					<div className='mt-4 max-w-7xl'>
						<h2>Books on JavaScript</h2>
						<div className=''>
							<ScrollMenu className='mt-4 '>
								{books.map((book) => (
									<BookCard
										key={book.id}
										title={book.title}
										coverId={book.coverId}
										itemId={book.id} // Required for ScrollMenu tracking
									/>
								))}
							</ScrollMenu>
						</div>
					</div>
				</main>
			</div>
		</>
	);
}
