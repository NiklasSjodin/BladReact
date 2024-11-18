import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BsGrid, BsListUl, BsSortDown, BsFilter } from 'react-icons/bs';
import { motion, AnimatePresence } from 'framer-motion';

export default function LibraryBookList() {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isGridView, setIsGridView] = useState(true);
    const [sortBy, setSortBy] = useState('title'); // 'title', 'author', 'status'
    const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'reading', 'completed', etc.
    const { id } = useParams();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setIsLoading(true);
                // Replace with your actual API endpoint
                const response = await fetch(`https://localhost:7076/user/${id}/booklist/${id}`);
                if (!response.ok) throw new Error('Failed to fetch books');
                const data = await response.json();
                setBooks(data.books || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBooks();
    }, [id]);

    const sortedAndFilteredBooks = books
        .filter(book => filterStatus === 'all' || book.status === filterStatus)
        .sort((a, b) => {
            if (sortBy === 'title') {
                return a.bookReference.title.localeCompare(b.bookReference.title);
            } else if (sortBy === 'author') {
                return a.bookReference.author.localeCompare(b.bookReference.author);
            }
            return a.status.localeCompare(b.status);
        });

    if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (error) return <div className="text-red-500 text-center">{error}</div>;

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h1 className="text-2xl font-bold">Books in List</h1>
                
                <div className="flex gap-4">
                    {/* Sort Dropdown */}
                    <select 
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-3 py-2 rounded-lg border border-gray-300"
                    >
                        <option value="title">Sort by Title</option>
                        <option value="author">Sort by Author</option>
                        <option value="status">Sort by Status</option>
                    </select>

                    {/* Filter Dropdown */}
                    <select 
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-3 py-2 rounded-lg border border-gray-300"
                    >
                        <option value="all">All Status</option>
                        <option value="reading">Reading</option>
                        <option value="completed">Completed</option>
                        <option value="want-to-read">Want to Read</option>
                    </select>

                    {/* View Toggle Button */}
                    <button
                        onClick={() => setIsGridView(!isGridView)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                    >
                        {isGridView ? (
                            <>
                                <BsListUl className="text-lg" />
                                <span>List View</span>
                            </>
                        ) : (
                            <>
                                <BsGrid className="text-lg" />
                                <span>Grid View</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    layout
                    className={isGridView 
                        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
                        : "flex flex-col gap-4"
                    }
                >
                    {sortedAndFilteredBooks.map((book) => (
                        <motion.div 
                            key={book.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className={`border rounded-lg shadow-md hover:shadow-lg transition-shadow ${
                                isGridView ? 'p-4' : 'p-4 flex gap-4'
                            }`}
                        >
                            {book.bookReference && (
                                <>
                                    <img 
                                        src={book.bookReference.coverUrl} 
                                        alt={book.bookReference.title}
                                        className={`rounded-md ${
                                            isGridView 
                                                ? 'w-full h-48 object-cover mb-2' 
                                                : 'w-32 h-48 object-cover'
                                        }`}
                                    />
                                    <div className={isGridView ? '' : 'flex flex-col justify-between flex-grow'}>
                                        <div>
                                            <h2 className="font-semibold text-lg">{book.bookReference.title}</h2>
                                            <p className="text-gray-600">{book.bookReference.author}</p>
                                            <p className="text-sm text-gray-500 mt-1">ISBN: {book.bookReference.isbn}</p>
                                            <p className="text-sm mt-2">Status: 
                                                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                                                    book.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                    book.status === 'reading' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-gray-100 text-gray-800'
                                                }`}>
                                                    {book.status}
                                                </span>
                                            </p>
                                        </div>
                                        {!isGridView && (
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-600">{book.bookReference.description}</p>
                                                <div className="mt-2 flex gap-2">
                                                    <button className="text-blue-500 hover:text-blue-700">Edit</button>
                                                    <button className="text-red-500 hover:text-red-700">Remove</button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
