import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {jwtDecode} from "jwt-decode";
import axios from "axios";

const UserProfileSettings = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [userId, setUserId] = useState(null); // Används för hämta och spara id:et
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token"); // Hämtar token från local storage
    if (token) {
      const decoded = jwtDecode(token); // Tar ut userid från token
      setUserId(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);
    }
  }, []);

  const handleCancel = () => {
    setIsDialogOpen(false);
    console.log("Avbryt åtgärd");
  };

  const handleDelete = async () => {
    if (!userId) return;

    try {
      await axios.delete(`https://localhost:7076/api/users/${userId}`, { // Api endpoint
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Hämtar id:et från token
        },
      });
      console.log("Kontot har tagits bort.");

      localStorage.removeItem("token"); // Tar bort token från minnet

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
        <img
          src="https://via.placeholder.com/80"
          alt="User Avatar"
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h2 className="text-xl font-semibold">John Doe</h2>
          <p className="text-gray-400">john.doe@example.com</p>
        </div>
      </div>

      <div className="space-y-2">
        <MenuLink text="Ändra användarnamn" href="/" />
        <MenuLink text="Ändra lösenord" href="/" />
        <Dialog open={isDialogOpen} onOpenChange={(isOpen) => setIsDialogOpen(isOpen)}>
          <DialogTrigger asChild>
            <button
              className="flex items-center justify-between p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition duration-150 w-full"
              onClick={() => setIsDialogOpen(true)}
            >
              <span>Ta bort konto</span>
              <span className="text-gray-500">&gt;</span>
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Är du säker på att du vill ta bort ditt konto?</DialogTitle>
              <DialogDescription>
                Denna åtgärd kan inte ångras. Detta kommer att ta bort ditt konto permanent
                och ta bort dina data från våra servrar.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <button
                type="button"
                onClick={handleCancel}
                className="btn btn-secondary mr-2"
              >
                Avbryt
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="btn btn-danger"
              >
                Ta bort
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <hr className="my-4 border-gray-700" />
      </div>
    </div>
  );
};

const MenuLink = ({ text, href }) => (
  <a
    href={href}
    className="flex items-center justify-between p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition duration-150"
  >
    <span>{text}</span>
    <span className="text-gray-500">&gt;</span>
  </a>
);

export default UserProfileSettings;
