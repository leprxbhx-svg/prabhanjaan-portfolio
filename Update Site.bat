@echo off
title Update Prabhanjaan Portfolio
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo Error: Node.js is not installed. Get it from https://nodejs.org
  pause
  exit /b 1
)

echo [1/3] Building...
call npm run build
if errorlevel 1 (
  echo Build failed. See errors above.
  pause
  exit /b 1
)

set TMPDEPLOY=%TEMP%\prabhanjaan-deploy
if exist "%TMPDEPLOY%" rmdir /s /q "%TMPDEPLOY%"
mkdir "%TMPDEPLOY%" >nul 2>&1
xcopy "dist\*" "%TMPDEPLOY%" /e /i /y /q >nul

echo [2/3] Preparing deploy branch...
git -C "%TMPDEPLOY%" init -b gh-pages >nul 2>&1
git -C "%TMPDEPLOY%" config user.name "Prabhanjaan"
git -C "%TMPDEPLOY%" config user.email "prabhanjaan@users.noreply.github.com"
git -C "%TMPDEPLOY%" add -A >nul
git -C "%TMPDEPLOY%" commit -m "deploy %date% %time%" >nul

echo [3/3] Uploading to GitHub Pages...
git -C "%TMPDEPLOY%" push -f https://github.com/leprxbhx-svg/prabhanjaan-portfolio.git gh-pages
if errorlevel 1 (
  echo.
  echo Push failed. Your GitHub login may need re-approval (a window may pop up - approve it), then run this file again.
  pause
  exit /b 1
)

del /s /q "%TMPDEPLOY%" >nul 2>&1
rmdir /s /q "%TMPDEPLOY%" >nul 2>&1

echo.
echo ============================================================
echo  Site updated! Live at:
echo    https://leprxbhx-svg.github.io/prabhanjaan-portfolio/
echo  (allow a moment for it to refresh - Pages takes ~1 min)
echo ============================================================
pause