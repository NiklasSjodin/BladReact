import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PageContainer } from '../../../components/layout/PageContainer';
import { format } from 'date-fns';

export default function BookClubDetail() {
    const { id } = useParams();
    const [clubDetails, setClubDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchClubDetails = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`https://localhost:7076/api/bookclubs/${id}`);
                const result = await response.json();
                setClubDetails(result);
            } catch (error) {
                console.error('Error fetching club details:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchClubDetails();
    }, [id]);

    if (isLoading) return <div>Loading...</div>;
    if (!clubDetails) return <div>Club not found</div>;

    return (
        <PageContainer>
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-4">
                        <img
                            src={clubDetails.coverImage || '/default-club-image.jpg'}
                            alt={clubDetails.name}
                            className="w-full rounded-lg shadow-lg"
                        />
                        <h1 className="text-3xl font-bold text-white">{clubDetails.name}</h1>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6 text-gray-300">
                        <div>
                            <h2 className="text-xl font-semibold text-white mb-2">About</h2>
                            <p>Status: {clubDetails.status}</p>
                            <p>Members: {clubDetails.totalMembers}</p>
                            <p>Created: {format(new Date(clubDetails.createdAt), 'PPP')}</p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-white mb-2">Rules</h2>
                            <p>{clubDetails.rules}</p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-white mb-2">Discussion Forums</h2>
                            <div className="space-y-2">
                                {clubDetails.discussionForums.map(forum => (
                                    <div key={forum.id} className="p-4 bg-gray-800 rounded-lg">
                                        <h3 className="font-medium text-white">{forum.title}</h3>
                                        <p className="text-sm">Type: {forum.forumType}</p>
                                        <p className="text-sm">Comments: {forum.commentCount}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-white mb-2">Members</h2>
                            <p>{clubDetails.members.length} members</p>
                        </div>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
} 