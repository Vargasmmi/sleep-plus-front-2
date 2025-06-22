// Script de verificación de conectividad frontend-backend
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:3001';

export class ConnectivityChecker {
  results: any;
  
  constructor() {
    this.results = {
      apiUrl: API_URL,
      timestamp: new Date().toISOString(),
      tests: [],
      errors: [],
      warnings: []
    };
  }

  async checkHealth() {
    try {
      const response = await axios.get(`${API_URL}/health`);
      this.results.tests.push({
        name: 'Health Check',
        endpoint: '/health',
        status: 'success',
        data: response.data
      });
      return true;
    } catch (error: any) {
      this.results.errors.push({
        name: 'Health Check',
        endpoint: '/health',
        error: error.message
      });
      return false;
    }
  }

  async checkCRUD(resource: string) {
    const tests: any[] = [];
    
    // GET List
    try {
      const listResponse = await axios.get(`${API_URL}/${resource}`);
      tests.push({
        operation: 'GET_LIST',
        status: 'success',
        count: listResponse.data.length
      });
    } catch (error: any) {
      tests.push({
        operation: 'GET_LIST',
        status: 'error',
        error: error.message
      });
    }

    // GET One (if list has items)
    try {
      const listResponse = await axios.get(`${API_URL}/${resource}`);
      if (listResponse.data.length > 0) {
        const firstId = listResponse.data[0].id;
        const oneResponse = await axios.get(`${API_URL}/${resource}/${firstId}`);
        tests.push({
          operation: 'GET_ONE',
          status: 'success',
          id: firstId
        });
      }
    } catch (error: any) {
      tests.push({
        operation: 'GET_ONE',
        status: 'error',
        error: error.message
      });
    }

    // POST (Create test record)
    let testId: string | null = null;
    try {
      const testData = this.getTestData(resource);
      const createResponse = await axios.post(`${API_URL}/${resource}`, testData);
      testId = createResponse.data.id;
      tests.push({
        operation: 'CREATE',
        status: 'success',
        id: testId
      });
    } catch (error: any) {
      tests.push({
        operation: 'CREATE',
        status: 'error',
        error: error.message
      });
    }

    // PUT (Update if created)
    if (testId) {
      try {
        const updateData = { ...this.getTestData(resource), updatedAt: new Date().toISOString() };
        await axios.put(`${API_URL}/${resource}/${testId}`, updateData);
        tests.push({
          operation: 'UPDATE',
          status: 'success',
          id: testId
        });
      } catch (error: any) {
        tests.push({
          operation: 'UPDATE',
          status: 'error',
          error: error.message
        });
      }

      // DELETE (Clean up)
      try {
        await axios.delete(`${API_URL}/${resource}/${testId}`);
        tests.push({
          operation: 'DELETE',
          status: 'success',
          id: testId
        });
      } catch (error: any) {
        tests.push({
          operation: 'DELETE',
          status: 'error',
          error: error.message
        });
      }
    }

    this.results.tests.push({
      resource,
      operations: tests
    });

    return tests;
  }

  getTestData(resource: string) {
    const testData: Record<string, any> = {
      customers: {
        firstName: 'Test',
        lastName: 'Customer',
        email: 'test@example.com',
        phone: '555-0000',
        tier: 'bronze'
      },
      employees: {
        employeeId: 'TEST001',
        email: 'test@employee.com',
        firstName: 'Test',
        lastName: 'Employee',
        role: 'agent',
        status: 'active'
      },
      subscriptions: {
        customerId: '1',
        plan: 'basic',
        status: 'active',
        pricing: {
          monthly: 9.99,
          annual: 99.99,
          currency: 'USD'
        }
      }
    };

    return testData[resource] || { name: 'Test ' + resource };
  }

  async checkAllResources() {
    const resources = [
      'customers',
      'subscriptions',
      'evaluations',
      'employees',
      'stores',
      'calls',
      'sales',
      'campaigns',
      'scripts',
      'achievements',
      'commissions'
    ];

    console.log('🔍 Iniciando verificación de conectividad...\n');
    
    // Check health first
    const healthOk = await this.checkHealth();
    if (!healthOk) {
      console.error('❌ El backend no está respondiendo. Verifique que esté ejecutándose.');
      return this.results;
    }

    console.log('✅ Backend respondiendo correctamente\n');

    // Check each resource
    for (const resource of resources) {
      console.log(`Verificando ${resource}...`);
      await this.checkCRUD(resource);
    }

    // Summary
    const totalTests = this.results.tests.reduce((acc: number, test: any) => {
      if (test.operations) {
        return acc + test.operations.length;
      }
      return acc + 1;
    }, 0);

    const failedTests = this.results.tests.reduce((acc: number, test: any) => {
      if (test.operations) {
        return acc + test.operations.filter((op: any) => op.status === 'error').length;
      }
      return acc;
    }, 0);

    this.results.summary = {
      totalTests,
      passedTests: totalTests - failedTests,
      failedTests,
      successRate: ((totalTests - failedTests) / totalTests * 100).toFixed(2) + '%'
    };

    return this.results;
  }

  printReport() {
    console.log('\n📊 REPORTE DE CONECTIVIDAD\n');
    console.log(`API URL: ${this.results.apiUrl}`);
    console.log(`Timestamp: ${this.results.timestamp}`);
    
    if (this.results.summary) {
      console.log('\n📈 Resumen:');
      console.log(`Total de pruebas: ${this.results.summary.totalTests}`);
      console.log(`Pruebas exitosas: ${this.results.summary.passedTests}`);
      console.log(`Pruebas fallidas: ${this.results.summary.failedTests}`);
      console.log(`Tasa de éxito: ${this.results.summary.successRate}`);
    }

    if (this.results.errors.length > 0) {
      console.log('\n❌ Errores encontrados:');
      this.results.errors.forEach((error: any) => {
        console.log(`- ${error.name}: ${error.error}`);
      });
    }

    console.log('\n✅ Verificación completa');
  }
}

// Función para ejecutar la verificación
export async function runConnectivityCheck() {
  const checker = new ConnectivityChecker();
  await checker.checkAllResources();
  checker.printReport();
  return checker.results;
}
