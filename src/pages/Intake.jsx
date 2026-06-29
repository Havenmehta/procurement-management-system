import { useState, useEffect } from "react";
import IntakeTable from "../components/intake/IntakeTable.jsx";
import Toast from "../components/common/Toast.jsx";
import { getIntakes } from "../services/intakeService.js";

export default function Intake() {
  const [intakes, setIntakes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto pb-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="h-8 w-48 bg-slate-200 rounded animate-pulse" />
            <div className="h-4 w-64 bg-slate-200 rounded animate-pulse" />
          </div>
        </div>
        <div className="h-96 bg-white rounded-xl border border-slate-200 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Intake</h1>
          <p className="text-slate-500 text-sm mt-1">Manage and track new procurement requests.</p>
        </div>
      </div>

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