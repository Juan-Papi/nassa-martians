@echo off
echo Starting ORLP Development Server...
echo.
echo Opening ORLP - Orbital Recycling Learning Platform
echo Server will start on http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.

REM Try to use live-server if available
where live-server >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Using live-server...
    live-server --port=3000 --open=/index.html
) else (
    echo live-server not found. Trying Python server...
    where python >nul 2>nul
    if %ERRORLEVEL% EQU 0 (
        echo Using Python HTTP server...
        python -m http.server 3000
    ) else (
        echo Python not found. Trying Node.js serve...
        where npx >nul 2>nul
        if %ERRORLEVEL% EQU 0 (
            echo Using npx serve...
            npx serve . -p 3000
        ) else (
            echo No suitable server found. Please open index.html directly in your browser.
            pause
        )
    )
)
