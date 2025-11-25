// === MAIN.JS - SCRIPT UNTUK INDEX.HTML ===

document.addEventListener('DOMContentLoaded', function() {
    loadFeaturedEvents();
    updateStats();
});

// Update statistik di hero
function updateStats() {
    const events = StorageManager.getEvents();
    const categories = StorageManager.getCategories();
    
    const totalEventsEl = document.getElementById('totalEvents');
    const totalCategoriesEl = document.getElementById('totalCategories');
    
    if (totalEventsEl) {
        totalEventsEl.textContent = events.length;
    }
    
    if (totalCategoriesEl) {
        totalCategoriesEl.textContent = categories.length;
    }
}

// Fungsi untuk memuat event terbaru (maksimal 6 event)
function loadFeaturedEvents() {
    const events = StorageManager.getEvents();
    const featuredContainer = document.getElementById('featuredEvents');
    
    if (!featuredContainer) return;

    // Ambil 6 event terbaru
    const featuredEvents = events.slice(0, 6);

    if (featuredEvents.length === 0) {
        featuredContainer.innerHTML = `
            <div class="empty-state" style="grid-column: 1/-1;">
                <h3>No Events Yet</h3>
                <p>Start by creating your first event!</p>
                <a href="event-form.html" class="btn-primary" style="margin-top: 1.5rem; display: inline-block;">Create Event</a>
            </div>
        `;
        return;
    }

    featuredContainer.innerHTML = featuredEvents.map(event => createEventCard(event)).join('');
}

// Fungsi untuk membuat HTML card event modern
function createEventCard(event) {
    return `
        <div class="event-card-modern" onclick="goToDetail(${event.id})">
            <img src="${event.image || 'https://via.placeholder.com/600x400/5D4037/FFFFFF?text=Event+Image'}" 
                 alt="${event.title}" 
                 class="event-image-modern"
                 onerror="this.src='https://via.placeholder.com/600x400/5D4037/FFFFFF?text=Event+Image'">
            <div class="event-content-modern">
                <span class="event-category-modern">${event.category}</span>
                <h3 class="event-title-modern">${event.title}</h3>
                <div class="event-meta-modern">
                    <div class="meta-item-modern">
                        <span>📅</span>
                        <span>${formatDate(event.date)}</span>
                    </div>
                    <div class="meta-item-modern">
                        <span>📍</span>
                        <span>${event.location}</span>
                    </div>
                </div>
                <div class="event-price-modern">Rp ${formatPrice(event.price)}</div>
                <a href="event-detail.html?id=${event.id}" class="btn-view-modern" onclick="event.stopPropagation()">
                    View Details →
                </a>
            </div>
        </div>
    `;
}

// Fungsi untuk format tanggal
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
}

// Fungsi untuk format harga
function formatPrice(price) {
    return parseInt(price).toLocaleString('id-ID');
}

// Fungsi untuk navigasi ke detail
function goToDetail(id) {
    window.location.href = `event-detail.html?id=${id}`;
}