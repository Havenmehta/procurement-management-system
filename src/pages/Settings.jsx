import { useState, useEffect } from "react";
import { User, Building2, Bell, Shield, Globe, Save } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import SettingsCard from "../components/settings/SettingsCard";
import Toast from "../components/common/Toast";
import { cn } from "../utils/cn";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("general");
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState({ isVisible: false, message: "" });
  const [notifications, setNotifications] = useState({
    emailApprovals: true,
    emailMentions: true,
    pushUpdates: false,
    weeklyReport: true
  });

  useEffect(() => {
    // Simulate loading user settings
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const tabs = [
    { id: "general", label: "General & Profile", icon: User },
    { id: "company", label: "Company Information", icon: Building2 },
    { id: "notifications", label: "Notification Preferences", icon: Bell },
    { id: "security", label: "Security & Access", icon: Shield },
  ];

  const inputClass = "w-full px-3 py-1.5 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm bg-white hover:border-slate-300 transition-all shadow-sm";

  const toggleNotification = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto pb-10">
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-2">
            <div className="h-8 w-32 bg-slate-200 rounded animate-pulse" />
            <div className="h-4 w-64 bg-slate-200 rounded animate-pulse" />
          </div>
          <div className="h-10 w-32 bg-slate-200 rounded animate-pulse" />
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-56 shrink-0">
            <div className="flex flex-row md:flex-col gap-2 overflow-x-auto">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-10 w-full bg-slate-200 rounded animate-pulse shrink-0 md:shrink" />
              ))}
            </div>
          </aside>
          
          <div className="flex-1 min-w-0 space-y-6">
            <div className="h-64 bg-white rounded-xl border border-slate-200 animate-pulse" />
            <div className="h-48 bg-white rounded-xl border border-slate-200 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pb-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Settings</h1>
          <p className="text-slate-500 text-sm mt-1">Manage your account settings and preferences.</p>
        </div>
        <button 
          onClick={() => {
            setToast({ isVisible: true, message: "Settings saved successfully!" });
            setTimeout(() => setToast({ isVisible: false, message: "" }), 3000);
          }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md font-medium text-sm hover:bg-blue-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Tabs */}
        <aside className="w-full md:w-56 shrink-0">
          <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap",
                    isActive
                      ? "bg-slate-100/80 text-blue-700 shadow-sm"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <Icon className={cn("w-4 h-4 mr-3 shrink-0", isActive ? "text-blue-600" : "text-slate-400")} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            {activeTab === "general" && (
              <motion.div 
                key="general"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <SettingsCard title="Profile Information" description="Update your personal information and email address.">
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 to-blue-500 flex items-center justify-center text-2xl font-semibold text-white shadow-sm shrink-0">
                      HM
                    </div>
                    <div>
                      <button type="button" className="px-4 py-2 border border-slate-200 text-slate-700 rounded-md text-sm font-medium hover:bg-slate-50 transition-colors bg-white shadow-sm mb-2 focus:outline-none focus:ring-2 focus:ring-slate-500/20">
                        Change Avatar
                      </button>
                      <p className="text-xs text-slate-500">JPG, GIF or PNG. 1MB max.</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">First Name</label>
                      <input type="text" className={inputClass} defaultValue="Haven" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Last Name</label>
                      <input type="text" className={inputClass} defaultValue="Mehta" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                      <input type="email" className={inputClass} defaultValue="haven.mehta@enterprise.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Role</label>
                      <input type="text" className={cn(inputClass, "bg-slate-50 text-slate-500")} defaultValue="Procurement Manager" readOnly />
                      <p className="text-xs text-slate-400 mt-1.5">Role is managed by your administrator.</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Language</label>
                      <div className="relative">
                        <Globe className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                        <select className={cn(inputClass, "pl-9 appearance-none bg-white")}>
                          <option>English (United States)</option>
                          <option>Spanish (Spain)</option>
                          <option>French (France)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </SettingsCard>
                
                <SettingsCard title="Interface Preferences" description="Customize how ProcureSys looks on your device.">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-slate-900">Dark Mode</h4>
                      <p className="text-sm text-slate-500 mt-0.5">Toggle between light and dark theme.</p>
                    </div>
                    <button 
                      type="button"
                      role="switch"
                      aria-checked={false}
                      aria-label="Toggle Dark Mode"
                      className="w-10 h-5 bg-slate-200 rounded-full relative transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500/20">
                       <div className="absolute left-1 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform"></div>
                    </button>
                  </div>
                </SettingsCard>
              </motion.div>
            )}

            {activeTab === "notifications" && (
              <motion.div 
                key="notifications"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <SettingsCard title="Email Notifications" description="Manage what emails you receive from the system.">
                  <div className="space-y-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-slate-900">Approvals & Requests</h4>
                        <p className="text-sm text-slate-500 mt-0.5 max-w-md">Get notified when a purchase request requires your approval or has been updated.</p>
                      </div>
                      <button 
                        type="button"
                        role="switch"
                        aria-checked={notifications.emailApprovals}
                        aria-label="Toggle email approvals notifications"
                        onClick={() => toggleNotification('emailApprovals')}
                        className={cn("w-10 h-5 rounded-full relative transition-colors shrink-0 focus:outline-none focus:ring-2 focus:ring-blue-500/20", notifications.emailApprovals ? "bg-blue-600" : "bg-slate-200")}
                      >
                         <div className={cn("absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform", notifications.emailApprovals ? "left-5" : "left-1")}></div>
                      </button>
                    </div>
                    
                    <div className="border-t border-slate-100 pt-6 flex items-start justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-slate-900">Mentions & Comments</h4>
                        <p className="text-sm text-slate-500 mt-0.5 max-w-md">Get notified when someone mentions you in a request discussion.</p>
                      </div>
                      <button 
                        type="button"
                        role="switch"
                        aria-checked={notifications.emailMentions}
                        aria-label="Toggle email mentions notifications"
                        onClick={() => toggleNotification('emailMentions')}
                        className={cn("w-10 h-5 rounded-full relative transition-colors shrink-0 focus:outline-none focus:ring-2 focus:ring-blue-500/20", notifications.emailMentions ? "bg-blue-600" : "bg-slate-200")}
                      >
                         <div className={cn("absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform", notifications.emailMentions ? "left-5" : "left-1")}></div>
                      </button>
                    </div>

                    <div className="border-t border-slate-100 pt-6 flex items-start justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-slate-900">Weekly Spend Report</h4>
                        <p className="text-sm text-slate-500 mt-0.5 max-w-md">Receive a weekly summary of procurement activities and spending.</p>
                      </div>
                      <button 
                        type="button"
                        role="switch"
                        aria-checked={notifications.weeklyReport}
                        aria-label="Toggle weekly report notifications"
                        onClick={() => toggleNotification('weeklyReport')}
                        className={cn("w-10 h-5 rounded-full relative transition-colors shrink-0 focus:outline-none focus:ring-2 focus:ring-blue-500/20", notifications.weeklyReport ? "bg-blue-600" : "bg-slate-200")}
                      >
                         <div className={cn("absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform", notifications.weeklyReport ? "left-5" : "left-1")}></div>
                      </button>
                    </div>
                  </div>
                </SettingsCard>
              </motion.div>
            )}

            {activeTab === "company" && (
              <motion.div 
                key="company"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <SettingsCard title="Organization Settings" description="Global settings for your procurement tenant.">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Company Name</label>
                      <input type="text" className={inputClass} defaultValue="TechCorp India Ltd." />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Billing Address</label>
                      <textarea rows="3" className={inputClass} defaultValue="45 Innovation Park, Outer Ring Road&#10;Bengaluru, Karnataka 560103&#10;India"></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">GSTIN / Tax ID</label>
                      <input type="text" className={inputClass} defaultValue="29ABCDE1234F1Z5" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Default Currency</label>
                      <select className={cn(inputClass, "bg-white")}>
                        <option>INR (₹)</option>
                        <option>USD ($)</option>
                        <option>EUR (€)</option>
                        <option>GBP (£)</option>
                      </select>
                    </div>
                  </div>
                </SettingsCard>
              </motion.div>
            )}

            {activeTab === "security" && (
              <motion.div 
                key="security"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <SettingsCard title="Password & Authentication" description="Manage your security preferences and 2FA.">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-slate-900">Change Password</h4>
                        <p className="text-sm text-slate-500 mt-0.5">Update your password associated with this account.</p>
                      </div>
                      <button type="button" className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-md text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm shrink-0 focus:outline-none focus:ring-2 focus:ring-slate-500/20">
                        Update
                      </button>
                    </div>
                    
                    <div className="border-t border-slate-100 pt-6 flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-slate-900">Two-Factor Authentication (2FA)</h4>
                        <p className="text-sm text-slate-500 mt-0.5 max-w-md">Add an extra layer of security to your account.</p>
                      </div>
                      <button type="button" className="px-4 py-2 bg-slate-900 text-white rounded-md text-sm font-medium hover:bg-slate-800 transition-colors shadow-sm shrink-0 focus:outline-none focus:ring-2 focus:ring-slate-900/50">
                        Enable 2FA
                      </button>
                    </div>
                  </div>
                </SettingsCard>
                
                <SettingsCard title="Active Sessions" description="Devices that are currently logged in.">
                   <div className="flex items-center justify-between p-4 border border-slate-200/60 rounded-lg bg-slate-50/50">
                      <div>
                        <h4 className="text-sm font-medium text-slate-900 flex items-center tracking-tight">
                          MacBook Pro (macOS)
                          <span className="ml-3 bg-emerald-100 text-emerald-700 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border border-emerald-200">Current</span>
                        </h4>
                        <p className="text-xs text-slate-500 mt-1 font-medium">Bengaluru, KA • Last active: Just now</p>
                      </div>
                   </div>
                </SettingsCard>
              </motion.div>
            )}
          </AnimatePresence>
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
