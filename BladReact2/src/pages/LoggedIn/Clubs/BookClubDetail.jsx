import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PageContainer } from '../../../components/layout/PageContainer';
import { format } from 'date-fns';

export default function BookClubDetail() {
    const params = useParams();
    const navigate = useNavigate();
    
    console.log('Params:', params);
    console.log('Club ID from params:', params.id);

    const [clubDetails, setClubDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [bookDetails, setBookDetails] = useState({});
    const [memberDetails, setMemberDetails] = useState({});

    useEffect(() => {
        const fetchClubDetails = async () => {
            if (!params.id) {
                console.log('No ID available, skipping fetch');
                setError('Invalid book club ID');
                setIsLoading(false);
                return;
            }

            console.log('Fetching details for ID:', params.id);
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(`https://localhost:7076/api/bookclubs/${params.id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                setClubDetails(result);
            } catch (error) {
                console.error('Error fetching club details:', error);
                setError('Failed to load book club details');
            } finally {
                setIsLoading(false);
            }
        };

        fetchClubDetails();
    }, [params.id]);

    useEffect(() => {
        const fetchBookDetails = async () => {
            if (!clubDetails?.books) return;

            try {
                const bookPromises = clubDetails.books.map(async (book) => {
                    const response = await fetch(`https://localhost:7076/api/books/${book.bookReferenceId}`);
                    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                    const data = await response.json();
                    return { ...book, details: data };
                });

                const books = await Promise.all(bookPromises);
                const booksMap = books.reduce((acc, book) => {
                    acc[book.id] = book.details;
                    return acc;
                }, {});
                
                setBookDetails(booksMap);
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };

        fetchBookDetails();
    }, [clubDetails]);

    useEffect(() => {
        const fetchMemberDetails = async () => {
            if (!clubDetails?.members) return;

            try {
                const memberPromises = clubDetails.members.map(async (member) => {
                    const response = await fetch(`https://localhost:7076/api/users/${member.userId}`);
                    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
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
        if (!clubDetails?.books) return <p className="text-gray-400">No books added yet</p>;

        return (
            <div>
                <h2 className="text-xl font-semibold text-white mb-2">Books</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {clubDetails.books.map(book => {
                        const details = bookDetails[book.id];
                        return (
                            <Link 
                                key={book.id} 
                                to={`/books/${book.bookReferenceId}`}
                                className="block p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                            >
                                <div className="space-y-2">
                                    {details ? (
                                        <>
                                            <img
                                                src={details.coverUrl || '/default-book-cover.jpg'}
                                                alt={details.title}
                                                className="w-full h-48 object-cover rounded-md"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = '/default-book-cover.jpg';
                                                }}
                                            />
                                            <h3 className="font-medium text-white">{details.title}</h3>
                                            <p className="text-sm text-gray-400">{details.author}</p>
                                        </>
                                    ) : (
                                        <div className="animate-pulse">
                                            <div className="w-full h-48 bg-gray-700 rounded-md mb-2"></div>
                                            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
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
        <div className="w-full mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Members</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {clubDetails.members?.map(member => {
                    const details = memberDetails[member.userId];
                    return (
                        <div 
                            key={member.userId}
                            className="flex flex-col items-center text-center"
                        >
                            <div className="relative">
                                <img
                                    src={details?.avatarUrl || '/default-avatar.jpg'}
                                    alt={details?.username || 'Loading...'}
                                    className="w-20 h-20 rounded-full object-cover"
                                />
                            </div>
                            <p className="text-sm">{details?.username}</p>
                            <p className="text-sm text-gray-400">{details?.role}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );

    const renderDiscussionForums = () => (
        <div className="w-full">
            <h2 className="text-2xl font-semibold text-white mb-4">Discussion Forums</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {clubDetails.discussionForums?.length > 0 ? (
                    clubDetails.discussionForums.map(forum => (
                        <Link 
                            key={forum.id} 
                            to={`/clubs/${clubDetails.id}/forums/${forum.id}`}
                            className="block p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                        >
                            <div className="space-y-2">
                                <h3 className="font-medium text-white text-lg">{forum.title}</h3>
                                <div className="space-y-1">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-300">
                                            Type: {forum.forumType}
                                        </span>
                                        <span className={`px-2 py-1 text-xs rounded-full ${
                                            forum.status === 'Open' ? 'bg-green-600' : 'bg-red-600'
                                        }`}>
                                            {forum.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-300">
                                        Comments: {forum.commentCount}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p className="text-gray-400">No discussion forums available</p>
                )}
            </div>
        </div>
    );

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;
    if (!clubDetails) return <div>Club not found</div>;

    return (
        <PageContainer>
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Club Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* Left Column */}
                    <div className="space-y-4">
                        <img
                            src={clubDetails.imageUrl || '/default-club-image.jpg'}
                            alt={clubDetails.name}
                            className="w-full h-64 object-cover rounded-lg shadow-lg"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/default-club-image.jpg';
                            }}
                        />
                        <h1 className="text-3xl font-bold text-white">{clubDetails.name}</h1>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6 text-gray-300">
                        {/* About Section */}
                        <div>
                            <h2 className="text-xl font-semibold text-white mb-2">About</h2>
                            <p>Status: {clubDetails.status}</p>
                            <p>Total Members: {clubDetails.totalMembers}</p>
                            <p>Created: {formatDate(clubDetails.createdAt)}</p>
                        </div>

                        {/* Rules Section */}
                        <div>
                            <h2 className="text-xl font-semibold text-white mb-2">Rules</h2>
                            <p>{clubDetails.rules}</p>
                        </div>

                        {/* Books Section */}
                        {renderBooksSection()}
                    </div>
                </div>

                {/* Members Section */}
                {renderMembersSection()}

                {/* Discussion Forums Section */}
                {renderDiscussionForums()}
            </div>
        </PageContainer>
    );
} 