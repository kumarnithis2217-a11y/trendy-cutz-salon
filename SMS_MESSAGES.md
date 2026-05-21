# 📱 SMS Notifications Explained

Your salon booking system sends **2 SMS messages** automatically:

---

## Message 1️⃣ - TO CUSTOMER

**Recipient:** Customer's phone number (from booking form)

**Message Content:**
```
Hello [First Name], your appointment at Trendy Cutzz is confirmed for 
[Date] at [Time]. Service: [Service Name]. Call +91 75503 21706 to 
reschedule. Thank you!
```

**Example:**
```
Hello Karthik, your appointment at Trendy Cutzz is confirmed for 
2026-05-15 at 05:00 PM. Service: Hair Cut. Call +91 75503 21706 to 
reschedule. Thank you!
```

---

## Message 2️⃣ - TO SALON OWNER ⭐

**Recipient:** **+9175503 21706** (Salon Owner)

**Message Content:**
```
🎉 NEW BOOKING! 
Customer: [First Name] [Last Name]
Phone: [Customer Phone]
Service: [Service Name]
Date & Time: [Date] at [Time]
Notes: [Special Requests or None]
Booked at: [Booking DateTime]
```

**Example:**
```
🎉 NEW BOOKING! 
Customer: Karthik Kumar
Phone: +91 8531904004
Service: Hair Cut
Date & Time: 2026-05-15 at 05:00 PM
Notes: Please use organic products
Booked at: 2026-05-10 02:30 PM
```

---

## 🔄 How It Works

```
Customer Books Appointment
    ↓
Form Submitted to Server (localhost:3000)
    ↓
Server Validates & Stores Booking
    ↓
SMS Message 1 → Customer Phone ✅
    ↓
SMS Message 2 → Owner Phone (9042570466) ✅
    ↓
Success Message Shown to Customer
```

---

## ⚙️ Current Status

- **Status:** Demo Mode (messages logged to console)
- **Owner Phone:** +91 9042570466
- **To Enable Real SMS:** Follow TWILIO_SETUP.md

When you setup Twilio, these SMS messages will be sent automatically and the salon owner will instantly know about new bookings! 🎉

---

## 📲 Demo Mode Output

When you test in demo mode, the terminal will show:

```
============================================================
📨 SMS MESSAGE 1 - TO CUSTOMER (91XXXXXXXX):
============================================================
Hello [Name], your appointment...

============================================================
📨 SMS MESSAGE 2 - TO SALON OWNER (919042570466):
============================================================
🎉 NEW BOOKING! 
Customer: [Name]
...
============================================================
```

This shows exactly what the owner will receive once SMS is enabled! 📱
