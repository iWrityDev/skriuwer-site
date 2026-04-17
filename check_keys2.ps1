# Check common locations for Anthropic API key
$locations = @(
    "$env:USERPROFILE\.anthropic\api_key",
    "$env:USERPROFILE\.env",
    "$env:APPDATA\anthropic\api_key.txt",
    "C:\Users\aukeh\skriuwer-site\.env.local",
    "C:\Users\aukeh\.config\anthropic"
)
foreach ($loc in $locations) {
    if (Test-Path $loc) {
        Write-Host "Found: $loc"
        Get-Content $loc | Select-Object -First 3
    }
}

# Check if python can find it
$pyResult = python -c "import os; key = os.environ.get('ANTHROPIC_API_KEY', 'NOT SET'); print('ANTHROPIC_API_KEY:', key[:20] + '...' if key != 'NOT SET' else 'NOT SET')" 2>&1
Write-Host $pyResult
