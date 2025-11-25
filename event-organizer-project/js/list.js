// === LIST.JS - SCRIPT UNTUK EVENT-LIST.HTML ===

document.addEventListener('DOMContentLoaded', function() {
    loadAllEvents();
    setupSearch();
});

// Memuat semua event
function loadAllEvents() {
    const events = StorageManager.getEvents();
    displayEvents(events);
}

// Menampilkan events ke dalam grid
function displayEvents(events) {
    const container = document.getElementById('eventsList');
    const emptyState = document.getElementById('emptyState');
    
    if (!container) return;

    if (events.length === 0) {
        container.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';
    container.innerHTML = events.map(event => createEventCard(event)).join('');
}

// Membuat HTML card untuk setiap event
function createEventCard(event) {
    return `
        <div class="event-card" onclick="goToDetail(${event.id})">
            <img src="${event.image || 'https://via.placeholder.com/400x250/5D4037/FFFFFF?text=Event+Image'}" 
                 alt="${event.title}" 
                 class="event-image"
                 onerror="this.src='https://via.placeholder.com/400x250/5D4037/FFFFFF?text=Event+Image'">
            <div class="event-content">
                <span class="event-category">${event.category}</span>
                <h3 class="event-title">${event.title}</h3>
                <div class="event-info">
                    <div class="event-info-item">
                        <span>📅</span>
                        <span>${formatDate(event.date)}</span>
                    </div>
                    <div class="event-info-item">
                        <span>📍</span>
                        <span>${event.location}</span>
                    </div>
                </div>
                <div class="event-price">Rp ${formatPrice(event.price)}</div>
                <a href="event-detail.html?id=${event.id}" class="btn-detail" onclick="event.stopPropagation()">
                    Lihat Detail
                </a>
            </div>
        </div>
    `;
}

// Setup pencarian real-time
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    
    if (!searchInput) return;

    searchInput.addEventListener('input', function(e) {
        const keyword = e.target.value.trim();
        
        if (keyword === '') {
            loadAllEvents();
        } else {
            const results = StorageManager.searchEvents(keyword);
            displayEvents(results);
        }
    });
}

// Format tanggal ke bahasa Indonesia
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', options);
}

// Format harga dengan pemisah ribuan
function formatPrice(price) {
    return parseInt(price).toLocaleString('id-ID');
}

// Navigasi ke halaman detail
function goToDetail(id) {
    window.location.href = `event-detail.html?id=${id}`;
}