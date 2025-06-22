import axios from 'axios';

const API_URL = 'http://168.231.92.67:3000';
const TOKEN = 'c86df06feae92526658731f8fefb0c208bc00ff1d7538c6461a23fe0b9657a58';

async function checkServiceStatus() {
  try {
    console.log('🔍 Checking service status for sleep-plus-front-2...\n');
    
    // Get Docker services
    const servicesResponse = await axios.get(`${API_URL}/api/trpc/projects.getDockerServices`, {
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
      },
      params: {
        input: JSON.stringify({
          json: {
            projectName: 'sleep-plus-front-2'
          }
        })
      }
    });
    
    console.log('Docker Services:', JSON.stringify(servicesResponse.data, null, 2));
    
    // Check for errors in frontend service
    console.log('\n🔍 Checking frontend service errors...');
    const frontendErrorResponse = await axios.get(`${API_URL}/api/trpc/services.common.getServiceError`, {
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
      },
      params: {
        input: JSON.stringify({
          json: {
            projectName: 'sleep-plus-front-2',
            serviceName: 'frontend'
          }
        })
      }
    });
    
    console.log('Frontend errors:', JSON.stringify(frontendErrorResponse.data, null, 2));
    
    // Check for errors in backend service
    console.log('\n🔍 Checking backend service errors...');
    const backendErrorResponse = await axios.get(`${API_URL}/api/trpc/services.common.getServiceError`, {
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
      },
      params: {
        input: JSON.stringify({
          json: {
            projectName: 'sleep-plus-front-2',
            serviceName: 'backend'
          }
        })
      }
    });
    
    console.log('Backend errors:', JSON.stringify(backendErrorResponse.data, null, 2));
    
    // Get containers status
    console.log('\n🔍 Checking frontend containers...');
    const frontendContainersResponse = await axios.get(`${API_URL}/api/trpc/projects.getDockerContainers`, {
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
      },
      params: {
        input: JSON.stringify({
          json: {
            service: 'easypanel_sleep-plus-front-2_frontend'
          }
        })
      }
    });
    
    console.log('Frontend containers:', JSON.stringify(frontendContainersResponse.data, null, 2));
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

checkServiceStatus();
