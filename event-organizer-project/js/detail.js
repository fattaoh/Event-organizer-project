// === DETAIL.JS - SCRIPT UNTUK EVENT-DETAIL.HTML ===

document.addEventListener('DOMContentLoaded', function() {
    loadEventDetail();
});

// Memuat detail event berdasarkan ID dari URL
function loadEventDetail() {
    // Ambil ID dari URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('id');

    if (!eventId) {
        showError('Event tidak ditemukan');
        return;
    }

    // Ambil data event dari localStorage
    const event = StorageManager.getEventById(eventId);

    if (!event) {
        showError('Event tidak ditemukan');
        return;
    }

    // Tampilkan detail event
    displayEventDetail(event);
}

// Menampilkan detail event ke halaman
function displayEventDetail(event) {
    const heroSection = document.getElementById('detailHero');
    const contentSection = document.getElementById('detailContent');

    // Set background hero image
    if (heroSection) {
        heroSection.style.backgroundImage = `url('${event.image || 'https://via.placeholder.com/1200x400/5D4037/FFFFFF?text=Event+Image'}')`;
        heroSection.style.backgroundSize = 'cover';
        heroSection.style.backgroundPosition = 'center';
    }

    // Isi konten detail
    if (contentSection) {
        contentSection.innerHTML = `
            <div class="detail-header">
                <span class="event-category">${event.category}</span>
                <h1 class="detail-title">${event.title}</h1>
            </div>

            <div class="detail-meta">
                <div class="meta-item">
                    <span style="font-size: 1.5rem;">📅</span>
                    <div>
                        <strong>Tanggal</strong><br>
                        ${formatDate(event.date)}
                    </div>
                </div>
                <div class="meta-item">
                    <span style="font-size: 1.5rem;">📍</span>
                    <div>
                        <strong>Lokasi</strong><br>
                        ${event.location}
                    </div>
                </div>
                <div class="meta-item">
                    <span style="font-size: 1.5rem;">💰</span>
                    <div>
                        <strong>Harga</strong><br>
                        Rp ${formatPrice(event.price)}
                    </div>
                </div>
            </div>

            <div class="detail-description">
                <h3 style="margin-bottom: 1rem; color: var(--coffee-dark);">Tentang Event</h3>
                <p>${event.description}</p>
            </div>

            <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                <button onclick="addToFavorite(${event.id})" class="btn-favorite">
                    ⭐ Tambah ke Favorit
                </button>
                <a href="event-list.html" class="btn-secondary">
                    ← Kembali ke Daftar Event
                </a>
            </div>
        `;
    }
}

// Fungsi untuk menampilkan error
function showError(message) {
    const contentSection = document.getElementById('detailContent');
    
    if (contentSection) {
        contentSection.innerHTML = `
            <div class="empty-state">
                <h3>❌ ${message}</h3>
                <p>Silakan kembali ke halaman utama</p>
                <a href="index.html" class="btn-primary" style="margin-top: 1rem; display: inline-block;">
                    Kembali ke Home
                </a>
            </div>
        `;
    }
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

// Fungsi untuk menambahkan ke favorit (dummy)
function addToFavorite(eventId) {
    alert('Event berhasil ditambahkan ke favorit! 🎉\n(Fitur ini adalah demo)');
    
    // Anda bisa mengembangkan fitur ini dengan localStorage terpisah
    // Contoh: localStorage.setItem('favorites', JSON.stringify([...favorites, eventId]));
}