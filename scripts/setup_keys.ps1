# setup_keys.ps1
# Run this once to register API keys as permanent Windows environment variables.
# After running this, all scripts will have access without needing to set them each time.

Write-Host ""
Write-Host "=== Skriuwer.com API Key Setup ===" -ForegroundColor Cyan
Write-Host "Keys will be saved as permanent Windows user environment variables."
Write-Host "Press Enter to skip any key you don't have yet."
Write-Host ""

# --- Anthropic (required for blog generation) ---
$current = [System.Environment]::GetEnvironmentVariable('ANTHROPIC_API_KEY', 'User')
if ($current) {
    Write-Host "[OK] ANTHROPIC_API_KEY is already set (${$current.Substring(0, [Math]::Min(12, $current.Length))}...)" -ForegroundColor Green
    $overwrite = Read-Host "Overwrite? (y/N)"
    if ($overwrite -ne 'y') { goto skip_anthropic }
}
$key = Read-Host "Paste your Anthropic API key (from console.anthropic.com)"
if ($key.Trim()) {
    [System.Environment]::SetEnvironmentVariable('ANTHROPIC_API_KEY', $key.Trim(), 'User')
    Write-Host "[SAVED] ANTHROPIC_API_KEY" -ForegroundColor Green
}
:skip_anthropic

Write-Host ""

# --- Google Books API (optional) ---
$current = [System.Environment]::GetEnvironmentVariable('GOOGLE_BOOKS_API_KEY', 'User')
if ($current) {
    Write-Host "[OK] GOOGLE_BOOKS_API_KEY is already set" -ForegroundColor Green
} else {
    Write-Host "Google Books API key (optional, get free at console.cloud.google.com)"
    Write-Host "  -> Enable 'Books API', create API key, no billing required"
    $key = Read-Host "Paste key (or press Enter to skip)"
    if ($key.Trim()) {
        [System.Environment]::SetEnvironmentVariable('GOOGLE_BOOKS_API_KEY', $key.Trim(), 'User')
        Write-Host "[SAVED] GOOGLE_BOOKS_API_KEY" -ForegroundColor Green
    }
}

Write-Host ""

# --- NYT Books API (optional) ---
$current = [System.Environment]::GetEnvironmentVariable('NYT_BOOKS_API_KEY', 'User')
if ($current) {
    Write-Host "[OK] NYT_BOOKS_API_KEY is already set" -ForegroundColor Green
} else {
    Write-Host "NYT Books API key (optional, get free at developer.nytimes.com)"
    Write-Host "  -> Create app, enable Books API"
    $key = Read-Host "Paste key (or press Enter to skip)"
    if ($key.Trim()) {
        [System.Environment]::SetEnvironmentVariable('NYT_BOOKS_API_KEY', $key.Trim(), 'User')
        Write-Host "[SAVED] NYT_BOOKS_API_KEY" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "=== Done! Open a new terminal window for changes to take effect. ===" -ForegroundColor Cyan
