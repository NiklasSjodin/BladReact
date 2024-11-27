import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import BookCard from '@/components/BookCard';
import { CardSkeleton } from '@/components/CardSkeleton';
import { useAuthFetch } from '@/services/useAuthFetch';
import { VITE_AZURE_API_URL } from '@/services/api';

export default function SearchResults() {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { authFetch } = useAuthFetch();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const API_URL = VITE_AZURE_API_URL;

    // Get query from state or URL params, fallback to default
    const query = location.state?.searchQuery || searchParams.get('query') || 'react for dummies';
    const apiUrl = location.state?.apiUrl || 
        `${API_URL}/googlebooks/search/General?SearchTerm=${query}&pageSize=20`;

    const skeletonItems = useMemo(() => 
        Array.from({ length: 20 }, (_, index) => index), 
        []
    );

    useEffect(() => {
        const loadBooks = async () => {
            setIsLoading(true);
            try {
                const response = await authFetch(apiUrl);
                const mappedBooks = response.data.map((book) => ({
                    id: book.externalId,
                    isbn: book.isbn,
                    title: book.title || 'Untitled',
                    author: book.author || 'Unknown',
                    coverId: book.thumbnail,
                    publishYear: book.year,
                    language: book.language,
                    subjects: book.genres ? [book.genres] : []
                }));
                setBooks(mappedBooks);
            } catch (error) {
                console.error('Error loading books:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadBooks();
    }, [authFetch, apiUrl]);

    return (
        <PageContainer>
            <div className='space-y-6'>
                <h1 className='text-3xl font-bold text-bladLightTextColor'>
                    {query.charAt(0).toUpperCase() + query.slice(1)}
                </h1>
                <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4'>
                    {isLoading
                        ? skeletonItems.map((index) => (
                            <CardSkeleton key={`skeleton-${index}`} />
                        ))
                        : books.map((book) => (
                            <BookCard
                                key={book.isbn || book.id}
                                {...book}
                            />
                        ))}
                </div>
            </div>
        </PageContainer>
    );
} 