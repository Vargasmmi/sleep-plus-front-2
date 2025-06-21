#!/usr/bin/env node

// Deploy Sleep+ Admin to EasyPanel
// Usage: node deploy-to-easypanel.js

const { EasyPanelClient } = require('./easypanel-integration.js');

const client = new EasyPanelClient();

async function deploySleepPlusAdmin() {
  console.log('🚀 Starting deployment to EasyPanel...');
  
  try {
    // 1. Check authentication
    console.log('✅ Authenticating with EasyPanel...');
    const projects = await client.listProjects();
    console.log(`✅ Connected! Found ${projects.length || 0} existing projects`);

    // 2. Create or get project
    const projectName = 'sleep-plus-admin';
    console.log(`\n📦 Creating project: ${projectName}`);
    
    try {
      await client.createProject(projectName);
      console.log('✅ Project created successfully');
    } catch (error) {
      if (error.message && error.message.includes('already exists')) {
        console.log('ℹ️  Project already exists, continuing...');
      } else {
        throw error;
      }
    }

    // 3. Create MySQL database
    console.log('\n🗄️  Setting up MySQL database...');
    const dbPassword = client.generatePassword();
    const dbRootPassword = client.generatePassword();
    
    try {
      const dbConfig = {
        databaseName: 'sleepplus',
        user: 'sleepplus',
        password: dbPassword,
        rootPassword: dbRootPassword,
        image: 'mysql:8',
        resources: {
          memoryReservation: 512,
          memoryLimit: 1024,
          cpuReservation: 0.5,
          cpuLimit: 1
        }
      };
      
      await client.createMySQLService(projectName, 'database', dbConfig);
      console.log('✅ Database service created');
      console.log(`   Database: sleepplus`);
      console.log(`   User: sleepplus`);
      console.log(`   Password: ${dbPassword}`);
    } catch (error) {
      console.log('⚠️  Database service might already exist:', error.message);
    }

    // 4. Create backend service
    console.log('\n🔧 Setting up backend service...');
    try {
      const backendConfig = {
        source: {
          type: 'image',
          image: 'node:18-alpine'
        },
        env: `
NODE_ENV=production
PORT=3001
DATABASE_URL=mysql://sleepplus:${dbPassword}@database:3306/sleepplus
`.trim(),
        domains: [{
          host: 'api-sleep-plus.168.231.92.67.nip.io',
          https: false,
          port: 3001
        }],
        ports: [{
          published: 3001,
          target: 3001,
          protocol: 'tcp'
        }],
        resources: {
          memoryReservation: 256,
          memoryLimit: 512,
          cpuReservation: 0.25,
          cpuLimit: 0.5
        }
      };
      
      await client.createAppService(projectName, 'backend', backendConfig);
      console.log('✅ Backend service created');
    } catch (error) {
      console.log('⚠️  Backend service might already exist:', error.message);
    }

    // 5. Create frontend service
    console.log('\n🎨 Setting up frontend service...');
    try {
      const frontendConfig = {
        source: {
          type: 'image',
          image: 'node:18-alpine'
        },
        env: `
NODE_ENV=production
VITE_API_URL=http://api-sleep-plus.168.231.92.67.nip.io
VITE_APP_NAME=Sleep+ Admin
`.trim(),
        domains: [{
          host: 'sleep-plus.168.231.92.67.nip.io',
          https: false,
          port: 5173
        }],
        ports: [{
          published: 5173,
          target: 5173,
          protocol: 'tcp'
        }],
        resources: {
          memoryReservation: 256,
          memoryLimit: 512,
          cpuReservation: 0.25,
          cpuLimit: 0.5
        }
      };
      
      await client.createAppService(projectName, 'frontend', frontendConfig);
      console.log('✅ Frontend service created');
    } catch (error) {
      console.log('⚠️  Frontend service might already exist:', error.message);
    }

    // 6. Deploy services
    console.log('\n🚀 Deploying services...');
    
    try {
      await client.deployService(projectName, 'database');
      console.log('✅ Database deployed');
    } catch (error) {
      console.log('⚠️  Database deployment issue:', error.message);
    }

    try {
      await client.deployService(projectName, 'backend');
      console.log('✅ Backend deployed');
    } catch (error) {
      console.log('⚠️  Backend deployment issue:', error.message);
    }

    try {
      await client.deployService(projectName, 'frontend');
      console.log('✅ Frontend deployed');
    } catch (error) {
      console.log('⚠️  Frontend deployment issue:', error.message);
    }

    // 7. Summary
    console.log('\n✨ Deployment completed!');
    console.log('\n📋 Access your services:');
    console.log('   Frontend: http://sleep-plus.168.231.92.67.nip.io');
    console.log('   Backend API: http://api-sleep-plus.168.231.92.67.nip.io');
    console.log('   EasyPanel: http://168.231.92.67:3000');
    console.log('\n⚠️  Note: You may need to:');
    console.log('   1. Upload your code to the services');
    console.log('   2. Configure the build process');
    console.log('   3. Set up proper domain names');
    console.log('   4. Configure SSL certificates');

  } catch (error) {
    console.error('\n❌ Deployment failed:', error);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run deployment
deploySleepPlusAdmin();