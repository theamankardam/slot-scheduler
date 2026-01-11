export default function Logo({
  color = "text-gray-900",
  textSize = "text-xl sm:text-2xl xl:text-3xl",
  compact = false,
  className = "",
}) {
  return (
    <>
      <div
        className={`flex items-center gap-2 ${className}`}
        aria-label="SlotSwapper logo"
      >
        <div
          className={`px-2 py-1 rounded-md bg-linear-to-br from-blue-600 to-cyan-400 text-white font-bold shadow-md`}
        >
          SS
        </div>

        {!compact && (
          <h1 className={`${textSize} font-extrabold tracking-tight ${color}`}>
            Slot
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-400">
              Scheduler
            </span>
          </h1>
        )}
      </div>
    </>
  );
}
