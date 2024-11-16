import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const UserProfileSettings = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [privacyLevel, setPrivacyLevel] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);
      setUserName(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]);
      // Fetch the user profile data from the backend
      axios
        .get(`https://localhost:7076/api/users/${decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setName(response.data.name);
          setBio(response.data.bio);
          setImageUrl(response.data.imageUrl);
          setPrivacyLevel(response.data.privacyLevel);
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, []);

  // Hantera formsubmission för att uppdatera endast namnet
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const updatedUser = {
        name, // Endast namn kommer att uppdateras
      };

      await axios.put(
        `https://localhost:7076/api/userprofile/${userId}`,
        updatedUser,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Användarnamn uppdaterat.");
      setIsDialogOpen(false); // Stäng dialogen
    } catch (error) {
      console.error("Fel vid uppdatering av användarnamn:", error);
    }
  }

  const handleCancel = () => {
    setIsDialogOpen(false);
    console.log("Avbryt åtgärd");
  };

  const handleDelete = async () => {
    if (!userId) return;

    try {
      await axios.delete(`https://localhost:7076/api/users/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Kontot har tagits bort.");

      localStorage.removeItem("token"); // Ta bort token från minnet

      navigate("/");
    } catch (error) {
      console.error("Fel vid borttagning av kontot: ", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-6">
      <div className="flex items-center space-x-4 mb-6">
        <button className="text-gray-400" onClick={() => navigate(-1)}>
          <span>&larr;</span>
        </button>
        <h1 className="text-lg font-bold">Settings</h1>
      </div>

      <div className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg mb-4">
        <Avatar>
          <AvatarImage src={imageUrl || '/path/to/avatar.jpg'} alt='User Avatar' />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-semibold">{userName}</h2>
        </div>
      </div>

      <div className="space-y-2">
        <Dialog open={isDialogOpen} onOpenChange={(isOpen) => setIsDialogOpen(isOpen)}>
          <DialogTrigger asChild>
            <button
              className="flex items-center justify-between p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition duration-150 w-full"
              onClick={() => setIsDialogOpen(true)}
            >
              <span>Ändra användarnamn</span>
              <span className="text-gray-500">&gt;</span>
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ändra användarnamn</DialogTitle>
              <DialogDescription>
                Ändra ditt användarnamn till något nytt.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium">Användarnamn</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg"
                  required
                />
              </div>
              <DialogFooter>
                <button type="button" onClick={handleCancel} className="btn btn-secondary mr-2">
                  Avbryt
                </button>
                <button type="submit" className="btn btn-primary">Spara</button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <MenuLink text="Ändra lösenord" href="/" />
        <MenuLink text="Ta bort konto" href="/" onClick={handleDelete} />
        <hr className="my-4 border-gray-700" />
      </div>
    </div>
  );
};

const MenuLink = ({ text, href, onClick }) => (
  <a
    href={href}
    onClick={onClick}
    className="flex items-center justify-between p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition duration-150"
  >
    <span>{text}</span>
    <span className="text-gray-500">&gt;</span>
  </a>
);

export default UserProfileSettings;
