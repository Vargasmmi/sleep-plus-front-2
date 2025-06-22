import axios from 'axios';

const API_URL = 'http://168.231.92.67:3000';
const TOKEN = 'c86df06feae92526658731f8fefb0c208bc00ff1d7538c6461a23fe0b9657a58';

async function deployServices() {
  try {
    // First, let's commit and push any changes
    console.log('📦 Preparing to deploy services...\n');
    
    // Deploy frontend
    console.log('🚀 Deploying frontend service...');
    try {
      const frontendDeployResponse = await axios.post(
        `${API_URL}/api/trpc/services.app.deployService`,
        {
          json: {
            projectName: 'sleep-plus-front-2',
            serviceName: 'frontend',
            forceRebuild: true
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${TOKEN}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log('Frontend deploy response:', JSON.stringify(frontendDeployResponse.data, null, 2));
    } catch (error) {
      console.error('Frontend deploy error:', error.response?.data || error.message);
    }
    
    // Deploy backend
    console.log('\n🚀 Deploying backend service...');
    try {
      const backendDeployResponse = await axios.post(
        `${API_URL}/api/trpc/services.app.deployService`,
        {
          json: {
            projectName: 'sleep-plus-front-2',
            serviceName: 'backend',
            forceRebuild: true
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${TOKEN}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log('Backend deploy response:', JSON.stringify(backendDeployResponse.data, null, 2));
    } catch (error) {
      console.error('Backend deploy error:', error.response?.data || error.message);
    }
    
    console.log('\n✅ Deploy commands sent. Check EasyPanel dashboard for progress.');
    
  } catch (error) {
    console.error('❌ General error:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', JSON.stringify(error.response.data, null, 2));
    }
  }
}

deployServices();
