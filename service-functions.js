// Additional Service Functions for pelayanan.html
// Add to script.js or include separately

function showCheckinForm() {
  const name = prompt('Nama Penumpang:');
  const flightNo = prompt('No Penerbangan (e.g. GA801):');
  const seat = prompt('Pilih Kursi (e.g. 12A):', 'Auto');
  if (name && flightNo) {
    alert(`✅ Check-in Berhasil!\n\nPenumpang: ${name}\nFlight: ${flightNo}\nKursi: ${seat}\nBoarding Pass siap di Gate 15\nTerima kasih!`);
  }
}

function showBagasiForm() {
  const bagasiCode = prompt('Kode Bagasi (e.g. CGU123456):');
  if (bagasiCode) {
    const status = Math.random() > 0.3 ? 'Tiba di baggage claim' : 'Sedang proses sortir';
    alert(`Bagasi ${bagasiCode}\nStatus: ${status}\nBelt: 3\nEstimated: 10 menit`);
  }
}

function showRefundForm() {
  const ticketNo = prompt('No. Tiket:');
  const reason = prompt('Alasan Refund (delay/cancel/etc):');
  if (ticketNo) {
    const msg = `Refund Request\nTiket: ${ticketNo}\nAlasan: ${reason}\nProses 3-7 hari kerja.`;
    alert(msg + '\n\nAtau kirim WA: 0811-1507070');
    sendToWA(msg);
  }
}

function showLoungeForm() {
  const classType = prompt('Kelas Tiket (Economy/Business/First):');
  const miles = prompt('GarudaMiles (optional):', '0');
  const eligible = classType !== 'Economy' || parseInt(miles) > 50000;
  alert(eligible ? '✅ Eligible Garuda Lounge!\nPriority Pass aktif.' : '❌ Tidak eligible. Upgrade tiket atau gunakan miles.');
}

// Search for pelayanan.html
function initPelayananSearch() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase();
      document.querySelectorAll('.service-item').forEach(item => {
        const keywords = item.dataset.keywords.toLowerCase();
        item.classList.toggle('d-none', !keywords.includes(term));
      });
    });
  }
}

// Complaint form
function showComplaintForm() {
  const name = prompt('Nama Penumpang:');
  const flightNo = prompt('No. Penerbangan:');
  const issue = prompt('Detail Keluhan:');
  if (name && issue) {
    const msg = `Keluhan Garuda\nPenumpang: ${name}\nFlight: ${flightNo || 'N/A'}\nKeluhan: ${issue}`;
    alert('Keluhan tercatat! Tim akan hubungi via WA dalam 24 jam.');
    sendToWA(msg);
  }
}


// My Tickets render
function renderMyTickets() {
  const table = document.getElementById('myTicketsTable');
  if (table) {
    const userTickets = tickets.filter(t => t.phone === localStorage.getItem('userPhone') || true); // Demo all
    table.innerHTML = userTickets.map(t => `
      <tr>
        <td>${t.id}</td>
        <td>${t.issue}</td>
        <td><span class="badge ${t.status === 'completed' ? 'bg-success' : 'bg-warning'}">${t.status}</span></td>
        <td>${t.date}</td>
      </tr>
    `).join('');
  }
}

// Init for pelayanan.html
if (document.getElementById('layananGrid')) {
  initPelayananSearch();
  renderMyTickets();
}

