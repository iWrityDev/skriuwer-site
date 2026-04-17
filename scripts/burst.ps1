# burst.ps1 - Run once to quickly populate the site with books and blogs
# No emoji, no special chars - plain ASCII only

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
            if ($v) {
                [System.Environment]::SetEnvironmentVariable($k, $v, 'Process')
                Write-Host "[KEY] Loaded $k"
            }
        }
    }
}

Write-Host ""
Write-Host "============================================"
Write-Host "  SKRIUWER BURST RUN - Books + Blogs"
Write-Host "============================================"
Write-Host ""

Set-Location $SITE

# STEP 1: Import books
Write-Host "STEP 1/4: Importing books from Google Books API..."
python "$SCRIPTS\import_google_books.py"
if ($LASTEXITCODE -ne 0) { Write-Host "[WARN] Book import had issues, continuing..." }

Write-Host ""

# STEP 2: Generate 50 blog posts
$anthropicKey = [System.Environment]::GetEnvironmentVariable('ANTHROPIC_API_KEY', 'Process')
if ($anthropicKey) {
    Write-Host "STEP 2/4: Generating 50 blog posts (using claude-3-5-haiku)..."
    python "$SCRIPTS\generate_blog.py" --count 50 --cheap
    if ($LASTEXITCODE -ne 0) { Write-Host "[WARN] Blog generation had issues, continuing..." }
} else {
    Write-Host "STEP 2/4: SKIPPED - no ANTHROPIC_API_KEY found"
}

Write-Host ""

# STEP 3: Build + Deploy
Write-Host "STEP 3/4: Building and deploying site..."
Set-Location $SITE
$vercelCmd = 'C:\Users\aukeh\AppData\Roaming\npm\vercel.cmd'
& $vercelCmd --prod --yes
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Deploy failed"
    exit 1
}

Write-Host ""

# STEP 4: Ping Google
Write-Host "STEP 4/4: Pinging Google to index new pages..."
python "$SCRIPTS\ping_google_index.py" --new-only
Write-Host ""

Write-Host "============================================"
Write-Host "  BURST COMPLETE!"
Write-Host "============================================"
Write-Host ""
Write-Host "Run scripts\schedule_daily.ps1 to set up daily automation."
