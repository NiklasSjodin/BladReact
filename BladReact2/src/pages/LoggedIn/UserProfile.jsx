import React, { useEffect, useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { PageContainer } from "@/components/layout/PageContainer";
import { jwtDecode } from "jwt-decode";
import UserProfileSettings from "./UserProfileEditSettings";
import Support from "./Support";

const UserProfile = () => {
  const [userName, setUserName] = useState(null);
  const [activeTab, setActiveTab] = useState("settings"); // Track the active tab

  useEffect(() => {
    const token = localStorage.getItem("token"); // Fetch token from local storage
    if (token) {
      const decoded = jwtDecode(token); // Extract username from token
      setUserName(
        decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]
      );
    }
  }, []);

  return (
    <PageContainer>
      <div className="min-h-screen bg-bladLightBackground text-bladLightTextColor px-4 py-6">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <h1 className="text-lg font-bold">Inställningar</h1>
        </div>

        {/* User Info */}
        <div className="flex items-center space-x-4 p-4 bg-bladLightFields rounded-lg mb-4">
          <Avatar>
            <AvatarImage src="/path/to/avatar.jpg" alt="User Avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-semibold">{userName}</h2>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-col sm:flex-row sm:space-x-4 border-b border-gray-300 mb-4">
          <Tab
            text="Profil inställningar"
            isActive={activeTab === "settings"}
            onClick={() => setActiveTab("settings")}
          />
          <Tab
            text="Klubbar"
            isActive={activeTab === "clubs"}
            onClick={() => setActiveTab("clubs")}
          />
          <Tab
            text="Bokhylla"
            isActive={activeTab === "library"}
            onClick={() => setActiveTab("library")}
          />
          <Tab
            text="Recensioner"
            isActive={activeTab === "reviews"}
            onClick={() => setActiveTab("reviews")}
          />
          <Tab
            text="Support"
            isActive={activeTab === "support"}
            onClick={() => setActiveTab("support")}
          />
        </div>

        {/* Content */}
        <div className="p-4 bg-bladLightFields rounded-lg">
          {activeTab === "settings" && <div><UserProfileSettings /></div>}
          {activeTab === "clubs" && <div>Här kan du se och hantera dina klubbar.</div>}
          {activeTab === "library" && <div>Här är din bokhylla.</div>}
          {activeTab === "reviews" && <div>Här kan du läsa och skriva recensioner.</div>}
          {activeTab === "support" && <div><Support /></div>}
        </div>
      </div>
    </PageContainer>
  );
};

const Tab = ({ text, isActive, onClick }) => (
  <div
    onClick={onClick}
    className={`cursor-pointer px-4 py-2 mb-2 sm:-mb-px text-sm font-medium ${
      isActive
        ? "border-b-2 border-bladLightTextColor text-bladLightTextColor"
        : "text-gray-500 hover:text-bladLightTextColor"
    }`}
  >
    {text}
  </div>
);

export default UserProfile;
