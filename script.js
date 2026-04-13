// PT Garuda Airlines - Complete JavaScript for Service Info System
// Features: Search/filter, fake tickets/berita (localStorage), forms/WA integration, admin CRUD simulation

// Data
let tickets = JSON.parse(localStorage.getItem('garudaTickets')) || [
  {id:1, customer:'Budi Santoso', phone:'08123456789', issue:'Bagasi hilang', status:'pending', date:'2026-03-27'},
  {id:2, customer:'Siti Nurhaliza', phone:'08198765432', issue:'Flight delay', status:'completed', date:'2026-03-19'},
  {id:3, customer:'Ahmad Fauzi', phone:'08111222333', issue:'Refund request', status:'completed', date:'2026-04-10'},
  {id:4, customer :'ali imron', phone:'08112233444', issue:'Lounge access', status:'completed', date:'2026-04-12'},
];

let berita = JSON.parse(localStorage.getItem('garudaBerita')) || [
  {id:1, title:'GA801 Jakarta-Bali Delay 30 Menit', excerpt:'Akibat cuaca buruk', date:'2026-03-30', img:'https://via.placeholder.com/400x200?text=GA801+Delay'},
  {id:2, title:'Promo Seat Sale Hemat 50%', excerpt:'Booking hingga 31 Januari', date:'2026-03-28', img:'https://via.placeholder.com/400x200?text=Promo+Sale'}
];

// Save functions
function saveTickets() { localStorage.setItem('garudaTickets', JSON.stringify(tickets)); }
function saveBerita() { localStorage.setItem('garudaBerita', JSON.stringify(berita)); }

// Search Layanan
function initSearch() {
  const searchInput = document.getElementById('searchInputLayanan');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase();
      document.querySelectorAll('.service-item').forEach(item => {
        const keywords = item.dataset.keywords.toLowerCase();
        item.classList.toggle('hidden', !keywords.includes(term));
      });
    });
  }
}

// Berita List
function renderBerita() {
  const container = document.getElementById('beritaList');
  if (container) {
    container.innerHTML = berita.slice(0, 4).map(b => `
      <div class="col-md-6 col-lg-3 mb-4">
        <div class="card h-100">
          <img src="${b.img}" class="card-img-top" alt="${b.title}" style="height:200px; object-fit:cover;">
          <div class="card-body">
            <h6 class="card-title">${b.title}</h6>
            <p class="small text-muted">${b.excerpt}</p>
            <small class="text-garuda-blue">${b.date}</small>
          </div>
        </div>
      </div>
    `).join('');
  }
}

function loadMoreBerita() {
  // Simulate more berita
  alert('Berita terbaru sudah ditampilkan!');
}

// Contact Form
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Pesan berhasil dikirim! Tim kami akan hubungi dalam 1x24 jam.');
      form.reset();
    });
  }
}

// Pelayanan Page Functions (for pelayanan.html)
function submitTicket(form) {
  const formData = new FormData(form);
  const ticket = {
    id: Date.now(),
    customer: formData.get('customer'),
    phone: formData.get('phone'),
    issue: formData.get('issue'),
    desc: formData.get('desc'),
    status: 'pending',
    date: new Date().toISOString().split('T')[0]
  };
  tickets.unshift(ticket);
  saveTickets();
  alert(`Ticket #${ticket.id} dibuat! Cek status di My Tickets.`);
  form.reset();
}

// Flight Status (fake)
function checkFlightStatus() {
  const flightNo = document.getElementById('flightNo')?.value;
  if (flightNo) {
    alert(`Flight ${flightNo}: On Time | Gate 15 | Estimated: 14:30`);
  }
}

// WhatsApp Integration (generic number, customize as needed)
function sendToWA(message) {
  window.open(`https://wa.me/628111507070?text=${encodeURIComponent(message)}`);
}

// Admin Functions (for admin.html)
function initAdmin() {
  const pass = sessionStorage.getItem('garudaAdmin');
  if (!pass || pass !== 'garuda2025') {
    const inputPass = prompt('Admin Password Garuda:');
    if (inputPass !== 'garuda2025') {
      alert('❌ Akses Ditolak!');
      window.close();
      return;
    }
    sessionStorage.setItem('garudaAdmin', 'garuda2025');
  }
  updateAdminDashboard();
}

function updateAdminDashboard() {
  document.getElementById('totalTickets').textContent = tickets.length;
  document.getElementById('pendingTickets').textContent = tickets.filter(t => t.status === 'pending').length;
  document.getElementById('totalBerita').textContent = berita.length;
  
  // Tickets Table
  const ticketTable = document.getElementById('ticketTable');
  if (ticketTable) {
    ticketTable.innerHTML = tickets.map(t => `
      <tr>
        <td>${t.customer}</td>
        <td>${t.phone}</td>
        <td>${t.issue}</td>
        <td><span class="badge ${t.status === 'completed' ? 'bg-success' : 'bg-warning'}">${t.status}</span></td>
        <td>${t.date}</td>
        <td>
          <button class="btn btn-sm btn-success" onclick="updateTicketStatus(${t.id}, 'completed')">Selesai</button>
          <button class="btn btn-sm btn-warning" onclick="deleteTicket(${t.id})">Hapus</button>
        </td>
      </tr>
    `).join('');
  }
  
  // Berita Table
  const beritaTable = document.getElementById('beritaTable');
  if (beritaTable) {
    beritaTable.innerHTML = berita.map(b => `
      <tr>
        <td>${b.title}</td>
        <td>${b.date}</td>
        <td>
          <button class="btn btn-sm btn-danger" onclick="deleteBerita(${b.id})">Hapus</button>
        </td>
      </tr>
    `).join('');
  }
}

function updateTicketStatus(id, status) {
  const ticket = tickets.find(t => t.id === id);
  if (ticket) {
    ticket.status = status;
    saveTickets();
    updateAdminDashboard();
  }
}

function deleteTicket(id) {
  if (confirm('Hapus ticket?')) {
    tickets = tickets.filter(t => t.id !== id);
    saveTickets();
    updateAdminDashboard();
  }
}

function addBerita(form) {
  const formData = new FormData(form);
  const newBerita = {
    id: Date.now(),
    title: formData.get('title'),
    excerpt: formData.get('excerpt'),
    date: formData.get('date'),
    img: formData.get('img') || 'https://via.placeholder.com/400x200?text=New+Berita'
  };
  berita.unshift(newBerita);
  saveBerita();
  updateAdminDashboard();
  form.reset();
  document.getElementById('addBeritaForm').style.display = 'none';
}

function deleteBerita(id) {
  if (confirm('Hapus berita?')) {
    berita = berita.filter(b => b.id !== id);
    saveBerita();
    updateAdminDashboard();
  }
}

function showSection(target) {
  document.querySelectorAll('#dashboard, #berita, #tickets').forEach(sec => sec.style.display = 'none');
  document.getElementById(target).style.display = 'block';
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  event.target.classList.add('active');
  document.getElementById('pageTitle').textContent = event.target.textContent.trim();
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  initSearch();
  renderBerita();
  initContactForm();
  
  // Admin check
  if (window.location.pathname.includes('admin.html')) {
    initAdmin();
  }
  
  // Mobile menu
  document.querySelector('.navbar-toggler')?.addEventListener('click', () => {
    // Bootstrap handles
  });
});

