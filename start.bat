@echo off
echo Starting Spacecraft AI Detection System...
echo.

echo Checking if Python dependencies are installed...
cd api
python -c "import fastapi, ultralytics" 2>nul
if errorlevel 1 (
    echo Dependencies not found. Installing...
    cd ..
    call install_python_deps.bat
    cd api
) else (
    echo Dependencies found!
    cd ..
)

echo.
echo Starting Python YOLO backend...
start "YOLO Backend" cmd /k "cd api && python detect.py"

echo.
echo Waiting for backend to start...
timeout /t 8 /nobreak > nul

echo.
echo Starting Next.js frontend...
start "Next.js Frontend" cmd /k "npm run dev"

echo.
echo Both services are starting...
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000 (or 3001/3002)
echo.
echo If the backend fails to start, the frontend will use fallback mode.
echo.
pause 