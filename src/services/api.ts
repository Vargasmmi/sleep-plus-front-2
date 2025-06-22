import { 
  Customer, 
  Employee, 
  Store, 
  Subscription, 
  Evaluation, 
  Call, 
  Sale, 
  Campaign, 
  Commission, 
  Achievement, 
  Script,
  FilterParams,
  ApiResponse,
  PaginatedResponse 
} from '../interfaces';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Función helper para hacer requests
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
};

export const api = {
  // Health check
  async checkHealth() {
    const response = await fetch(`${API_URL.replace('/api', '')}/health`);
    return response.json();
  },

  // ===== CUSTOMERS =====
  async getCustomers(params?: FilterParams): Promise<Customer[]> {
    const queryParams = new URLSearchParams();
    if (params?.search) queryParams.append('q', params.search);
    if (params?.page) queryParams.append('_page', params.page.toString());
    if (params?.limit) queryParams.append('_limit', params.limit.toString());
    if (params?.sortBy) queryParams.append('_sort', params.sortBy);
    if (params?.sortOrder) queryParams.append('_order', params.sortOrder);
    
    return apiRequest(`/customers?${queryParams.toString()}`);
  },

  async getCustomer(id: string): Promise<Customer> {
    return apiRequest(`/customers/${id}`);
  },

  async createCustomer(customer: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>): Promise<Customer> {
    return apiRequest('/customers', {
      method: 'POST',
      body: JSON.stringify(customer),
    });
  },

  async updateCustomer(id: string, customer: Partial<Customer>): Promise<Customer> {
    return apiRequest(`/customers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(customer),
    });
  },

  async deleteCustomer(id: string): Promise<boolean> {
    return apiRequest(`/customers/${id}`, {
      method: 'DELETE',
    });
  },

  // ===== EMPLOYEES =====
  async getEmployees(params?: FilterParams): Promise<Employee[]> {
    const queryParams = new URLSearchParams();
    if (params?.search) queryParams.append('q', params.search);
    if (params?.page) queryParams.append('_page', params.page.toString());
    if (params?.limit) queryParams.append('_limit', params.limit.toString());
    if (params?.sortBy) queryParams.append('_sort', params.sortBy);
    if (params?.sortOrder) queryParams.append('_order', params.sortOrder);
    
    return apiRequest(`/employees?${queryParams.toString()}`);
  },

  async getEmployee(id: string): Promise<Employee> {
    return apiRequest(`/employees/${id}`);
  },

  async createEmployee(employee: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>): Promise<Employee> {
    return apiRequest('/employees', {
      method: 'POST',
      body: JSON.stringify(employee),
    });
  },

  async updateEmployee(id: string, employee: Partial<Employee>): Promise<Employee> {
    return apiRequest(`/employees/${id}`, {
      method: 'PUT',
      body: JSON.stringify(employee),
    });
  },

  async deleteEmployee(id: string): Promise<boolean> {
    return apiRequest(`/employees/${id}`, {
      method: 'DELETE',
    });
  },

  // ===== STORES =====
  async getStores(params?: FilterParams): Promise<Store[]> {
    const queryParams = new URLSearchParams();
    if (params?.search) queryParams.append('q', params.search);
    if (params?.page) queryParams.append('_page', params.page.toString());
    if (params?.limit) queryParams.append('_limit', params.limit.toString());
    if (params?.sortBy) queryParams.append('_sort', params.sortBy);
    if (params?.sortOrder) queryParams.append('_order', params.sortOrder);
    
    return apiRequest(`/stores?${queryParams.toString()}`);
  },

  async getStore(id: string): Promise<Store> {
    return apiRequest(`/stores/${id}`);
  },

  async createStore(store: Omit<Store, 'id' | 'createdAt' | 'updatedAt'>): Promise<Store> {
    return apiRequest('/stores', {
      method: 'POST',
      body: JSON.stringify(store),
    });
  },

  async updateStore(id: string, store: Partial<Store>): Promise<Store> {
    return apiRequest(`/stores/${id}`, {
      method: 'PUT',
      body: JSON.stringify(store),
    });
  },

  async deleteStore(id: string): Promise<boolean> {
    return apiRequest(`/stores/${id}`, {
      method: 'DELETE',
    });
  },

  // ===== SUBSCRIPTIONS =====
  async getSubscriptions(params?: FilterParams): Promise<Subscription[]> {
    const queryParams = new URLSearchParams();
    if (params?.search) queryParams.append('q', params.search);
    if (params?.page) queryParams.append('_page', params.page.toString());
    if (params?.limit) queryParams.append('_limit', params.limit.toString());
    if (params?.sortBy) queryParams.append('_sort', params.sortBy);
    if (params?.sortOrder) queryParams.append('_order', params.sortOrder);
    
    return apiRequest(`/subscriptions?${queryParams.toString()}`);
  },

  async getSubscription(id: string): Promise<Subscription> {
    return apiRequest(`/subscriptions/${id}`);
  },

  async createSubscription(subscription: Omit<Subscription, 'id' | 'createdAt' | 'updatedAt'>): Promise<Subscription> {
    return apiRequest('/subscriptions', {
      method: 'POST',
      body: JSON.stringify(subscription),
    });
  },

  async updateSubscription(id: string, subscription: Partial<Subscription>): Promise<Subscription> {
    return apiRequest(`/subscriptions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(subscription),
    });
  },

  async deleteSubscription(id: string): Promise<boolean> {
    return apiRequest(`/subscriptions/${id}`, {
      method: 'DELETE',
    });
  },

  // ===== EVALUATIONS =====
  async getEvaluations(params?: FilterParams): Promise<Evaluation[]> {
    const queryParams = new URLSearchParams();
    if (params?.search) queryParams.append('q', params.search);
    if (params?.page) queryParams.append('_page', params.page.toString());
    if (params?.limit) queryParams.append('_limit', params.limit.toString());
    if (params?.sortBy) queryParams.append('_sort', params.sortBy);
    if (params?.sortOrder) queryParams.append('_order', params.sortOrder);
    
    return apiRequest(`/evaluations?${queryParams.toString()}`);
  },

  async getEvaluation(id: string): Promise<Evaluation> {
    return apiRequest(`/evaluations/${id}`);
  },

  async createEvaluation(evaluation: Omit<Evaluation, 'id' | 'createdAt' | 'updatedAt'>): Promise<Evaluation> {
    return apiRequest('/evaluations', {
      method: 'POST',
      body: JSON.stringify(evaluation),
    });
  },

  async updateEvaluation(id: string, evaluation: Partial<Evaluation>): Promise<Evaluation> {
    return apiRequest(`/evaluations/${id}`, {
      method: 'PUT',
      body: JSON.stringify(evaluation),
    });
  },

  async deleteEvaluation(id: string): Promise<boolean> {
    return apiRequest(`/evaluations/${id}`, {
      method: 'DELETE',
    });
  },

  // ===== CALLS =====
  async getCalls(params?: FilterParams): Promise<Call[]> {
    const queryParams = new URLSearchParams();
    if (params?.search) queryParams.append('q', params.search);
    if (params?.page) queryParams.append('_page', params.page.toString());
    if (params?.limit) queryParams.append('_limit', params.limit.toString());
    if (params?.sortBy) queryParams.append('_sort', params.sortBy);
    if (params?.sortOrder) queryParams.append('_order', params.sortOrder);
    
    return apiRequest(`/calls?${queryParams.toString()}`);
  },

  async getCall(id: string): Promise<Call> {
    return apiRequest(`/calls/${id}`);
  },

  async createCall(call: Omit<Call, 'id' | 'createdAt' | 'updatedAt'>): Promise<Call> {
    return apiRequest('/calls', {
      method: 'POST',
      body: JSON.stringify(call),
    });
  },

  async updateCall(id: string, call: Partial<Call>): Promise<Call> {
    return apiRequest(`/calls/${id}`, {
      method: 'PUT',
      body: JSON.stringify(call),
    });
  },

  async deleteCall(id: string): Promise<boolean> {
    return apiRequest(`/calls/${id}`, {
      method: 'DELETE',
    });
  },

  // ===== SALES =====
  async getSales(params?: FilterParams): Promise<Sale[]> {
    const queryParams = new URLSearchParams();
    if (params?.search) queryParams.append('q', params.search);
    if (params?.page) queryParams.append('_page', params.page.toString());
    if (params?.limit) queryParams.append('_limit', params.limit.toString());
    if (params?.sortBy) queryParams.append('_sort', params.sortBy);
    if (params?.sortOrder) queryParams.append('_order', params.sortOrder);
    
    return apiRequest(`/sales?${queryParams.toString()}`);
  },

  async getSale(id: string): Promise<Sale> {
    return apiRequest(`/sales/${id}`);
  },

  async createSale(sale: Omit<Sale, 'id' | 'createdAt' | 'updatedAt'>): Promise<Sale> {
    return apiRequest('/sales', {
      method: 'POST',
      body: JSON.stringify(sale),
    });
  },

  async updateSale(id: string, sale: Partial<Sale>): Promise<Sale> {
    return apiRequest(`/sales/${id}`, {
      method: 'PUT',
      body: JSON.stringify(sale),
    });
  },

  async deleteSale(id: string): Promise<boolean> {
    return apiRequest(`/sales/${id}`, {
      method: 'DELETE',
    });
  },

  // ===== CAMPAIGNS =====
  async getCampaigns(params?: FilterParams): Promise<Campaign[]> {
    const queryParams = new URLSearchParams();
    if (params?.search) queryParams.append('q', params.search);
    if (params?.page) queryParams.append('_page', params.page.toString());
    if (params?.limit) queryParams.append('_limit', params.limit.toString());
    if (params?.sortBy) queryParams.append('_sort', params.sortBy);
    if (params?.sortOrder) queryParams.append('_order', params.sortOrder);
    
    return apiRequest(`/campaigns?${queryParams.toString()}`);
  },

  async getCampaign(id: string): Promise<Campaign> {
    return apiRequest(`/campaigns/${id}`);
  },

  async createCampaign(campaign: Omit<Campaign, 'id' | 'createdAt' | 'updatedAt'>): Promise<Campaign> {
    return apiRequest('/campaigns', {
      method: 'POST',
      body: JSON.stringify(campaign),
    });
  },

  async updateCampaign(id: string, campaign: Partial<Campaign>): Promise<Campaign> {
    return apiRequest(`/campaigns/${id}`, {
      method: 'PUT',
      body: JSON.stringify(campaign),
    });
  },

  async deleteCampaign(id: string): Promise<boolean> {
    return apiRequest(`/campaigns/${id}`, {
      method: 'DELETE',
    });
  },

  // ===== COMMISSIONS =====
  async getCommissions(params?: FilterParams): Promise<Commission[]> {
    const queryParams = new URLSearchParams();
    if (params?.search) queryParams.append('q', params.search);
    if (params?.page) queryParams.append('_page', params.page.toString());
    if (params?.limit) queryParams.append('_limit', params.limit.toString());
    if (params?.sortBy) queryParams.append('_sort', params.sortBy);
    if (params?.sortOrder) queryParams.append('_order', params.sortOrder);
    
    return apiRequest(`/commissions?${queryParams.toString()}`);
  },

  async getCommission(id: string): Promise<Commission> {
    return apiRequest(`/commissions/${id}`);
  },

  async createCommission(commission: Omit<Commission, 'id' | 'createdAt' | 'updatedAt'>): Promise<Commission> {
    return apiRequest('/commissions', {
      method: 'POST',
      body: JSON.stringify(commission),
    });
  },

  async updateCommission(id: string, commission: Partial<Commission>): Promise<Commission> {
    return apiRequest(`/commissions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(commission),
    });
  },

  async deleteCommission(id: string): Promise<boolean> {
    return apiRequest(`/commissions/${id}`, {
      method: 'DELETE',
    });
  },

  // ===== ACHIEVEMENTS =====
  async getAchievements(params?: FilterParams): Promise<Achievement[]> {
    const queryParams = new URLSearchParams();
    if (params?.search) queryParams.append('q', params.search);
    if (params?.page) queryParams.append('_page', params.page.toString());
    if (params?.limit) queryParams.append('_limit', params.limit.toString());
    if (params?.sortBy) queryParams.append('_sort', params.sortBy);
    if (params?.sortOrder) queryParams.append('_order', params.sortOrder);
    
    return apiRequest(`/achievements?${queryParams.toString()}`);
  },

  async getAchievement(id: string): Promise<Achievement> {
    return apiRequest(`/achievements/${id}`);
  },

  async createAchievement(achievement: Omit<Achievement, 'id' | 'createdAt' | 'updatedAt'>): Promise<Achievement> {
    return apiRequest('/achievements', {
      method: 'POST',
      body: JSON.stringify(achievement),
    });
  },

  async updateAchievement(id: string, achievement: Partial<Achievement>): Promise<Achievement> {
    return apiRequest(`/achievements/${id}`, {
      method: 'PUT',
      body: JSON.stringify(achievement),
    });
  },

  async deleteAchievement(id: string): Promise<boolean> {
    return apiRequest(`/achievements/${id}`, {
      method: 'DELETE',
    });
  },

  // ===== SCRIPTS =====
  async getScripts(params?: FilterParams): Promise<Script[]> {
    const queryParams = new URLSearchParams();
    if (params?.search) queryParams.append('q', params.search);
    if (params?.page) queryParams.append('_page', params.page.toString());
    if (params?.limit) queryParams.append('_limit', params.limit.toString());
    if (params?.sortBy) queryParams.append('_sort', params.sortBy);
    if (params?.sortOrder) queryParams.append('_order', params.sortOrder);
    
    return apiRequest(`/scripts?${queryParams.toString()}`);
  },

  async getScript(id: string): Promise<Script> {
    return apiRequest(`/scripts/${id}`);
  },

  async createScript(script: Omit<Script, 'id' | 'createdAt' | 'updatedAt'>): Promise<Script> {
    return apiRequest('/scripts', {
      method: 'POST',
      body: JSON.stringify(script),
    });
  },

  async updateScript(id: string, script: Partial<Script>): Promise<Script> {
    return apiRequest(`/scripts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(script),
    });
  },

  async deleteScript(id: string): Promise<boolean> {
    return apiRequest(`/scripts/${id}`, {
      method: 'DELETE',
    });
  },

  // ===== RELATIONSHIP ENDPOINTS =====
  
  // Customer relationships
  async getCustomerSubscriptions(customerId: string): Promise<Subscription[]> {
    return apiRequest(`/customers/${customerId}/subscriptions`);
  },

  async getCustomerEvaluations(customerId: string): Promise<Evaluation[]> {
    return apiRequest(`/customers/${customerId}/evaluations`);
  },

  async getCustomerCalls(customerId: string): Promise<Call[]> {
    return apiRequest(`/customers/${customerId}/calls`);
  },

  async getCustomerSales(customerId: string): Promise<Sale[]> {
    return apiRequest(`/customers/${customerId}/sales`);
  },

  // Employee relationships
  async getEmployeeCalls(employeeId: string): Promise<Call[]> {
    return apiRequest(`/employees/${employeeId}/calls`);
  },

  async getEmployeeSales(employeeId: string): Promise<Sale[]> {
    return apiRequest(`/employees/${employeeId}/sales`);
  },

  async getEmployeeCommissions(employeeId: string): Promise<Commission[]> {
    return apiRequest(`/employees/${employeeId}/commissions`);
  },

  // Store relationships
  async getStoreEmployees(storeId: string): Promise<Employee[]> {
    return apiRequest(`/stores/${storeId}/employees`);
  },

  async getStoreSales(storeId: string): Promise<Sale[]> {
    return apiRequest(`/stores/${storeId}/sales`);
  },

  // Campaign relationships
  async getCampaignCalls(campaignId: string): Promise<Call[]> {
    return apiRequest(`/campaigns/${campaignId}/calls`);
  },

  // ===== LEGACY ENDPOINTS (mantener compatibilidad) =====
  
  // Users (mantener para compatibilidad)
  async getUsers() {
    return apiRequest('/users');
  },

  async getUser(id: number) {
    return apiRequest(`/users/${id}`);
  },

  async createUser(user: any) {
    return apiRequest('/users', {
      method: 'POST',
      body: JSON.stringify(user)
    });
  },

  // Sleep Records (mantener para compatibilidad)
  async getSleepRecords(userId?: number) {
    const url = userId 
      ? `${API_URL}/sleep-records?userId=${userId}`
      : `${API_URL}/sleep-records`;
    const response = await fetch(url);
    return response.json();
  },

  async createSleepRecord(record: any) {
    return apiRequest('/sleep-records', {
      method: 'POST',
      body: JSON.stringify(record)
    });
  },

  async updateSleepRecord(id: number, record: any) {
    return apiRequest(`/sleep-records/${id}`, {
      method: 'PUT',
      body: JSON.stringify(record)
    });
  },

  async deleteSleepRecord(id: number) {
    return apiRequest(`/sleep-records/${id}`, {
      method: 'DELETE'
    });
  },

  // Sleep Goals (mantener para compatibilidad)
  async getSleepGoals(userId?: number) {
    const url = userId 
      ? `${API_URL}/sleep-goals?userId=${userId}`
      : `${API_URL}/sleep-goals`;
    const response = await fetch(url);
    return response.json();
  },

  async createSleepGoal(goal: any) {
    return apiRequest('/sleep-goals', {
      method: 'POST',
      body: JSON.stringify(goal)
    });
  },

  async updateSleepGoal(id: number, goal: any) {
    return apiRequest(`/sleep-goals/${id}`, {
      method: 'PUT',
      body: JSON.stringify(goal)
    });
  },

  // Statistics (mantener para compatibilidad)
  async getStatistics(userId?: number) {
    const url = userId 
      ? `${API_URL}/statistics?userId=${userId}`
      : `${API_URL}/statistics`;
    const response = await fetch(url);
    return response.json();
  }
};

export default api;
