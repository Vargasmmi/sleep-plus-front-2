import { DataProvider } from "@refinedev/core";
import axios from "axios";
import { activityLogService } from "../services/activityLogService";
import { ACTIVITY_RESOURCES } from "../interfaces/activityLog";
import { API_URL } from "../config/env";

// No agregamos /api porque json-server no lo usa
const FULL_API_URL = API_URL;

console.log('🔧 Data Provider API URL:', FULL_API_URL);

// Create axios instance
const axiosInstance = axios.create({
  baseURL: FULL_API_URL,
  withCredentials: true,
  timeout: 10000,
});

// Add request interceptor for debugging
axiosInstance.interceptors.request.use(
  (config) => {
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response for ${response.config.url}:`, response.status);
    return response;
  },
  (error) => {
    console.error(`❌ API Error for ${error.config?.url}:`, {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message
    });
    return Promise.reject(error);
  }
);

// Helper function to get resource name for activity logging
const getActivityResource = (resource: string): string => {
  const resourceMap: { [key: string]: string } = {
    customers: ACTIVITY_RESOURCES.CUSTOMERS,
    subscriptions: ACTIVITY_RESOURCES.SUBSCRIPTIONS,
    evaluations: ACTIVITY_RESOURCES.EVALUATIONS,
    employees: ACTIVITY_RESOURCES.EMPLOYEES,
    stores: ACTIVITY_RESOURCES.STORES,
    calls: ACTIVITY_RESOURCES.CALLS,
    sales: ACTIVITY_RESOURCES.SALES,
    campaigns: ACTIVITY_RESOURCES.CAMPAIGNS,
    commissions: ACTIVITY_RESOURCES.COMMISSIONS,
    achievements: ACTIVITY_RESOURCES.ACHIEVEMENTS,
    scripts: ACTIVITY_RESOURCES.SCRIPTS,
    shopifySettings: ACTIVITY_RESOURCES.SHOPIFY_SETTINGS,
    shopifyProducts: ACTIVITY_RESOURCES.SHOPIFY_PRODUCTS,
    shopifyCustomers: ACTIVITY_RESOURCES.SHOPIFY_CUSTOMERS,
    shopifyCoupons: ACTIVITY_RESOURCES.SHOPIFY_COUPONS,
  };
  
  return resourceMap[resource] || resource;
};

export const customDataProvider: DataProvider = {
  getList: async ({ resource, filters }) => {
    console.log(`Getting list for resource: ${resource}`);
    
    try {
      const response = await axiosInstance.get(`/${resource}`);
      
      // json-server returns array directly
      const data = Array.isArray(response.data) ? response.data : [];
      
      // Log view activity for important resources
      if (['customers', 'employees', 'sales'].includes(resource)) {
        try {
          activityLogService.logView(getActivityResource(resource), 'list', {
            count: data.length,
            filters,
          });
        } catch (error) {
          console.warn('Activity logging failed:', error);
        }
      }
      
      return {
        data: data,
        total: data.length,
      };
    } catch (error) {
      console.error(`Error fetching ${resource}:`, error);
      throw error;
    }
  },

  getOne: async ({ resource, id }) => {
    console.log(`Getting one ${resource}/${id}`);
    const response = await axiosInstance.get(`/${resource}/${id}`);
    
    // Log view activity
    try {
      activityLogService.logView(getActivityResource(resource), id.toString(), {
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.warn('Activity logging failed:', error);
    }
    
    return {
      data: response.data,
    };
  },

  create: async ({ resource, variables }) => {
    console.log(`Creating ${resource}:`, variables);
    const response = await axiosInstance.post(`/${resource}`, variables);
    
    // Log create activity
    try {
      activityLogService.logCreate(getActivityResource(resource), response.data.id.toString(), {
        data: variables,
      });
    } catch (error) {
      console.warn('Activity logging failed:', error);
    }
    
    return {
      data: response.data,
    };
  },

  update: async ({ resource, id, variables }) => {
    console.log(`Updating ${resource}/${id}:`, variables);
    
    // Get current data for comparison
    let previousData = null;
    try {
      const currentResponse = await axiosInstance.get(`/${resource}/${id}`);
      previousData = currentResponse.data;
    } catch (error) {
      console.warn('Could not fetch previous data for comparison');
    }
    
    // json-server prefers PUT for updates with full data
    // Use PUT for resources that need full object updates
    let response;
    
    // For permissions and systemSettings, we need to send the full object
    if (['permissions', 'systemSettings'].includes(resource) && previousData) {
      response = await axiosInstance.put(`/${resource}/${id}`, {
        ...previousData,
        ...variables,
        updatedAt: new Date().toISOString()
      });
    } else {
      // For other resources, use PUT instead of PATCH for better JSON Server compatibility
      const updateData = previousData ? { ...previousData, ...variables } : variables;
      response = await axiosInstance.put(`/${resource}/${id}`, updateData);
    }
    
    // Log update activity
    try {
      activityLogService.logUpdate(
        getActivityResource(resource),
        id.toString(),
        variables,
        previousData
      );
    } catch (error) {
      console.warn('Activity logging failed:', error);
    }
    
    return {
      data: response.data,
    };
  },

  deleteOne: async ({ resource, id }) => {
    console.log(`Deleting ${resource}/${id}`);
    
    // Get data before deletion for logging
    let deletedData = null;
    try {
      const response = await axiosInstance.get(`/${resource}/${id}`);
      deletedData = response.data;
    } catch (error) {
      console.warn('Could not fetch data before deletion');
    }
    
    const response = await axiosInstance.delete(`/${resource}/${id}`);
    
    // Log delete activity
    try {
      activityLogService.logDelete(getActivityResource(resource), id.toString(), {
        deletedData,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.warn('Activity logging failed:', error);
    }
    
    return {
      data: response.data,
    };
  },

  getMany: async ({ resource, ids }) => {
    console.log(`Getting many for resource: ${resource}, ids:`, ids);
    
    const responses = await Promise.allSettled(
      ids.map(async (id) => {
        try {
          const response = await axiosInstance.get(`/${resource}/${id}`);
          return response.data;
        } catch (error) {
          console.warn(`Failed to fetch ${resource}/${id}:`, error);
          return null;
        }
      })
    );
    
    // Filter out failed requests and extract successful data
    const data = responses
      .filter((response): response is PromiseFulfilledResult<any> => 
        response.status === 'fulfilled' && response.value !== null
      )
      .map(response => response.value);
    
    return {
      data,
    };
  },

  createMany: async ({ resource, variables }) => {
    console.log(`Creating many ${resource}:`, variables);
    const response = await Promise.all(
      variables.map((item) => axiosInstance.post(`/${resource}`, item))
    );
    
    // Log bulk create activity
    try {
      activityLogService.logCreate(getActivityResource(resource), 'bulk', {
        count: variables.length,
        ids: response.map((res) => res.data.id),
      });
    } catch (error) {
      console.warn('Activity logging failed:', error);
    }
    
    return {
      data: response.map((res) => res.data),
    };
  },

  deleteMany: async ({ resource, ids }) => {
    console.log(`Deleting many ${resource}:`, ids);
    const response = await Promise.all(
      ids.map((id) => axiosInstance.delete(`/${resource}/${id}`))
    );
    
    // Log bulk delete activity
    try {
      activityLogService.logDelete(getActivityResource(resource), 'bulk', {
        count: ids.length,
        ids,
      });
    } catch (error) {
      console.warn('Activity logging failed:', error);
    }
    
    return {
      data: response.map((res) => res.data),
    };
  },

  updateMany: async ({ resource, ids, variables }) => {
    console.log(`Updating many ${resource}:`, { ids, variables });
    const response = await Promise.all(
      ids.map((id) => axiosInstance.put(`/${resource}/${id}`, variables))
    );
    
    // Log bulk update activity
    try {
      activityLogService.logUpdate(getActivityResource(resource), 'bulk', variables, {
        count: ids.length,
        ids,
      });
    } catch (error) {
      console.warn('Activity logging failed:', error);
    }
    
    return {
      data: response.map((res) => res.data),
    };
  },

  custom: async ({ url, method, payload, query, headers }) => {
    console.log(`Custom request: ${method} ${url}`);
    try {
      const response = await axiosInstance({
        url,
        method,
        data: payload,
        params: query,
        headers,
      });
      return { data: response.data };
    } catch (error) {
      console.error('Custom request failed:', error);
      throw error;
    }
  },

  getApiUrl: () => FULL_API_URL,
};
