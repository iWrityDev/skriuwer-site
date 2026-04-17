# daily.ps1 - Runs every day via Windows Task Scheduler
# Generates 3 new blog posts + refreshes book catalogue + deploys

$env:PATH = 'C:\Program Files\nodejs;C:\Users\aukeh\AppData\Roaming\npm;' + $env:PATH
$SITE = 'C:\Users\aukeh\skriuwer-site'
$SCRIPTS = 'C:\Users\aukeh\skriuwer-site\scripts'

# Load API keys from secrets.env
$secretsFile = Join-Path $SCRIPTS 'secrets.env'
if (Test-Path $secretsFile) {
    Get-Content $secretsFile | ForEach-Object {
        $line = $_.Trim()
        if ($line -and -not $line.StartsWith('#') -and $line.Contains('=')) {
            $parts = $line.Split('=', 2)
            $k = $parts[0].Trim()
            $v = $parts[1].Trim()
            if ($v) { [System.Environment]::SetEnvironmentVariable($k, $v, 'Process') }
        }
    }
}

$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
Write-Host "[$timestamp] Starting daily Skriuwer update..."

Set-Location $SITE

Write-Host "[1/4] Importing new books..."
python "$SCRIPTS\import_google_books.py"

$anthropicKey = [System.Environment]::GetEnvironmentVariable('ANTHROPIC_API_KEY', 'Process')
if ($anthropicKey) {
    Write-Host "[2/4] Generating 5 new blog posts..."
    python "$SCRIPTS\generate_blog.py" --count 5 --cheap
} else {
    Write-Host "[2/4] Skipping blog generation (no API key)"
}

Write-Host "[3/4] Deploying to Vercel..."
$vercelCmd = 'C:\Users\aukeh\AppData\Roaming\npm\vercel.cmd'
& $vercelCmd --prod --yes

Write-Host "[4/4] Pinging Google Indexing API..."
python "$SCRIPTS\ping_google_index.py" --new-only

Write-Host "[$timestamp] Daily update complete."
