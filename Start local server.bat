@echo off
cd /d "%~dp0"
set "PORT=%~1"
if "%PORT%"=="" set "PORT=8765"
start "Policy calculator server" /b python -m http.server %PORT% --bind 127.0.0.1
timeout /t 1 /nobreak >nul
start "Policy calculator" "http://127.0.0.1:%PORT%/index.html"
