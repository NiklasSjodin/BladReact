import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BookView = () => {
  const { id } = useParams(); // Hämta bok-ID från URL:en
  const [book, setBook] = useState(null);
  const [bookClubs, setBookClubs] = useState([]);
  const [bookReviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log('ID från URL:', id); //Logga för att säkerställa att id hämtas från URL

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        setLoading(true);

        // Hämta bokinfo från OpenLibrary
        const bookResponse = await fetch(`https://openlibrary.org/works/${id}.json`);
        if (!bookResponse.ok) throw new Error('Boken kunde inte hämtas');
        const bookData = await bookResponse.json();
        setBook(bookData);


        // Hämta bokklubbar från backend
        // const bookReferenceId = book.id;
        // const clubsResponse = await fetch(`http://localhost:7076/api/bookclubs/book/${bookReferenceId}`);
        // if (!clubsResponse.ok) throw new Error('Kunde inte hämta bokklubbar');
        // const clubsData = await clubsResponse.json();
        // setBookClubs(clubsData);

        // // Hämta recensioner och betyg från backend
        // const reviewsResponse = await fetch(`http://localhost:7076/api/bookreview/book/${bookReferenceId}`);
        // if (!reviewsResponse.ok) throw new Error('Kunde inte hämta recensioner');
        // const reviewsData = await reviewsResponse.json();
        // setReviews(reviewsData);

      }catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBookData();
  }, [id]);

  if (loading) return <p className="text-center text-xl font-semibold">Laddar...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!book) return <p className="text-center text-gray-500">Ingen bok hittades</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-md shadow-md">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        {book.covers && book.covers.length > 0 && (
          <img
            className="w-48 h-auto rounded-lg shadow"
            src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`}
            alt={`${book.title} omslag`}
          />
        )}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{book.title}</h1>
          <h2 className="text-lg text-gray-600 mt-2">
            Författare:
            <span className="block mt-1 text-gray-800 font-medium">
              {book.authors &&
                book.authors.map((author) => (
                  <span key={author.key} className="inline-block">
                    {author.name}
                  </span>
                ))}
            </span>
          </h2>
        </div>
      </div>
      <p className="mt-6 text-gray-700">
        <strong>Beskrivning:</strong>{' '}
        {book.description
          ? book.description.value || book.description
          : 'Ingen beskrivning tillgänglig'}
      </p>
      <p className="mt-4 text-gray-600">
        <strong>Publiceringsår:</strong>{' '}
        {book.created ? new Date(book.created.value).getFullYear() : 'Ej tillgängligt'}
      </p>

      {/* Bokklubbar */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800">Bokklubbar som läser denna bok:</h3>
        <ul className="mt-4">
          {bookClubs.length > 0 ? (
            bookClubs.map((club) => (
              <li
                key={club.id}
                className="py-2 px-4 bg-gray-100 rounded-md shadow-sm mb-2"
              >
                {club.name} - {club.memberCount} medlemmar
              </li>
            ))
          ) : (
            <p className="text-gray-500">Inga bokklubbar läser denna bok just nu.</p>
          )}
        </ul>
      </div>

      {/* Recensioner och betyg */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800">Användarrecensioner:</h3>
        <ul className="mt-4">
          {bookReviews.length > 0 ? (
            bookReviews.map((review) => (
              <li
                key={review.id}
                className="py-2 px-4 bg-gray-100 rounded-md shadow-sm mb-2"
              >
                <p>
                  <strong>{review.userName}:</strong> {review.rating}/5
                </p>
                <p>{review.comment}</p>
              </li>
            ))
          ) : (
            <p className="text-gray-500">Inga recensioner ännu. Var först med att recensera!</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default BookView;