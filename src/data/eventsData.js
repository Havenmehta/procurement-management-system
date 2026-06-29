import { STATUS } from "../constants/status";
import { VENDORS } from "../constants/vendors";

export const events = [
  {
    id: "EVT-2026-01",
    title: "Vendor Negotiation: Dell India",
    type: "meeting",
    date: "2026-07-24T10:00:00",
    vendor: VENDORS.DELL,
    description: "Quarterly review of hardware procurement roadmap and volume discounts.",
    attendees: ["Rahul Sharma", "Amit Verma", "Vikram Joshi"],
    status: STATUS.UPCOMING
  },
  {
    id: "EVT-2026-02",
    title: "Network Switch Delivery",
    type: "delivery",
    date: "2026-08-15T14:30:00",
    vendor: "Tech Data India",
    description: "Expected delivery at Bengaluru Warehouse. Loading dock 4.",
    status: "In Transit"
  },
  {
    id: "EVT-2026-03",
    title: "Server Infrastructure Approval",
    type: "approval",
    date: "2026-07-28T09:00:00",
    vendor: VENDORS.HP,
    description: "Final CIO sign-off required for Q3-Q4 hosting infrastructure expansion.",
    attendees: ["Priya Patel", "Harsh Shah"],
    status: STATUS.PENDING
  },
  {
    id: "EVT-2026-04",
    title: "Onboarding Sync: Cisco",
    type: "meeting",
    date: "2026-08-05T11:00:00",
    vendor: "Ingram Micro India",
    description: "Initial onboarding sync with the new enterprise networking account manager.",
    attendees: ["Sneha Agarwal", "Ankit Jain"],
    status: STATUS.UPCOMING
  },
  {
    id: "EVT-2026-05",
    title: "MacBook Pro Delivery",
    type: "delivery",
    date: "2026-07-20T10:15:00",
    vendor: VENDORS.APPLE,
    description: "Delivery of 10 MacBook Pro M4s for the engineering team.",
    status: STATUS.COMPLETED
  },
  {
    id: "EVT-2026-06",
    title: "Software License Renewal",
    type: "approval",
    date: "2026-09-09T16:00:00",
    vendor: "Redington India",
    description: "Annual contract renewal approval for 150 Enterprise Cloud licenses.",
    attendees: ["Harsh Shah", "Pooja Nair", "Rahul Sharma"],
    status: STATUS.COMPLETED
  }
];
