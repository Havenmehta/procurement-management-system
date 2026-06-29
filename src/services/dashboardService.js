import { summaryStats, recentActivities, latestOrders, upcomingDeliveries } from "../data/dashboardData.js";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getDashboard = async () => {
  await delay(500);
  return {
    summaryStats,
    recentActivities,
    latestOrders,
    upcomingDeliveries
  };
};
