# Script simple para deploy en EasyPanel
$EASYPANEL_URL = "http://168.231.92.67:3000"
$API_TOKEN = "c86df06feae92526658731f8fefb0c208bc00ff1d7538c6461a23fe0b9657a58"
$PROJECT_NAME = "sleep-plus-front-2"

Write-Host "Iniciando deploy forzado en EasyPanel..." -ForegroundColor Green

# Deploy del frontend
$body = '{"json":{"projectName":"sleep-plus-front-2","serviceName":"frontend","forceRebuild":true}}'

try {
    $response = Invoke-WebRequest -Uri "$EASYPANEL_URL/api/trpc/services.app.deployService" -Method POST -Headers @{"Authorization"="Bearer $API_TOKEN"; "Content-Type"="application/json"} -Body $body
    Write-Host "Deploy del frontend iniciado exitosamente" -ForegroundColor Green
    Write-Host "Respuesta: $($response.Content)" -ForegroundColor Yellow
} catch {
    Write-Host "Error en deploy del frontend: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "Deploy completado. Revisa EasyPanel para ver el progreso." -ForegroundColor Green 