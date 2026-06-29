import { STATUS } from "../constants/status";

export const summaryStats = [
  { id: 1, title: "Total Requisitions", value: "842", trend: "+12.5%", trendUp: true, iconName: "FileText" },
  { id: 2, title: "Pending Approvals", value: "24", trend: "-3.2%", trendUp: false, iconName: "Clock" },
  { id: 3, title: "Active Purchase Orders", value: "156", trend: "+8.1%", trendUp: true, iconName: "ShoppingCart" },
  { id: 4, title: "Total Spend (YTD)", value: "₹2.4Cr", trend: "+15.3%", trendUp: true, iconName: "IndianRupee" }
];

export const recentActivities = [
  { id: 1, user: "Priya Patel", action: "approved requisition", target: "REQ-2026-0842", time: "2 hours ago" },
  { id: 2, user: "Rahul Sharma", action: "created purchase order", target: "PO-2026-0145", time: "4 hours ago" },
  { id: 3, user: "Amit Verma", action: "received shipment for", target: "PO-2026-0130", time: "5 hours ago" },
  { id: 4, user: "Neha Gupta", action: "submitted new intake", target: "INT-2026-1021", time: "1 day ago" }
];

export const latestOrders = [
  { id: "PO-2026-0145", vendor: "Dell Technologies India", department: "IT Infrastructure", amount: "₹45,00,000", status: STATUS.PROCESSING, date: "28 Jun 2026" },
  { id: "PO-2026-0144", vendor: "Zebronics", department: "Operations", amount: "₹1,25,000", status: STATUS.APPROVED, date: "27 Jun 2026" },
  { id: "PO-2026-0143", vendor: "Tech Data India", department: "Engineering", amount: "₹12,40,000", status: STATUS.PENDING, date: "26 Jun 2026" },
  { id: "PO-2026-0142", vendor: "Godrej Interio", department: "Facilities", amount: "₹8,90,000", status: STATUS.DELIVERED, date: "25 Jun 2026" },
  { id: "PO-2026-0141", vendor: "Redington India", department: "Sales", amount: "₹32,10,000", status: STATUS.REJECTED, date: "24 Jun 2026" }
];

export const upcomingDeliveries = [
  { id: 1, vendor: "HP India", items: "50x EliteBook 840 G11", date: "30 Jun 2026", status: "In Transit" },
  { id: 2, vendor: "Logitech India", items: "200x MX Master 3S", date: "02 Jul 2026", status: "Preparing" },
  { id: 3, vendor: "Samsung India", items: "15x 990 PRO 2TB SSD", date: "05 Jul 2026", status: "Confirmed" }
];
