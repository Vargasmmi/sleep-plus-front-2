#!/usr/bin/env node

// Fix Telegram CRM Millonario issues in EasyPanel
const { EasyPanelClient } = require('./easypanel-integration.js');

const client = new EasyPanelClient();

async function fixTelegramCRM() {
  console.log('🔧 Fixing Telegram CRM Millonario project...\n');
  
  const projectName = 'telegram-crm-millonario';
  
  try {
    // 1. Check backend service logs
    console.log('📜 Checking backend logs...');
    const backendActionsResponse = await fetch(
      `${client.baseUrl}/api/trpc/actions.listActions?input=${encodeURIComponent(JSON.stringify({
        json: {
          projectName,
          serviceName: 'sleep-admin-backend',
          limit: 5
        }
      }))}`,
      {
        method: 'GET',
        headers: client.headers
      }
    );
    
    const backendActions = await backendActionsResponse.json();
    console.log('Backend recent actions:', backendActions.result?.data);
    
    // 2. Check frontend service logs
    console.log('\n📜 Checking frontend logs...');
    const frontendActionsResponse = await fetch(
      `${client.baseUrl}/api/trpc/actions.listActions?input=${encodeURIComponent(JSON.stringify({
        json: {
          projectName,
          serviceName: 'sleep-admin-frontend',
          limit: 5
        }
      }))}`,
      {
        method: 'GET',
        headers: client.headers
      }
    );
    
    const frontendActions = await frontendActionsResponse.json();
    console.log('Frontend recent actions:', frontendActions.result?.data);
    
    // 3. Fix common issues
    console.log('\n🔧 Applying fixes...');
    
    // Fix 1: Update backend environment variables
    console.log('\n1️⃣ Updating backend environment variables...');
    const backendEnvFix = await fetch(
      `${client.baseUrl}/api/trpc/services.app.updateEnv`,
      {
        method: 'POST',
        headers: client.headers,
        body: JSON.stringify({
          json: {
            projectName,
            serviceName: 'sleep-admin-backend',
            env: `PORT=3001
HOST=0.0.0.0
NODE_ENV=production
CORS_ORIGIN=https://telegram-crm-millonario-sleep-admin-frontend.dqyvuv.easypanel.host
CORS_CREDENTIALS=true
DATABASE_URL=postgresql://postgres:admin123@crm:5432/telegram-crm-millonario
ALLOWED_ORIGINS=["https://telegram-crm-millonario-sleep-admin-frontend.dqyvuv.easypanel.host","http://localhost:5173"]`,
            createDotEnv: true
          }
        })
      }
    );
    
    const backendEnvResult = await backendEnvFix.json();
    console.log('Backend env update:', backendEnvResult.result ? '✅ Success' : '❌ Failed');
    
    // Fix 2: Update frontend environment variables
    console.log('\n2️⃣ Updating frontend environment variables...');
    const frontendEnvFix = await fetch(
      `${client.baseUrl}/api/trpc/services.app.updateEnv`,
      {
        method: 'POST',
        headers: client.headers,
        body: JSON.stringify({
          json: {
            projectName,
            serviceName: 'sleep-admin-frontend',
            env: `VITE_API_URL=https://telegram-crm-millonario-sleep-admin-backend.dqyvuv.easypanel.host
PORT=5173
HOST=0.0.0.0
VITE_APP_NAME=Sleep+ Admin
VITE_ENABLE_DEVTOOLS=false`,
            createDotEnv: true
          }
        })
      }
    );
    
    const frontendEnvResult = await frontendEnvFix.json();
    console.log('Frontend env update:', frontendEnvResult.result ? '✅ Success' : '❌ Failed');
    
    // Fix 3: Restart services
    console.log('\n3️⃣ Restarting services...');
    
    // Restart backend
    const backendRestart = await fetch(
      `${client.baseUrl}/api/trpc/services.app.restartService`,
      {
        method: 'POST',
        headers: client.headers,
        body: JSON.stringify({
          json: {
            projectName,
            serviceName: 'sleep-admin-backend'
          }
        })
      }
    );
    
    const backendRestartResult = await backendRestart.json();
    console.log('Backend restart:', backendRestartResult.result ? '✅ Success' : '❌ Failed');
    
    // Restart frontend
    const frontendRestart = await fetch(
      `${client.baseUrl}/api/trpc/services.app.restartService`,
      {
        method: 'POST',
        headers: client.headers,
        body: JSON.stringify({
          json: {
            projectName,
            serviceName: 'sleep-admin-frontend'
          }
        })
      }
    );
    
    const frontendRestartResult = await frontendRestart.json();
    console.log('Frontend restart:', frontendRestartResult.result ? '✅ Success' : '❌ Failed');
    
    // 4. Deploy with latest changes
    console.log('\n4️⃣ Redeploying services with fixes...');
    
    // Redeploy backend
    const backendDeploy = await fetch(
      `${client.baseUrl}/api/trpc/services.app.deployService`,
      {
        method: 'POST',
        headers: client.headers,
        body: JSON.stringify({
          json: {
            projectName,
            serviceName: 'sleep-admin-backend',
            forceRebuild: true
          }
        })
      }
    );
    
    const backendDeployResult = await backendDeploy.json();
    console.log('Backend redeploy:', backendDeployResult.result ? '✅ Started' : '❌ Failed');
    
    // Redeploy frontend
    const frontendDeploy = await fetch(
      `${client.baseUrl}/api/trpc/services.app.deployService`,
      {
        method: 'POST',
        headers: client.headers,
        body: JSON.stringify({
          json: {
            projectName,
            serviceName: 'sleep-admin-frontend',
            forceRebuild: true
          }
        })
      }
    );
    
    const frontendDeployResult = await frontendDeploy.json();
    console.log('Frontend redeploy:', frontendDeployResult.result ? '✅ Started' : '❌ Failed');
    
    // Summary
    console.log('\n✨ Fixes applied!');
    console.log('\n📋 Service URLs:');
    console.log('   Frontend: https://telegram-crm-millonario-sleep-admin-frontend.dqyvuv.easypanel.host');
    console.log('   Backend: https://telegram-crm-millonario-sleep-admin-backend.dqyvuv.easypanel.host');
    console.log('   Database: PostgreSQL on crm:5432');
    console.log('\n⏳ Please wait 2-3 minutes for services to redeploy');
    console.log('   Check deployment status at: http://168.231.92.67:3000');
    
  } catch (error) {
    console.error('❌ Error:', error);
    console.error(error.stack);
  }
}

// Run fixes
fixTelegramCRM();