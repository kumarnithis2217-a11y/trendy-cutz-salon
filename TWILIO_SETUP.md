# 📱 How to Enable Real SMS Notifications

Your salon website is currently in **DEMO MODE** - SMS messages are logged to console only.

To send **REAL SMS MESSAGES**, follow these steps:

---

## 🚀 Option 1: Twilio (Easiest & Recommended)

### Step 1: Create Twilio Account
1. Go to https://www.twilio.com/
2. Click "Sign Up"
3. Verify your email and phone number
4. Get your **free trial credits** (enough for testing)

### Step 2: Get Your Credentials
1. Go to https://console.twilio.com
2. Copy your:
   - **Account SID** (looks like: ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx)
   - **Auth Token** (hidden by default, click to show)
   - Scroll down and get a **Twilio Phone Number** (looks like: +1234567890)

### Step 3: Install Twilio Package
Open PowerShell in your salon folder and run:
```powershell
npm install twilio
```

### Step 4: Set Environment Variables (Windows PowerShell)

Create a `.env.bat` file in your salon folder with:
```batch
@echo off
set TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
set TWILIO_AUTH_TOKEN=your_auth_token_here
set TWILIO_PHONE=+1234567890
```

Then run it before starting the server:
```powershell
.\.env.bat
npm start
```

**OR** Set them directly in PowerShell:
```powershell
$env:TWILIO_ACCOUNT_SID = "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
$env:TWILIO_AUTH_TOKEN = "your_auth_token_here"
$env:TWILIO_PHONE = "+1234567890"
npm start
```

### Step 5: Test It
1. Open salon.html
2. Book an appointment with your phone number
3. You should receive an SMS! 📱

---

## 📞 Option 2: Indian SMS Gateway (FastSMS, MSG91, etc.)

If you prefer an Indian SMS provider:

### Installation
```powershell
npm install axios
```

### Update server.js
Replace the SMS sending function with:

```javascript
async function sendBookingConfirmation(booking) {
  const customerMessage = `Hello ${booking.firstName}, your appointment at Trendy Cutzz is confirmed for ${booking.date} at ${booking.time}. Service: ${booking.service}. Call +91 75503 21706.`;
  
  const ownerMessage = `New Booking! ${booking.firstName} | ${booking.phone} | ${booking.service}`;

  try {
    // Using MSG91 (replace with your API key)
    const API_KEY = process.env.SMS_API_KEY;
    const ROUTE = '4'; // Transactional SMS
    
    // Send to customer
    await axios.get(`https://api.msg91.com/apiv3/send`, {
      params: {
        authkey: API_KEY,
        mobiles: booking.phone,
        message: customerMessage,
        route: ROUTE,
        sender: 'SALOON'
      }
    });

    // Send to owner
    await axios.get(`https://api.msg91.com/apiv3/send`, {
      params: {
        authkey: API_KEY,
        mobiles: '9042570466',
        message: ownerMessage,
        route: ROUTE,
        sender: 'SALOON'
      }
    });

    console.log('✅ SMS sent successfully!');
  } catch (error) {
    console.error('SMS Error:', error);
  }
}
```

---

## 🔧 Troubleshooting

### SMS Not Sending?
1. Check console for error messages
2. Verify Twilio/SMS API credentials
3. Ensure network connection is active
4. Check if trial credits are available (Twilio)

### Need Help?
- Twilio Docs: https://www.twilio.com/docs/sms
- MSG91 Docs: https://msg91.com/apiv2/
- Check console.log messages for errors

---

## ✅ Current Setup
- **Status:** Demo Mode (console logging)
- **Owner Phone:** +919042570466
- **Server:** http://localhost:3000

Once you add SMS credentials, messages will be sent automatically! 🎉
