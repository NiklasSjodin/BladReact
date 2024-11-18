export default ListBooks;

import { useEffect, useState } from 'react';
import { fetchBooks } from '../../services/BooksService';
import ScrollableContainer from '../Sections/ScrollableContainer';
import { SectionHeader } from '../Sections/SectionHeader';
import BookCard from '../BookCard';

export const ListBooks = () => {
	const [books, setBooks] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const loadBooks = async () => {
			setIsLoading(true);
			try {
				const fetchedBooks = await fetchBooks({ 
					searchQuery: 'trending',
					limit: 10 
				});
				setBooks(fetchedBooks);
			} catch (error) {
				console.error('Error loading books:', error);
			} finally {
				setIsLoading(false);
			}
		};
		loadBooks();
	}, []);

	return (
		<div className='mt-8 max-w-7xl'>
			<SectionHeader 
				title='Trendande' 
				viewAllLink='#'
				variant='large'
			/>
			<ScrollableContainer itemWidth={208}>
				{isLoading ? (
					Array.from({ length: 10 }).map((_, index) => (
						<BookCardSkeleton key={index} />
					))
				) : books.map((book) => (
					<BookCard
						key={book.id}
						{...book}
						interactive={true}
						size="md"
					/>
				))}
			</ScrollableContainer>
		</div>
	);
};
