export default ListBooks;

import { useEffect, useState } from 'react';
import { useAuthFetch } from '../../hooks/useAuthFetch';
import ScrollableContainer from '../Sections/ScrollableContainer';
import { SectionHeader } from '../Sections/SectionHeader';
import BookCard from '../BookCard';

export const ListBooks = () => {
	const { authFetch, isLoading } = useAuthFetch();
	const [books, setBooks] = useState([]);
	const API_URL = 'https://blad-api.azurewebsites.net/api/';
	useEffect(() => {
		const loadBooks = async () => {
			try {
				const fetchedBooks = await authFetch(
					`${API_URL}OpenLibraryAPI/search?query=trending&limit=10`
				);
				setBooks(fetchedBooks);
			} catch (error) {
				console.error('Error loading books:', error);
			}
		};
		loadBooks();
	}, [authFetch]);

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
