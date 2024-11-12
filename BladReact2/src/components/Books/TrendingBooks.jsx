import { useEffect, useState } from 'react';
import { fetchTrendingBooks } from '../../services/booksService';
import ScrollableContainer from '../Sections/ScrollableContainer';
import { SectionHeader } from '../Sections/SectionHeader';
import BookCard from '../BookCard';

export const TrendingBooks = () => {
	const [books, setBooks] = useState([]);

	useEffect(() => {
		const loadBooks = async () => {
			const fetchedBooks = await fetchTrendingBooks();
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
			<SectionHeader title='Vänner (aktivitet)' viewAllLink='#' />
			<SectionHeader title='Klubbar (aktivitet)' viewAllLink='#' />
		</div>
	);
};
