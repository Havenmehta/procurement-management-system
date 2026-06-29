import { useState, useEffect, useMemo } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Search, Filter, Clock, MoreVertical, Package, ChevronRight } from "lucide-react";
import SummaryCard from "../components/dashboard/SummaryCard.jsx";
import StatusBadge from "../components/common/StatusBadge.jsx";
import Toast from "../components/common/Toast.jsx";
import { getDashboard } from "../services/dashboardService.js";

import { ROUTES } from "../constants/routes";

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [toast, setToast] = useState({ isVisible: false, message: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    summaryStats: [],
    recentActivities: [],
    latestOrders: [],
    upcomingDeliveries: []
  });

  useEffect(() => {
    setIsLoading(true);
    getDashboard()
      .then(setDashboardData)
      .catch((error) => {
        console.error("Failed to load dashboard data", error);
        setToast({ isVisible: true, message: "Failed to load dashboard data." });
      })
      .finally(() => setIsLoading(false));
  }, []);

  const { summaryStats, recentActivities, latestOrders, upcomingDeliveries } = dashboardData;

  const filteredOrders = useMemo(() => {
    if (!searchTerm) return latestOrders;
    const searchLower = searchTerm.toLowerCase();
    return latestOrders.filter((order) => 
      order.id.toLowerCase().includes(searchLower) || 
      order.vendor.toLowerCase().includes(searchLower) || 
      order.department.toLowerCase().includes(searchLower)
    );
  }, [latestOrders, searchTerm]);

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto pb-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="h-8 w-48 bg-slate-200 rounded animate-pulse" />
            <div className="h-4 w-64 bg-slate-200 rounded animate-pulse" />
          </div>
          <div className="flex items-center gap-3">
            <div className="h-9 w-64 bg-slate-200 rounded animate-pulse hidden sm:block" />
            <div className="h-9 w-24 bg-slate-200 rounded animate-pulse" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-32 bg-white rounded-xl border border-slate-200 animate-pulse" />
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-96 bg-white rounded-xl border border-slate-200 animate-pulse" />
          </div>
          <div className="space-y-6">
            <div className="h-48 bg-white rounded-xl border border-slate-200 animate-pulse" />
            <div className="h-48 bg-white rounded-xl border border-slate-200 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (

    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-slate-500 text-sm mt-1">Welcome back. Here's what's happening across procurement today.</p>
        </div>
        
        {/* Dashboard Actions */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full sm:w-64 pl-9 pr-3 py-1.5 border border-slate-200 rounded-md leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all shadow-sm"
              placeholder="Search orders, vendors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            type="button"
            aria-label="Filter activities"
            onClick={() => {
              setToast({ isVisible: true, message: `Opening filters...` });
              setTimeout(() => setToast({ isVisible: false, message: "" }), 3000);
            }}
            className="flex items-center justify-center px-3 py-1.5 border border-slate-200 rounded-md text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500/20">
            <Filter className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline text-sm font-medium">Filters</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {summaryStats.map((stat, index) => (
          <SummaryCard 
            key={stat.id} 
            {...stat} 
            delay={index * 0.1}
          />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2/3 width on large screens) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Latest Orders Table */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm border border-slate-200/60 overflow-hidden"
          >
            <div className="flex items-center justify-between p-5 border-b border-slate-200/60 bg-slate-50/50">
              <h2 className="text-base font-semibold text-slate-900 tracking-tight">Latest Purchase Orders</h2>
              <Link to={ROUTES.PURCHASE_ORDERS} className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center group">
                View All <ChevronRight className="w-4 h-4 ml-0.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-white text-slate-500 font-medium text-xs border-b border-slate-200/60">
                  <tr>
                    <th className="px-5 py-3 font-medium">Order ID</th>
                    <th className="px-5 py-3 font-medium">Vendor</th>
                    <th className="px-5 py-3 font-medium">Department</th>
                    <th className="px-5 py-3 font-medium text-right">Amount</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-5 py-12 text-center text-slate-500 bg-white">
                        <div className="flex flex-col items-center justify-center">
                          <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100 shadow-sm mb-3">
                            <Search className="w-6 h-6 text-slate-400" />
                          </div>
                          <h3 className="text-sm font-semibold text-slate-900">No orders found</h3>
                          <p className="text-xs mt-1 max-w-[200px] text-center">Adjust your search to see results.</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-5 py-3.5 font-medium text-slate-900">{order.id}</td>
                        <td className="px-5 py-3.5 text-slate-600">{order.vendor}</td>
                        <td className="px-5 py-3.5 text-slate-600">{order.department}</td>
                        <td className="px-5 py-3.5 font-medium text-slate-900 text-right">{order.amount}</td>
                        <td className="px-5 py-3.5">
                          <StatusBadge status={order.status} />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        {/* Right Column (1/3 width on large screens) */}
        <div className="space-y-6">
          
          {/* Recent Activity Timeline */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="bg-white rounded-xl shadow-sm border border-slate-200/60 p-5"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold text-slate-900 tracking-tight">Recent Activity</h2>
              <button 
                type="button"
                aria-label="Recent activity options"
                onClick={() => {
                  setToast({ isVisible: true, message: `Viewing options...` });
                  setTimeout(() => setToast({ isVisible: false, message: "" }), 3000);
                }}
                className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500/20">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-5">
              {recentActivities.map((activity, index) => (
                <div key={activity.id} className="flex gap-4 relative">
                  {/* Timeline connector */}
                  {index !== recentActivities.length - 1 && (
                    <div className="absolute left-3.5 top-8 bottom-[-20px] w-px bg-slate-200"></div>
                  )}
                  
                  <div className="relative z-10 w-7 h-7 rounded-full bg-blue-50 border-2 border-white flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold text-blue-600">
                      {activity.user.charAt(0)}
                    </span>
                  </div>
                  
                  <div className="flex-1 pb-1">
                    <p className="text-sm text-slate-700 leading-snug">
                      <span className="font-semibold text-slate-900">{activity.user}</span> {activity.action}
                    </p>
                    <div className="flex items-center mt-1 text-[11px] font-medium text-slate-400 uppercase tracking-wide">
                      <Clock className="w-3 h-3 mr-1" />
                      {activity.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Upcoming Deliveries */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
            className="bg-white rounded-xl shadow-sm border border-slate-200/60 p-5"
          >
             <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-slate-900 tracking-tight">Upcoming Deliveries</h2>
            </div>
            
            <div className="space-y-3">
              {upcomingDeliveries.map((delivery) => (
                <div key={delivery.id} className="flex items-start gap-3 p-3 rounded-lg border border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 transition-colors group cursor-default">
                  <div className="p-2 bg-emerald-50 text-emerald-600 rounded-md shrink-0 border border-emerald-100 group-hover:bg-emerald-100 transition-colors">
                    <Package className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">{delivery.vendor}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{delivery.items}</p>
                    <div className="mt-2 text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 inline-block">
                      Expected: {delivery.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

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
