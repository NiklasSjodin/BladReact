import React, { useState, useEffect, useRef } from 'react';
import { PageContainer } from '../../../components/layout/PageContainer';
import { CardSkeleton } from '../../../components/CardSkeleton';
import BookCard from '../../../components/BookCard';
import ScrollableContainer from '../../../components/Sections/ScrollableContainer';
import { fetchBooks } from '../../../services/BooksService';
import { BsSearch } from 'react-icons/bs';
import { Searchbar } from '../../../components/Searchbar';

export default function Explore() {
    const [searchTerm, setSearchTerm] = useState('');
    const [genreBooks, setGenreBooks] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [selectedGenre, setSelectedGenre] = useState(null);
    
    // Create refs for each genre section
    const genreRefs = useRef({});

    const genres = [
        { id: 'fantasy', name: 'Fantasy' },
        { id: 'scifi', name: 'Science Fiction' },
        { id: 'mystery', name: 'Mystery' },
        { id: 'romance', name: 'Romance' },
        { id: 'thriller', name: 'Thriller' },
        { id: 'horror', name: 'Horror' }
    ];

    useEffect(() => {
        // Initialize refs for each genre
        genres.forEach(genre => {
            genreRefs.current[genre.id] = genreRefs.current[genre.id] || React.createRef();
        });
    }, []);

    const handleGenreClick = (genreId) => {
        setSelectedGenre(genreId);
        // Smooth scroll to the selected genre section
        genreRefs.current[genreId]?.current?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    };

    useEffect(() => {
        const loadBooks = async () => {
            setIsLoading(true);
            try {
                const genrePromises = genres.map(genre => 
                    fetchBooks({ searchQuery: genre.name, limit: 10 })
                );
                const results = await Promise.all(genrePromises);
                
                const booksMap = {};
                genres.forEach((genre, index) => {
                    booksMap[genre.id] = results[index];
                });
                
                setGenreBooks(booksMap);
            } catch (error) {
                console.error('Error loading books:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadBooks();
    }, []);

    return (
        <PageContainer>
            <div className='space-y-8 pb-24'>
                <div className='pt-6 space-y-4 z-10 pb-4'>
                    <h1 className='text-3xl font-bold text-bladLightTextColor'>
                        Explore Books
                    </h1>
                    <p className='text-gray-400'>Discover books by genre</p>

                    {/* Search Bar */}
                    <div className='flex w-full max-w-md'>
                        <div className='flex items-center w-full border rounded-md border-gray-200 bg-white'>
                            <div className='p-2'>
                                <BsSearch className='text-gray-400' />
                            </div>
                            <Searchbar 
                                onSearch={handleSearch}
                                searchResults={searchResults}
                                onSelectItem={handleSelectBook}
                                searchType="books"
                                placeholder="Search books..."
                            />
                        </div>
                    </div>

                    {/* Genre Buttons */}
                    <div className='flex flex-wrap gap-2 pt-4'>
                        {genres.map((genre) => (
                            <button
                                key={genre.id}
                                onClick={() => handleGenreClick(genre.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                                    ${selectedGenre === genre.id 
                                        ? 'bg-blue-600 text-white' 
                                        : 'bg-gray-700 text-gray-200 hover:bg-gray-600'}`}
                            >
                                {genre.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Scrollable Containers for each genre */}
                {genres.map((genre) => (
                    <div key={genre.id} ref={genreRefs.current[genre.id]}>
                        <ScrollableContainer
                            title={genre.name}
                            viewAllLink={`/books/${genre.id}`}
                            itemWidth={192}
                        >
                            {isLoading
                                ? Array.from({ length: 10 }).map((_, index) => (
                                    <CardSkeleton key={index} />
                                ))
                                : genreBooks[genre.id]?.map((book) => (
                                    <BookCard key={book.id} {...book} />
                                ))}
                        </ScrollableContainer>
                    </div>
                ))}
            </div>
        </PageContainer>
    );
}
