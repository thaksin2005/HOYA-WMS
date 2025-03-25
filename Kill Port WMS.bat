@echo off
echo Checking for processes running on port 3000...
netstat -ano | findstr :3000

if errorlevel 1 (
    echo No process is using port 3000.
    pause
    exit
)

set /p pid=Enter PID to kill: 
taskkill /PID %pid% /F

if %errorlevel%==0 (
    echo Successfully killed process with PID %pid%.
) else (
    echo Failed to kill process with PID %pid%. Please check permissions or the PID.
)

pause
