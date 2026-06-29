import { STATUS } from "../constants/status";
import { VENDORS } from "../constants/vendors";

export const purchaseOrders = [
  {
    id: "PO-2026-0145",
    vendor: VENDORS.DELL,
    department: "IT Infrastructure",
    amount: 4500000,
    status: STATUS.PROCESSING,
    date: "2026-06-28T09:15:00Z",
    expectedDelivery: "2026-07-24T00:00:00Z"
  },
  {
    id: "PO-2026-0144",
    vendor: "Godrej Interio",
    department: "Operations",
    amount: 725000,
    status: STATUS.APPROVED,
    date: "2026-06-27T14:30:00Z",
    expectedDelivery: "2026-07-15T00:00:00Z"
  },
  {
    id: "PO-2026-0143",
    vendor: "Tech Data India",
    department: "Engineering",
    amount: 1240000,
    status: STATUS.PENDING,
    date: "2026-06-26T11:45:00Z",
    expectedDelivery: "N/A"
  },
  {
    id: "PO-2026-0142",
    vendor: "Herman Miller India",
    department: "Facilities",
    amount: 890000,
    status: STATUS.DELIVERED,
    date: "2026-06-25T10:00:00Z",
    expectedDelivery: "2026-06-28T00:00:00Z"
  },
  {
    id: "PO-2026-0141",
    vendor: "Redington India",
    department: "Sales",
    amount: 3210000,
    status: STATUS.REJECTED,
    date: "2026-06-24T16:20:00Z",
    expectedDelivery: "N/A"
  },
  {
    id: "PO-2026-0140",
    vendor: VENDORS.APPLE,
    department: "Engineering",
    amount: 5500000,
    status: STATUS.COMPLETED,
    date: "2026-06-15T09:30:00Z",
    expectedDelivery: "2026-06-20T00:00:00Z"
  },
  {
    id: "PO-2026-0139",
    vendor: VENDORS.LOGITECH,
    department: "IT Support",
    amount: 425000,
    status: STATUS.UNDER_REVIEW,
    date: "2026-06-23T13:10:00Z",
    expectedDelivery: "N/A"
  },
  {
    id: "PO-2026-0138",
    vendor: VENDORS.SAMSUNG,
    department: "Operations",
    amount: 275000,
    status: STATUS.AWAITING_VENDOR,
    date: "2026-06-22T15:45:00Z",
    expectedDelivery: "2026-07-05T00:00:00Z"
  },
  {
    id: "PO-2026-0137",
    vendor: VENDORS.LENOVO,
    department: "Engineering",
    amount: 1850000,
    status: STATUS.PROCESSING,
    date: "2026-06-21T11:20:00Z",
    expectedDelivery: "2026-07-10T00:00:00Z"
  },
  {
    id: "PO-2026-0136",
    vendor: VENDORS.HP,
    department: "Finance",
    amount: 1250000,
    status: STATUS.CANCELLED,
    date: "2026-06-20T09:00:00Z",
    expectedDelivery: "N/A"
  }
];
