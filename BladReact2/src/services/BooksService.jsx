// services/booksService.js
export const fetchTrendingBooks = async () => {
	try {
		const response = await fetch(
			'https://openlibrary.org/search.json?q=javascript&limit=10'
		);
		const data = await response.json();
		return data.docs.map((book) => ({
			id: book.key,
			title: book.title,
			author: book.author_name ? book.author_name[0] : 'Unknown',
			coverId: book.cover_i,
		}));
	} catch (error) {
		console.error('Error fetching books:', error);
		return [];
	}
};
