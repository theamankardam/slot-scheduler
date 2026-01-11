import StatusButton from "../components/StatusButton";
import { useSwapRequest } from "../hooks/useSwapRequest";

export default function Notification() {
  const { swapMyRequests, swapTheirRequests, respondSwap, isResponding } =
    useSwapRequest();

  const incomingSlots =
    swapTheirRequests
      ?.filter((req) => req.status === "PENDING")
      .map((req) => ({
        mySlot: req.theirSlot,
        theirSlot: req.mySlot,
        requester: req.requester,
        receiver: req.receiver,
        requestId: req._id,
      })) || [];

  const outgoingSlots =
    swapMyRequests
      ?.filter((req) => req.mySlot && req.theirSlot && req.receiver)
      .map((req) => ({
        mySlot: req.mySlot,
        theirSlot: req.theirSlot,
        receiver: req.receiver,
        status: req.status,
      })) || [];

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 h-[85vh] text-slate-200 space-y-8">
      <section className="border border-slate-800 rounded-lg bg-slate-900/50 flex flex-col max-h-[45vh]">
        <header className="px-4 py-3 border-b border-slate-800 sticky top-0 bg-slate-900/80 backdrop-blur">
          <h2 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
            Incoming Requests
            {incomingSlots.length > 0 && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300">
                {incomingSlots.length}
              </span>
            )}
          </h2>
        </header>

        <div className="divide-y divide-slate-800 overflow-y-auto">
          {incomingSlots.length === 0 ? (
            <p className="px-4 py-6 text-sm text-slate-400">
              No incoming requests
            </p>
          ) : (
            incomingSlots.map(({ mySlot, theirSlot, requester, requestId }) => (
              <div
                key={mySlot._id}
                className="px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:bg-slate-800/40 transition"
              >
                <div className="space-y-0.5">
                  <p className="text-sm text-slate-100">
                    <span className="text-sky-400">
                      {requester?.username} wants your slot:
                    </span>{" "}
                    <span className=" text-emerald-400 font-medium">
                      {mySlot.title} |
                    </span>{" "}
                    {mySlot.day} {mySlot.startTime} – {mySlot.endTime}
                  </p>
                  <p className="text-xs text-slate-400">
                    <span className="font-medium">{theirSlot.title}</span> •{" "}
                    {theirSlot.day} {theirSlot.startTime} – {theirSlot.endTime}
                  </p>
                  <span className="text-[11px] text-amber-400">
                    Pending approval
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    disabled={isResponding}
                    onClick={() => respondSwap({ requestId, accept: true })}
                    className="cursor-pointer px-3 py-1.5 text-xs rounded-md bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/30 transition"
                  >
                    {isResponding ? "Processing..." : "Accept"}
                  </button>
                  <button
                    disabled={isResponding}
                    onClick={() => respondSwap({ requestId, accept: false })}
                    className="cursor-pointer px-3 py-1.5 text-xs rounded-md bg-red-600/20 text-red-300 hover:bg-red-600/30 transition"
                  >
                    {isResponding ? "Processing..." : "Reject"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="border border-slate-800 rounded-lg bg-slate-900/50 flex flex-col max-h-[30vh]">
        <header className="px-4 py-3 border-b border-slate-800 sticky top-0 bg-slate-900/80 backdrop-blur">
          <h2 className="text-sm font-semibold text-slate-300">
            Outgoing Requests
            {outgoingSlots.length > 0 && (
              <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300">
                {outgoingSlots.length}
              </span>
            )}
          </h2>
        </header>

        <div className="divide-y divide-slate-800 overflow-y-auto">
          {outgoingSlots.length === 0 ? (
            <p className="px-4 py-6 text-sm text-slate-400">
              No outgoing requests
            </p>
          ) : (
            outgoingSlots.map(({ mySlot, theirSlot, receiver, status }) => (
              <div
                key={mySlot._id}
                className="px-4 py-3 flex items-center justify-between hover:bg-slate-800/40 transition"
              >
                <div>
                  <p className="text-sm text-slate-100">
                    <span className="text-yellow-600 sm:hidden">
                      Requested:
                    </span>{" "}
                    <span className="text-yellow-600 hidden sm:inline">
                      Requested to {receiver.username}:
                    </span>{" "}
                    <span className="hidden sm:inline  text-emerald-400 font-medium">
                      {" "}
                      {theirSlot.title} |{" "}
                    </span>
                    {theirSlot.day} {theirSlot.startTime} – {theirSlot.endTime}
                  </p>
                  <p className="text-xs text-slate-400">
                    <span className="sm:hidden">Slot:</span>
                    <span className="hidden sm:inline">offered-Slot:</span>
                    <span className="hidden sm:inline ml-1 ">
                      {mySlot.title} |{" "}
                    </span>{" "}
                    {mySlot.day} {mySlot.startTime} – {mySlot.endTime}
                  </p>
                </div>
                <StatusButton status={status} />
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
