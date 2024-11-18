/**
 * Enhanced BooksService
 * Handles all book-related API calls to OpenLibrary
 * Features:
 * - Search functionality
 * - Performance monitoring
 * - Consistent error handling
 * - Response formatting
 */

const API_URL = 'https://openlibrary.org';
const COVERS_URL = 'https://covers.openlibrary.org';

/**
 * Maps raw book data to consistent format
 * @param {Object} book - Raw book data from API
 * @returns {Object} Formatted book object
 */
const mapBookData = (book) => ({
	id: book.key,
	title: book.title || 'Untitled',
	author: book.author_name?.[0] || 'Unknown',
	coverId: book.cover_i,
	publishYear: book.first_publish_year,
	language: book.language?.[0],
	subjects: book.subject?.slice(0, 5) || []
});

/**
 * Enhanced book fetching with performance monitoring
 * @param {Object} options
 * @param {string} options.searchQuery - Search term
 * @param {number} options.limit - Maximum results
 * @param {string} options.subject - Filter by subject
 * @returns {Promise<Array>} Formatted array of book objects
 */
export const fetchBooks = async ({ 
	searchQuery = '', 
	limit = 10,
	subject = ''
}) => {
	const startTime = performance.now();
	
	try {
		const queryParams = new URLSearchParams({
			q: searchQuery || 'popular',
			limit: limit.toString(),
			...(subject && { subject })
		});

		const response = await fetch(`${API_URL}/search.json?${queryParams}`);
		
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		
		const fetchTime = performance.now() - startTime;
		console.log(`API Fetch time: ${fetchTime.toFixed(2)}ms`);
		
		const mappingStart = performance.now();
		const mappedBooks = data.docs.slice(0, limit).map(mapBookData);
		
		const mappingTime = performance.now() - mappingStart;
		console.log(`Data mapping time: ${mappingTime.toFixed(2)}ms`);
		
		return mappedBooks;
	} catch (error) {
		console.error('Error fetching books:', error);
		throw new Error('Failed to fetch books. Please try again later.');
	}
};

/**
 * Search books with optional filters
 * @param {string} query - Search query
 * @param {Object} options - Search options
 * @returns {Promise<Array>} Search results
 */
export const searchBooks = async (query, options = {}) => {
	return fetchBooks({ 
		searchQuery: query,
		...options
	});
};

/**
 * Get book cover URL
 * @param {string} coverId - Cover ID
 * @param {string} size - Size variant ('S', 'M', 'L')
 * @returns {string} Cover URL
 */
export const getBookCoverUrl = (coverId, size = 'M') => {
	if (!coverId) return null;
	return `${COVERS_URL}/b/id/${coverId}-${size}.jpg`;
};
