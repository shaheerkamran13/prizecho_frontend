// src/lib/api/services/product.service.ts
import { fetchAPI } from '../config';

interface FilterParams {
  category?: string;
  min_price?: string;
  max_price?: string;
  featured?: boolean;
  ordering?: string;
}

export const ProductService = {
  getFeaturedProducts: async () => {
    return fetchAPI('/featured-items/');
  },

  getProducts: async (params: FilterParams = {}) => {
    const queryParams = new URLSearchParams(
      Object.entries(params)
        .filter(([_, value]) => value !== undefined && value !== '' && value !== false)
        .map(([key, value]) => [key, value.toString()])
    );

    const queryString = queryParams.toString();
    return fetchAPI(`/items/${queryString ? `?${queryString}` : ''}`);
  },

  getProduct: async (slug: string) => {
    return fetchAPI(`/items/${slug}/`);
  },

  getCategories: async () => {
    return fetchAPI('/categories/');
  },

  getSearchSuggestions: async (term: string) => {
    if (term.length < 2) return { suggestions: [] };
    return fetchAPI(`/search-suggestions/?term=${encodeURIComponent(term)}`);
  },

  searchProducts: async (query: string, filters: FilterParams = {}) => {
    if (!query) return { results: [] };
    
    const allParams = {
      q: query,
      ...filters
    };

    const queryParams = new URLSearchParams(
      Object.entries(allParams)
        .filter(([_, value]) => value !== undefined && value !== '' && value !== false)
        .map(([key, value]) => [key, value.toString()])
    );

    return fetchAPI(`/search/?${queryParams.toString()}`);
  }
};