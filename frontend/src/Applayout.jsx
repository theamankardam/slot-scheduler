import Sidebar from "./components/Sidebar";
import { Outlet, useLocation } from "react-router-dom";

export default function AppLayout() {
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes("myCalender")) return "My Calendar";
    if (path.includes("marketPlace")) return "Marketplace";
    if (path.includes("notification")) return "Notifications";
    return "myCalender";
  };

  return (
    <div className="p-3 lg:pt-4 w-screen h-screen bg-linear-to-br from-gray-950 via-blue-950 to-gray-900 text-white">
      <main className="h-full w-[calc(100%-5.75rem)] lg:w-[calc(100%-16.5rem)]   ml-23 lg:ml-65  relative z-0 bg-gray-900  rounded-2xl bg-linear-to-br from-gray-900/70 via-blue-900/60 to-gray-950/70 backdrop-blur-lg border border-cyan-500/30 shadow-2xl pt-5 sm:pt-6 px-1 overflow-y-auto transition-all duration-300">
        <h1 className="text-lg pb-2 px-3 mb-2 font-semibold text-cyan-300  border-b border-cyan-500/40 drop-shadow-lg tracking-wide">
          {getPageTitle()}
        </h1>
        <Outlet />
      </main>
      <Sidebar />
    </div>
  );
}
