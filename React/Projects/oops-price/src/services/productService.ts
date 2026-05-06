import { ApiResponse, Product } from '../types';

const API_BASE_URL = 'https://api.freeapi.app/api/v1/public/randomproducts';

export async function fetchProducts(page: number = 1, limit: number = 10): Promise<ApiResponse['data']> {
  try {
    const response = await fetch(`${API_BASE_URL}?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    const result: ApiResponse = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}
