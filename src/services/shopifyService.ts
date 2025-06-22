import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

class ShopifyService {
  async testConnection(): Promise<{ success: boolean; message: string }> {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/shopify/test-connection`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error testing Shopify connection');
    }
  }

  async syncProducts(): Promise<{ success: boolean; synced: number; message: string }> {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/shopify/sync/products`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error syncing products');
    }
  }

  async syncCustomers(): Promise<{ success: boolean; synced: number; message: string }> {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/shopify/sync/customers`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error syncing customers');
    }
  }

  async syncCoupons(): Promise<{ success: boolean; synced: number; message: string }> {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/shopify/sync/coupons`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error syncing coupons');
    }
  }

  async saveSettings(settings: any): Promise<{ success: boolean; message: string }> {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/shopify/settings`, settings);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error saving settings');
    }
  }

  async getSettings(): Promise<any> {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/shopify/settings`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error getting settings');
    }
  }

  async createCoupon(couponData: any): Promise<{ success: boolean; coupon?: any; message?: string }> {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/shopify/coupons`, couponData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error creating coupon');
    }
  }
}

export const shopifyService = new ShopifyService();