@echo off
title Prabhanjaan Portfolio
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo Error: Node.js is not installed. Get it from https://nodejs.org
  pause
  exit /b 1
)

if not exist "dist\index.html" (
  echo No build found - running npm run build first...
  call npm run build
  if errorlevel 1 (
    echo Build failed. See errors above.
    pause
    exit /b 1
  )
)

start "Prabhanjaan server" /min cmd /c "node serve-dist.js"
timeout /t 2 /nobreak >nul
start "" "http://localhost:4173"
exit /b 0