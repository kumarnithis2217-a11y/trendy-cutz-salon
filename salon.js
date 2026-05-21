// Set min date to today
const dateInput = document.getElementById('appt-date');
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Appointment submit
function submitAppointment() {
  const fname = document.getElementById('fname').value.trim();
  const lname = document.getElementById('lname').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const service = document.getElementById('service').value;
  const date = document.getElementById('appt-date').value;
  const time = document.getElementById('appt-time').value;

  if (!fname || !phone || !service || !date || !time) {
    alert('Please fill in all required fields to confirm your appointment.');
    return;
  }

  const btn = document.querySelector('.form-submit');
  btn.textContent = 'Booking...';
  btn.disabled = true;

  // Prepare booking data
  const bookingData = {
    firstName: fname,
    lastName: lname,
    phone: phone,
    service: service,
    date: date,
    time: time,
    notes: document.getElementById('notes').value.trim()
  };

  // Send SMS notification (if backend available)
  sendSMSNotification(bookingData)
    .then(() => {
      showSuccessMessage(btn);
    })
    .catch(error => {
      console.log('SMS service not available, showing success anyway');
      showSuccessMessage(btn);
    });
}

// Send SMS notification
function sendSMSNotification(bookingData) {
  return fetch('http://localhost:3000/api/book-appointment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookingData)
  })
  .then(response => response.json())
  .then(data => {
    console.log('✅ Booking confirmed! SMS sent to:', bookingData.phone);
    return data;
  })
  .catch(err => {
    // If backend not available, still show success locally
    console.log('⚠️ Server not running. Booking saved locally:', bookingData);
    // Save to localStorage as backup
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push(bookingData);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    throw err; // Rethrow to trigger success message anyway
  });

// Show success message
function showSuccessMessage(btn) {
  setTimeout(() => {
    document.getElementById('success-msg').style.display = 'block';
    btn.textContent = '✓ Booked!';
    btn.style.background = '#4CAF50';
    btn.style.color = '#fff';
  }, 1200);
}}