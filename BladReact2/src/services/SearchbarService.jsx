const API_URL = 'https://localhost:7076/';

export const fetchBooksThroughSearchbar = async (query) => {
	try {
		const query = 'javascript'; // Replace 'javascript' with your variable
		const response = await fetch(
			`${API_URL}api/OpenLibraryAPI/search?query=${query}`
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
