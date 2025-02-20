export const handleOwnerInfo = async (client, message) => {
    const chatId = message.key.remoteJid;

    const botInfo = `
*Informasi Bot*
━━━━━━━━━━━━━━━
➥ *Nama Bot:* Kubroo Baileys
➥ *Versi:* 1.0.0
➥ *Library:* Baileys
➥ *Dibuat oleh:* Ardiansyah

*Informasi Owner*
━━━━━━━━━━━━━━━
👤 *Nama:* Ardiansyah
💬 *Instagram:* https://www.instagram.com/so_ardy?igsh=MWkxZmNoYzlpZngzMQ== 
📢 *Channel:* https://whatsapp.com/channel/0029Vb279pQChq6Ehbx4su3c
`;

    await client.sendMessage(chatId, { text: botInfo }, { quoted: message });
};
