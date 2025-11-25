// === DASHBOARD.JS - SCRIPT UNTUK DASHBOARD.HTML ===

document.addEventListener('DOMContentLoaded', function() {
    loadDashboard();
});

// Memuat semua data dashboard
function loadDashboard() {
    const events = StorageManager.getEvents();
    
    // Update statistik
    updateStatistics(events);
    
    // Tampilkan events
    displayDashboardEvents(events);
}

// Update statistik di dashboard
function updateStatistics(events) {
    const totalEventsEl = document.getElementById('totalEvents');
    const totalCategoriesEl = document.getElementById('totalCategories');
    
    if (totalEventsEl) {
        totalEventsEl.textContent = events.length;
    }
    
    if (totalCategoriesEl) {
        const categories = StorageManager.getCategories();
        totalCategoriesEl.textContent = categories.length;
    }
}

// Menampilkan events di dashboard
function displayDashboardEvents(events) {
    const container = document.getElementById('dashboardEvents');
    const emptyState = document.getElementById('emptyState');
    
    if (!container) return;

    if (events.length === 0) {
        container.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';
    container.innerHTML = events.map(event => createDashboardCard(event)).join('');
}

// Membuat card event untuk dashboard dengan tombol aksi
function createDashboardCard(event) {
    return `
        <div class="event-card">
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
                
                <div class="event-actions">
                    <a href="event-detail.html?id=${event.id}" class="btn-detail">
                        👁️ Detail
                    </a>
                    <button onclick="editEvent(${event.id})" class="btn-edit">
                        ✏️ Edit
                    </button>
                    <button onclick="deleteEvent(${event.id})" class="btn-delete">
                        🗑️ Hapus
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Format tanggal
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', options);
}

// Format harga
function formatPrice(price) {
    return parseInt(price).toLocaleString('id-ID');
}

// Fungsi untuk edit event
function editEvent(id) {
    window.location.href = `event-form.html?id=${id}`;
}

// Fungsi untuk hapus event
function deleteEvent(id) {
    const event = StorageManager.getEventById(id);
    
    if (!event) {
        alert('Event tidak ditemukan!');
        return;
    }

    // Konfirmasi penghapusan
    const confirmDelete = confirm(
        `⚠️ Apakah Anda yakin ingin menghapus event:\n\n"${event.title}"\n\nTindakan ini tidak dapat dibatalkan!`
    );

    if (confirmDelete) {
        try {
            StorageManager.deleteEvent(id);
            alert('✅ Event berhasil dihapus!');
            
            // Reload dashboard
            loadDashboard();
        } catch (error) {
            alert('❌ Gagal menghapus event: ' + error.message);
        }
    }
}