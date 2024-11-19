import React from "react";
import { useNavigate } from "react-router-dom";

const Support = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-bladLightBackground text-bladLightTextColor px-4 py-6">
      {/* Header */}
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
    className="flex items-center justify-between p-3 rounded-lg bg-bladLightFields
hover:bg-bladLightHover transition duration-150"
  >
    <span>{text}</span>
    <span className="text-bladLightTextColor">&gt;</span>
  </a>
);

export default Support;