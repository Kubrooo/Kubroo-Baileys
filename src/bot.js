import { makeWASocket, useMultiFileAuthState, delay } from '@whiskeysockets/baileys';
import pino from 'pino';
// import { handleWelcome } from './events/welcome.js';
// import { handleGoodBye } from './events/goodbye.js';
// import { handlePromote } from './events/promote.js';
import { handleLeveling } from './commands/leveling.js';
import { handleFoodBuff } from './commands/foodbuff.js';
import { handleFoodBuffMenu, handleMenu } from './commands/menu.js';
import { handleWelcomeMessage } from './commands/welcomeMessage.js';
import { handleLevelingProf } from './commands/levelingProf.js';
import { handleSticker } from './commands/stiker.js'
import { handleXtall } from './commands/xtall.js';
import 'dotenv/config';
import { handleDeepSeek } from './commands/deepseek.js';
import { handleOwnerInfo } from './commands/owner.js';



const startBot = async () => {
  // Menggunakan multi-file auth state untuk menyimpan sesi
  const { state, saveCreds } = await useMultiFileAuthState('auth_info');

  // Membuat koneksi WhatsApp
  const client = makeWASocket({
    auth: state,
    printQRInTerminal: true,
    logger: pino({ level: 'silent' }),
    markOnlineOnConnect: true,
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
  // client.ev.on('group-participants.update', async (update) => {
  //   if (update.action === 'add') {
  //     await handleWelcome(client, update);
  //   } else if (update.action === 'remove') {
  //     await handleGoodBye(client, update);
  //   } else if (update.action === 'promote') {
  //     await handlePromote(client, update);
  //   } else {
  //     console.log(`Aksi tidak dikenal: ${update.action}`);
  //   }
  // });

  // **2. Handle Pesan Masuk (Leveling, Food Buff, @everyone)**
  client.ev.on('messages.upsert', async ({ messages }) => {

    const message = messages[0];
    if (!message.message || message?.key.fromMe) return;

    let body = message.body || message.message.conversation || message.message.extendedTextMessage?.text || '';
    body = body.toLowerCase().trim();

    if (message.message?.conversation) {
      body = message.message.conversation.trim().toLowerCase();
    } else if (message.message?.extendedTextMessage?.text) {
      body = message.message.extendedTextMessage.text.trim().toLowerCase();
    }

    // Handle @everyone mention
    if (body.startsWith('@everyone')) {
      try {
        await client.presenceSubscribe(message.key.remoteJid);
        await delay(500);
        await client.sendPresenceUpdate("composing", message.key.remoteJid);
        await delay(500);
        await client.sendPresenceUpdate("pause", message.key.remoteJid);
        const groupId = message.key.remoteJid;
        const text = body.slice(9).trim();

        const groupMetadata = await client.groupMetadata(groupId);
        const mentions = groupMetadata.participants.map(p => p.id);

        await client.sendMessage(groupId, {
          text: `@everyone ${text}`,
          mentions,
        }, { quoted: message });
      } catch (error) {
        console.error("Error fetching group metadata:", error);
      }
      return;
    }

    if (body.startsWith("ku, xtall")) {
      await client.presenceSubscribe(message.key.remoteJid);
      await delay(500);
      await client.sendPresenceUpdate("composing", message.key.remoteJid);
      await delay(500);
      await client.sendPresenceUpdate("pause", message.key.remoteJid);
      await handleXtall(client, message);
      return;
    }

    // Handle Leveling
    if (body.startsWith('ku, lvling')) {
      await client.presenceSubscribe(message.key.remoteJid);
      await delay(500);
      await client.sendPresenceUpdate("composing", message.key.remoteJid);
      await delay(500);
      await client.sendPresenceUpdate("pause", message.key.remoteJid);
      await handleLeveling(client, message);
      return;
    }

    if (body.startsWith('ku, prof')) {
      await client.presenceSubscribe(message.key.remoteJid);
      await delay(500);
      await client.sendPresenceUpdate("composing", message.key.remoteJid);
      await delay(500);
      await client.sendPresenceUpdate("pause", message.key.remoteJid);
      await handleLevelingProf(client, message)
      return
    }

    // Handle Food Buff
    if (body.startsWith('ku, foodbuff')) {
      await client.presenceSubscribe(message.key.remoteJid);
      await delay(500);
      await client.sendPresenceUpdate("composing", message.key.remoteJid);
      await delay(500);
      await client.sendPresenceUpdate("pause", message.key.remoteJid);
      await handleFoodBuffMenu(client, message);
      return;
    }

    if(body === 'ku, owner'){
      await handleOwnerInfo(client, message)
      return
    }
    // Handle Menu Info
    if (body === 'ku, info') {
      await client.presenceSubscribe(message.key.remoteJid);
      await delay(500);
      await client.sendPresenceUpdate("composing", message.key.remoteJid);
      await delay(500);
      await client.sendPresenceUpdate("pause", message.key.remoteJid);
      await handleMenu(client, message);
    } else if (body === 'ku, ada member baru nih') {
      await client.presenceSubscribe(message.key.remoteJid);
      await delay(500);
      await client.sendPresenceUpdate("composing", message.key.remoteJid);
      await delay(500);
      await client.sendPresenceUpdate("pause", message.key.remoteJid);
      await handleWelcomeMessage(client, message)
    } else if (body.includes('ku, deepseek')) {
      await client.presenceSubscribe(message.key.remoteJid);
      await delay(500);
      await client.sendPresenceUpdate("composing", message.key.remoteJid);
      await delay(500);
      await client.sendPresenceUpdate("pause", message.key.remoteJid);
      let newMessage = body.replaceAll(/ku, deepseek/ig, '');
      await handleDeepSeek(client, message, newMessage)
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
