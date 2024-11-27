import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { CardSkeleton } from '@/components/CardSkeleton';
import { useAuthFetch } from '@/services/useAuthFetch';
import { VITE_AZURE_API_URL } from '@/services/api';
import BookClubCard from '@/components/Cards/BookClubCard';

export default function ClubResults() {
    const [clubs, setClubs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { authFetch } = useAuthFetch();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const API_URL = VITE_AZURE_API_URL;

    const query = location.state?.searchQuery || searchParams.get('query') || 'popular';
    const pageSize = location.state?.pageSize || searchParams.get('pageSize') || 20;
    const apiUrl = location.state?.apiUrl || 
        `${API_URL}/bookclubs/popular?PageSize=${pageSize}&PageIndex=1`;

    const skeletonItems = useMemo(() => 
        Array.from({ length: pageSize }, (_, index) => index), 
        [pageSize]
    );

    useEffect(() => {
        const loadClubs = async () => {
            setIsLoading(true);
            try {
                const response = await authFetch(apiUrl);
                setClubs(response.data || []);
            } catch (error) {
                console.error('Error loading clubs:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadClubs();
    }, [authFetch, apiUrl]);

    const handleClubClick = (clubId) => {
        navigate(`/clubs/${clubId}`);
    };

    return (
        <PageContainer>
            <div className='space-y-8'>
                <h1 className='text-3xl font-bold text-bladLightTextColor'>
                    {query === 'popular' ? 'Populära bokklubbar' : query}
                </h1>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4'>
                    {isLoading ? (
                        Array.from({ length: pageSize }).map((_, index) => (
                            <div key={`skeleton-${index}`} className='w-full'>
                                <CardSkeleton />
                            </div>
                        ))
                    ) : (
                        clubs.map((club) => (
                            <div 
                                key={club.id} 
                                className='w-full'
                                onClick={() => handleClubClick(club.id)}
                            >
                                <BookClubCard {...club} />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </PageContainer>
    );
} 