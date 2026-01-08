import { useEffect, useState } from "react";
import { useCurrentUser } from "../features/auth/useCurrentUser";
import { NavLink, useNavigate } from "react-router-dom";
import {
  TbCalendarEvent,
  TbBuildingStore,
  TbBell,
  TbLogout2,
} from "react-icons/tb";

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

  // console.log(username, email);

  useEffect(() => {
    const handleResize = () => setExpand(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div
      onMouseEnter={() => window.innerWidth < 1024 && setExpand(true)}
      onMouseLeave={() => window.innerWidth < 1024 && setExpand(false)}
      className={`flex flex-col justify-between  absolute top-0 left-0 z-10 py-6 px-3  mt-3 lg:mt-4 ml-3 lg:ml-4  h-[calc(100%-1.5rem)] lg:h-[calc(100%-1.75rem)] bg-gray-900/90 border border-blue-700/50 rounded-2xl shadow-xl transition-all duration-400 ease-in-out ${
        expand ? "w-60" : "w-20 "
      }`}
    >
      <div>
        <div className="flex  items-center gap-3 mb-8 px-2 select-none transition-all duration-300">
          <div
            className={`px-2.5 py-1.5 rounded-lg bg-linear-to-br from-blue-600 to-cyan-400 text-white font-extrabold shadow-md text-base md:text-lg`}
          >
            SS
          </div>
          {expand && (
            <h1 className="ml-2 text-lg md:text-xl font-bold text-white leading-tight">
              Slot
              <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">
                Scheduler
              </span>
            </h1>
          )}
        </div>

        <nav className="flex flex-col gap-2.5 p">
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

      <div className="border-t border-blue-800/50 pt-4 mt-4">
        <div className="flex items-center gap-3 px-3 py-2 rounded-xl ">
          <div
            className={`w-9 h-9 md:w-10 md:h-10 rounded-full px-3 bg-linear-to-br from-blue-600 to-cyan-400 flex items-center justify-center text-white font-semibold text-base md:text-lg shadow-inner `}
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
    </div>
  );
}
