import { motion } from "motion/react";

export default function SettingsCard({ title, description, children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
    >
      <div className="p-6 border-b border-slate-100 bg-slate-50/50">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        {description && <p className="text-sm text-slate-500 mt-1">{description}</p>}
      </div>
      <div className="p-6">
        {children}
      </div>
    </motion.div>
  );
}
