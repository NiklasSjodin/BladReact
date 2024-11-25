import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';  // Use Link for navigation
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import logo from '../../images/books.png';
import { searchBooks } from '../../services/BooksService';
import { jwtDecode } from 'jwt-decode';
import DarkModeToggle from '../ui/Toggle';

const SearchResultsItem = ({ book }) => (
  <div className="flex items-center space-x-4 p-2 border-b">
    {book.coverId && (
      <img
        src={`https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`}
        alt={book.title}
        className="h-20 w-14 object-cover rounded"
      />
    )}
    <div>
      <h3 className="font-medium">{book.title}</h3>
      <p className="text-gray-500">{book.author}</p>
    </div>
  </div>
);

export default function LoggedInHeader() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [userName, setUserName] = useState('');
  const [isOpen, setIsOpen] = useState(false); // Dropdown state
  const [isSearchOpen, setIsSearchOpen] = useState(false); // Search dropdown state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage first, then system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve token from local storage
    if (token) {
      const decoded = jwtDecode(token); // Decode token
      setUserName(decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']);
    }
  }, []);

  // Effect to handle theme changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.dropdown-container')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleSearch = async (event) => {
    if (event.key === 'Enter') {
      try {
        const results = await searchBooks(searchQuery, { limit: 5 });
        setSearchResults(results);
        setIsSearchOpen(true); // Open the search results
      } catch (error) {
        console.error('Search error:', error);
        // Handle error appropriately
      }
    }
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false); // Close the search
    setSearchResults([]); // Clear search results
    setSearchQuery(''); // Optionally clear search query
  };

  return (
    <header className="pt-1 pb-1 bg-bladtheme border-b-2 border-bladthemedetail">
      <div className="px-4 h-12 flex items-center">
        <Link to="/">
          <img
            src={logo}
            alt="Description of image"
            className="h-8 w-auto object-contain pr-1"
          />
        </Link>
        <Link to="/" className="flex-1 font-general text-xl text-white">
          blad.
        </Link>
        <div className="flex items-center space-x-4 ml-auto px-2">
          <Link to="/clubs" className="transition-transform hover:border-b-2 hover:border-white">Clubs</Link>
          <Link to="/explore" className="transition-transform hover:border-b-2 hover:border-white">Explore</Link>
          <Link to="/library" className="transition-transform hover:border-b-2 hover:border-white">Bibliotek</Link>
        </div>

        <div className="flex items-center space-x-4 ml-auto pl-2">
          <input
            type="text"
            placeholder="Sökbar för allt?"
            className="border rounded-md px-2 py-1 w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
          <div className="relative">
            <Avatar onClick={() => setIsOpen(!isOpen)}>
              <AvatarImage src="/path/to/avatar.jpg" alt="User Avatar" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            {/* Dropdown menu */}
            {isOpen && (
              <div
                className="absolute right-0 w-48 mt-2 origin-top-right bg-white rounded-md shadow-xl dark:bg-gray-800"
                onClick={(e) => e.stopPropagation()} // Prevent click from closing the dropdown
              >
                <Link
                  to="/profile" // Use Link for navigation
                  onClick={() => setIsOpen(false)} // Close dropdown on link click
                  className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Profil
                </Link>
                <a
                  href="#"
                  className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Klubbar
                </a>
                <a
                  href="#"
                  className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Bokhylla
                </a>
                <a
                  href="#"
                  className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Recensioner
                </a>
                <Link
                  to="/account" // Use Link for navigation
                  onClick={() => setIsOpen(false)} // Close dropdown on link click
                  className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Inställningar
                </Link>
                <Link
                  to="/support" // Use Link for navigation
                  onClick={() => setIsOpen(false)} // Close dropdown on link click
                  className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Support
                </Link>
                <a
                  href="#"
                  className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Logga ut
                </a>
								<div className='flex items-center justify-between px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white'>
									<span>Dark Mode</span>
									<Switch
										checked={isDarkMode}
										onCheckedChange={(checked) => {
											setIsDarkMode(checked);
										}}
									/>
								</div>
              </div>
            )}
          </div>
          <Link to="/account">{userName}</Link>
          <DarkModeToggle/>
        </div>
      </div>

      {isSearchOpen && searchResults.length > 0 && (
        <div className="px-4 mt-2">
          <h2 className="text-lg font-medium mb-2">Search Results</h2>
          <button 
            onClick={handleCloseSearch} 
            className="text-red-500 mb-2">
            Close Search
          </button>
          <div className="border rounded-md overflow-hidden">
            {searchResults.map((book) => (
              <SearchResultsItem key={book.id} book={book} />
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
