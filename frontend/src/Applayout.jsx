import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";

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
    <div className="min-h-screen flex gap-4 p-4 bg-linear-to-br from-gray-950 via-blue-950 to-gray-900 text-white transition-all duration-300">
      {/* Sidebar */}
      <div className="rounded-2xl overflow-hidden shadow-2xl bg-gray-900/85 backdrop-blur-xl border border-cyan-600/40">
        <Sidebar />
      </div>

      {/* Main Area */}
      <main className="flex-1  rounded-2xl bg-linear-to-br from-gray-900/70 via-blue-900/60 to-gray-950/70 backdrop-blur-lg border border-cyan-500/30 shadow-2xl p-6 overflow-y-auto transition-all duration-300">
        <h1 className="text-2xl font-semibold text-cyan-300 mb-6 border-b border-cyan-500/40 pb-3 drop-shadow-lg tracking-wide">
          {getPageTitle()}
        </h1>
        {/* <div className="flex justify-center"> */}
        <Outlet />
        {/* </div> */}
      </main>
    </div>
  );
}
