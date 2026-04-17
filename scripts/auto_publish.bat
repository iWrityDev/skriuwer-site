@echo off
REM ============================================================
REM auto_publish.bat
REM Full publishing pipeline for skriuwer.com:
REM   1. Generate 3 new blog posts via Claude API
REM   2. Build and deploy the Next.js site to Vercel
REM   3. Ping Google Indexing API for new URLs
REM
REM Prerequisites:
REM   - ANTHROPIC_API_KEY env var set
REM   - GOOGLE_SERVICE_ACCOUNT_JSON env var set (or sitemap fallback)
REM   - deploy.ps1 in repo root
REM   - pip install anthropic google-auth requests
REM ============================================================

echo.
echo ============================================================
echo  STEP 1: Generating 3 new blog posts via Claude API
echo ============================================================
python scripts\generate_blog.py --count 3
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Blog generation failed. Aborting pipeline.
    exit /b %ERRORLEVEL%
)

echo.
echo ============================================================
echo  STEP 2: Building and deploying site to Vercel
echo ============================================================
powershell -ExecutionPolicy Bypass -File deploy.ps1
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Deployment failed. Skipping Google indexing ping.
    exit /b %ERRORLEVEL%
)

echo.
echo ============================================================
echo  STEP 3: Pinging Google Indexing API for new URLs
echo ============================================================
python scripts\ping_google_index.py --new-only
if %ERRORLEVEL% NEQ 0 (
    echo WARNING: Google indexing ping encountered errors.
    echo          Check output above. Site is still deployed.
)

echo.
echo ============================================================
echo  Pipeline complete!
echo ============================================================
