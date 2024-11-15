export default TrendingBooks;

import { useEffect, useState } from 'react';
import { FetchBooks } from '../../services/booksService';
import ScrollableContainer from '../Sections/ScrollableContainer';
import { SectionHeader } from '../Sections/SectionHeader';
import BookCard from '../BookCard';

export const TrendingBooks = () => {
	const [books, setBooks] = useState([]);

	useEffect(() => {
		const loadBooks = async () => {
			const fetchedBooks = await FetchBooks();
			setBooks(fetchedBooks);
		};
		loadBooks();
	}, []);

	return (
		<div className='mt-8 max-w-7xl'>
			<SectionHeader title='Trendande' viewAllLink='#' />
			<ScrollableContainer itemWidth={208}>
				{books.map((book) => (
					<BookCard
						key={book.id}
						title={book.title}
						author={book.author}
						coverId={book.coverId}
					/>
				))}
			</ScrollableContainer>
		</div>
	);
};
