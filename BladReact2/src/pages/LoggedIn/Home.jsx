import React, { useState, useEffect } from 'react';
import { PageContainer } from '../../components/layout/PageContainer';
import ScrollableContainer from '@/components/Sections/ScrollableContainer';
import BookCard from '@/components/BookCard';
import { FetchBooks } from '@/services/BooksService';

export default function Home() {
	const [books, setBooks] = useState([]);

	useEffect(() => {
		const loadBooks = async () => {
			const fetchedBooks = await FetchBooks();
			setBooks(fetchedBooks);
		};
		loadBooks();
	}, []);

	return (
		<PageContainer>
			<h1 className='text-2xl font-bold text-white pt-6'>Welcome home</h1>
			
			<ScrollableContainer title="Popular Books" viewAllLink="/books" itemWidth={192}>
				{books.map((book) => (
					<BookCard
						key={book.id}
						title={book.title}
						author={book.author}
						coverId={book.coverId}
					/>
				))}
			</ScrollableContainer>
		</PageContainer>
	);
}
