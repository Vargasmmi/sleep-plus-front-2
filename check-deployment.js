import axios from 'axios';

const API_URL = 'http://168.231.92.67:3000';
const TOKEN = 'c86df06feae92526658731f8fefb0c208bc00ff1d7538c6461a23fe0b9657a58';

async function checkDeploymentStatus() {
  try {
    console.log('🔍 Checking deployment status...\n');
    
    // Get recent actions
    const actionsResponse = await axios.get(`${API_URL}/api/trpc/actions.listActions`, {
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
      },
      params: {
        input: JSON.stringify({
          json: {
            projectName: 'sleep-plus-front-2',
            limit: 10
          }
        })
      }
    });
    
    const actions = actionsResponse.data?.result?.data?.json || [];
    
    console.log(`Found ${actions.length} recent actions:`);
    actions.forEach((action, index) => {
      console.log(`\n${index + 1}. ${action.type} - ${action.serviceName || 'N/A'}`);
      console.log(`   Status: ${action.status}`);
      console.log(`   Created: ${new Date(action.createdAt).toLocaleString()}`);
      if (action.error) {
        console.log(`   Error: ${action.error}`);
      }
    });
    
    // Test the services
    console.log('\n\n🌐 Testing service endpoints...');
    
    // Test frontend
    try {
      const frontendTest = await axios.get('https://sleep-plus-front-2-frontend.dqyvuv.easypanel.host');
      console.log('✅ Frontend is accessible');
    } catch (error) {
      console.log('❌ Frontend is not accessible:', error.message);
    }
    
    // Test backend API
    try {
      const backendTest = await axios.get('https://sleep-plus-front-2-backend.dqyvuv.easypanel.host/api');
      console.log('✅ Backend API is accessible');
      console.log('   API Response:', JSON.stringify(backendTest.data, null, 2));
    } catch (error) {
      console.log('❌ Backend API is not accessible:', error.message);
    }
    
    // Test backend health
    try {
      const healthTest = await axios.get('https://sleep-plus-front-2-backend.dqyvuv.easypanel.host/health');
      console.log('✅ Backend health check passed');
      console.log('   Health:', JSON.stringify(healthTest.data, null, 2));
    } catch (error) {
      console.log('❌ Backend health check failed:', error.message);
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
  }
}

checkDeploymentStatus();
