import { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import IntakeForm from "../components/intake/IntakeForm.jsx";
import IntakeTable from "../components/intake/IntakeTable.jsx";
import Toast from "../components/common/Toast.jsx";
import { getIntakes, createIntake } from "../services/intakeService.js";
import { STATUS } from "../constants/status.js";

export default function Intake() {
  const [intakes, setIntakes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [toast, setToast] = useState({ isVisible: false, message: "" });

  useEffect(() => {
    setIsLoading(true);
    getIntakes()
      .then(setIntakes)
      .catch((error) => {
        console.error("Failed to load intake requests", error);
        setToast({ isVisible: true, message: "Failed to load requests." });
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleCreateRequest = async (data) => {
    const newIntake = await createIntake({
      ...data,
      status: STATUS.PENDING,
    });
    
    setIntakes([newIntake, ...intakes]);
    setIsFormOpen(false);
    
    setToast({ isVisible: true, message: "Intake request submitted successfully!" });
    setTimeout(() => {
      setToast({ isVisible: false, message: "" });
    }, 3000);
  };

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto pb-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="h-8 w-48 bg-slate-200 rounded animate-pulse" />
            <div className="h-4 w-64 bg-slate-200 rounded animate-pulse" />
          </div>
          <div className="h-10 w-32 bg-slate-200 rounded animate-pulse" />
        </div>
        <div className="h-96 bg-white rounded-xl border border-slate-200 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Intake Requests</h1>
          <p className="text-slate-500 text-sm mt-1">Manage and track new procurement requests.</p>
        </div>
        
        {!isFormOpen && (
          <button 
            type="button"
            onClick={() => setIsFormOpen(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md font-medium text-sm hover:bg-blue-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-fit"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Request
          </button>
        )}
      </div>

      <AnimatePresence>
        {isFormOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0, overflow: "hidden" }}
            animate={{ opacity: 1, height: "auto", overflow: "visible" }}
            exit={{ opacity: 0, height: 0, overflow: "hidden" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-white rounded-xl shadow-sm border border-slate-200/60 p-6 md:p-8"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-slate-900">Create New Request</h2>
              <button type="button" aria-label="Close form" onClick={() => setIsFormOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors bg-slate-50 hover:bg-slate-100 p-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500/20">
                <X className="w-5 h-5" />
              </button>
            </div>
            <IntakeForm onSubmit={handleCreateRequest} onCancel={() => setIsFormOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 p-5">
        <IntakeTable data={intakes} />
      </div>

      <Toast 
        isVisible={toast.isVisible} 
        message={toast.message} 
        onClose={() => setToast({ isVisible: false, message: "" })} 
      />
    </div>
  );
}
