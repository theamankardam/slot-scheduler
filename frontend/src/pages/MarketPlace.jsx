import { useState } from "react";
import { useEvent } from "../hooks/useEvent";
import { useSwapRequest } from "../hooks/useSwapRequest";
import toast from "react-hot-toast";

export default function Marketplace() {
  const [requestingSlotId, setRequestingSlotId] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const { swappableSlots, requestSwap, isRequesting } = useSwapRequest();
  const { userEvents } = useEvent();
  const mySwappableEvents = userEvents.filter(
    (e) => e.status === "SWAPPABLE" || e.status === "SWAP_PENDING"
  );

  const handleSelect = (event) => setSelectedSlot(event);
  const handleRequestSwap = (targetEvent) => {
    if (!selectedSlot) {
      toast.error("Select one of your swappable slots first");
      return;
    }
    if (selectedSlot._id === targetEvent._id) {
      toast.error("You cannot swap the same slot");
      return;
    }
    setRequestingSlotId(targetEvent._id);
    requestSwap(
      {
        mySlotId: selectedSlot._id,
        theirSlotId: targetEvent._id,
      },
      {
        onSettled: () => {
          setRequestingSlotId(null);
        },
      }
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 md:py-4 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 text-white h-[85vh]">
      <div className="bg-gray-900/70 border border-cyan-700/40 rounded-xl shadow-lg flex flex-col min-h-[40vh] lg:h-full">
        <div className="p-3 sm:p-4 border-b border-cyan-700/40 shrink-0">
          <h2 className="text-base sm:text-lg font-bold text-cyan-300">
            Your Swappable Slots
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-2 sm:p-3 space-y-2 scrollbar-thin scrollbar-thumb-cyan-600 scrollbar-track-transparent">
          {mySwappableEvents.length === 0 && (
            <p className="text-gray-400 text-sm">
              No swappable slots available
            </p>
          )}

          {mySwappableEvents.map((e) => (
            <div
              key={e._id}
              onClick={() => handleSelect(e)}
              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                selectedSlot?._id === e._id && e.status === "SWAPPABLE"
                  ? "bg-cyan-600 border-cyan-300"
                  : e.status === "SWAPPABLE"
                  ? "bg-cyan-700/50 border-cyan-500 text-cyan-100 hover:bg-cyan-600/60"
                  : e.status === "SWAP_PENDING"
                  ? "bg-orange-700/50 border-orange-400 text-orange-100"
                  : "bg-blue-900/60 border-blue-700 text-blue-200"
              }`}
            >
              <div className="font-semibold text-sm sm:text-base">
                {e.title}
              </div>
              <div className="text-xs text-gray-300">
                {e.day} | {e.startTime} – {e.endTime}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-900/70 border border-cyan-700/40 rounded-xl shadow-lg flex flex-col min-h-[40vh] lg:h-full">
        <div className="p-3 sm:p-4 border-b border-cyan-700/40 shrink-0">
          <h2 className="text-base sm:text-lg font-bold text-cyan-300">
            Marketplace
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-2 sm:p-3 space-y-2 scrollbar-thin scrollbar-thumb-cyan-600 scrollbar-track-transparent">
          {swappableSlots.length === 0 && (
            <p className="text-gray-400 text-sm">
              No slots available in marketplace
            </p>
          )}

          {swappableSlots.map((e) => (
            <div
              key={e._id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 rounded-lg border bg-gray-800/60"
            >
              <div>
                <div className="font-semibold text-cyan-200 text-sm sm:text-base">
                  {e.title}
                </div>
                <div className="text-xs text-gray-300">
                  {e.day} | {e.startTime} – {e.endTime}
                </div>
                <div className="text-[10px] text-cyan-400">
                  by {e?.user?.username || "User"}
                </div>
              </div>

              <button
                onClick={() => handleRequestSwap(e)}
                className="w-full sm:w-auto px-4 py-1.5 rounded-lg font-semibold text-sm bg-linear-to-r from-cyan-600 via-sky-500 to-blue-700 hover:scale-105 transition-all cursor-pointer"
              >
                {isRequesting && requestingSlotId === e._id ? (
                  <span className="loading loading-bars loading-md"></span>
                ) : (
                  "Request"
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
