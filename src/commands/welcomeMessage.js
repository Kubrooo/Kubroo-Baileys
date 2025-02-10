export const handleWelcomeMessage = async (client, message) => {
    const chatId = message.key.remoteJid;

    const welcomeText = `Woah Iyah kak! Selamat datang member baru di guild! Yuk kenalan dulu dan saya siap membantu perkenalanya ^^ \n` +
        `Silakan copas dan isi nama IGN Kaka di bawah yaa\n\n` +
        `Haloo salken semua aku member baru\n` +
        `IGN Name: \n` +
        `Asal: \n` +
        `Umur: \n` +
        `Gender: \n` +
        `Pacar: \n` +
        `Hobi: \n` +
        `Buff land: \n` +
        `Terimakasih semua sudah diizinkan gabung guild`;

    await client.sendMessage(chatId, { text: welcomeText });
};
