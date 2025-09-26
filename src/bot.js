import { makeWASocket, useMultiFileAuthState, delay } from '@whiskeysockets/baileys';
import pino from 'pino';
import qrcode from 'qrcode-terminal';
import 'dotenv/config';
import { handleDeepSeek } from './commands/deepseek.js';

const startBot = async () => {
  const { state, saveCreds } = await useMultiFileAuthState('auth_info');

  const client = makeWASocket({
    auth: state,
    logger: pino({ level: 'silent' }),
    markOnlineOnConnect: true,
  });

  client.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      qrcode.generate(qr, { small: true }); 
    }

    if (connection === 'close') {
      console.log("Disconnect reason:", lastDisconnect?.error);
      const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== 401;
      if (shouldReconnect) {
        setTimeout(() => startBot(), 5000);
      }
    } else if (connection === 'open') {
      console.log('Bot berhasil terhubung ke WhatsApp');
    }
  });

  client.ev.on('messages.upsert', async ({ messages }) => {
    const message = messages[0];
    if (!message.message || message.key.fromMe) return;

    let body =
      message.message.conversation ||
      message.message.extendedTextMessage?.text ||
      "";

    body = body.trim();
    await client.presenceSubscribe(message.key.remoteJid);
    await delay(500);
    await client.sendPresenceUpdate("composing", message.key.remoteJid);
    await delay(500);
    await client.sendPresenceUpdate("pause", message.key.remoteJid);

    await handleDeepSeek(client, message, body);
  });

  client.ev.on('creds.update', saveCreds);
};

startBot().catch((err) => console.error("Error memulai bot:", err));
