import { STATUS } from "../constants/status";
import { PRIORITIES } from "../constants/priorities";
import { CATEGORIES } from "../constants/categories";
import { VENDORS } from "../constants/vendors";

export const initialIntakes = [
  {
    id: "INT-2026-1021",
    product: "MacBook Air M4",
    category: CATEGORIES.LAPTOPS,
    vendor: VENDORS.APPLE,
    quantity: 15,
    price: 114900,
    priority: PRIORITIES.HIGH,
    location: "Bengaluru",
    requiredDate: "2026-08-15",
    status: STATUS.UNDER_REVIEW,
    requestedBy: "Amit Verma",
    date: "2026-06-25T09:30:00Z"
  },
  {
    id: "INT-2026-1020",
    product: "Ergonomic Office Chairs",
    category: CATEGORIES.FURNITURE,
    vendor: "Godrej Interio",
    quantity: 50,
    price: 14500,
    priority: PRIORITIES.MEDIUM,
    location: "Pune",
    requiredDate: "2026-07-24",
    status: STATUS.APPROVED,
    requestedBy: "Pooja Nair",
    date: "2026-06-24T14:15:00Z"
  },
  {
    id: "INT-2026-1019",
    product: "Cisco Catalyst Switches",
    category: CATEGORIES.NETWORKING,
    vendor: "Tech Data India",
    quantity: 5,
    price: 145000,
    priority: PRIORITIES.CRITICAL,
    location: "Mumbai",
    requiredDate: "2026-07-05",
    status: STATUS.PENDING,
    requestedBy: "Karan Singh",
    date: "2026-06-23T11:45:00Z"
  },
  {
    id: "INT-2026-1018",
    product: "Dell OptiPlex 7000",
    category: CATEGORIES.DESKTOPS,
    vendor: VENDORS.DELL,
    quantity: 20,
    price: 72000,
    priority: PRIORITIES.LOW,
    location: "Hyderabad",
    requiredDate: "2026-09-09",
    status: STATUS.REJECTED,
    requestedBy: "Ritika Kapoor",
    date: "2026-06-20T16:20:00Z"
  },
  {
    id: "INT-2026-1017",
    product: "Logitech MX Master 3S",
    category: CATEGORIES.PERIPHERALS,
    vendor: VENDORS.LOGITECH,
    quantity: 40,
    price: 8499,
    priority: PRIORITIES.MEDIUM,
    location: "Noida",
    requiredDate: "2026-07-30",
    status: STATUS.APPROVED,
    requestedBy: "Siddharth Gupta",
    date: "2026-06-19T10:05:00Z"
  }
];
