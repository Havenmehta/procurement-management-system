import { motion } from "motion/react";
import { ArrowUpRight, ArrowDownRight, FileDown, FileText, ShoppingCart, IndianRupee } from "lucide-react";
import { cn } from "../../utils/cn";

const iconMap = {
  FileDown,
  FileText,
  ShoppingCart,
  IndianRupee
};

export default function SummaryCard({ title, value, trend, trendUp, iconName, delay = 0 }) {
  const Icon = iconMap[iconName] || FileText;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className="bg-white p-5 rounded-xl shadow-sm border border-slate-200/60 hover:border-slate-300/80 transition-all duration-300 flex flex-col group"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="p-2 bg-slate-50 text-slate-500 rounded-md border border-slate-100 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-100 transition-colors duration-300">
          <Icon className="w-4 h-4" />
        </div>
        <div className={cn(
          "flex items-center text-[11px] font-semibold px-2 py-0.5 rounded-md border tracking-wide",
          trendUp ? "text-emerald-700 bg-emerald-50 border-emerald-100" : "text-rose-700 bg-rose-50 border-rose-100"
        )}>
          {trendUp ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
          {trend}
        </div>
      </div>
      <div>
        <h3 className="text-slate-500 text-xs font-medium uppercase tracking-wider">{title}</h3>
        <p className="text-2xl font-semibold text-slate-900 mt-1 tracking-tight">{value}</p>
      </div>
    </motion.div>
  );
}
