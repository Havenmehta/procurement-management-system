import { STATUS } from "../constants/status";

export const initialIntakes = [
  {
    id: "INT-2026-1021",
    title: "MacBook Air M4 Procurement",
    requesterName: "Amit Verma",
    status: STATUS.UNDER_REVIEW,
    intakeRequestType: "Hardware Purchase",
    buyerName: "Sahil Mehra",
    requestedAt: "2026-06-25T09:30:00Z",
    updatedAt: "2026-06-26T11:00:00Z"
  },
  {
    id: "INT-2026-1020",
    title: "Ergonomic Office Chairs Order",
    requesterName: "Pooja Nair",
    status: STATUS.APPROVED,
    intakeRequestType: "Furniture Purchase",
    buyerName: "Rohit Sharma",
    requestedAt: "2026-06-24T14:15:00Z",
    updatedAt: "2026-06-25T10:30:00Z"
  },
  {
    id: "INT-2026-1019",
    title: "Cisco Catalyst Switches Request",
    requesterName: "Karan Singh",
    status: STATUS.PENDING,
    intakeRequestType: "Networking Equipment",
    buyerName: "Neha Kulkarni",
    requestedAt: "2026-06-23T11:45:00Z",
    updatedAt: "2026-06-23T11:45:00Z"
  },
  {
    id: "INT-2026-1018",
    title: "Dell OptiPlex 7000 Desktops",
    requesterName: "Ritika Kapoor",
    status: STATUS.REJECTED,
    intakeRequestType: "Hardware Purchase",
    buyerName: "Sahil Mehra",
    requestedAt: "2026-06-20T16:20:00Z",
    updatedAt: "2026-06-21T09:10:00Z"
  },
  {
    id: "INT-2026-1017",
    title: "Logitech MX Master 3S Mice",
    requesterName: "Siddharth Gupta",
    status: STATUS.APPROVED,
    intakeRequestType: "Peripherals Purchase",
    buyerName: "Rohit Sharma",
    requestedAt: "2026-06-19T10:05:00Z",
    updatedAt: "2026-06-20T08:45:00Z"
  }
];