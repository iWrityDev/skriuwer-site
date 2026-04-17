$vars = [System.Environment]::GetEnvironmentVariables('User')
foreach ($k in $vars.Keys) {
    if ($k -match 'ANTHROPIC|KEY|API|CLAUDE') {
        Write-Host "$k = $($vars[$k])"
    }
}
Write-Host "---"
# Also check claude config
$claudeConfig = "$env:APPDATA\Claude\claude_desktop_config.json"
if (Test-Path $claudeConfig) {
    Write-Host "Found: $claudeConfig"
    Get-Content $claudeConfig
}
