// const API_URL = 'https://localhost:7076/';

export const FetchBooks = async (searchQuery = '') => {
	try {
		const response = await fetch(
			// `${API_URL}api/OpenLibraryAPI/search?query=${searchQuery}`
			`https://openlibrary.org/search.json?q=${searchQuery}`
		);
		const data = await response.json();
		return data.docs.map((book) => ({
			id: book.key,
			title: book.title,
			author: book.author_name ? book.author_name[0] : 'Unknown',
			coverId: book.cover_i
				// ? `${API_URL}api/OpenLibraryAPI/cover/${book.cover_i}`
				? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
				: null,
		}));
	} catch (error) {
		console.error('Error fetching books:', error);
		return [];
	}
};
