import React from "react";
import { useNavigate } from "react-router-dom";

const Support = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-6">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <button className="text-gray-400" onClick={() => navigate(-1)}>
          {/* Back button */}
          <span>&larr;</span>
        </button>
        <h1 className="text-lg font-bold">Support</h1>
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
        <MenuLink text="FAQ" href="faq" />
        <MenuLink text="Support" href="contact" />
        <MenuLink text="Privacy & Policy" href="privacy" />
        <MenuLink text="Report bugs" href="/" />

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

export default Support;