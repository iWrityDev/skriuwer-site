$env:PATH = 'C:\Program Files\nodejs;C:\Users\aukeh\AppData\Roaming\npm;' + $env:PATH
Set-Location (Split-Path $PSScriptRoot)
python scripts/import_google_books.py
