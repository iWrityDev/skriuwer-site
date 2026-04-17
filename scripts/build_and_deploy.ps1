# build_and_deploy.ps1 - Build and deploy to Vercel
$env:PATH = 'C:\Program Files\nodejs;C:\Users\aukeh\AppData\Roaming\npm;' + $env:PATH
Set-Location 'C:\Users\aukeh\skriuwer-site'

Write-Host "Building site..."
$buildOut = & 'C:\Program Files\nodejs\npm.cmd' run build 2>&1
$buildOut | Select-Object -Last 20

if ($LASTEXITCODE -ne 0) {
    Write-Host "BUILD FAILED"
    exit 1
}

Write-Host "Deploying to Vercel..."
& 'C:\Users\aukeh\AppData\Roaming\npm\vercel.cmd' --prod --yes
Write-Host "Done."
