// EasyPanel API Integration for Sleep+ Admin
// Base URL: http://168.231.92.67:3000
// Token: c86df06feae92526658731f8fefb0c208bc00ff1d7538c6461a23fe0b9657a58

const EASYPANEL_CONFIG = {
  baseUrl: 'http://168.231.92.67:3000',
  token: 'c86df06feae92526658731f8fefb0c208bc00ff1d7538c6461a23fe0b9657a58',
  headers: {
    'Authorization': 'Bearer c86df06feae92526658731f8fefb0c208bc00ff1d7538c6461a23fe0b9657a58',
    'Content-Type': 'application/json'
  }
};

// API Client for EasyPanel
class EasyPanelClient {
  constructor(config = EASYPANEL_CONFIG) {
    this.baseUrl = config.baseUrl;
    this.headers = config.headers;
  }

  // Auth methods
  async login(email, password) {
    const response = await fetch(`${this.baseUrl}/api/trpc/auth.login`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        json: {
          email,
          password,
          rememberMe: false
        }
      })
    });
    return response.json();
  }

  // Projects methods
  async listProjects() {
    const response = await fetch(`${this.baseUrl}/api/trpc/projects.listProjects`, {
      method: 'GET',
      headers: this.headers
    });
    return response.json();
  }

  async createProject(name) {
    const response = await fetch(`${this.baseUrl}/api/trpc/projects.createProject`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        json: { name }
      })
    });
    return response.json();
  }

  // App Service methods
  async createAppService(projectName, serviceName, config) {
    const response = await fetch(`${this.baseUrl}/api/trpc/services.app.createService`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        json: {
          projectName,
          serviceName,
          source: config.source || { type: 'image', image: 'nginx:latest' },
          env: config.env || '',
          domains: config.domains || [],
          ports: config.ports || [],
          resources: config.resources || {
            memoryReservation: 256,
            memoryLimit: 512,
            cpuReservation: 0.25,
            cpuLimit: 0.5
          }
        }
      })
    });
    return response.json();
  }

  async deployService(projectName, serviceName, forceRebuild = false) {
    const response = await fetch(`${this.baseUrl}/api/trpc/services.app.deployService`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        json: {
          projectName,
          serviceName,
          forceRebuild
        }
      })
    });
    return response.json();
  }

  // Database methods (MySQL example)
  async createMySQLService(projectName, serviceName, config) {
    const response = await fetch(`${this.baseUrl}/api/trpc/services.mysql.createService`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        json: {
          projectName,
          serviceName,
          databaseName: config.databaseName || 'sleepplus',
          user: config.user || 'sleepplus',
          password: config.password || this.generatePassword(),
          rootPassword: config.rootPassword || this.generatePassword(),
          image: config.image || 'mysql:8',
          resources: config.resources || {
            memoryReservation: 512,
            memoryLimit: 1024,
            cpuReservation: 0.5,
            cpuLimit: 1
          }
        }
      })
    });
    return response.json();
  }

  // Monitoring methods
  async getSystemStats() {
    const response = await fetch(`${this.baseUrl}/api/trpc/monitor.getSystemStats`, {
      method: 'GET',
      headers: this.headers
    });
    return response.json();
  }

  // Helper methods
  generatePassword(length = 20) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { EasyPanelClient, EASYPANEL_CONFIG };
}

// Example usage:
/*
const client = new EasyPanelClient();

// Deploy Sleep+ Admin to EasyPanel
async function deploySleepPlusAdmin() {
  try {
    // Create project
    const project = await client.createProject('sleep-plus-admin');
    console.log('Project created:', project);

    // Create MySQL database
    const db = await client.createMySQLService('sleep-plus-admin', 'database', {
      databaseName: 'sleepplus',
      user: 'sleepplus'
    });
    console.log('Database created:', db);

    // Create app service
    const app = await client.createAppService('sleep-plus-admin', 'app', {
      source: {
        type: 'image',
        image: 'node:18-alpine'
      },
      env: `
        NODE_ENV=production
        DATABASE_URL=mysql://sleepplus:${db.password}@database:3306/sleepplus
        VITE_API_URL=http://localhost:3001
      `.trim(),
      domains: [{
        host: 'sleep-plus.example.com',
        https: true,
        port: 3000
      }],
      ports: [{
        published: 3000,
        target: 3000,
        protocol: 'tcp'
      }]
    });
    console.log('App service created:', app);

    // Deploy the app
    const deployment = await client.deployService('sleep-plus-admin', 'app');
    console.log('Deployment started:', deployment);

  } catch (error) {
    console.error('Deployment failed:', error);
  }
}
*/