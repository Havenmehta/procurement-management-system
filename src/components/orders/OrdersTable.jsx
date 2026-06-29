import { useState, useMemo, memo } from "react";
import { Search, ArrowUpDown, Filter, ChevronLeft, ChevronRight, MoreHorizontal, Download } from "lucide-react";
import StatusBadge from "../common/StatusBadge.jsx";
import Toast from "../common/Toast.jsx";
import { cn } from "../../utils/cn";
import { STATUS } from "../../constants/status";
import { formatCurrency, formatDate } from "../../utils/helpers";

const OrdersTable = memo(function OrdersTable({ data }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "date", direction: "desc" });
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [toast, setToast] = useState({ isVisible: false, message: "" });
  const itemsPerPage = 5;

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch =
        item.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.department.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "All" || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [data, searchTerm, statusFilter]);

  const sortedData = useMemo(() => {
    const sorted = [...filteredData];
    if (sortConfig.key !== null) {
      sorted.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sorted;
  }, [filteredData, sortConfig]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const currentData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const Th = ({ label, sortKey, align = "left" }) => (
    <th
      className={cn(
        "px-5 py-3 font-medium cursor-pointer hover:bg-slate-100 transition-colors select-none",
        align === "right" && "text-right"
      )}
      onClick={() => handleSort(sortKey)}
    >
      <div className={cn("flex items-center space-x-1.5", align === "right" && "justify-end")}>
        <span>{label}</span>
        <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
      </div>
    </th>
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative max-w-md w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-4 h-4 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search PO number, vendor, department..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="block w-full pl-9 pr-3 py-1.5 border border-slate-200 rounded-md text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none bg-slate-50 transition-all shadow-sm"
          />
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center text-slate-600 bg-white border border-slate-200 rounded-md px-3 py-1.5 shadow-sm hover:bg-slate-50 transition-colors">
             <Filter className="w-4 h-4 mr-2" />
             <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="text-sm bg-transparent outline-none focus:ring-0 cursor-pointer font-medium"
              >
                <option value="All">All Statuses</option>
                <option value={STATUS.PENDING}>Pending</option>
                <option value={STATUS.PROCESSING}>Processing</option>
                <option value={STATUS.UNDER_REVIEW}>Under Review</option>
                <option value={STATUS.AWAITING_VENDOR}>Awaiting Vendor</option>
                <option value={STATUS.APPROVED}>Approved</option>
                <option value={STATUS.DELIVERED}>Delivered</option>
                <option value={STATUS.COMPLETED}>Completed</option>
                <option value={STATUS.REJECTED}>Rejected</option>
                <option value={STATUS.CANCELLED}>Cancelled</option>
              </select>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200/60 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50/50 text-slate-500 text-xs border-b border-slate-200/60">
              <tr>
                <Th label="PO Number" sortKey="id" />
                <Th label="Vendor" sortKey="vendor" />
                <Th label="Department" sortKey="department" />
                <Th label="Amount" sortKey="amount" align="right" />
                <Th label="Status" sortKey="status" />
                <Th label="Date" sortKey="date" />
                <Th label="Expected Delivery" sortKey="expectedDelivery" />
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentData.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-16 text-center text-slate-500 bg-white">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100 shadow-sm mb-4">
                        <Search className="w-8 h-8 text-slate-400" />
                      </div>
                      <h3 className="text-base font-semibold text-slate-900">No purchase orders found</h3>
                      <p className="text-sm mt-1 max-w-sm text-center">We couldn't find any orders matching your criteria. Try adjusting your search filters.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                currentData.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group border-b border-slate-50 last:border-none">
                    <td className="px-5 py-3.5 font-medium text-slate-900">{item.id}</td>
                    <td className="px-5 py-3.5 text-slate-900 font-medium">{item.vendor}</td>
                    <td className="px-5 py-3.5 text-slate-600">{item.department}</td>
                    <td className="px-5 py-3.5 font-medium text-slate-900 text-right">
                      {formatCurrency(item.amount)}
                    </td>
                    <td className="px-5 py-3.5">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="px-5 py-3.5 text-slate-500">
                      {formatDate(item.date)}
                    </td>
                    <td className="px-5 py-3.5 text-slate-500">
                       {item.expectedDelivery !== "N/A" ? formatDate(item.expectedDelivery) : "N/A"}
                    </td>
                    <td className="px-5 py-3.5 text-right flex justify-end items-center space-x-1.5 h-full">
                      <button 
                        type="button"
                        aria-label={`Download invoice for ${item.id}`}
                        onClick={() => {
                          setToast({ isVisible: true, message: `Downloading invoice for ${item.id}...` });
                          setTimeout(() => setToast({ isVisible: false, message: "" }), 3000);
                        }}
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 mt-1" title="Download Invoice">
                        <Download className="w-4 h-4" />
                      </button>
                      <button 
                        type="button"
                        aria-label={`View options for ${item.id}`}
                        onClick={() => {
                          setToast({ isVisible: true, message: `Viewing options for ${item.id}` });
                          setTimeout(() => setToast({ isVisible: false, message: "" }), 3000);
                        }}
                        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500/20 mt-1">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-3 border-t border-slate-200/60 flex items-center justify-between bg-slate-50/50">
          <div className="text-sm text-slate-500">
            Showing <span className="font-medium text-slate-900">{sortedData.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</span> to{" "}
            <span className="font-medium text-slate-900">{Math.min(currentPage * itemsPerPage, sortedData.length)}</span> of{" "}
            <span className="font-medium text-slate-900">{sortedData.length}</span> results
          </div>
          <div className="flex space-x-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-md border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-700 disabled:opacity-50 transition-colors shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-1.5 rounded-md border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-700 disabled:opacity-50 transition-colors shadow-sm"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      <Toast 
        isVisible={toast.isVisible} 
        message={toast.message} 
        onClose={() => setToast({ isVisible: false, message: "" })} 
      />
    </div>
  );
});

export default OrdersTable;
