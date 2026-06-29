import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileDown, 
  FileText, 
  Calendar, 
  ShoppingCart, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Package
} from "lucide-react";
import { cn } from "../utils/cn.js";
import { ROUTES } from "../constants/routes.js";

const MENU_ITEMS = [
  { path: ROUTES.DASHBOARD, label: "Dashboard", icon: LayoutDashboard },
  { path: ROUTES.INTAKE, label: "Intake", icon: FileDown },
  { path: ROUTES.PURCHASE_REQUISITION, label: "Purchase Requisition", icon: FileText },
  { path: ROUTES.EVENTS, label: "Events", icon: Calendar },
  { path: ROUTES.PURCHASE_ORDERS, label: "Purchase Orders", icon: ShoppingCart },
  { path: ROUTES.SETTINGS, label: "Settings", icon: Settings },
];

export default function Sidebar({ isOpen, setIsOpen, isMobile }) {
  const location = useLocation();

  return (
    <aside 
      className={cn(
        "relative flex flex-col bg-white border-r border-slate-200/60 transition-all duration-300 ease-in-out h-full shadow-[1px_0_4px_rgba(0,0,0,0.02)]",
        isOpen ? "w-64" : (isMobile ? "w-0 overflow-hidden" : "w-20")
      )}
    >
      <div className={cn("flex items-center h-16 px-5 border-b border-slate-200/60 shrink-0", !isOpen && !isMobile && "justify-center px-0")}>
        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-blue-600 text-white shrink-0 shadow-sm">
          <Package className="w-4 h-4" />
        </div>
        {(isOpen || isMobile) && (
          <span className="ml-3 font-semibold text-slate-900 whitespace-nowrap overflow-hidden tracking-tight">
            ProcureSys
          </span>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-5 px-3 space-y-1.5 scrollbar-hide">
        {MENU_ITEMS.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => isMobile && setIsOpen(false)}
              className={cn(
                "flex items-center px-3 py-2 rounded-md transition-all duration-200 group relative",
                isActive 
                  ? "bg-slate-100/80 text-blue-700 font-medium shadow-sm" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                !isOpen && !isMobile && "justify-center px-0"
              )}
              title={!isOpen && !isMobile ? item.label : undefined}
            >
              <Icon className={cn("w-4 h-4 shrink-0 transition-colors", isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600")} />
              
              {(isOpen || isMobile) && (
                <span className="ml-3 text-sm whitespace-nowrap overflow-hidden">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {!isMobile && (
        <div className="p-3 border-t border-slate-200/60 shrink-0">
          <button
            type="button"
            aria-label={isOpen ? "Collapse Sidebar" : "Expand Sidebar"}
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center w-full p-2 text-slate-400 rounded-md hover:bg-slate-50 hover:text-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500/20"
          >
            {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      )}
    </aside>
  );
}
