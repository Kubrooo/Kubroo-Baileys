import { askDeepSeek } from '../utils/deepseekApi.js';

export const handleDeepSeek = async (client,chat, message) => {
    try {
        const chatId = chat.key.remoteJid;

        // Cek apakah message.body ada
        if (!message) {
            console.error("❌ Error: message.body tidak ditemukan!");
            return;
        }

        console.log('✅ handleDeepSeek terpanggil dengan pesan:', message);

        console.log('🔍 Query yang dikirim ke DeepSeek:', message);

        const response = await askDeepSeek(message);
        console.log('📩 Respon dari DeepSeek:', response);  
        
        await client.sendMessage(chatId, { text: response },{ quoted: chat});
    } catch (error) {
        console.error('❌ Error saat memproses DeepSeek:', error);
        await client.sendMessage(key, { text: "⚠️ Terjadi kesalahan saat menghubungi DeepSeek." });
    }
};
