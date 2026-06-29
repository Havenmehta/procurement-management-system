import { CheckCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Toast({ message, isVisible, onClose }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          role="alert"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
          className="fixed bottom-6 right-6 z-50 flex items-center bg-emerald-50 text-emerald-800 border border-emerald-200 p-4 rounded-xl shadow-lg"
        >
          <CheckCircle className="w-5 h-5 text-emerald-500 mr-3" />
          <p className="text-sm font-medium pr-6">{message}</p>
          <button type="button" aria-label="Close notification" onClick={onClose} className="p-1 rounded-md hover:bg-emerald-100 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/20">
            <X className="w-4 h-4 text-emerald-600" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
