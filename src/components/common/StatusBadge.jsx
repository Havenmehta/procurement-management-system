import { cn } from "../../utils/cn";
import { STATUS } from "../../constants/status";
import { memo } from "react";

const statusStyles = {
  [STATUS.PENDING]: "bg-amber-50 text-amber-700 border-amber-200",
  [STATUS.PROCESSING]: "bg-blue-50 text-blue-700 border-blue-200",
  [STATUS.APPROVED]: "bg-emerald-50 text-emerald-700 border-emerald-200",
  [STATUS.DELIVERED]: "bg-purple-50 text-purple-700 border-purple-200",
  [STATUS.REJECTED]: "bg-rose-50 text-rose-700 border-rose-200",
  [STATUS.SCHEDULED]: "bg-indigo-50 text-indigo-700 border-indigo-200",
  [STATUS.UPCOMING]: "bg-sky-50 text-sky-700 border-sky-200",
  [STATUS.COMPLETED]: "bg-emerald-50 text-emerald-700 border-emerald-200",
  [STATUS.UNDER_REVIEW]: "bg-orange-50 text-orange-700 border-orange-200",
  [STATUS.AWAITING_VENDOR]: "bg-cyan-50 text-cyan-700 border-cyan-200",
  [STATUS.CANCELLED]: "bg-slate-100 text-slate-700 border-slate-300",
  default: "bg-slate-50 text-slate-700 border-slate-200"
};

const statusDots = {
  [STATUS.PENDING]: "bg-amber-500",
  [STATUS.PROCESSING]: "bg-blue-500",
  [STATUS.APPROVED]: "bg-emerald-500",
  [STATUS.DELIVERED]: "bg-purple-500",
  [STATUS.REJECTED]: "bg-rose-500",
  [STATUS.SCHEDULED]: "bg-indigo-500",
  [STATUS.UPCOMING]: "bg-sky-500",
  [STATUS.COMPLETED]: "bg-emerald-500",
  [STATUS.UNDER_REVIEW]: "bg-orange-500",
  [STATUS.AWAITING_VENDOR]: "bg-cyan-500",
  [STATUS.CANCELLED]: "bg-slate-500",
  default: "bg-slate-500"
};

const StatusBadge = memo(function StatusBadge({ status, className }) {
  const style = statusStyles[status] || statusStyles.default;
  const dotStyle = statusDots[status] || statusDots.default;
  return (
    <span className={cn("inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase border shadow-sm", style, className)}>
      <span className={cn("w-1.5 h-1.5 rounded-full mr-1.5", dotStyle)} />
      {status}
    </span>
  );
});

export default StatusBadge;
