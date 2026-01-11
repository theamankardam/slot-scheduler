const STATUS_STYLES = {
  PENDING:
    "bg-sky-500/10 text-sky-300 border border-sky-500/25",
  ACCEPTED:
    "bg-emerald-500/10 text-emerald-300 border border-emerald-500/25",
  REJECTED:
    "bg-rose-500/10 text-rose-300 border border-rose-500/25",
};

export default function StatusButton({ status }) {
  const normalizedStatus = status?.toUpperCase() || "PENDING";

  return (
    <span
      className={`inline-flex items-center justify-center
        px-3 py-1 text-[11px] font-medium
        rounded-md tracking-wide
        whitespace-nowrap
        ${STATUS_STYLES[normalizedStatus]}`}
    >
      {normalizedStatus}
    </span>
  );
}
