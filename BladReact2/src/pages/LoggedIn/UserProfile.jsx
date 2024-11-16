import React, { useEffect, useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const UserProfile = () => {
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token"); // Hämtar token från local storage
    if (token) {
      const decoded = jwtDecode(token); // Tar ut userid från token
      setUserName(
        decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]
      );
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-6">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <h1 className="text-lg font-bold">Account</h1>
      </div>

      {/* User Info */}
      <div className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg mb-4">
        <Avatar>
          <AvatarImage src="/path/to/avatar.jpg" alt="User Avatar" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-semibold">{userName}</h2>
        </div>
      </div>

      {/* Menu Links */}
      <div className="space-y-2">
        <MenuLink text="Profil inställningar" href="/settings" />
        <MenuLink text="Klubbar" href="/clubs" />
        <MenuLink text="Bokhylla" href="/library" />

        <hr className="my-4 border-gray-700" />

        <MenuLink text="Recensioner" href="/reviews" />
        <MenuLink text="Support" href="/support" />
        <button
          onClick={handleLogout}
          className="w-full text-left p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition duration-150"
        >
          Logga ut
        </button>
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

export default UserProfile;
