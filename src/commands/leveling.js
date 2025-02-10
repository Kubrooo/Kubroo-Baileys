import { levelingData } from '../utils/levelingData.js';

export async function handleLeveling(client, message) {
    let body = message.body?.trim() || message.message?.conversation?.trim() || message.message?.extendedTextMessage?.text?.trim();
    
    if (!body) {
        console.log('Pesan tidak memiliki body yang valid:', message);
        return;
    }

    // Ambil kata-kata dalam pesan
    const args = body.toLowerCase().split(/\s+/); // Split berdasarkan spasi
    if (args.length < 3 || args[1] !== "lvling") {
        await client.sendMessage(message.key.remoteJid, { text: 'Format salah. Gunakan: ku, lvling <level>' });
        return;
    }

    // Ambil angka level
    const level = parseInt(args[2], 10);
    if (isNaN(level)) {
        await client.sendMessage(message.key.remoteJid, { text: 'Silakan masukkan level yang valid.' });
        return;
    }

    // Cari data leveling yang sesuai
    const data = levelingData.find(d => level >= d.minLevel && level <= d.maxLevel);
    
    const response = data ? data.reply : 'Data leveling tidak ditemukan untuk level ini.';

    // Kirim pesan
    await client.sendMessage(message.key.remoteJid, { text: response });
}
