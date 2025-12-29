import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  TbCalendarEvent,
  TbBuildingStore,
  TbBell,
  TbLogout2,
} from "react-icons/tb";
import { useCurrentUser } from "../features/auth/useCurrentUser";

const menuItems = [
  {
    path: "/myCalender",
    name: "My Calendar",
    icon: <TbCalendarEvent size={24} />,
  },
  {
    path: "/marketPlace",
    name: "Marketplace",
    icon: <TbBuildingStore size={24} />,
  },
  { path: "/notification", name: "Notifications", icon: <TbBell size={24} /> },
];

export default function Sidebar() {
  const [expand, setExpand] = useState(false);
  const navigate = useNavigate();
  const { user } = useCurrentUser();
  const { username, email } = user?.user || {};

  // ✅ If name is not available, show fallback
  const displayName = username ? username : "User";
  const initial = username ? username.charAt(0).toUpperCase() : "U"; // Fallback initial

  const gradientColors = [
    "from-pink-500 to-rose-400",
    "from-blue-600 to-cyan-400",
    "from-green-500 to-lime-400",
    "from-purple-500 to-indigo-400",
    "from-orange-500 to-amber-400",
  ];

  const [avatarColor] = useState(
    gradientColors[Math.floor(Math.random() * gradientColors.length)]
  );

  useEffect(() => {
    const handleResize = () => setExpand(window.innerWidth >= 1280);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside
      onMouseEnter={() => window.innerWidth < 1024 && setExpand(true)}
      onMouseLeave={() => window.innerWidth < 1024 && setExpand(false)}
      className={`h-full flex flex-col justify-between py-6 px-3 bg-gray-900/90 border-r border-blue-700/50 shadow-xl transition-all duration-300 ease-in-out ${
        expand ? "w-56 md:w-60" : "w-20 md:w-24"
      }`}
    >
      {/* -------- Top Section (Logo + Menu) -------- */}
      <div>
        <div className="flex items-center gap-3 mb-8 px-2 select-none transition-all duration-300">
          <div
            className={`px-2.5 py-1.5 rounded-lg bg-linear-to-br ${avatarColor} text-white font-extrabold shadow-md text-base md:text-lg`}
          >
            SS
          </div>
          {expand && (
            <h1 className="ml-2 text-lg md:text-xl font-bold text-white leading-tight">
              Slot
              <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">
                Swapper
              </span>
            </h1>
          )}
        </div>

        <nav className="flex flex-col gap-2.5">
          {menuItems.map(({ path, name, icon }) => (
            <NavLink
              key={name}
              to={path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm md:text-base font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-linear-to-r from-blue-600 to-cyan-500 text-white shadow-md"
                    : "text-blue-200 hover:bg-blue-800/40 hover:text-white"
                }`
              }
            >
              <span className="shrink-0">{icon}</span>
              {expand && <span>{name}</span>}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* -------- Bottom Section (Profile + Logout) -------- */}
      <div className="border-t border-blue-800/50 pt-4 mt-4">
        <div className="flex items-center gap-3 px-3 py-2 rounded-xl ">
          <div
            className={`w-9 h-9 md:w-10 md:h-10 rounded-full px-3 bg-linear-to-br ${avatarColor} flex items-center justify-center text-white font-semibold text-base md:text-lg shadow-inner `}
          >
            {initial}
          </div>
          {expand && (
            <div className="flex flex-col">
              <span className="text-sm md:text-base font-semibold text-white">
                {displayName}
              </span>
              <span className="text-xs md:text-sm text-blue-300 truncate">
                {email ? email : "No email available"}
              </span>
            </div>
          )}
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2 mt-3 rounded-xl text-blue-200 hover:bg-red-600/30 hover:text-red-300 transition-all duration-300 text-sm md:text-base cursor-pointer"
        >
          <TbLogout2 size={22} />
          {expand && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
}
