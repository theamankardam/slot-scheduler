import { useState } from "react";
import { useEvent } from "../hooks/useEvent";
import toast from "react-hot-toast";

export default function Marketplace() {
  const { userEvents = [] } = useEvent();
  const [selectedSlot, setSelectedSlot] = useState(null);

  const mySwappableEvents = userEvents.filter((e) => e.status === "SWAPPABLE");

  const marketplaceEvents = userEvents.filter((e) => e.isMarketplace === true);

  const handleSelect = (event) => setSelectedSlot(event);

  const handleRequestSwap = (targetEvent) => {
    if (!selectedSlot) {
      toast.error("Select one of your swappable slots first");
      return;
    }

    toast.success(
      `"${selectedSlot.title}" requested for "${targetEvent.title}"`
    );
  };

  return (
    <div
      className="
        max-w-7xl mx-auto
        p-4 sm:px-6 lg:px-8
      
        h-[calc(100vh-100px)]
        grid grid-cols-1 xl:grid-cols-2
        gap-6
        text-white
      "
    >
      {/* ============ MY SLOTS ============ */}
      <div className="bg-gray-900/70 border border-cyan-700/40 rounded-xl shadow-lg flex flex-col h-full ">
        {/* Header */}
        <div className="p-4 border-b border-cyan-700/40 shrink-0">
          <h2 className="text-lg font-bold text-cyan-300">
            Your Swappable Slots
          </h2>
        </div>

        {/* Scroll Content */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-thin scrollbar-thumb-cyan-600 scrollbar-track-transparent">
          {mySwappableEvents.length === 0 && (
            <p className="text-gray-400 text-sm">
              No swappable slots available
            </p>
          )}

          {mySwappableEvents.map((e) => (
            <div
              key={e.id}
              onClick={() => handleSelect(e)}
              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                selectedSlot?.id === e.id
                  ? "bg-cyan-600 border-cyan-300"
                  : "bg-cyan-900/50 border-cyan-600 hover:bg-cyan-800/60"
              }`}
            >
              <div className="font-semibold">{e.title}</div>
              <div className="text-xs text-gray-300">
                {e.day} | {e.startTime} – {e.endTime}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ============ MARKETPLACE ============ */}
      <div className="bg-gray-900/70 border border-cyan-700/40 rounded-xl shadow-lg flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-cyan-700/40 shrink-0">
          <h2 className="text-lg font-bold text-cyan-300">Marketplace</h2>
        </div>

        {/* Scroll Content */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-thin scrollbar-thumb-cyan-600 scrollbar-track-transparent">
          {marketplaceEvents.length === 0 && (
            <p className="text-gray-400 text-sm">
              No slots available in marketplace
            </p>
          )}

          {marketplaceEvents.map((e) => (
            <div
              key={e.id}
              className="flex justify-between items-center p-3 rounded-lg border bg-gray-800/60"
            >
              <div>
                <div className="font-semibold text-cyan-200">{e.title}</div>
                <div className="text-xs text-gray-300">
                  {e.startTime} – {e.endTime}
                </div>
              </div>

              <button
                onClick={() => handleRequestSwap(e)}
                className="
                  px-4 py-1 rounded-lg font-semibold
                  bg-gradient-to-r from-cyan-600 via-sky-500 to-blue-700
                  hover:scale-105 transition-all
                "
              >
                Request
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
