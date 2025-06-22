# Sleep Plus - Cleanup Duplicate JS Files
# This script removes all .js files that have corresponding .tsx files

$projectPath = "C:\Users\Andybeats\Desktop\Claude Projects\vargas\sleep-plus-new\src"

Write-Host "🧹 Cleaning up duplicate JS files in Sleep Plus project..." -ForegroundColor Yellow
Write-Host "Project path: $projectPath" -ForegroundColor Cyan

# Function to backup and remove JS files if TSX exists
function Remove-JSIfTSXExists {
    param (
        [string]$DirectoryPath
    )
    
    Get-ChildItem -Path $DirectoryPath -Recurse -Include "*.js" | ForEach-Object {
        $jsFile = $_.FullName
        $tsxFile = $jsFile -replace '\.js$', '.tsx'
        $tsFile = $jsFile -replace '\.js$', '.ts'
        
        # Check if corresponding .tsx or .ts file exists
        if ((Test-Path $tsxFile) -or (Test-Path $tsFile)) {
            $backupFile = $jsFile + ".backup"
            
            Write-Host "🔄 Moving $($_.Name) to backup..." -ForegroundColor Green
            Move-Item -Path $jsFile -Destination $backupFile -Force
        }
    }
}

# Clean up main directories
$directories = @(
    "$projectPath\components",
    "$projectPath\pages",
    "$projectPath\hooks", 
    "$projectPath\interfaces",
    "$projectPath\providers",
    "$projectPath\services"
)

foreach ($dir in $directories) {
    if (Test-Path $dir) {
        Write-Host "📁 Cleaning directory: $dir" -ForegroundColor Blue
        Remove-JSIfTSXExists -DirectoryPath $dir
    }
}

# Clean root src files
Write-Host "📁 Cleaning root src files..." -ForegroundColor Blue
Get-ChildItem -Path $projectPath -Filter "*.js" | ForEach-Object {
    $jsFile = $_.FullName
    $tsxFile = $jsFile -replace '\.js$', '.tsx'
    $tsFile = $jsFile -replace '\.js$', '.ts'
    
    if ((Test-Path $tsxFile) -or (Test-Path $tsFile)) {
        $backupFile = $jsFile + ".backup"
        Write-Host "🔄 Moving $($_.Name) to backup..." -ForegroundColor Green
        Move-Item -Path $jsFile -Destination $backupFile -Force
    }
}

Write-Host "✅ Cleanup completed!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Summary of changes:"
Write-Host "- Moved all .js files that have corresponding .tsx/.ts files to .backup"
Write-Host "- This ensures TypeScript files take precedence"
Write-Host "- Original files are preserved as .backup for safety"
Write-Host ""
Write-Host "🚀 Next steps:"
Write-Host "1. Run: npm run dev"
Write-Host "2. Test the application"
Write-Host "3. If everything works, you can delete .backup files"
