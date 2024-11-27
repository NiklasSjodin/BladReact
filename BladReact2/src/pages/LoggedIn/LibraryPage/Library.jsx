import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BsSearch, BsGrid, BsListUl } from "react-icons/bs";
import { PageContainer } from "../../../components/layout/PageContainer";
import { jwtDecode } from "jwt-decode";
const API_URL = "https://blad-api.azurewebsites.net/";


export default function Library() {
  const [bookLists, setBookLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isGridView, setIsGridView] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [userId] = useState();
  const [showForm, setShowForm] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  useEffect(() => {
    const fetchBookLists = async () => {
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      const userId =
        decodedToken[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ];

      try {
        setIsLoading(true);
        const response = await fetch(
          `${API_URL}api/booklist/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              accept: "text/plain",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch booklists");
        }

        const data = await response.json();
        setBookLists(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching booklists:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookLists();
  }, [userId]);

  const filteredLists = bookLists.filter((list) =>
    list.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateList = async () => {
    const token = localStorage.getItem("token");
    const newList = {
      name: newListName,
      isPrivate: isPrivate,
    };
  
    try {
      const response = await fetch(`${API_URL}api/booklist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newList),
      });
  
      // Log the response status and headers
      console.log("Response status:", response.status);
      console.log("Response headers:", Object.fromEntries(response.headers.entries()));
  
      if (!response.ok) {
        // Try to get the error message from the response
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(`Failed to create the list: ${errorText}`);
      }
  
      // Try to parse the response as JSON
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const createdList = await response.json();
        console.log("Created List:", createdList);
        
        // Only update the lists if we got a valid list object
        if (createdList && createdList.id) {
          setBookLists((prevLists) => [...prevLists, createdList]);
        }
      } else {
        // If not JSON, just log the response text
        const responseText = await response.text();
        console.log("Response text:", responseText);
      }
  
      // Reset form states
      setShowForm(false);
      setNewListName("");
      setIsPrivate(false);
	  window.location.reload();
    } catch (error) {
      console.error("Error creating list:", error);
      setError(`Failed to create the list: ${error.message}`);
    }
  };

  if (isLoading) {
    return (
      <PageContainer>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <div className="flex justify-center items-center h-screen">
          <div className="text-red-500 text-center">
            <h2 className="text-xl font-bold mb-2">Error</h2>
            <p>{error}</p>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="space-y-8 pb-24">
        <div className="pt-6 space-y-4">
          <h1 className="text-3xl font-bold text-bladLightTextColor">
            Mina listor
          </h1>
          <div className="flex mb-4">
            <div className="flex items-center border rounded-l-md border-r-0 border-gray-200 bg-white">
              <div className="p-2">
                <BsSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search"
                className="border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-r-md pl-4 pr-4 text-sm text-gray-900"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center border rounded-r-md border-l-0 border-gray-200 bg-white">
              <button
                className="p-2 text-gray-600 hover:text-gray-800"
                onClick={() => setIsGridView(!isGridView)}
              >
                {isGridView ? (
                  <BsGrid className="text-gray-400" />
                ) : (
                  <BsListUl className="text-gray-400" />
                )}
              </button>
            </div>
          </div>
          <div
            className={`grid ${
              isGridView
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            } gap-4`}
          >
            {filteredLists.map((list) => (
              <div
                key={list.id}
                className="p-4 border rounded-lg shadow bg-bladLightFields2"
              >
                <h2 className="text-xl font-semibold text-bladLightTextColor">
                  {list.name}
                </h2>
                <Link
                  to={`/booklist/${list.id}`}
                  className="text-gray-500 hover:text-bladLightHover"
                >
                  Visa böcker →
                </Link>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-blue-600"
              onClick={() => setShowForm(true)}
            >
              Skapa ny lista
            </button>

            {showForm && (
              <div className="p-4 border rounded bg-gray-700">
                <h2 className="text-lg font-semibold text-white">Ny lista</h2>
                <input
                  type="text"
                  placeholder="Listnamn"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  className="w-full p-2 mt-2 rounded bg-gray-800 text-white"
                />
                <div className="mt-2">
                  <label className="text-white">
                    <input
                      type="checkbox"
                      checked={isPrivate}
                      onChange={(e) => setIsPrivate(e.target.checked)}
                      className="mr-2"
                    />
                    Privat lista
                  </label>
                </div>
                <div className="flex justify-end mt-4 space-x-2">
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={handleCreateList}
                  >
                    Skapa
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => setShowForm(false)}
                  >
                    Avbryt
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
