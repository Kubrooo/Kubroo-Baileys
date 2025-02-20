# Kubroo Baileys Bot

🚀 **Kubroo Baileys** adalah bot WhatsApp berbasis **Baileys (WhiskeySockets)** yang dirancang untuk membantu komunitas dalam **game MMORPG Toram Online** serta memberikan berbagai fitur interaktif lainnya.

## ✨ Fitur Utama

✅ **Menu Utama** - Menampilkan daftar perintah yang tersedia.<br>
✅ **Food Buff Guide** - Panduan lengkap untuk buff makanan di Toram Online.<br>
✅ **Tag All** - Mention semua anggota grup tanpa menampilkan nomor.<br>
✅ **Kustom Respon** - Kirim pesan otomatis berdasarkan kata kunci tertentu. <br>
✅ **DeepSeek AI** - Chatbot berbasis OpenRouter API. <br>
✅ **Informasi Owner & Bot** - Detail kontak & deskripsi bot. <br>

## 🛠️ Instalasi & Penggunaan

### **1. Clone Repository**
```bash
git clone https://github.com/your-username/Kubroo-Baileys.git
cd Kubroo-Baileys
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Konfigurasi Environment**
Buat file `.env` dan tambahkan API key serta konfigurasi lainnya:
```env
OPENROUTER_API_KEY=your-api-key
SESSION_FILE=./session.json
```

### **4. Jalankan Bot**
```bash
npm start
```

## 🔧 Konfigurasi

- **DeepSeek AI** (OpenRouter): Atur API key di `.env`.
- **File Media**: Simpan gambar di `./src/assets/`.
- **Command Customization**: Edit file di `./src/commands/`.

## 🖼️ Styling & Preview

- **Gaya Pengiriman Pesan**:
  - Gambar dengan teks: `image + caption`
  - Link preview: `externalAdReply`

```javascript
await client.sendMessage(chatId, {
    text: "Informasi Bot",
    contextInfo: {
        externalAdReply: {
            title: "Owner Kubroo Baileys",
            body: "Klik untuk info lebih lanjut",
            thumbnailUrl: "https://your-image-link.com/owner.jpg",
            sourceUrl: "https://your-website.com"
        }
    }
}, { quoted: message });
```

## 🏆 Kontribusi

Ingin berkontribusi? Ikuti langkah berikut:
1. **Fork** repo ini.
2. **Buat branch baru**: `git checkout -b feature-xyz`
3. **Commit perubahan**: `git commit -m 'Add new feature'`
4. **Push branch**: `git push origin feature-xyz`
5. **Buka Pull Request!**

## 📞 Kontak & Dukungan

📢 **Owner:** [Galih Tri Ardiansyah](galihtriardiansyah@gmail.com)  
🌍 **Channel WhatsApp:** [That One Erpeel Guy](https://whatsapp.com/channel/0029Vb279pQChq6Ehbx4su3c)  
📌 **GitHub Issues:** [Laporkan Bug](https://github.com/Kubrooo/Kubroo-Baileys/issues)

---
⚡ **Kubroo Baileys** - "Membantu komunitas MMORPG lebih mudah!"

