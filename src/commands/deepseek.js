import { askDeepSeek } from '../utils/deepseekApi.js';

export const handleDeepSeek = async (client,chat, message) => {
    try {
        const chatId = chat.key.remoteJid;

        if (!message) {
            console.error("❌ Error: message.body tidak ditemukan!");
            return;
        }else{
            console.log
        }

        const response = await askDeepSeek(message);
        
        await client.sendMessage(chatId, { text: response },{ quoted: chat});
    } catch (error) {
        console.error('❌ Error saat memproses DeepSeek:', error);
        await client.sendMessage(key, { text: "⚠️ Terjadi kesalahan saat menghubungi DeepSeek." });
    }
};
