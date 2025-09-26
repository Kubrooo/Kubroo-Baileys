# Kubroo Baileys Bot

🚀 **Kubroo Baileys** Bot WhatsApp berbasis Baileys dengan integrasi DeepSeek AI.<br>
      Didesain agar mudah digunakan untuk percakapan otomatis, menjawab pertanyaan, serta menambahkan fitur custom lain sesuai kebutuhan.

## ✨ Fitur Utama

- Integrasi DeepSeek AI untuk chat otomatis.
- Auto respon berdasarkan keyword tertentu.
- Mudah dikembangkan dengan struktur command terpisah.

## 🛠️ Instalasi & Penggunaan

### **1. Clone Repository**
```bash
git clone https://github.com/Kubrooo/Kubroo-Baileys.git
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

## 🖼️ Styling & Preview

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

