import { useState, useMemo, memo, useRef, useEffect } from "react";
import { Search, ArrowUpDown, Filter, ChevronLeft, ChevronRight, MoreHorizontal, ArrowDownUp, Eye } from "lucide-react";
import StatusBadge from "../common/StatusBadge.jsx";
import Toast from "../common/Toast.jsx";
import { cn } from "../../utils/cn";
import { STATUS } from "../../constants/status";
import { formatDate } from "../../utils/helpers";

const ALL_COLUMNS = [
  { key: "id", label: "Ref ID" },
  { key: "title", label: "Title" },
  { key: "requesterName", label: "Requester Name" },
  { key: "status", label: "Status" },
  { key: "intakeRequestType", label: "Intake Request Type" },
  { key: "buyerName", label: "Buyer Name" },
  { key: "requestedAt", label: "Requested At" },
  { key: "updatedAt", label: "Updated At" },
];

const SORT_FIELDS = [
  { key: "id", label: "Ref ID" },
  { key: "title", label: "Title" },
  { key: "requesterName", label: "Requester Name" },
  { key: "requestedAt", label: "Requested At" },
  { key: "updatedAt", label: "Updated At" },
];

const IntakeTable = memo(function IntakeTable({ data }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "requestedAt", direction: "desc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [toast, setToast] = useState({ isVisible: false, message: "" });
  const [visibleColumns, setVisibleColumns] = useState(() =>
    ALL_COLUMNS.reduce((acc, col) => ({ ...acc, [col.key]: true }), {})
  );
  const [isColumnMenuOpen, setIsColumnMenuOpen] = useState(false);
  const columnMenuRef = useRef(null);

  const [filters, setFilters] = useState({ status: [], intakeRequestType: [], buyerName: [] });
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const filterMenuRef = useRef(null);

  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const sortMenuRef = useRef(null);

  const itemsPerPage = 5;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (columnMenuRef.current && !columnMenuRef.current.contains(e.target)) {
        setIsColumnMenuOpen(false);
      }
      if (filterMenuRef.current && !filterMenuRef.current.contains(e.target)) {
        setIsFilterMenuOpen(false);
      }
      if (sortMenuRef.current && !sortMenuRef.current.contains(e.target)) {
        setIsSortMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const toggleColumn = (key) => {
    setVisibleColumns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filterOptions = useMemo(() => {
    const unique = (key) => [...new Set(data.map((item) => item[key]))].filter(Boolean);
    return {
      status: unique("status"),
      intakeRequestType: unique("intakeRequestType"),
      buyerName: unique("buyerName"),
    };
  }, [data]);

  const toggleFilter = (field, value) => {
    setFilters((prev) => {
      const current = prev[field];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [field]: next };
    });
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({ status: [], intakeRequestType: [], buyerName: [] });
    setCurrentPage(1);
  };

  const activeFilterCount =
    filters.status.length + filters.intakeRequestType.length + filters.buyerName.length;

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const term = searchTerm.toLowerCase();
      const matchesSearch =
        item.id.toLowerCase().includes(term) ||
        item.title.toLowerCase().includes(term) ||
        item.requesterName.toLowerCase().includes(term);

      const matchesStatus = filters.status.length === 0 || filters.status.includes(item.status);
      const matchesType =
        filters.intakeRequestType.length === 0 || filters.intakeRequestType.includes(item.intakeRequestType);
      const matchesBuyer = filters.buyerName.length === 0 || filters.buyerName.includes(item.buyerName);

      return matchesSearch && matchesStatus && matchesType && matchesBuyer;
    });
  }, [data, searchTerm, filters]);

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

  const visibleColumnList = ALL_COLUMNS.filter((col) => visibleColumns[col.key]);

  const Th = ({ label, sortKey }) => (
    <th
      className="px-5 py-3 font-medium cursor-pointer hover:bg-slate-100 transition-colors select-none"
      onClick={() => handleSort(sortKey)}
    >
      <div className="flex items-center space-x-1.5">
        <span>{label}</span>
        <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
      </div>
    </th>
  );

  const renderCell = (item, key) => {
    switch (key) {
      case "id":
        return <span className="font-medium text-slate-900">{item.id}</span>;
      case "title":
        return <span className="text-slate-900 font-medium">{item.title}</span>;
      case "requesterName":
        return <span className="text-slate-600">{item.requesterName}</span>;
      case "status":
        return <StatusBadge status={item.status} />;
      case "intakeRequestType":
        return <span className="text-slate-600">{item.intakeRequestType}</span>;
      case "buyerName":
        return <span className="text-slate-600">{item.buyerName}</span>;
      case "requestedAt":
        return <span className="text-slate-500">{formatDate(item.requestedAt)}</span>;
      case "updatedAt":
        return <span className="text-slate-500">{formatDate(item.updatedAt)}</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative max-w-md w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-4 h-4 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search by Ref ID, Title or Requester Name..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="block w-full pl-9 pr-3 py-1.5 border border-slate-200 rounded-md text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none bg-slate-50 transition-all shadow-sm"
          />
        </div>
        <div className="flex items-center space-x-3">
          {/* Filter */}
          <div className="relative" ref={filterMenuRef}>
            <button
              type="button"
              aria-label="Filter"
              onClick={() => setIsFilterMenuOpen((prev) => !prev)}
              className="flex items-center text-slate-600 bg-white border border-slate-200 rounded-md px-3 py-1.5 shadow-sm hover:bg-slate-50 transition-colors text-sm font-medium"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter
              {activeFilterCount > 0 && (
                <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-[11px] font-semibold rounded-full bg-blue-600 text-white">
                  {activeFilterCount}
                </span>
              )}
            </button>
            {isFilterMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-md shadow-lg z-10 py-1.5">
                <div className="px-3 py-1.5 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</span>
                </div>
                {filterOptions.status.map((value) => (
                  <label
                    key={value}
                    className="flex items-center px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={filters.status.includes(value)}
                      onChange={() => toggleFilter("status", value)}
                      className="mr-2.5 h-3.5 w-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500/20"
                    />
                    {value}
                  </label>
                ))}

                <div className="border-t border-slate-100 my-1.5" />
                <div className="px-3 py-1.5">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Intake Request Type</span>
                </div>
                {filterOptions.intakeRequestType.map((value) => (
                  <label
                    key={value}
                    className="flex items-center px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={filters.intakeRequestType.includes(value)}
                      onChange={() => toggleFilter("intakeRequestType", value)}
                      className="mr-2.5 h-3.5 w-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500/20"
                    />
                    {value}
                  </label>
                ))}

                <div className="border-t border-slate-100 my-1.5" />
                <div className="px-3 py-1.5">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Buyer Name</span>
                </div>
                {filterOptions.buyerName.map((value) => (
                  <label
                    key={value}
                    className="flex items-center px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={filters.buyerName.includes(value)}
                      onChange={() => toggleFilter("buyerName", value)}
                      className="mr-2.5 h-3.5 w-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500/20"
                    />
                    {value}
                  </label>
                ))}

                <div className="border-t border-slate-100 mt-1.5 pt-1.5">
                  <button
                    type="button"
                    onClick={clearFilters}
                    disabled={activeFilterCount === 0}
                    className="w-full text-left px-3 py-1.5 text-sm text-slate-500 hover:text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sort */}
          <div className="relative" ref={sortMenuRef}>
            <button
              type="button"
              aria-label="Sort"
              onClick={() => setIsSortMenuOpen((prev) => !prev)}
              className="flex items-center text-slate-600 bg-white border border-slate-200 rounded-md px-3 py-1.5 shadow-sm hover:bg-slate-50 transition-colors text-sm font-medium"
            >
              <ArrowDownUp className="w-4 h-4 mr-2" />
              Sort
            </button>
            {isSortMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-md shadow-lg z-10 py-1.5">
                <div className="px-3 py-1.5">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Sort By</span>
                </div>
                {SORT_FIELDS.map((field) => (
                  <button
                    key={field.key}
                    type="button"
                    onClick={() => handleSort(field.key)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-1.5 text-sm hover:bg-slate-50 transition-colors",
                      sortConfig.key === field.key ? "text-blue-600 font-medium" : "text-slate-700"
                    )}
                  >
                    <span>{field.label}</span>
                    {sortConfig.key === field.key && (
                      <span className="text-xs text-slate-400">
                        {sortConfig.direction === "asc" ? "Asc" : "Desc"}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Column visibility */}
          <div className="relative" ref={columnMenuRef}>
            <button
              type="button"
              aria-label="Toggle column visibility"
              onClick={() => setIsColumnMenuOpen((prev) => !prev)}
              className="flex items-center text-slate-600 bg-white border border-slate-200 rounded-md px-3 py-1.5 shadow-sm hover:bg-slate-50 transition-colors text-sm font-medium"
            >
              <Eye className="w-4 h-4" />
            </button>
            {isColumnMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-md shadow-lg z-10 py-1.5">
                {ALL_COLUMNS.map((col) => (
                  <label
                    key={col.key}
                    className="flex items-center px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={visibleColumns[col.key]}
                      onChange={() => toggleColumn(col.key)}
                      className="mr-2.5 h-3.5 w-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500/20"
                    />
                    {col.label}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200/60 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50/50 text-slate-500 text-xs border-b border-slate-200/60">
              <tr>
                {visibleColumnList.map((col) => (
                  <Th key={col.key} label={col.label} sortKey={col.key} />
                ))}
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentData.length === 0 ? (
                <tr>
                  <td colSpan={visibleColumnList.length + 1} className="px-6 py-16 text-center text-slate-500 bg-white">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100 shadow-sm mb-4">
                        <Search className="w-8 h-8 text-slate-400" />
                      </div>
                      <h3 className="text-base font-semibold text-slate-900">No intake requests found</h3>
                      <p className="text-sm mt-1 max-w-sm text-center">We couldn't find any requests matching your criteria. Try adjusting your search.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                currentData.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group border-b border-slate-50 last:border-none">
                    {visibleColumnList.map((col) => (
                      <td key={col.key} className="px-5 py-3.5">
                        {renderCell(item, col.key)}
                      </td>
                    ))}
                    <td className="px-5 py-3.5 text-right flex justify-end items-center h-full">
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

        {/* Pagination */}
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

export default IntakeTable;