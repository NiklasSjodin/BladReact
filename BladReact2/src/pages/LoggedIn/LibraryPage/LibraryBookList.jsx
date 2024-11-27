import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BsGrid, BsListUl, BsSortDown, BsFilter } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import { PageContainer } from "../../../components/layout/PageContainer";
const API_URL = "https://blad-api.azurewebsites.net/";

export default function LibraryBookList() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isGridView, setIsGridView] = useState(true);
  const [sortBy, setSortBy] = useState("title"); // 'title', 'author', 'status'
  const [filterStatus, setFilterStatus] = useState("all"); // 'all', 'reading', 'completed', etc.
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      setError("List ID is missing from the URL");
      setIsLoading(false);
      return;
    }

    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${API_URL}api/booklist/${id}/books`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              accept: "text/plain",
            },
          }
        );
        if (!response.ok)
          throw new Error(`Failed to fetch books. Status: ${response.status}`);
        const data = await response.json();
        setBooks(data || []); // Uppdatera här
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [id]);

  const sortedAndFilteredBooks = books
    .filter(
      (book) =>
        filterStatus === "all" ||
        book.readingStatus.toLowerCase() === filterStatus.toLowerCase()
    )
    .sort((a, b) => {
      if (sortBy === "title") {
        return a.title.localeCompare(b.title, "sv");
      } else if (sortBy === "author") {
        return a.author.localeCompare(b.author, "sv");
      }
      return a.readingStatus.localeCompare(b.readingStatus, "sv");
    });

  if (isLoading) {
    return (
      <PageContainer>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
        </div>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <div className="flex flex-col items-center justify-center h-screen">
          <h2 className="text-red-500 font-bold text-xl mb-2">
            An error occurred
          </h2>
          <p className="text-gray-700">{error}</p>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="space-y-8 pb-24">
        <div className="pt-6 space-y-4">
          <h1 className="text-3xl font-bold text-bladLightTextColor">
            Böcker
          </h1>
          <div className="flex mb-4">
            {/* Sorting */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border p-2 rounded-l-md"
            >
              <option value="title">Sort by Title</option>
              <option value="author">Sort by Author</option>
              <option value="status">Sort by Status</option>
            </select>
            {/* Filtering */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border p-2 rounded-r-md"
            >
              <option value="all">All Status</option>
              <option value="reading">Reading</option>
              <option value="wanttoread">Want to Read</option>
              <option value="read">Read</option>
            </select>
            {/* Grid/List Toggle */}
            <button
              onClick={() => setIsGridView(!isGridView)}
              className="ml-4 p-2 border rounded-md"
            >
              {isGridView ? <BsListUl /> : <BsGrid />}
            </button>
          </div>
          <div
            className={`grid ${
              isGridView
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            } gap-4`}
          >
            {sortedAndFilteredBooks.map((book) => (
              <div
                key={book.bookListItemId}
                className="p-4 border rounded-lg shadow bg-bladLightFields2"
              >
                <h2 className="text-xl font-semibold text-bladLightTextColor">
                  {book.title}
                </h2>
                <p className="text-sm text-gray-500">{book.author}</p>
                <p className="text-sm text-blue-400">{book.readingStatus}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
