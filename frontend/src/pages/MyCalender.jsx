import React, { useState } from "react";
import { useEvent } from "../hooks/useEvent";
import toast from "react-hot-toast";

const hours = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

const DAY_MAP = {
  Mon: "Mon",
  Tue: "Tue",
  Wed: "Wed",
  Thu: "Thu",
  Fri: "Fri",
};
const getNextWeekdays = () => {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const result = [];
  let date = new Date();
  date.setDate(date.getDate() + 1);

  while (result.length < 5) {
    const dayName = weekdays[date.getDay()];
    if (dayName !== "Sat" && dayName !== "Sun") result.push(dayName);
    date.setDate(date.getDate() + 1);
  }
  return result;
};
const days = getNextWeekdays();

export default function MyCalender() {
  const [newEvent, setNewEvent] = useState({
    title: "",
    day: "",
    startTime: "09:00",
    endTime: "10:00",
    status: "SWAPPABLE",
  });
  
  const [editingEventId, setEditingEventId] = useState(null);
  const {
    userEvents = [],
    createNewEvent,
    deleteAnEvent,
    updateAnEvent,
    isCreating,
    isUpdating,
  } = useEvent();

  const handleEditEvent = (event) => {
    setNewEvent({
      title: event.title,
      day: event.day,
      startTime: event.startTime,
      endTime: event.endTime,
      status: event.status,
    });
    setEditingEventId(event._id);
  };

  const getEvent = (day, hour) =>
    userEvents.find((e) => DAY_MAP[e.day] === day && e.startTime === hour);

  const handleAddEvent = (e) => {
    e.preventDefault();
    const { title, day, startTime, endTime, status } = newEvent;

    if (!title.trim()) {
      toast.error("Please enter a title!");
      return;
    }

    if (!day) {
      toast.error("Please select a day!");
      return;
    }

    if (startTime >= endTime) {
      toast.error("End time must be after start time!");
      return;
    }

    const startHour = parseInt(startTime.split(":")[0], 10);
    const endHour = parseInt(endTime.split(":")[0], 10);

    if (endHour - startHour !== 1) {
      toast.error("Events must be exactly 1 hour long!");
      return;
    }

    const eventPayload = {
      title: title.trim(),
      day,
      startTime,
      endTime,
      status,
    };

    if (editingEventId) {
      updateAnEvent(
        { id: editingEventId, data: eventPayload },
        {
          onSuccess: () => {
            setNewEvent({
              title: "",
              day: "",
              startTime: "09:00",
              endTime: "10:00",
              status: "SWAPPABLE",
            });
            setEditingEventId(null);
          },
        }
      );
    } else {
      createNewEvent(eventPayload, {
        onSuccess: () =>
          setNewEvent({
            title: "",
            day: "",
            startTime: "09:00",
            endTime: "10:00",
            status: "SWAPPABLE",
          }),
      });
    }
  };

  const handleDeleteEvent = (id) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    deleteAnEvent(id);
  };

  return (
    <div className="flex gap-4 px-2 sm:px-6">
      <div className="flex-1">
        <form
          className="px-6 py-3 sm:p-4 bg-gray-900/70 border border-cyan-700/40 rounded-xl shadow-lg backdrop-blur-md space-y-1 sm:space-y-3 lg:space-y-2 max-w-4xl 2xl:max-w-7xl mx-3 mb-4 sm:mx-8 sm:my-5"
          onSubmit={handleAddEvent}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-2">
            <input
              type="text"
              placeholder="Event title..."
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent((prev) => ({ ...prev, title: e.target.value }))
              }
              className="sm:col-span-2 text-xs sm:text-md py-1 sm:py-2 px-2 sm:px-4 rounded-lg bg-gray-800 text-white border border-cyan-600/40 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500 outline-none"
            />

            <select
              value={newEvent.day}
              onChange={(e) =>
                setNewEvent((prev) => ({ ...prev, day: e.target.value }))
              }
              className="py-1 sm:py-2 px-2 text-xs sm:text-sm rounded-lg bg-gray-800 border border-cyan-600/40  focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500 outline-none"
            >
              <option value="">Select Day</option>
              {days.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-1 sm:gap-2">
            <select
              value={newEvent.status}
              onChange={(e) =>
                setNewEvent((prev) => ({ ...prev, status: e.target.value }))
              }
              className="py-1 sm:py-2 px-2 text-xs sm:text-sm rounded-lg bg-gray-800 border border-cyan-600/40 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500 outline-none"
            >
              <option value="SWAPPABLE">Swappable</option>
              <option value="BUSY">Busy</option>
            </select>

            <select
              value={newEvent.startTime}
              onChange={(e) =>
                setNewEvent((prev) => ({ ...prev, startTime: e.target.value }))
              }
              className="py-1 sm:py-2 px-2 text-xs sm:text-sm rounded-lg bg-gray-800 border border-cyan-600/40 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500 outline-none"
            >
              {hours.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>

            <select
              value={newEvent.endTime}
              onChange={(e) =>
                setNewEvent((prev) => ({ ...prev, endTime: e.target.value }))
              }
              className="py-1 sm:py-2 px-2 text-xs sm:text-sm rounded-lg bg-gray-800 border border-cyan-600/40 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500 outline-none"
            >
              {hours.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>

            <button
              className="w-full py-1 sm:py-2 text-xs sm:text-base rounded-lg bg-linear-to-r from-green-600 via-emerald-500 to-green-700 font-medium shadow-md hover:scale-105 transition-all cursor-pointer
      "
            >
              {isCreating || isUpdating ? (
                <span className="loading loading-bars loading-md"></span>
              ) : editingEventId ? (
                "Update"
              ) : (
                "+ Add"
              )}
            </button>
          </div>
        </form>

        <div className="px-2  h-[50vh] sm:h-[60vh] md:h-[63vh] lg:h-[60vh] overflow-hidden">
          <div className="grid grid-cols-6 gap-2px xl:gap-1    text-[10px] sm:text-sm border border-cyan-700/30 rounded-lg h-full">
            <div className="flex items-center justify-center bg-cyan-800/30 py-2px  font-semibold ">
              Time
            </div>

            {days.map((day) => (
              <div
                key={day}
                className="flex items-center justify-center  bg-cyan-800/30 font-semibold text-cyan-300 py-2px"
              >
                {day}
              </div>
            ))}

            {hours.map((hour) => (
              <React.Fragment key={hour}>
                <div className="text-blue-400 font-medium text-right pr-1 py-2px border-t border-blue-900/40 bg-gray-950/60 text-[9px]">
                  {hour}
                </div>

                {days.map((day) => {
                  const event = getEvent(day, hour);

                  const cellClass = event
                    ? event.status === "SWAPPABLE"
                      ? "bg-cyan-700/40 border-cyan-400/40 text-cyan-100"
                      : event.status === "SWAP_PENDING"
                      ? "bg-orange-700/50 border-orange-400 text-orange-100"
                      : "bg-blue-900/70 border-blue-700/60 text-blue-200"
                    : "border-blue-800/20";

                  return (
                    <div
                      key={`${day}-${hour}`}
                      className={`
                h-30px sm:h-42px
                px-2px
                flex flex-col items-center justify-center
                rounded border
                leading-tight
                ${cellClass}
              `}
                    >
                      {event && (
                        <>
                          <span className="font-semibold text-[9px] sm:text-xs truncate">
                            {event.title}
                          </span>
                          <span className="text-[8px] sm:text-[10px] font-bold opacity-80 text-yellow-300">
                            {event.status === "SWAPPABLE"
                              ? "-Swap-"
                              : event.status === "SWAP_PENDING"
                              ? "-pending-"
                              : "-Busy-"}
                          </span>
                        </>
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="hidden lg:flex w-64 flex-col h-[80vh] mt-4">
        <div className="flex flex-col flex-1 bg-gray-900/80 border border-cyan-700/40 rounded-2xl overflow-hidden shadow-lg">
          <div className="p-4 border-b border-cyan-700/40">
            <h2 className="font-bold text-cyan-300">My Events</h2>
          </div>

          <div className="flex-1 p-3 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-600 scrollbar-track-transparent">
            {userEvents.length === 0 ? (
              <p className="text-gray-400 text-sm">No events added</p>
            ) : (
              userEvents.map((e) => (
                <div
                  key={e._id}
                  className={`relative p-2 rounded-lg border text-sm group ${
                    e.status === "SWAPPABLE"
                      ? "bg-cyan-700/40 border-cyan-500"
                      : e.status === "SWAP_PENDING"
                      ? "bg-orange-700/50 border-orange-400 text-orange-100"
                      : "bg-blue-900/60 border-blue-700"
                  }`}
                >
                  {e.status === "SWAP_PENDING" ? (
                    ""
                  ) : (
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                      <button
                        onClick={() => handleEditEvent(e)}
                        className="
                      w-6 h-6
                      flex items-center justify-center
                      rounded-sm
              border border-cyan-400/40
              text-cyan-300
              bg-cyan-900/20
              hover:bg-cyan-600/30
              transition
              cursor-pointer
            "
                        title="Edit"
                      >
                        ✎
                      </button>

                      <button
                        onClick={() => handleDeleteEvent(e._id)}
                        className="
                      w-6 h-6
                      flex items-center justify-center
                      rounded-sm
                      border border-red-400/40
                      text-red-300
                      bg-red-900/20
                      hover:bg-red-600/30
                      transition
                      cursor-pointer
                      "
                        title="Remove"
                      >
                        ✕
                      </button>
                    </div>
                  )}

                  <div className="font-semibold truncate pr-14">{e.title}</div>

                  <div className="text-xs text-gray-300">
                    {e.day} | {e.startTime} – {e.endTime}
                  </div>

                  <div className="text-xs font-bold text-yellow-200 capitalize">
                    {e.status.toLowerCase()}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
