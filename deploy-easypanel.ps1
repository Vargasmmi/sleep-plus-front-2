# Script para hacer deploy en EasyPanel
$EASYPANEL_URL = "http://168.231.92.67:3000"
$API_TOKEN = "c86df06feae92526658731f8fefb0c208bc00ff1d7538c6461a23fe0b9657a58"
$PROJECT_NAME = "sleep-plus-front-2"

Write-Host "🚀 Iniciando deploy forzado en EasyPanel..." -ForegroundColor Green

# Deploy del frontend
$frontendBody = @{
    json = @{
        projectName = $PROJECT_NAME
        serviceName = "frontend"
        forceRebuild = $true
    }
} | ConvertTo-Json -Depth 3

try {
    $response = Invoke-WebRequest -Uri "$EASYPANEL_URL/api/trpc/services.app.deployService" `
        -Method POST `
        -Headers @{
            "Authorization" = "Bearer $API_TOKEN"
            "Content-Type" = "application/json"
        } `
        -Body $frontendBody

    Write-Host "✅ Deploy del frontend iniciado exitosamente" -ForegroundColor Green
    Write-Host "Respuesta: $($response.Content)" -ForegroundColor Yellow
} catch {
    Write-Host "❌ Error en deploy del frontend: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "📋 Verificando estado del proyecto..." -ForegroundColor Blue

# Verificar estado del proyecto
try {
    $statusResponse = Invoke-WebRequest -Uri "$EASYPANEL_URL/api/trpc/projects.getProject" `
        -Method POST `
        -Headers @{
            "Authorization" = "Bearer $API_TOKEN"
            "Content-Type" = "application/json"
        } `
        -Body "{`"json`":{`"name`":`"$PROJECT_NAME`"}}"

    Write-Host "✅ Estado del proyecto obtenido" -ForegroundColor Green
    Write-Host "Respuesta: $($statusResponse.Content)" -ForegroundColor Yellow
} catch {
    Write-Host "❌ Error obteniendo estado: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "🎯 Deploy completado. Revisa EasyPanel para ver el progreso." -ForegroundColor Green 