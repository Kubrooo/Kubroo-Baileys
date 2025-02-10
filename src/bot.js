import { makeWASocket, useMultiFileAuthState } from '@whiskeysockets/baileys';
import pino from 'pino';
import { handleWelcome } from './events/welcome.js';
import { handleGoodBye } from './events/goodbye.js';
import { handlePromote } from './events/promote.js';
import { handleLeveling } from './commands/leveling.js';
import { handleFoodBuff } from './commands/foodbuff.js';
import { handleFoodBuffMenu, handleMenu } from './commands/menu.js';
import { handleWelcomeMessage } from './commands/welcomeMessage.js';
import { handleLevelingProf } from './commands/levelingProf.js';
import { handleSticker } from './commands/stiker.js'
import { handleXtall } from './commands/xtall.js';

const startBot = async () => {
  // Menggunakan multi-file auth state untuk menyimpan sesi
  const { state, saveCreds } = await useMultiFileAuthState('auth_info');

  // Membuat koneksi WhatsApp
  const client = makeWASocket({
    auth: state,
    printQRInTerminal: true,
    logger: pino({ level: 'silent' }),
  });

  client.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update;
    
    if (connection === 'close') {
        const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== 401;
        console.log('Koneksi terputus, mencoba reconnect:', shouldReconnect);
        
        if (shouldReconnect) {
            startBot(); // Restart bot jika perlu
        }
    } else if (connection === 'open') {
        console.log('Bot berhasil terhubung ke WhatsApp');
    }
});


  // **1. Handle Event Grup (Welcome, Goodbye, Promote)**
  client.ev.on('group-participants.update', async (update) => {
    if (update.action === 'add') {
      await handleWelcome(client, update);
    } else if (update.action === 'remove') {
      await handleGoodBye(client, update);
    } else if (update.action === 'promote') {
      await handlePromote(client, update);
    } else {
      console.log(`Aksi tidak dikenal: ${update.action}`);
    }
  });

  // **2. Handle Pesan Masuk (Leveling, Food Buff, @everyone)**
  client.ev.on('messages.upsert', async ({ messages }) => {
    const message = messages[0];
    if (!message.message || message.key.fromMe) return;

    let body = message.body || message.message.conversation || message.message.extendedTextMessage?.text || '';
    body = body.toLowerCase().trim();

    if (message.message?.conversation) {
        body = message.message.conversation.trim().toLowerCase();
    } else if (message.message?.extendedTextMessage?.text) {
        body = message.message.extendedTextMessage.text.trim().toLowerCase();
    }

    // Handle @everyone mention
    if (body.startsWith('@everyone')) {
        const groupId = message.key.remoteJid;
        const text = body.slice(9).trim();

        try {
            const groupMetadata = await client.groupMetadata(groupId);
            const mentions = groupMetadata.participants.map(p => p.id);

            await client.sendMessage(groupId, {
                text: `@everyone ${text}`,
                mentions,
                quoted: message,
            });
        } catch (error) {
            console.error("Error fetching group metadata:", error);
        }
        return;
    }

    if (body.startsWith("ku, xtall")) {
      await handleXtall(client, message);
      return;
    }

    // Handle Leveling
    if (body.startsWith('ku, lvling')) {
        await handleLeveling(client, message);
        return;
    }

    if (body.startsWith('ku, prof')){
      await handleLevelingProf(client, message)
      return
    }

    // Handle Food Buff
    if (body.startsWith('ku, foodbuff')) {
        await handleFoodBuffMenu(client, message);
        return;
    }
    // Handle Menu Info
    if (body === 'ku, info') {
        await handleMenu(client, message);
    }else if(body === 'ku, ada member baru nih'){
      await handleWelcomeMessage(client, message)
    }

    await handleFoodBuff(client, message);
});

client.ev.on('messages.upsert', async ({ messages }) => {
  const message = messages[0];
  if (!message.message || message.key.fromMe) return;
  // Panggil handler stiker
  await handleSticker(client, message);
});



  // **3. Simpan Kredensial ketika ada update**
  client.ev.on('creds.update', saveCreds);
};

startBot().catch((err) => console.error("Error memulai bot:", err));
