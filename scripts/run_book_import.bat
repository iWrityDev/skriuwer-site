@echo off
:: ============================================================
:: run_book_import.bat
:: 1. Imports new books from NYT Bestsellers + Google Books
::    APIs into data/books.json
:: 2. Deploys the updated site to Vercel (production)
:: ============================================================

:: ============================================================
::  REQUIRED API KEYS — set these as Windows environment
::  variables (System Properties > Advanced > Environment
::  Variables) or prefix the python call below:
::
::    NYT_BOOKS_API_KEY  — free key from developer.nytimes.com
::                         Used for NYT Bestseller lists.
::                         Without this, NYT import is skipped.
::
::    GOOGLE_BOOKS_API_KEY — free key from
::                         console.cloud.google.com
::                         (enable "Books API")
::                         Without this, limited to ~100 req/day.
::
::  Quick check — are they set?
:: ============================================================

echo ==============================================
echo  API Key Status
echo ==============================================
if defined NYT_BOOKS_API_KEY (
    echo  [OK]  NYT_BOOKS_API_KEY is set
) else (
    echo  [WARN] NYT_BOOKS_API_KEY is NOT set
    echo         Get a free key: https://developer.nytimes.com/
    echo         NYT Bestsellers will be skipped.
)
if defined GOOGLE_BOOKS_API_KEY (
    echo  [OK]  GOOGLE_BOOKS_API_KEY is set
) else (
    echo  [WARN] GOOGLE_BOOKS_API_KEY is NOT set
    echo         Rate-limited to ~100 requests/day.
    echo         Get a free key: https://console.cloud.google.com/
)
echo.

:: Change to the site root regardless of where this .bat is double-clicked from
cd /d "%~dp0\.."

echo ==============================================
echo  Step 1: Importing books (NYT + Google Books)
echo ==============================================

:: Activate Python venv if it exists, otherwise use system Python
if exist "venv\Scripts\activate.bat" (
    call venv\Scripts\activate.bat
) else if exist ".venv\Scripts\activate.bat" (
    call .venv\Scripts\activate.bat
) else (
    echo [INFO] No venv found, using system Python
)

python scripts\import_google_books.py
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Book import failed with exit code %ERRORLEVEL%
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo ==============================================
echo  Step 2: Deploying site to Vercel...
echo ==============================================

powershell -ExecutionPolicy Bypass -File deploy.ps1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Deploy failed with exit code %ERRORLEVEL%
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo ==============================================
echo  Done! Books imported and site deployed.
echo ==============================================
pause
