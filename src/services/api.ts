const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const api = {
  // Health check
  async checkHealth() {
    const response = await fetch(`${API_URL.replace('/api', '')}/health`);
    return response.json();
  },

  // Users
  async getUsers() {
    const response = await fetch(`${API_URL}/users`);
    return response.json();
  },

  async getUser(id: number) {
    const response = await fetch(`${API_URL}/users/${id}`);
    return response.json();
  },

  async createUser(user: any) {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
    return response.json();
  },

  // Sleep Records
  async getSleepRecords(userId?: number) {
    const url = userId 
      ? `${API_URL}/sleep-records?userId=${userId}`
      : `${API_URL}/sleep-records`;
    const response = await fetch(url);
    return response.json();
  },

  async createSleepRecord(record: any) {
    const response = await fetch(`${API_URL}/sleep-records`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record)
    });
    return response.json();
  },

  async updateSleepRecord(id: number, record: any) {
    const response = await fetch(`${API_URL}/sleep-records/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record)
    });
    return response.json();
  },

  async deleteSleepRecord(id: number) {
    const response = await fetch(`${API_URL}/sleep-records/${id}`, {
      method: 'DELETE'
    });
    return response.ok;
  },

  // Sleep Goals
  async getSleepGoals(userId?: number) {
    const url = userId 
      ? `${API_URL}/sleep-goals?userId=${userId}`
      : `${API_URL}/sleep-goals`;
    const response = await fetch(url);
    return response.json();
  },

  async createSleepGoal(goal: any) {
    const response = await fetch(`${API_URL}/sleep-goals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(goal)
    });
    return response.json();
  },

  async updateSleepGoal(id: number, goal: any) {
    const response = await fetch(`${API_URL}/sleep-goals/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(goal)
    });
    return response.json();
  },

  // Statistics
  async getStatistics(userId?: number) {
    const url = userId 
      ? `${API_URL}/statistics?userId=${userId}`
      : `${API_URL}/statistics`;
    const response = await fetch(url);
    return response.json();
  }
};

export default api;
