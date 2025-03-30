import { Home, Cpu, Notebook, Briefcase, PlaySquare, Menu, X, Milestone, KeyboardMusic, Pencil } from "lucide-react";
import { HeaderIcon } from "./HeaderIcon";
import { UserProfile } from "./UserProfile";
import { useState } from "react";
import logo from "../../assets/logo.png";
import DarkModeToggle from "../ui/DarkModeToggle";
import { Medal, Shield, Star, Gem } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveItem } from "../../store/navigationSlice";

const badgeTiers = {
  gold: { color: "bg-yellow-500", icon: <Medal className="text-yellow-300" />, name: "Gold", points: "2000+" },
  silver: { color: "bg-gray-400", icon: <Shield className="text-gray-200" />, name: "Silver", points: "1000 - 1999" },
  bronze: { color: "bg-orange-600", icon: <Star className="text-orange-400" />, name: "Bronze", points: "500 - 999" },
};

export const Header = ({ onNavItemClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBadgeHovered, setIsBadgeHovered] = useState(false); // Hover state for badge

  const dispatch = useDispatch();
  const activePage = useSelector((state) => state.navigation.activeItem);
  const badge = badgeTiers.gold; // Currently achieved badge

  const navItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "ai-assistant", icon: Cpu, label: "AI Assistant" },
    { id: "notion", icon: Notebook, label: "Notion" },
    { id: "career-path", icon: Briefcase, label: "Career Path" },
    { id: "video-summarizer", icon: PlaySquare, label: "Video Summarizer" },
    { id: "studio", icon: KeyboardMusic, label: "Studio" },
    { id: "whiteboard", icon: Pencil, label: "Whiteboard" },
    { id: "Milestone", icon: Milestone, label: "Milestone" }
  ];

  const handleNavItemClick = (id) => {
    dispatch(setActiveItem(id)); 
    onNavItemClick(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#50A8FF] dark:bg-gray-900 dark:text-white px-6 py-4 pb-2">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        <img
          src={logo}
          className="w-24 hover:scale-110 transition-transform duration-300 ease-in-out cursor-pointer"
          alt="Logo"
        />

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-1 items-center justify-center space-x-8">
          {navItems.map(({ id, icon: Icon, label }) => (
            <HeaderIcon
              key={id}
              onClick={() => handleNavItemClick(id)}
              className={`cursor-pointer transition-all duration-300 ease-in-out ${
                activePage === id ? "bg-[#FFD700] dark:bg-[#ADFF00] font-bold text-black px-4 py-2 rounded-lg" : ""
              }`}
            >
              <Icon className="w-5 h-5" />
              {activePage === id && <span className="text-sm ml-2">{label}</span>}
            </HeaderIcon>
          ))}
        </div>

        {/* Mobile Menu Button and Dark Mode Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white transition-transform duration-300 ease-in-out"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <div className="pr-5 flex justify-center items-center">
            <DarkModeToggle />
          </div>
        </div>

        {/* Badge Section */}
        <div
          className={`relative flex items-center gap-2 p-2 mr-2 rounded-lg cursor-pointer ${badge.color}`}
          onMouseEnter={() => setIsBadgeHovered(true)}
          onMouseLeave={() => setIsBadgeHovered(false)}
        >
          {badge.icon}
          <span className="text-white font-bold mr-2 capitalize">{badge.name}</span>

          {/* Hover Box for Badge Info */}
          {isBadgeHovered && (
            <div className="absolute top-10 right-0 bg-white dark:bg-gray-800 text-black dark:text-white shadow-lg rounded-lg p-4 w-52">
              <h3 className="font-semibold mb-2">Badge Tiers</h3>
              <div className="flex flex-col gap-2">
                {Object.values(badgeTiers).map(({ name, color, icon, points }) => (
                  <div key={name} className={`flex items-center gap-2 p-2 rounded-md ${color} text-white`}>
                    {icon}
                    <div>
                      <span className="font-bold">{name}</span>
                      <p className="text-xs">Points: {points}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full px-4 left-0 right-0 pb-4 rounded-b-4xl bg-black dark:bg-gray-900 shadow-lg md:hidden">
            <div className="p-4 space-y-4">
              <HeaderIcon
                onClick={() => setIsMobileMenuOpen(false)}
                className="cursor-pointer w-full transition-all pb-3 duration-300 ease-in-out text-white"
              >
                <UserProfile />
              </HeaderIcon>
              {navItems.map(({ id, icon: Icon, label }) => (
                <HeaderIcon
                  key={id}
                  onClick={() => handleNavItemClick(id)}
                  className={`cursor-pointer w-full transition-all duration-300 ease-in-out ${
                    activePage === id ? "text-[#ADFF00]" : "text-white"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm ml-2">{label}</span>
                </HeaderIcon>
              ))}
            </div>
          </div>
        )}

        {/* Desktop Profile */}
        <div className="hidden md:flex">
          <UserProfile />
        </div>
      </nav>
    </header>
  );
};
