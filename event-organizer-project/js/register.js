// === REGISTER.JS - SCRIPT UNTUK EVENT-REGISTER.HTML ===

let currentEvent = null;
let pricePerTicket = 0;

document.addEventListener('DOMContentLoaded', function() {
    loadEventInfo();
    setupForm();
    setupTicketCalculator();
});

// Load informasi event dari URL parameter
function loadEventInfo() {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('id');

    if (!eventId) {
        alert('Event tidak ditemukan!');
        window.location.href = 'event-list.html';
        return;
    }

    // Ambil data event
    const event = StorageManager.getEventById(eventId);

    if (!event) {
        alert('Event tidak ditemukan!');
        window.location.href = 'event-list.html';
        return;
    }

    currentEvent = event;
    pricePerTicket = parseInt(event.price);
    displayEventInfo(event);
}

// Tampilkan info event di banner
function displayEventInfo(event) {
    // Update banner
    document.getElementById('eventCategory').textContent = event.category;
    document.getElementById('eventTitle').textContent = event.title;
    document.getElementById('eventDate').textContent = formatDate(event.date);
    document.getElementById('eventLocation').textContent = event.location;
    document.getElementById('eventPrice').textContent = `Rp ${formatPrice(event.price)}`;

    // Update summary
    document.getElementById('pricePerTicket').textContent = `Rp ${formatPrice(event.price)}`;
    updateTotalPrice();
}

// Setup form submission
function setupForm() {
    const form = document.getElementById('registrationForm');
    
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        submitRegistration();
    });
}

// Setup kalkulator tiket
function setupTicketCalculator() {
    const ticketQtyInput = document.getElementById('ticketQty');
    
    if (!ticketQtyInput) return;

    ticketQtyInput.addEventListener('input', function() {
        updateTotalPrice();
    });
}

// Update total harga
function updateTotalPrice() {
    const ticketQty = parseInt(document.getElementById('ticketQty').value) || 1;
    const total = pricePerTicket * ticketQty;

    document.getElementById('totalTickets').textContent = ticketQty;
    document.getElementById('totalPrice').textContent = `Rp ${formatPrice(total)}`;
}

// Validasi form
function validateForm() {
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const ticketQty = parseInt(document.getElementById('ticketQty').value);
    const address = document.getElementById('address').value.trim();

    if (!fullName) {
        alert('❌ Nama lengkap harus diisi!');
        document.getElementById('fullName').focus();
        return false;
    }

    if (!email || !isValidEmail(email)) {
        alert('❌ Email tidak valid!');
        document.getElementById('email').focus();
        return false;
    }

    if (!phone || phone.length < 10) {
        alert('❌ Nomor telepon tidak valid! (minimal 10 digit)');
        document.getElementById('phone').focus();
        return false;
    }

    if (!ticketQty || ticketQty < 1 || ticketQty > 10) {
        alert('❌ Jumlah tiket harus antara 1-10!');
        document.getElementById('ticketQty').focus();
        return false;
    }

    if (!address) {
        alert('❌ Alamat harus diisi!');
        document.getElementById('address').focus();
        return false;
    }

    return true;
}

// Validasi email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Submit pendaftaran
function submitRegistration() {
    const registrationData = {
        eventId: currentEvent.id,
        eventTitle: currentEvent.title,
        fullName: document.getElementById('fullName').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        ticketQty: parseInt(document.getElementById('ticketQty').value),
        address: document.getElementById('address').value.trim(),
        notes: document.getElementById('notes').value.trim(),
        totalPrice: pricePerTicket * parseInt(document.getElementById('ticketQty').value),
        registrationDate: new Date().toISOString(),
        registrationId: Date.now()
    };

    // Simpan ke localStorage
    saveRegistration(registrationData);

    // Tampilkan konfirmasi
    showSuccessModal(registrationData);
}

// Simpan data pendaftaran ke localStorage
function saveRegistration(data) {
    const registrations = getRegistrations();
    registrations.push(data);
    localStorage.setItem('coffeeevents_registrations', JSON.stringify(registrations));
}

// Ambil semua pendaftaran
function getRegistrations() {
    const data = localStorage.getItem('coffeeevents_registrations');
    return data ? JSON.parse(data) : [];
}

// Tampilkan modal sukses
function showSuccessModal(data) {
    const message = `
✅ PENDAFTARAN BERHASIL!

Event: ${data.eventTitle}
Nama: ${data.fullName}
Email: ${data.email}
Jumlah Tiket: ${data.ticketQty}
Total Pembayaran: Rp ${formatPrice(data.totalPrice)}

ID Pendaftaran: #${data.registrationId}

Konfirmasi telah dikirim ke email Anda.
Terima kasih telah mendaftar! 🎉
    `;

    alert(message);
    
    // Redirect ke detail event
    window.location.href = `event-detail.html?id=${data.eventId}`;
}

// Format tanggal
function formatDate(dateString) {
    const options = { 
        weekday: 'long',
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', options);
}

// Format harga
function formatPrice(price) {
    return parseInt(price).toLocaleString('id-ID');
}