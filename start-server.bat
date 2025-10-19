@echo off
echo ========================================
echo   Rubik's Cube 3D - Local Server
echo ========================================
echo.
echo Starting local web server...
echo.
echo The cube will be available at:
echo   http://localhost:8000/rubikscube.html
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

python -m http.server 8000

