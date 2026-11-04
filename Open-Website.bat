@echo off
title Orchid Creation - Website Launcher
cd /d "%~dp0"
echo ========================================================
echo   ORCHID CREATION - LAUNCHING LOCAL WEBSITE
echo ========================================================
echo.

set "PATH=C:\Users\%USERNAME%\AppData\Local\nodejs;%PATH%"

echo Starting local server and opening website in browser...
start "" "http://localhost:5173"
call npm run dev

if errorlevel 1 (
    echo.
    echo If dev server stopped, trying preview server...
    call npm run preview
)

pause
