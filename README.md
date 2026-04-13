Sistem Informasi Pelayanan PT Garuda Indonesia 🛫

## Fitur Lengkap:
- **Landing Page**: Hero, stats, profil, layanan quick links, berita, kontak
- **Pelayanan.html**: Service grid dengan search, ticket system (localStorage), flight status checker
- **Admin.html**: Dashboard tickets/berita CRUD (password: `garuda2025`)
- **Fully Responsive**: Mobile-first, Bootstrap 5 + custom CSS
- **WhatsApp Integration**: Kirim ticket langsung ke WA
- **Fake Data**: Tickets/berita disimpan localStorage (persist antar session)

## Cara Menjalankan:
1. Buka `index.html` di browser (Chrome/Firefox/Edge)
2. Atau VSCode Live Server: Right-click index.html → "Open with Live Server"
3. Test:
   - Search layanan di index.html/pelayanan.html
   - Buat ticket di pelayanan.html (lihat di My Tickets/Admin)
   - Admin login di admin.html (password: garuda2025)
   - Kelola tickets/berita di dashboard

## Struktur File:
```
pt-garuda-airlines/
├── index.html      (Landing)
├── pelayanan.html  (Services + Tickets)
├── admin.html      (Dashboard)
├── style.css       (Garuda Blue/Orange theme)
├── script.js       (Core logic + localStorage)
├── README.md       ← Anda sedang membaca
└── TODO.md         (Development tracking)
```

**100% Client-side, no server/backend diperlukan. Langsung jalan! 🚀**

