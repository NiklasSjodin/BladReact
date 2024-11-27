import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { FaStar } from "react-icons/fa";
const API_URL = "https://blad-api.azurewebsites.net/";

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [bookClubs, setBookClubs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Ingen token hittades i localStorage.");
        return;
      }

      try {
        const decodedToken = jwtDecode(token);
        console.log("Dekodad token payload:", decodedToken);

        const userId =
          decodedToken[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
          ];

        if (!userId) {
          console.error("Användar-ID saknas i token.");
          return;
        }

        // Hämta användarens profildata, recensioner och bokklubbar
        const [profileResponse, reviewsResponse, bookClubsResponse] =
          await Promise.all([
            axios.get(`${API_URL}api/userprofile/${userId}`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get(`${API_URL}api/bookreview/user/${userId}`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get(`${API_URL}api/bookclubs/user/${userId}`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
          ]);

        setUserProfile(profileResponse.data);
        setReviews(reviewsResponse.data);
        setBookClubs(bookClubsResponse.data);
      } catch (err) {
        console.error("Fel vid hämtning av data:", err);
        setError("Kunde inte hämta användardata.");
      }
    };

    fetchData();
  }, []);

  const renderStars = (rating) => {
    const totalStars = 5; // Totalt antal stjärnor
    return (
      <div className="flex gap-1">
        {[...Array(totalStars)].map((_, index) => (
          <FaStar
            key={index}
            className={`${
              index < rating ? "text-yellow-500" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!userProfile) {
    return <div>Laddar...</div>;
  }

  return (
    <div className="flex flex-col items-center p-4 md:p-8 bg-bladLightBackground dark:bg-bladDarkBackground">
      {/* Profilsektion */}
      <div className="w-full max-w-4xl bg-bladLightFields2 dark:bg-bladDarkFields shadow-md rounded-lg p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Profilbild */}
          <div className="w-32 h-32 rounded-full bg-gray-300 overflow-hidden">
            <img
              src={userProfile.imageUrl || "https://via.placeholder.com/150"} // Använd profilbilden från API eller en fallback
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Namn och bio */}
          <div className="text-center md:text-left text-bladLightTextColor dark:text-bladDarkTextColor">
            <h1 className="text-2xl font-bold dark  text-bladLightTextColor dark:text-bladDarkTextColor">
              {userProfile.name}
            </h1>{" "}
            {/* Använd användarnamn från API */}
            <p className="text-bladLightTextColor dark:text-bladDarkTextColor mt-2 ">
              {userProfile.bio}
            </p>{" "}
            {/* Använd användarbio från API */}
          </div>
        </div>
      </div>

      {/* Boklistor */}
      <div className="w-full max-w-4xl mt-6 bg-white dark:bg-bladDarkFields shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Mina Boklistor</h2>
        <ul className="space-y-3">
          <li className="bg-bladLightFields dark:bg-bladDarkFields2 text-bladLightTextColor dark:text-bladDarkTextColor p-3 rounded-md">
            Vill läsa
          </li>
          <li className="bg-bladLightFields dark:bg-bladDarkFields2 text-bladLightTextColor dark:text-bladDarkTextColor p-3 rounded-md">
            Läser just nu
          </li>
          <li className="bg-bladLightFields dark:bg-bladDarkFields2 text-bladLightTextColor dark:text-bladDarkTextColor p-3 rounded-md">
            Har läst
          </li>
        </ul>
      </div>

      {/* Vänner/Följare/Följer */}
      <div className="w-full max-w-4xl mt-6 bg-bladLightFields2 dark:bg-bladDarkFields shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Följare</h2>
        <div className="flex gap-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold">{userProfile.followersCount}</h3>
            <p className="text-bladLightTextColor dark:text-bladDarkTextColor">
              Följer
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold">{userProfile.followersCount}</h3>
            <p className="text-bladLightTextColor dark:text-bladDarkTextColor">
              Följare
            </p>
          </div>
        </div>
      </div>

      {/* Recensioner */}
      <div className="w-full max-w-4xl mt-6 bg-bladLightFields2 dark:bg-bladDarkFields shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Mina Recensioner</h2>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : reviews.length > 0 ? (
          <div className="space-y-4 divide-y divide-gray-300 dark:divide-gray-700">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-bladLightFields2 dark:bg-bladDarkFields2 p-4 rounded-md"
              >
                <h3 className="font-bold text-bladLightTextColor dark:text-bladDarkTextColor">
                  {review.bookTitle} av {review.bookAuthor}
                </h3>
                <p className="text-bladLightTextColor dark:text-bladDarkTextColor mt-1">
                  {review.text}
                </p>
                <div className="mt-1">{renderStars(review.rating)}</div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-bladLightTextColor dark:text-bladDarkTextColor">
            Du har inga recensioner ännu.
          </p>
        )}
      </div>
      {/* Bokklubbar */}
      <div className="w-full max-w-4xl mt-6 bg-bladLightFields2 dark:bg-bladDarkFields shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Mina Bokklubbar</h2>
        {bookClubs.length > 0 ? (
          <ul className="space-y-3">
            {bookClubs.map((club) => (
              <li
                key={club.id}
                className="bg-bladLightFields dark:bg-bladDarkFields2 text-bladLightTextColor dark:text-bladDarkTextColor p-3 rounded-md flex items-center gap-4"
              >
                <img
                  src={club.imageUrl || "https://via.placeholder.com/50"}
                  alt={club.name}
                  className="w-12 h-12 object-cover rounded-full"
                />
                <div>
                  <h3 className="font-bold">{club.name}</h3>
                  <p>Medlemmar: {club.memberCount}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Du är inte med i några bokklubbar ännu.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
