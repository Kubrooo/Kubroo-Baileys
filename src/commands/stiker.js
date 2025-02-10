import fs from 'fs';
import path from 'path';
import { downloadMediaMessage } from '@whiskeysockets/baileys';
import { exec } from 'child_process';

export async function handleSticker(client, message) {
  try {
    if (!message.message) return;

    // Cari objek media di dalam pesan: imageMessage atau videoMessage
    let media = null;
    if (message.message.imageMessage) {
      media = message.message.imageMessage;
    } else if (message.message.videoMessage) {
      media = message.message.videoMessage;
    }
    
    if (!media) return;

    // Ambil caption dari objek media
    const caption = media.caption || '';
    if (caption.trim().toLowerCase() !== 'ku, stiker') return;

    // Tentukan apakah media adalah GIF atau gambar biasa
    const isGif = message.message.videoMessage && message.message.videoMessage.gifPlayback;
    const isImage = !!message.message.imageMessage;

    // Buat folder temp jika belum ada
    const tempDir = path.join(process.cwd(), 'src', 'temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    // Download media
    const buffer = await downloadMediaMessage(message, 'buffer');
    if (!buffer) return;

    // Tentukan ekstensi file berdasarkan tipe media
    const fileExt = isGif ? 'mp4' : 'jpg';
    const fileName = `sticker_input.${fileExt}`;
    const filePath = path.join(tempDir, fileName);
    fs.writeFileSync(filePath, buffer);

    // Tentukan file output untuk stiker (format WebP)
    const outputSticker = path.join(tempDir, 'sticker_output.webp');
    
    // Buat perintah ffmpeg (ubah path ffmpeg jika diperlukan)
    const ffmpegCommand = isGif
      ? `ffmpeg -i "${filePath}" -vf "scale=512:512:flags=lanczos" -loop 0 -preset ultrafast -y "${outputSticker}"`
      : `ffmpeg -i "${filePath}" -vf "scale=512:512:flags=lanczos" -y "${outputSticker}"`;

    // Eksekusi perintah ffmpeg untuk mengonversi media menjadi stiker
    exec(ffmpegCommand, async (error) => {
      if (error) {
        console.error('❌ Gagal mengonversi ke stiker:', error);
        return;
      }

      await client.sendMessage(message.key.remoteJid, {
        sticker: fs.readFileSync(outputSticker),
      });

      // Hapus file sementara
      fs.unlinkSync(filePath);
      fs.unlinkSync(outputSticker);
    });
  } catch (error) {
    console.error('❌ Terjadi kesalahan:', error);
  }
}
