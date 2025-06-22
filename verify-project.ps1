# Script de verificación automatizada para Sleep Plus Admin (Windows)
Write-Host "🔍 VERIFICACIÓN AUTOMATIZADA - SLEEP PLUS ADMIN" -ForegroundColor Cyan
Write-Host "==============================================" -ForegroundColor Cyan
Write-Host ""

# Función para verificar archivo
function Test-FileExists {
    param($Path, $Description)
    
    if (Test-Path $Path) {
        Write-Host "✓ $Description" -ForegroundColor Green
        return $true
    } else {
        Write-Host "✗ $Description - No encontrado" -ForegroundColor Red
        return $false
    }
}

# Función para verificar directorio
function Test-DirectoryExists {
    param($Path, $Description)
    
    if (Test-Path $Path -PathType Container) {
        Write-Host "✓ $Description" -ForegroundColor Green
        return $true
    } else {
        Write-Host "✗ $Description - No encontrado" -ForegroundColor Red
        return $false
    }
}

# 1. VERIFICAR ESTRUCTURA BASE
Write-Host "1. ESTRUCTURA DEL PROYECTO" -ForegroundColor Yellow
Write-Host "--------------------------"
Test-FileExists "package.json" "package.json"
Test-FileExists "tsconfig.json" "tsconfig.json"
Test-FileExists "vite.config.ts" "vite.config.ts"
Test-FileExists ".env.development" ".env.development"
Test-FileExists ".env.production" ".env.production"
Test-FileExists "Dockerfile" "Dockerfile"
Test-DirectoryExists "src" "Directorio src/"
Test-DirectoryExists "src\components" "Directorio components/"
Test-DirectoryExists "src\pages" "Directorio pages/"
Test-DirectoryExists "src\providers" "Directorio providers/"
Test-DirectoryExists "src\services" "Directorio services/"
Test-DirectoryExists "src\interfaces" "Directorio interfaces/"
Write-Host ""

# 2. VERIFICAR PROVIDERS
Write-Host "2. PROVIDERS PRINCIPALES" -ForegroundColor Yellow
Write-Host "------------------------"
Test-FileExists "src\providers\authProvider.ts" "authProvider.ts"
Test-FileExists "src\providers\dataProvider.ts" "dataProvider.ts"
Test-FileExists "src\providers\accessControlProvider.ts" "accessControlProvider.ts"
Write-Host ""

# 3. VERIFICAR SERVICIOS
Write-Host "3. SERVICIOS" -ForegroundColor Yellow
Write-Host "------------"
Test-FileExists "src\services\activityLogService.ts" "activityLogService.ts"
Test-FileExists "src\services\stripeService.ts" "stripeService.ts"
Test-FileExists "src\services\shopifyService.ts" "shopifyService.ts"
Test-FileExists "src\services\subscriptionService.ts" "subscriptionService.ts"
Test-FileExists "src\services\webhookService.ts" "webhookService.ts"
Write-Host ""

# 4. VERIFICAR PÁGINAS PRINCIPALES
Write-Host "4. PÁGINAS PRINCIPALES" -ForegroundColor Yellow
Write-Host "----------------------"
Test-FileExists "src\pages\login\index.tsx" "Login"
Test-FileExists "src\pages\dashboard\index.tsx" "Dashboard"
Test-FileExists "src\pages\dashboard\AdminDashboard.tsx" "AdminDashboard"
Test-FileExists "src\pages\dashboard\ManagerDashboard.tsx" "ManagerDashboard"
Test-FileExists "src\pages\dashboard\AgentDashboard.tsx" "AgentDashboard"
Write-Host ""

# 5. VERIFICAR MÓDULOS CRUD
Write-Host "5. MÓDULOS CRUD" -ForegroundColor Yellow
Write-Host "---------------"
$modules = @("customers", "subscriptions", "employees", "stores", "calls", "sales", "campaigns", "commissions", "achievements", "evaluations", "scripts")

foreach ($module in $modules) {
    Write-Host "Verificando $module`:" -ForegroundColor Cyan
    if (Test-Path "src\pages\$module" -PathType Container) {
        $hasAll = $true
        $hasAll = $hasAll -and (Test-Path "src\pages\$module\list.tsx")
        $hasAll = $hasAll -and (Test-Path "src\pages\$module\create.tsx")
        $hasAll = $hasAll -and (Test-Path "src\pages\$module\edit.tsx")
        $hasAll = $hasAll -and (Test-Path "src\pages\$module\show.tsx")
        $hasAll = $hasAll -and (Test-Path "src\pages\$module\index.tsx")
        
        if ($hasAll) {
            Write-Host "  ✓ Módulo completo" -ForegroundColor Green
        } else {
            Write-Host "  ⚠ Módulo incompleto" -ForegroundColor Yellow
        }
    } else {
        Write-Host "  ✗ Módulo no encontrado" -ForegroundColor Red
    }
}
Write-Host ""

# 6. VERIFICAR INTEGRACIONES
Write-Host "6. INTEGRACIONES" -ForegroundColor Yellow
Write-Host "----------------"
Test-FileExists "src\pages\StripeManagement.tsx" "Stripe Management"
Test-DirectoryExists "src\pages\shopify" "Shopify Integration"
Test-DirectoryExists "src\components\stripe" "Stripe Components"
Write-Host ""

# 7. VERIFICAR DEPENDENCIAS
Write-Host "7. DEPENDENCIAS NPM" -ForegroundColor Yellow
Write-Host "-------------------"
if (Test-Path "package.json") {
    $packageJson = Get-Content "package.json" -Raw | ConvertFrom-Json
    $deps = @("@refinedev/core", "@refinedev/antd", "@refinedev/react-router-v6", "antd", "react", "react-dom", "axios", "dayjs")
    
    foreach ($dep in $deps) {
        if ($packageJson.dependencies.PSObject.Properties.Name -contains $dep) {
            Write-Host "✓ $dep" -ForegroundColor Green
        } else {
            Write-Host "✗ $dep - No encontrado" -ForegroundColor Red
        }
    }
}
Write-Host ""

# 8. VERIFICAR VARIABLES DE ENTORNO
Write-Host "8. VARIABLES DE ENTORNO" -ForegroundColor Yellow
Write-Host "-----------------------"
if (Test-Path ".env.production") {
    $envContent = Get-Content ".env.production"
    $apiUrl = $envContent | Where-Object { $_ -match "VITE_API_URL" }
    if ($apiUrl) {
        Write-Host "✓ VITE_API_URL configurada: $apiUrl" -ForegroundColor Green
    } else {
        Write-Host "✗ VITE_API_URL no configurada" -ForegroundColor Red
    }
}
Write-Host ""

# 9. VERIFICAR NODE_MODULES
Write-Host "9. VERIFICACIÓN DE DEPENDENCIAS" -ForegroundColor Yellow
Write-Host "-------------------------------"
if (Test-Path "node_modules") {
    $nodeModulesSize = "{0:N2} MB" -f ((Get-ChildItem "node_modules" -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB)
    Write-Host "✓ node_modules existe ($nodeModulesSize)" -ForegroundColor Green
} else {
    Write-Host "✗ node_modules no encontrado - Ejecuta 'npm install'" -ForegroundColor Red
}
Write-Host ""

# 10. GENERAR REPORTE
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "RESUMEN DE VERIFICACIÓN" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Contar archivos TypeScript
$tsFiles = (Get-ChildItem -Path "src" -Filter "*.tsx" -Recurse).Count
$tsxFiles = (Get-ChildItem -Path "src" -Filter "*.ts" -Recurse).Count
Write-Host "📊 Estadísticas del proyecto:" -ForegroundColor Yellow
Write-Host "   - Archivos TypeScript: $tsFiles"
Write-Host "   - Archivos TSX: $tsxFiles"
Write-Host "   - Total componentes: $($tsFiles + $tsxFiles)"
Write-Host ""

Write-Host "📋 Para una verificación completa manual:" -ForegroundColor Yellow
Write-Host "1. Revisa VERIFICATION_CHECKLIST.md"
Write-Host "2. Prueba el login con cada rol"
Write-Host "3. Verifica permisos y accesos"
Write-Host "4. Prueba todas las funcionalidades CRUD"
Write-Host "5. Verifica integraciones externas"
Write-Host ""

Write-Host "🔧 Comandos útiles:" -ForegroundColor Yellow
Write-Host "  npm install      - Instalar dependencias"
Write-Host "  npm run dev      - Ejecutar en desarrollo"
Write-Host "  npm run build    - Construir para producción"
Write-Host "  npm run preview  - Preview de producción"
Write-Host ""

Write-Host "👤 Usuarios de prueba:" -ForegroundColor Yellow
Write-Host "  Admin:   admin@lamattressstore.com / admin123"
Write-Host "  Manager: john.smith@lamattressstore.com / demo123"
Write-Host "  Agent:   maria.garcia@lamattressstore.com / demo123"
Write-Host ""

# Preguntar si quiere ejecutar npm install
$response = Read-Host "¿Deseas ejecutar 'npm install' ahora? (S/N)"
if ($response -eq 'S' -or $response -eq 's') {
    Write-Host "Ejecutando npm install..." -ForegroundColor Yellow
    npm install
}

# Preguntar si quiere ejecutar el proyecto
$response = Read-Host "¿Deseas ejecutar el proyecto ahora? (S/N)"
if ($response -eq 'S' -or $response -eq 's') {
    Write-Host "Ejecutando npm run dev..." -ForegroundColor Yellow
    npm run dev
}
