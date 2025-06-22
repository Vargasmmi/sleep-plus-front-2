import axios from 'axios';

const API_URL = 'http://168.231.92.67:3000';
const TOKEN = 'c86df06feae92526658731f8fefb0c208bc00ff1d7538c6461a23fe0b9657a58';

async function testConnection() {
  try {
    // Intento 1: Listar proyectos
    console.log('Testing EasyPanel connection...');
    
    const response = await axios.get(`${API_URL}/api/trpc/projects.listProjects`, {
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ Connection successful!');
    console.log('Projects:', JSON.stringify(response.data, null, 2));
    
    // Si tenemos proyectos, intentar ver el proyecto sleep-plus-front-2
    if (response.data && response.data.result) {
      console.log('\nLooking for sleep-plus-front-2 project...');
      
      const inspectResponse = await axios.get(`${API_URL}/api/trpc/projects.inspectProject`, {
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
      
      console.log('Project details:', JSON.stringify(inspectResponse.data, null, 2));
    }
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

testConnection();
