import { purchaseOrders } from "../data/ordersData.js";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let orders = [...purchaseOrders];

export const getOrders = async () => {
  await delay(500);
  return orders;
};

export const updateOrder = async (id, updates) => {
  await delay(500);
  orders = orders.map(order => order.id === id ? { ...order, ...updates } : order);
  return orders.find(order => order.id === id);
};

export const deleteOrder = async (id) => {
  await delay(500);
  orders = orders.filter(order => order.id !== id);
  return true;
};
