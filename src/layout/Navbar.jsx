import { Search, Bell, Menu } from "lucide-react";
import { memo } from "react";

const Navbar = memo(function Navbar({ toggleSidebar }) {
  return (
    <header className="h-16 flex items-center justify-between px-4 lg:px-8 bg-white border-b border-slate-200/60 shrink-0 z-10 sticky top-0 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
      <div className="flex items-center flex-1">
        <button 
          type="button"
          aria-label="Toggle Sidebar"
          onClick={toggleSidebar}
          className="p-2 mr-4 text-slate-500 rounded-md hover:bg-slate-50 lg:hidden focus:outline-none focus:ring-2 focus:ring-slate-500/20"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="font-semibold text-lg text-slate-900 mr-8 lg:hidden tracking-tight">
          ProcureSys
        </div>

        <div className="max-w-md w-full relative hidden sm:block">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-4 h-4 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-1.5 border border-slate-200 rounded-md leading-5 bg-slate-50/50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all shadow-sm"
            placeholder="Search across procurement..."
          />
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <button type="button" aria-label="Notifications" className="relative p-2 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500/20">
          <span className="absolute top-2 right-2 block h-1.5 w-1.5 rounded-full bg-blue-600 ring-2 ring-white" />
          <Bell className="w-5 h-5" />
        </button>

        <div className="h-8 w-8 rounded-md bg-gradient-to-tr from-blue-600 to-blue-500 flex items-center justify-center text-white font-medium text-sm shadow-sm cursor-pointer hover:shadow-md transition-all ml-2">
          HM
        </div>
      </div>
    </header>
  );
});

export default Navbar;
