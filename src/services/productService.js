import { products } from "../data/productData.js";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getProducts = async () => {
  await delay(500);
  return products;
};

export const getProductById = async (id) => {
  await delay(500);
  return products.find(p => p.id === id);
};
