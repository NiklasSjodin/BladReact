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
        //const clubsResponse = await fetch(`http://localhost:7076/api/bookclubs/${id}`);
        // if (!clubsResponse.ok) throw new Error('Kunde inte hämta bokklubbar');
        // const clubsData = await clubsResponse.json();
        // setBookClubs(clubsData);

        // Hämta recensioner och betyg från backend
        // const reviewsResponse = await fetch(`http://localhost:7076/api/bookreview/${id}`);
        // if (!reviewsResponse.ok) throw new Error('Kunde inte hämta recensioner');
        // const reviewsData = await reviewsResponse.json();
        // setReviews(reviewsData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBookData();
  }, [id]);

  if (loading) return <p>Laddar...</p>;
  if (error) return <p>{error}</p>;
  if (!book) return <p>Ingen bok hittades</p>;

  return (
    <div>
      <h1>{book.title}</h1>
      {book.covers && book.covers.length > 0 && (
        <img
          src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`}
          alt={`${book.title} omslag`}
        />
      )}
      <h2>Författare:</h2>
      <ul>
        {book.authors &&
          book.authors.map((author) => (
            <li key={author.key}>{author.name}</li>
          ))}
      </ul>
      <p><strong>Beskrivning:</strong> {book.description ? book.description.value || book.description : 'Ingen beskrivning tillgänglig'}</p>
      <p><strong>Publiceringsår:</strong> {book.created ? new Date(book.created.value).getFullYear() : 'Ej tillgängligt'}</p>

      {/* Bokklubbar */}
      <h3>Bokklubbar som läser denna bok:</h3>
      <ul>
        {bookClubs.length > 0 ? (
          bookClubs.map(club => (
            <li key={club.id}>{club.name} - {club.memberCount} medlemmar</li>
          ))
        ) : (
          <p>Inga bokklubbar läser denna bok just nu.</p>
        )}
      </ul>

      {/* Recensioner och betyg */}
      <h3>Användarrecensioner:</h3>
      <ul>
        {bookReviews.length > 0 ? (
          bookReviews.map(review => (
            <li key={review.id}>
              <p><strong>{review.userName}:</strong> {review.rating}/5</p>
              <p>{review.comment}</p>
            </li>
          ))
        ) : (
          <p>Inga recensioner ännu. Var först med att recensera!</p>
        )}
      </ul>
    </div>
  );
};

export default BookView;