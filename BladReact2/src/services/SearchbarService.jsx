import { Production_API_URL, Local_API_URL } from './api';

const API_URL = Production_API_URL;

export const fetchBooksThroughSearchbar = async (query) => {
	try {
		const query = 'javascript'; // Replace 'javascript' with your variable
		const response = await fetch(
			`${API_URL}OpenLibraryAPI/search?query=${query}`
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
