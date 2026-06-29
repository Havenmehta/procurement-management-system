import { useState, useMemo, useEffect } from "react";
import { Calendar, Package, CheckCircle, Video, Clock, Filter, Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { getEvents, createEvent } from "../services/eventService";
import { cn } from "../utils/cn";
import StatusBadge from "../components/common/StatusBadge";
import Toast from "../components/common/Toast";

export default function Events() {
  const [eventsList, setEventsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [toast, setToast] = useState({ isVisible: false, message: "" });
  
  useEffect(() => {
    setIsLoading(true);
    getEvents()
      .then(setEventsList)
      .catch((error) => {
        console.error("Failed to load events", error);
        setToast({ isVisible: true, message: "Failed to load events." });
      })
      .finally(() => setIsLoading(false));
  }, []);

  const [formData, setFormData] = useState({

    title: "",
    type: "meeting",
    date: "",
    vendor: "",
    description: "",
  });

  const iconMap = {
    meeting: Video,
    delivery: Package,
    approval: CheckCircle,
  };

  const colorMap = {
    meeting: "bg-blue-100 text-blue-600 border-blue-200",
    delivery: "bg-emerald-100 text-emerald-600 border-emerald-200",
    approval: "bg-purple-100 text-purple-600 border-purple-200",
  };

  const filteredEvents = useMemo(() => {
    const sorted = [...eventsList].sort((a, b) => new Date(a.date) - new Date(b.date));
    if (filter === "All") return sorted;
    return sorted.filter((e) => e.type === filter);
  }, [eventsList, filter]);

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.vendor) return;

    const newEvent = await createEvent({
      ...formData,
      status: "Upcoming",
    });
    
    setEventsList([newEvent, ...eventsList]);
    setIsFormOpen(false);
    setFormData({ title: "", type: "meeting", date: "", vendor: "", description: "" });
    setToast({ isVisible: true, message: "Event created successfully!" });
    setTimeout(() => setToast({ isVisible: false, message: "" }), 3000);
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
        
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-9 w-24 bg-slate-200 rounded animate-pulse shrink-0" />
          ))}
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 p-6 md:p-8">
          <div className="relative border-l-2 border-slate-100 ml-4 md:ml-6 space-y-10">
            {[1, 2, 3].map(i => (
              <div key={i} className="relative pl-8 md:pl-10">
                <div className="absolute -left-[21px] top-1 w-10 h-10 bg-slate-200 rounded-full animate-pulse border-4 border-white" />
                <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm space-y-3">
                  <div className="h-6 w-1/3 bg-slate-200 rounded animate-pulse" />
                  <div className="h-4 w-1/4 bg-slate-200 rounded animate-pulse" />
                  <div className="h-4 w-2/3 bg-slate-200 rounded animate-pulse mt-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Sourcing Events</h1>
          <p className="text-slate-500 text-sm mt-1">Manage vendor meetings, deliveries, and approvals.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center text-slate-600 bg-white border border-slate-200 rounded-md px-3 py-1.5 shadow-sm hover:bg-slate-50 transition-colors">
             <Filter className="w-4 h-4 mr-2" />
             <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="text-sm bg-transparent outline-none focus:ring-0 cursor-pointer font-medium"
              >
                <option value="All">All Events</option>
                <option value="meeting">Meetings</option>
                <option value="delivery">Deliveries</option>
                <option value="approval">Approvals</option>
              </select>
          </div>
          <button 
            onClick={() => setIsFormOpen(true)}
            disabled={isFormOpen}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md font-medium text-sm hover:bg-blue-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Event
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isFormOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0, overflow: "hidden" }}
            animate={{ opacity: 1, height: "auto", overflow: "visible" }}
            exit={{ opacity: 0, height: 0, overflow: "hidden" }}
            className="bg-white rounded-xl shadow-sm border border-slate-200/60 p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-slate-900">Create New Event</h2>
              <button type="button" aria-label="Close form" onClick={() => setIsFormOpen(false)} className="text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-50 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500/20">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="event-title" className="block text-sm font-medium text-slate-700 mb-1">Event Title</label>
                  <input id="event-title" required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-md focus:ring-2 focus:ring-blue-500/20 text-sm" placeholder="e.g. Q3 Vendor Review" />
                </div>
                <div>
                  <label htmlFor="event-type" className="block text-sm font-medium text-slate-700 mb-1">Type</label>
                  <select id="event-type" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-md focus:ring-2 focus:ring-blue-500/20 text-sm">
                    <option value="meeting">Meeting</option>
                    <option value="delivery">Delivery</option>
                    <option value="approval">Approval</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="event-date" className="block text-sm font-medium text-slate-700 mb-1">Date & Time</label>
                  <input id="event-date" required type="datetime-local" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-md focus:ring-2 focus:ring-blue-500/20 text-sm" />
                </div>
                <div>
                  <label htmlFor="event-vendor" className="block text-sm font-medium text-slate-700 mb-1">Vendor / Related To</label>
                  <input id="event-vendor" required type="text" value={formData.vendor} onChange={e => setFormData({...formData, vendor: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-md focus:ring-2 focus:ring-blue-500/20 text-sm" placeholder="e.g. Apple India" />
                </div>
              </div>
              <div>
                <label htmlFor="event-desc" className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea id="event-desc" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows="2" className="w-full px-3 py-2 border border-slate-200 rounded-md focus:ring-2 focus:ring-blue-500/20 text-sm" placeholder="Optional details..."></textarea>
              </div>
              <div className="flex justify-end pt-2">
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">Add Event</button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 p-6 md:p-8">
        <div className="relative border-l-2 border-slate-100 ml-4 md:ml-6 space-y-10">
          {filteredEvents.length === 0 ? (
            <div className="pl-6 text-slate-500 py-16 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100 shadow-sm mb-4">
                <Calendar className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-base font-semibold text-slate-900">No events scheduled</h3>
              <p className="text-sm mt-1 max-w-sm">There are no upcoming meetings or deliveries matching your filters.</p>
            </div>
          ) : (
            filteredEvents.map((event, index) => {
              const Icon = iconMap[event.type] || Calendar;
              const dateObj = new Date(event.date);
              
              return (
                <motion.div 
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="relative pl-8 md:pl-10 group"
                >
                  <div className={cn(
                    "absolute -left-[19px] top-1 p-1.5 rounded-full border-[3px] bg-white transition-transform group-hover:scale-110 duration-300",
                    colorMap[event.type]
                  )}>
                    <Icon className="w-4 h-4" />
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-base font-semibold text-slate-900 tracking-tight">{event.title}</h3>
                        <StatusBadge status={event.status} />
                      </div>
                      <p className="text-sm font-medium text-blue-600 mt-1">{event.vendor}</p>
                    </div>
                    <div className="flex items-center text-slate-500 text-sm font-medium bg-slate-50 px-2.5 py-1.5 rounded-md border border-slate-200/60 shrink-0">
                      <Clock className="w-4 h-4 mr-1.5" />
                      {dateObj.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                    </div>
                  </div>
                  
                  <p className="text-slate-600 text-sm leading-relaxed max-w-3xl">
                    {event.description}
                  </p>
                  
                  {event.attendees && (
                    <div className="mt-4 flex items-center gap-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Attendees:</span>
                      <div className="flex -space-x-2">
                        {event.attendees.map((attendee, i) => (
                          <div 
                            key={i} 
                            className="w-7 h-7 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-xs font-semibold text-slate-600 shadow-sm z-10 hover:z-20 hover:scale-110 transition-transform cursor-default"
                            title={attendee}
                          >
                            {attendee.charAt(0)}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })
          )}
        </div>
      </div>
      <Toast 
        isVisible={toast.isVisible} 
        message={toast.message} 
        onClose={() => setToast({ isVisible: false, message: "" })} 
      />
    </div>
  );
}
