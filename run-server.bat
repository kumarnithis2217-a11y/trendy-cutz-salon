@echo off
REM ============================================
REM Trendy Cutzz Salon - Server Startup Script
REM ============================================

echo.
echo ====================================================
echo   Trendy Cutzz Salon - Booking Server
echo ====================================================
echo.

REM Set your Twilio credentials here (optional)
REM Once set, real SMS will be sent!

REM If you have Twilio credentials, add them here:
REM set TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
REM set TWILIO_AUTH_TOKEN=your_auth_token_here
REM set TWILIO_PHONE=+1234567890

echo Starting server...
echo.
echo 🌐 Website: Open salon.html in browser (keep this terminal open)
echo.

npm start

pause
