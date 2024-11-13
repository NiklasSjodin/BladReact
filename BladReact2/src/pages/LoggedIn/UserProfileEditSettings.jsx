import React, { useState } from "react";
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

const UserProfileSettings = () => {
  // Lägg till tillstånd för att hantera dialogens synlighet
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCancel = () => {
    // Stänger dialogen när användaren klickar på "Avbryt"
    setIsDialogOpen(false);
    console.log("Avbryt åtgärd");
  };

  const handleDelete = () => {
    // Lägg till logik för att ta bort kontot
    console.log("Kontot tas bort");
  };
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-6">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <button className="text-gray-400" onClick={() => navigate(-1)}>
          {/* Back button */}
          <span>&larr;</span>
        </button>
        <h1 className="text-lg font-bold">Settings</h1>
      </div>

      {/* User Info */}
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

      {/* Menu Links */}
      <div className="space-y-2">
        <MenuLink text="Ändra användarnamn" href="/" />
        <MenuLink text="Ändra lösenord" href="/" />
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger>
            <MenuLink text="Ta bort konto" />
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
