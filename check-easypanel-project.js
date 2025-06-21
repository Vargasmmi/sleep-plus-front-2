#!/usr/bin/env node

// Check EasyPanel project status
const { EasyPanelClient } = require('./easypanel-integration.js');

const client = new EasyPanelClient();

async function checkTelegramCRMProject() {
  console.log('🔍 Checking Telegram CRM Millonario project...\n');
  
  try {
    // 1. List all projects to find telegram-crm-millonario
    console.log('📋 Fetching projects list...');
    const projectsResponse = await fetch(`${client.baseUrl}/api/trpc/projects.listProjects`, {
      method: 'GET',
      headers: client.headers
    });
    
    const projects = await projectsResponse.json();
    console.log('Projects response:', JSON.stringify(projects, null, 2));
    
    // Handle different response formats
    const projectList = projects.result?.data?.json || projects.result?.data || projects.data || projects || [];
    const projectArray = Array.isArray(projectList) ? projectList : [];
    
    console.log(`Found ${projectArray.length} projects`);
    
    // Find telegram CRM project
    const telegramProject = projectArray.find(p => 
      p.name?.toLowerCase().includes('telegram') || 
      p.name?.toLowerCase().includes('crm')
    );
    
    if (!telegramProject) {
      console.log('❌ Telegram CRM Millonario project not found');
      console.log('Available projects:', projectArray.map(p => p.name || p));
      return;
    }
    
    const projectName = telegramProject.name;
    console.log(`✅ Found project: ${projectName}`);
    
    // 2. Get project details
    console.log('\n📊 Fetching project details...');
    const projectDetailsResponse = await fetch(
      `${client.baseUrl}/api/trpc/projects.inspectProject?input=${encodeURIComponent(JSON.stringify({json:{projectName}}))}`,
      {
        method: 'GET',
        headers: client.headers
      }
    );
    
    const projectDetails = await projectDetailsResponse.json();
    console.log('Project details:', JSON.stringify(projectDetails.result?.data, null, 2));
    
    // 3. Get services
    console.log('\n🔧 Fetching services...');
    const servicesResponse = await fetch(
      `${client.baseUrl}/api/trpc/projects.getDockerServices?input=${encodeURIComponent(JSON.stringify({json:{projectName}}))}`,
      {
        method: 'GET',
        headers: client.headers
      }
    );
    
    const services = await servicesResponse.json();
    console.log('Services found:', services.result?.data?.length || 0);
    
    // 4. Check each service
    for (const service of (services.result?.data || [])) {
      console.log(`\n--- Service: ${service.name} ---`);
      console.log(`Type: ${service.type}`);
      console.log(`Status: ${service.status}`);
      
      // Get service error if any
      const errorResponse = await fetch(
        `${client.baseUrl}/api/trpc/services.common.getServiceError?input=${encodeURIComponent(JSON.stringify({
          json: {
            projectName,
            serviceName: service.name
          }
        }))}`,
        {
          method: 'GET', 
          headers: client.headers
        }
      );
      
      const error = await errorResponse.json();
      if (error.result?.data) {
        console.log('❌ ERROR:', error.result.data);
      }
      
      // Get service-specific details based on type
      if (service.type === 'app') {
        const appResponse = await fetch(
          `${client.baseUrl}/api/trpc/services.app.inspectService?input=${encodeURIComponent(JSON.stringify({
            json: {
              projectName,
              serviceName: service.name
            }
          }))}`,
          {
            method: 'GET',
            headers: client.headers
          }
        );
        
        const appDetails = await appResponse.json();
        console.log('App details:', JSON.stringify(appDetails.result?.data, null, 2));
      }
    }
    
    // 5. Get actions/logs
    console.log('\n📜 Fetching recent actions...');
    const actionsResponse = await fetch(
      `${client.baseUrl}/api/trpc/actions.listActions?input=${encodeURIComponent(JSON.stringify({
        json: {
          projectName,
          limit: 10
        }
      }))}`,
      {
        method: 'GET',
        headers: client.headers
      }
    );
    
    const actions = await actionsResponse.json();
    console.log('Recent actions:', actions.result?.data?.length || 0);
    
    for (const action of (actions.result?.data || [])) {
      console.log(`\n[${action.createdAt}] ${action.type} - ${action.status}`);
      if (action.error) {
        console.log('Error:', action.error);
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
    console.error(error.stack);
  }
}

// Run check
checkTelegramCRMProject();