# 🏪 Trendy Cutzz Salon - Booking System

## Setup Instructions

### 1. Install Node.js
Download and install Node.js from https://nodejs.org/ (LTS version recommended)

### 2. Install Dependencies
Open PowerShell in the salon folder and run:
```powershell
npm install
```

### 3. Start the Server
```powershell
npm start
```

You should see:
```
✅ Salon Booking Server running on http://localhost:3000
📍 Owner phone: 9042570466
```

### 4. Open the Website
With the server running, open `salon.html` in your browser.

---

## How It Works

### When Someone Books:
1. Customer fills the booking form
2. Clicks "Confirm Appointment"
3. Backend server receives the booking
4. **SMS sent to customer** (their phone number)
5. **SMS sent to owner** (9042570466)

### Current Setup:
- ✅ SMS messages are logged to console (for testing)
- ✅ Bookings saved in memory
- All booking data captured

---

## To Send Real SMS (Next Steps)

### Option 1: Use Twilio (Recommended)
1. Sign up at https://www.twilio.com/
2. Get your Account SID, Auth Token, and Phone Number
3. Install Twilio SDK: `npm install twilio`
4. Update `server.js` with Twilio credentials

### Option 2: Use AWS SNS
1. Set up AWS account
2. Install AWS SDK: `npm install aws-sdk`
3. Configure credentials and update server

### Option 3: Use Indian SMS Gateway
- Shree Operators
- Way2SMS
- Juniper SMS
- Other local providers

---

## File Structure
```
salon.html      - Main website
salon.css       - Styling
salon.js        - Frontend JS (sends bookings to server)
server.js       - Backend (receives bookings, sends SMS)
package.json    - Dependencies
README.md       - This file
```

---

## Testing

### Check Console Logs
1. Start server: `npm start`
2. Open salon.html
3. Fill booking form and submit
4. Check terminal - you'll see SMS messages logged

### View All Bookings
Visit: http://localhost:3000/api/bookings

---

## Troubleshooting

**Q: Server won't start**
- Make sure Node.js is installed: `node --version`
- Check if port 3000 is available
- Run as Administrator

**Q: "Cannot connect to server" error**
- Ensure `npm start` is running in PowerShell
- Keep terminal window open while using website

**Q: SMS not sending**
- SMS is currently just logged to console (for demo)
- To send real SMS, integrate with Twilio/AWS/other provider

---

## Owner Phone: 9042570466
All booking notifications will be sent to this number.

**Made with ❤️ for Trendy Cutzz Salon**
