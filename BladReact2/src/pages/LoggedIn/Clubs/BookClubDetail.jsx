import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PageContainer } from '../../../components/layout/PageContainer';
import { format } from 'date-fns';
import placeholder from '../../../images/placeholder-2.jpg';
import { useAuthFetch } from '../../../services/useAuthFetch';
import { VITE_AZURE_API_URL } from '../../../services/api';

export default function BookClubDetail() {
	const params = useParams();
	const navigate = useNavigate();
	const {
		authFetch,
		isLoading: authLoading,
		error: authError,
	} = useAuthFetch();

	console.log('Params:', params);
	console.log('Club ID from params:', params.id);

	const [clubDetails, setClubDetails] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [bookDetails, setBookDetails] = useState({});
	const [memberDetails, setMemberDetails] = useState({});
	const [forums, setForums] = useState([]);

	const API_URL = VITE_AZURE_API_URL;

	useEffect(() => {
		const fetchClubDetails = async () => {
			if (!params.id) {
				console.log('No club ID provided');
				setError('No club ID available');
				return;
			}

			try {
				console.log('Fetching all clubs to find ID:', params.id);
				const result = await authFetch(`${API_URL}/bookclubs`, {
					headers: {
						Accept: 'application/json',
					},
				});

				if (!result?.data) {
					setError('No data received from server');
					return;
				}

				// Find the specific club from the list
				const club = result.data.find((club) => club.id === params.id);

				if (!club) {
					setError('Club not found');
					return;
				}

				console.log('Found club details:', club);
				setClubDetails(club);
				setError(null);
				setIsLoading(false);
			} catch (err) {
				console.error('Detailed fetch error:', {
					message: err.message,
					stack: err.stack,
					params: params,
				});
				setError(err.message || 'Failed to fetch club details');
				setIsLoading(false);
			}
		};

		fetchClubDetails();
	}, [params.id, authFetch]);

	useEffect(() => {
		const fetchBookDetails = async () => {
			if (!clubDetails?.books?.length) return;

			try {
				const bookPromises = clubDetails.books.map((book) =>
					authFetch(`${API_URL}/books/${book.bookReferenceId}`)
				);

				const books = await Promise.all(bookPromises);
				const booksMap = books.reduce((acc, book, index) => {
					acc[book.id] = book;
					return acc;
				}, {});

				setBookDetails(booksMap);
			} catch (error) {
				console.error('Error fetching book details:', error);
			}
		};

		fetchBookDetails();
	}, [clubDetails, authFetch]);

	useEffect(() => {
		const fetchMemberDetails = async () => {
			if (!clubDetails?.members) return;

			try {
				const memberPromises = clubDetails.members.map(async (member) => {
					const response = await fetch(`${API_URL}/users/${member.userId}`);
					if (!response.ok)
						throw new Error(`HTTP error! status: ${response.status}`);
					const data = await response.json();
					return { userId: member.userId, details: data, role: member.role };
				});

				const members = await Promise.all(memberPromises);
				const membersMap = members.reduce((acc, member) => {
					acc[member.userId] = { ...member.details, role: member.role };
					return acc;
				}, {});

				setMemberDetails(membersMap);
			} catch (error) {
				console.error('Error fetching member details:', error);
			}
		};

		fetchMemberDetails();
	}, [clubDetails]);

	useEffect(() => {
		const fetchForums = async () => {
			try {
				const forumsData = await authFetch(
					`${API_URL}/bookclubs/${params.id}/forums`
				);
				setForums(forumsData || []);
			} catch (error) {
				console.error('Error fetching forums:', error);
			}
		};

		if (params.id) {
			fetchForums();
		}
	}, [params.id, authFetch]);

	const formatDate = (dateString) => {
		if (!dateString) return 'N/A';
		try {
			const date = new Date(dateString);
			if (isNaN(date.getTime())) {
				return 'Invalid date';
			}
			return format(date, 'PPP');
		} catch (error) {
			console.error('Error formatting date:', error);
			return 'Invalid date';
		}
	};

	const renderBooksSection = () => {
		if (!clubDetails?.books)
			return (
				<p className='text-gray-600 dark:text-gray-400'>No books added yet</p>
			);

		return (
			<div>
				<h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
					Books
				</h2>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
					{clubDetails.books.map((book) => {
						const details = bookDetails[book.id];
						return (
							<Link
								key={book.id}
								to={`/books/${book.bookReferenceId}`}
								className='block p-4 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'
							>
								<div className='space-y-2'>
									{details ? (
										<>
											<img
												src={details.coverUrl || '/default-book-cover.jpg'}
												alt={details.title}
												className='w-full h-48 object-cover rounded-md'
												onError={(e) => {
													e.target.onerror = null;
													e.target.src = '/default-book-cover.jpg';
												}}
											/>
											<h3 className='font-medium text-gray-900 dark:text-white'>
												{details.title}
											</h3>
											<p className='text-sm text-gray-600 dark:text-gray-400'>
												{details.author}
											</p>
										</>
									) : (
										<div className='animate-pulse'>
											<div className='w-full h-48 bg-gray-300 dark:bg-gray-700 rounded-md mb-2'></div>
											<div className='h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4'></div>
										</div>
									)}
								</div>
							</Link>
						);
					})}
				</div>
			</div>
		);
	};

	const renderMembersSection = () => (
		<div className='w-full mb-8'>
			<h2 className='text-2xl font-semibold text-gray-900 dark:text-white mb-4'>
				Members
			</h2>
			<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6'>
				{clubDetails.members?.map((member) => {
					const details = memberDetails[member.userId];
					return (
						<div
							key={member.userId}
							className='flex flex-col items-center text-center'
						>
							<div className='relative'>
								<img
									src={details?.avatarUrl || '/default-avatar.jpg'}
									alt={details?.username || 'Loading...'}
									className='w-20 h-20 rounded-full object-cover'
								/>
							</div>
							<p className='text-sm text-gray-900 dark:text-white'>
								{details?.username}
							</p>
							<p className='text-sm text-gray-600 dark:text-gray-400'>
								{details?.role}
							</p>
						</div>
					);
				})}
			</div>
		</div>
	);

	const renderForums = () => (
		<div className='w-full mb-8'>
			<h2 className='text-2xl font-semibold text-gray-900 dark:text-white mb-4'>
				Discussion Forums
			</h2>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
				{forums.length > 0 ? (
					forums.map((forum) => (
						<div
							key={forum.id}
							onClick={() => navigate(`/clubs/${params.id}/forums/${forum.id}`)}
							className='bg-gray-100 dark:bg-gray-800 p-4 rounded-lg cursor-pointer 
                                     hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'
						>
							<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
								{forum.title}
							</h3>
							<div className='flex items-center justify-between'>
								<span className='text-gray-600 dark:text-gray-400'>
									{forum.forumType}
								</span>
								<div className='flex items-center space-x-4'>
									<span className='text-gray-600 dark:text-gray-400'>
										{forum.commentCount} comments
									</span>
									<span
										className={`px-2 py-1 text-sm rounded-full ${
											forum.status === 'Open'
												? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
												: 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
										}`}
									>
										{forum.status}
									</span>
								</div>
							</div>
						</div>
					))
				) : (
					<div className='col-span-2 text-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg'>
						No discussion forums available
					</div>
				)}
			</div>
		</div>
	);

	if (authLoading) {
		return (
			<PageContainer>
				<div className='flex justify-center items-center min-h-screen'>
					<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900'></div>
				</div>
			</PageContainer>
		);
	}

	if (error || authError) {
		return (
			<PageContainer>
				<div className='min-h-screen flex justify-center items-center'>
					<div
						className='max-w-md w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'
						role='alert'
					>
						<strong className='font-bold'>Error: </strong>
						<span className='block sm:inline'>{error || authError}</span>
						<p className='mt-2 text-sm'>
							Please try again later or contact support if the issue persists.
						</p>
						<button
							onClick={() => window.location.reload()}
							className='mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors'
						>
							Retry
						</button>
					</div>
				</div>
			</PageContainer>
		);
	}

	if (!clubDetails) {
		return (
			<PageContainer>
				<div className='min-h-screen flex justify-center items-center'>
					<div className='text-gray-600'>Club not found</div>
				</div>
			</PageContainer>
		);
	}

	return (
		<PageContainer>
			<div className='max-w-7xl mx-auto px-4 py-8'>
				{/* Club Info Grid */}
				<div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-8'>
					{/* Left Column */}
					<div className='space-y-4'>
						<img
							src={clubDetails.imageUrl || placeholder}
							alt={clubDetails.name}
							className='w-full h-64 object-cover rounded-lg shadow-lg'
							onError={(e) => {
								e.target.onerror = null;
								e.target.src = placeholder;
							}}
						/>
						<h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
							{clubDetails.name}
						</h1>
					</div>

					{/* Right Column */}
					<div className='space-y-6 text-gray-700 dark:text-gray-300'>
						{/* About Section */}
						<div>
							<h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
								About
							</h2>
							<p>Status: {clubDetails.status}</p>
							<p>Total Members: {clubDetails.totalMembers}</p>
							<p>Created: {formatDate(clubDetails.createdAt)}</p>
						</div>

						{/* Rules Section */}
						<div>
							<h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
								Rules
							</h2>
							<p>{clubDetails.rules}</p>
						</div>

						{/* Books Section */}
						{renderBooksSection()}
					</div>
				</div>

				{/* Members Section */}
				{renderMembersSection()}

				{/* Discussion Forums Section */}
				{renderForums()}
			</div>
		</PageContainer>
	);
}
