const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());

// SMS Configuration - Using Twilio or other SMS service
// For Twilio: npm install twilio
// Set environment variables or update here
const TWILIO_ENABLED = process.env.TWILIO_ACCOUNT_SID ? true : false;
let twilio;

if (TWILIO_ENABLED) {
  twilio = require('twilio');
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  twilio = require('twilio')(accountSid, authToken);
}

const OWNER_PHONE = '+919042570466'; // Owner's number with country code
const TWILIO_PHONE = process.env.TWILIO_PHONE || '+1234567890'; // Your Twilio number

// In-memory store for demo (replace with database for production)
const bookings = [];

app.post('/api/book-appointment', async (req, res) => {
  const { firstName, lastName, phone, service, date, time, notes } = req.body;

  // Validate input
  if (!firstName || !phone || !service || !date || !time) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Format phone number
  const formattedPhone = formatPhoneNumber(phone);

  // Create booking object
  const booking = {
    id: Date.now(),
    firstName,
    lastName,
    phone: formattedPhone,
    service,
    date,
    time,
    notes,
    bookedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
  };

  // Store booking
  bookings.push(booking);

  console.log('\n✅ New Booking:', booking);

  try {
    // Send SMS notifications
    await sendBookingConfirmation(booking);
    
    res.json({
      success: true,
      message: 'Appointment booked successfully! SMS confirmation sent.',
      booking: booking
    });
  } catch (error) {
    console.error('Error sending SMS:', error);
    res.json({
      success: true,
      message: 'Booking saved. SMS service unavailable, but we have your details!',
      booking: booking
    });
  }
});

// Function to send SMS
async function sendBookingConfirmation(booking) {
  const customerMessage = `Hello ${booking.firstName}, your appointment at Trendy Cutzz is confirmed for ${booking.date} at ${booking.time}. Service: ${booking.service}. Call +91 75503 21706 to reschedule. Thank you!`;
  
  // Detailed message for owner
  const ownerMessage = `🎉 NEW BOOKING! 
Customer: ${booking.firstName} ${booking.lastName}
Phone: ${booking.phone}
Service: ${booking.service}
Date & Time: ${booking.date} at ${booking.time}
Notes: ${booking.notes || 'None'}
Booked at: ${booking.bookedAt}`;

  if (TWILIO_ENABLED) {
    try {
      // Send to customer
      await twilio.messages.create({
        body: customerMessage,
        from: TWILIO_PHONE,
        to: booking.phone
      });
      console.log(`✅ SMS sent to Customer: ${booking.phone}`);

      // Send to owner
      await twilio.messages.create({
        body: ownerMessage,
        from: TWILIO_PHONE,
        to: OWNER_PHONE
      });
      console.log(`✅ SMS sent to Owner: ${OWNER_PHONE}`);
    } catch (error) {
      console.error('Twilio SMS Error:', error);
      throw error;
    }
  } else {
    // Demo mode - show what would be sent
    console.log(`\n${'='.repeat(60)}`);
    console.log(`📨 SMS MESSAGE 1 - TO CUSTOMER (${booking.phone}):`);
    console.log(`${'='.repeat(60)}`);
    console.log(`${customerMessage}`);
    console.log(`\n${'='.repeat(60)}`);
    console.log(`📨 SMS MESSAGE 2 - TO SALON OWNER (${OWNER_PHONE}):`);
    console.log(`${'='.repeat(60)}`);
    console.log(`${ownerMessage}`);
    console.log(`${'='.repeat(60)}`);
    console.log('\n⚠️  SMS not actually sent - Twilio not configured');
    console.log('📖 To enable real SMS, see TWILIO_SETUP.md\n');
  }
}

// Helper function to format phone number
function formatPhoneNumber(phone) {
  // Remove any non-digit characters
  let cleaned = phone.replace(/\D/g, '');
  
  // If it's 10 digits (India), add country code
  if (cleaned.length === 10) {
    cleaned = '91' + cleaned;
  }
  
  // Add + prefix
  return '+' + cleaned;
}

// Get all bookings (Admin endpoint)
app.get('/api/bookings', (req, res) => {
  res.json({ 
    bookings: bookings,
    total: bookings.length
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n${'='.repeat(50)}`);
  console.log(`✅ Trendy Cutzz Salon Booking Server`);
  console.log(`${'='.repeat(50)}`);
  console.log(`🌐 Server running on http://localhost:${PORT}`);
  console.log(`📍 Owner phone: ${OWNER_PHONE}`);
  console.log(`${'='.repeat(50)}`);
  
  if (TWILIO_ENABLED) {
    console.log('✅ SMS Service: TWILIO - ENABLED');
    console.log(`📱 Sending from: ${TWILIO_PHONE}`);
  } else {
    console.log('⚠️  SMS Service: DEMO MODE (console logging only)');
    console.log('📖 To enable real SMS, see TWILIO_SETUP.md');
  }
  
  console.log(`${'='.repeat(50)}\n`);
  console.log(`API Endpoints:`);
  console.log(`  POST http://localhost:${PORT}/api/book-appointment`);
  console.log(`  GET  http://localhost:${PORT}/api/bookings\n`);
});
