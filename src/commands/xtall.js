import { xtallData } from '../utils/xtallData.js';

export async function handleXtall(client, message) {
  // Ambil teks pesan dari beberapa properti (fallback)
  const rawBody = message.body || message.message?.conversation || message.message?.extendedTextMessage?.text;
  if (!rawBody) return;
  
  const body = rawBody.toLowerCase().trim();

  // Format perintah yang diharapkan:
  // "ku, xtall <tipe> <bahasa>"
  // Misal: "ku, xtall normal" (default bahasa Indonesia)
  // atau "ku, xtall normal en" untuk versi Inggris
  const parts = body.split(/\s+/);
  // Minimal: ["ku,", "xtall", "<tipe>"]
  if (parts.length < 3) return;
  
  // Ambil tipe xtall dan bahasa (jika ada)
  const xtallType = parts[2];  // misal: "normal", "weapon", dll.
  const language = parts[3] || "id"; // default ke "id" (Indonesia)
  
  // Cari data xtall berdasarkan tipe dan bahasa
  if (xtallData[xtallType] && xtallData[xtallType][language]) {
    const replyMessage = xtallData[xtallType][language];
    await client.sendMessage(message.key.remoteJid, { text: replyMessage });
  }
}
