import axios from 'axios';

const API_URL = 'http://168.231.92.67:3000';
const TOKEN = 'c86df06feae92526658731f8fefb0c208bc00ff1d7538c6461a23fe0b9657a58';

async function getRecentActions() {
  try {
    console.log('📋 Getting recent actions for frontend service...\n');
    
    // Get recent actions for frontend
    const frontendActionsResponse = await axios.get(`${API_URL}/api/trpc/actions.listActions`, {
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
      },
      params: {
        input: JSON.stringify({
          json: {
            projectName: 'sleep-plus-front-2',
            serviceName: 'frontend',
            type: 'build',
            limit: 5
          }
        })
      }
    });
    
    console.log('Frontend build actions:', JSON.stringify(frontendActionsResponse.data, null, 2));
    
    // Get recent deploy actions
    console.log('\n📋 Getting recent deploy actions...');
    const deployActionsResponse = await axios.get(`${API_URL}/api/trpc/actions.listActions`, {
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
      },
      params: {
        input: JSON.stringify({
          json: {
            projectName: 'sleep-plus-front-2',
            serviceName: 'frontend',
            type: 'deploy',
            limit: 5
          }
        })
      }
    });
    
    console.log('Frontend deploy actions:', JSON.stringify(deployActionsResponse.data, null, 2));
    
    // Test the frontend API configuration
    console.log('\n🔍 Testing frontend API configuration...');
    const frontendResponse = await axios.get('https://sleep-plus-front-2-frontend.dqyvuv.easypanel.host');
    console.log('Frontend status:', frontendResponse.status);
    
    // Test backend API health
    console.log('\n🔍 Testing backend API health...');
    try {
      const backendResponse = await axios.get('https://sleep-plus-front-2-backend.dqyvuv.easypanel.host/api/customers');
      console.log('Backend /api/customers status:', backendResponse.status);
    } catch (error) {
      if (error.response) {
        console.log('Backend /api/customers status:', error.response.status);
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', JSON.stringify(error.response.data, null, 2));
    }
  }
}

getRecentActions();
