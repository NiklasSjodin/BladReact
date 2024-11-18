import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import {jwtDecode} from "jwt-decode";
import axios from "axios";

const UserProfileSettings = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [privacyLevel, setPrivacyLevel] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);
      setUserName(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = { name };
      await axios.put(
        `https://localhost:7076/api/userprofile/${userId}`,
        updatedUser,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log("Användarnamn uppdaterat.");
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Fel vid uppdatering av användarnamn:", error);
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await axios.put(
        "https://localhost:7076/api/accounts/password",
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setMessage("Lösenordet har uppdaterats.");
      setIsPasswordDialogOpen(false); // Stäng dialogen
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message || "Något gick fel.");
      } else {
        setMessage("Serverfel. Försök igen senare.");
      }
    } finally {
      setLoading(false);
    }
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
      localStorage.removeItem("token");
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
        {/* Ändra användarnamn */}
        <Dialog open={isDialogOpen} onOpenChange={(isOpen) => setIsDialogOpen(isOpen)}>
          <DialogTrigger asChild>
            <button
              className="flex items-center justify-between p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition duration-150 w-full"
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
                <button type="button" onClick={() => setIsDialogOpen(false)} className="btn btn-secondary mr-2">
                  Avbryt
                </button>
                <button type="submit" className="btn btn-primary">Spara</button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Ändra lösenord */}
        <Dialog open={isPasswordDialogOpen} onOpenChange={(isOpen) => setIsPasswordDialogOpen(isOpen)}>
          <DialogTrigger asChild>
            <button
              className="flex items-center justify-between p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition duration-150 w-full"
            >
              <span>Ändra lösenord</span>
              <span className="text-gray-500">&gt;</span>
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ändra lösenord</DialogTitle>
              <DialogDescription>
                Uppdatera ditt lösenord för kontot.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={changePassword}>
              <div className="mb-4">
                <label htmlFor="currentPassword" className="block text-sm font-medium">Nuvarande lösenord</label>
                <input
                  type="password"
                  id="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="newPassword" className="block text-sm font-medium">Nytt lösenord</label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg"
                  required
                />
              </div>
              <DialogFooter>
                <button type="button" onClick={() => setIsPasswordDialogOpen(false)} className="btn btn-secondary mr-2">
                  Avbryt
                </button>
                <button type="submit" disabled={loading} className="btn btn-primary">
                  {loading ? "Uppdaterar..." : "Spara"}
                </button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Ta bort konto */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogTrigger asChild>
            <button
              className="flex items-center justify-between p-3 rounded-lg bg-red-800 hover:bg-red-700 transition duration-150 w-full"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              <span>Ta bort konto</span>
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ta bort konto</DialogTitle>
              <DialogDescription>
                Är du säker på att du vill ta bort ditt konto? Det går inte att ångra sig efteråt.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <button
                onClick={() => setIsDeleteDialogOpen(false)}
                className="btn btn-secondary"
              >
                Avbryt
              </button>
              <button onClick={handleDelete} className="btn btn-danger">
                Ja, ta bort
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default UserProfileSettings;
