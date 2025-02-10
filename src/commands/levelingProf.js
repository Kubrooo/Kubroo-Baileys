import { levelingProfData } from '../utils/lvlingProfData.js';

export async function handleLevelingProf(client, message) {
    let body = '';

    // Cek apakah pesan adalah teks biasa atau extended text
    if (message.message?.conversation) {
        body = message.message.conversation.trim();
    } else if (message.message?.extendedTextMessage?.text) {
        body = message.message.extendedTextMessage.text.trim();
    } else {
        console.log('Pesan tidak memiliki body yang valid', message);
        return;
    }

    console.log("Pesan diterima:", body);

    const args = body.toLowerCase().split(/\s+/); 

    // Pastikan setidaknya ada 3 kata dalam perintah
    if (args.length < 3 || args[1] !== "prof") {
        await client.sendMessage(message.key.remoteJid, { text: 'Format leveling prof salah. Gunakan: ku, prof <level>' });
        return;
    }

    // Ambil angka level dari argumen terakhir
    const level = parseInt(args[2], 10);
    if (isNaN(level)) {
        await client.sendMessage(message.key.remoteJid, { text: 'Silahkan masukkan level prof yang valid.' });
        return;
    }

    let response = 'Data leveling prof tidak ditemukan.';
    for (let data of levelingProfData) {
        if (level >= data.minLevel && level <= data.maxLevel) {
            response = data.reply;
            break;
        }
    }

    await client.sendMessage(message.key.remoteJid, { text: response });
}
