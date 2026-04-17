$env:PATH = 'C:\Program Files\nodejs;C:\Users\aukeh\AppData\Roaming\npm;' + $env:PATH
Set-Location (Split-Path $PSScriptRoot)
python -c "import ast, sys; ast.parse(open('scripts/import_google_books.py', encoding='utf-8').read()); print('Syntax OK')"
Write-Host ""
Write-Host "Running dry-run (first query only, will hit rate limit without API key)..."
python scripts/import_google_books.py --dry-run
