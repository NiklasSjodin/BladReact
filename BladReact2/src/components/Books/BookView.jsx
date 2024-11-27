import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AddToBookListModal from '../Modal/AddToListModal';
import { jwtDecode } from 'jwt-decode';
import { VITE_AZURE_API_URL } from '../../services/api';
import { useAuthFetch } from '../../services/useAuthFetch';

const BookView = () => {
	const { isbn } = useParams(); // Get the isbn from the URL
	const [book, setBook] = useState(null);
	const [bookClubs, setBookClubs] = useState([]);
	const [bookReviews, setReviews] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [userId, setUserId] = useState(null);
	const [bookLists, setBookLists] = useState([]);
	const [bookReference, setBookReference] = useState(null);
	const { authFetch } = useAuthFetch();
	const API_URL = VITE_AZURE_API_URL;

	useEffect(() => {
		const token = localStorage.getItem('token');
		console.log('token:', token);
		if (token) {
			try {
				const decoded = jwtDecode(token);
				const extractedUserId =
					decoded[
						'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
					];
				setUserId(extractedUserId);
			} catch (error) {
				console.error('Error decoding token:', error);
			}
		}
	}, []);

	useEffect(() => {
		if (userId) {
			const fetchBookLists = async () => {
				try {
					const response = await fetch(`${API_URL}/user/${userId}/booklist`, {
						headers: {
							Authorization: `Bearer ${localStorage.getItem('token')}`,
						},
					});
					if (!response.ok) throw new Error('Failed to fetch book lists');
					const data = await response.json();
					setBookLists(data); // Spara boklistorna i state
				} catch (error) {
					console.error('Error fetching book lists:', error.message);
				}
			};

			fetchBookLists();
		}
	}, [userId]);

	useEffect(() => {
		const fetchBookData = async () => {
			try {
				setLoading(true);
				
				// First try to get book from our database
				let bookData = null;
				try {
					const response = await authFetch(`${API_URL}/book/isbn/${isbn}`);
					bookData = response;
				} catch (error) {
					// If not found in our database, fetch from Google Books
					const googleResponse = await authFetch(
						`${API_URL}/googlebooks/search/isbn?isbn=${isbn}`
					);
					bookData = googleResponse;
				}

				if (!bookData) {
					throw new Error('Book not found');
				}

				setBook(bookData);
				
				// Add this: Fetch book reference
				try {
					const referenceResponse = await authFetch(`${API_URL}/book/reference/${isbn}`);
					setBookReference(referenceResponse);
				} catch (error) {
					console.warn('Could not fetch book reference:', error);
				}
				
				setLoading(false);
			} catch (error) {
				console.error('Error fetching book:', error);
				setError(error.message);
				setLoading(false);
			}
		};

		if (isbn) {
			fetchBookData();
		}
	}, [isbn, authFetch]);

	// Fetch user's book lists only if we have both userId and book data
	useEffect(() => {
		const fetchBookLists = async () => {
			if (!userId || !book) return;
			
			try {
				const response = await authFetch(`${API_URL}/booklist/user/${userId}`);
				if (response) {
					setBookLists(response);
				}
			} catch (error) {
				console.warn('Error fetching book clubs or reviews:', error.message);
			}
		};

		fetchBookLists();
	}, [userId, book, authFetch]);

	if (loading)
		return <p className='text-center text-xl font-semibold'>Laddar...</p>;
	if (error) return <p className='text-center text-red-500'>{error}</p>;
	if (!book)
		return <p className='text-center text-gray-500'>Ingen bok hittades!</p>;

	return (
		<div className='max-w-4xl mx-auto pt-32 p-6 bg-gray-50 rounded-md shadow-md'>
			<div className='flex flex-col md:flex-row items-start md:items-center gap-6'>
				{book.thumbnail && (
					<img
						className='w-48 h-auto rounded-lg shadow'
						src={book.thumbnail}
						alt={`${book.title} Omslag`}
					/>
				)}
				<div>
					<h1 className='text-3xl font-bold text-gray-800'>{book.title}</h1>
					<p className='text-gray-800 mt-1'>
						<strong>Författare:</strong>
						<span className='text-gray-600'> {book.author || 'Okänt'}</span>
					</p>
					<p className='text-gray-800 mt-1'>
						<strong>Publiceringsår:</strong>{' '}
						<span className='text-gray-600'>{book.year || 'Okänt'}</span>
					</p>
					<p className='text-gray-800 mt-1'>
						<strong>Genre:</strong>{' '}
						<span className='text-gray-600'>{book.genres || 'Okänd'}</span>
					</p>
					<Button
						className='mt-5'
						onClick={() => setIsModalOpen(true)}
					>
						Lägg till i lista
					</Button>
				</div>
			</div>

			<p className='mt-6 text-gray-700'>
				<strong>Beskrivning:</strong>
				<span className='block mt'>
					{' '}
					{book.description || 'Ingen beskrivning hittades'}
				</span>
			</p>

			{isModalOpen && (
				<AddToBookListModal
					userId={userId}
					bookId={bookReference?.id}
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
				/>
			)}

			{/* Book Clubs */}
			<div className='mt-8'>
				<h3 className='text-xl font-semibold text-gray-800'>
					Bokklubbar som läser denna bok:
				</h3>
				<ul className='mt-4'>
					{bookClubs.length > 0 ? (
						bookClubs.map((club) => (
							<li
								key={club.id}
								className='py-2 px-4 bg-gray-100 rounded-md shadow-sm mb-2'
							>
								{club.name} - {club.memberCount} medlemmar
							</li>
						))
					) : (
						<p className='text-gray-500'>
							Det finns ingen bokklubb som läser denna bok just nu.
						</p>
					)}
				</ul>
			</div>

			{/* Reviews */}
			<div className='mt-8'>
				<h3 className='text-xl font-semibold text-gray-800'>
					Användarrecensioner:
				</h3>
				<ul className='mt-4'>
					{bookReviews.length > 0 ? (
						bookReviews.map((review) => (
							<li
								key={review.id}
								className='py-2 px-4 bg-gray-100 rounded-md shadow-sm mb-2'
							>
								<p>
									<strong>{review.userName}:</strong> {review.rating}/5
								</p>
								<p>{review.comment}</p>
							</li>
						))
					) : (
						<p className='text-gray-500'>
							Ingen recensioner ännu. Var först med att recencera!
						</p>
					)}
				</ul>
			</div>
		</div>
	);
};

export default BookView;
