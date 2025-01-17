// src/lib/api/services/product.service.ts
import { fetchAPI } from '../config';

export const ProductService = {
  getFeaturedProducts: async () => {
    return fetchAPI('/api/products/featured-items/');
  },

  getProducts: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return fetchAPI(`/api/products/items/${queryString ? `?${queryString}` : ''}`);
  },

  getProduct: async (sku: string) => {
    return fetchAPI(`/api/products/items/${sku}/`);
  },

  getCategories: async () => {
    return fetchAPI('/api/products/categories/');
  },
};