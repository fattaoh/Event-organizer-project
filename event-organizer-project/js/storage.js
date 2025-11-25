// === LOCAL STORAGE MANAGER ===
// Mengelola semua operasi CRUD dengan localStorage

const StorageManager = {
    // Key untuk localStorage
    EVENTS_KEY: 'coffeeevents_data',

    // Inisialisasi data dummy jika belum ada
    init() {
        if (!this.getEvents().length) {
            const dummyEvents = [
                {
                    id: Date.now(),
                    title: "Coffee Festival 2024",
                    date: "2024-12-15",
                    location: "Jakarta Convention Center",
                    price: "150000",
                    category: "Festival",
                    description: "Festival kopi terbesar di Indonesia dengan berbagai workshop dan kompetisi barista profesional.",
                    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800"
                },
                {
                    id: Date.now() + 1,
                    title: "Latte Art Workshop",
                    date: "2024-12-20",
                    location: "Brew Lab Coffee Studio",
                    price: "250000",
                    category: "Workshop",
                    description: "Belajar seni membuat latte art dari barista berpengalaman internasional.",
                    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800"
                },
                {
                    id: Date.now() + 2,
                    title: "Coffee Tasting Evening",
                    date: "2024-12-25",
                    location: "The Coffee Bean Roastery",
                    price: "100000",
                    category: "Tasting",
                    description: "Rasakan berbagai jenis kopi dari berbagai belahan dunia dalam satu malam.",
                    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800"
                }
            ];
            this.saveEvents(dummyEvents);
        }
    },

    // GET: Ambil semua event
    getEvents() {
        const data = localStorage.getItem(this.EVENTS_KEY);
        return data ? JSON.parse(data) : [];
    },

    // GET BY ID: Ambil event berdasarkan ID
    getEventById(id) {
        const events = this.getEvents();
        return events.find(event => event.id === parseInt(id));
    },

    // SAVE: Simpan array events ke localStorage
    saveEvents(events) {
        localStorage.setItem(this.EVENTS_KEY, JSON.stringify(events));
    },

    // CREATE: Tambah event baru
    addEvent(eventData) {
        const events = this.getEvents();
        const newEvent = {
            id: Date.now(),
            ...eventData
        };
        events.push(newEvent);
        this.saveEvents(events);
        return newEvent;
    },

    // UPDATE: Edit event yang sudah ada
    updateEvent(id, updatedData) {
        const events = this.getEvents();
        const index = events.findIndex(event => event.id === parseInt(id));
        
        if (index !== -1) {
            events[index] = {
                ...events[index],
                ...updatedData,
                id: parseInt(id) // Pastikan ID tidak berubah
            };
            this.saveEvents(events);
            return events[index];
        }
        return null;
    },

    // DELETE: Hapus event
    deleteEvent(id) {
        const events = this.getEvents();
        const filteredEvents = events.filter(event => event.id !== parseInt(id));
        this.saveEvents(filteredEvents);
        return true;
    },

    // SEARCH: Cari event berdasarkan keyword
    searchEvents(keyword) {
        const events = this.getEvents();
        const lowerKeyword = keyword.toLowerCase();
        
        return events.filter(event => 
            event.title.toLowerCase().includes(lowerKeyword) ||
            event.description.toLowerCase().includes(lowerKeyword) ||
            event.location.toLowerCase().includes(lowerKeyword) ||
            event.category.toLowerCase().includes(lowerKeyword)
        );
    },

    // FILTER BY CATEGORY: Filter event berdasarkan kategori
    filterByCategory(category) {
        const events = this.getEvents();
        if (!category || category === 'all') return events;
        return events.filter(event => event.category === category);
    },

    // GET CATEGORIES: Ambil semua kategori unik
    getCategories() {
        const events = this.getEvents();
        const categories = events.map(event => event.category);
        return [...new Set(categories)]; // Hapus duplikat
    },

    // CLEAR ALL: Hapus semua data (untuk testing)
    clearAll() {
        localStorage.removeItem(this.EVENTS_KEY);
    }
};

// Inisialisasi saat halaman dimuat
if (typeof document !== 'undefined') {
    StorageManager.init();
}