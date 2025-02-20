import 'dotenv/config';
import axios from 'axios';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const REFERER_URL = "YOUR_SITE_URL"; // Bisa diisi atau kosong
const SITE_NAME = "YOUR_SITE_NAME"; // Bisa diisi atau kosong

export const askDeepSeek = async (prompt) => {
    try {
        const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
            "model": "deepseek/deepseek-r1-distill-llama-70b:free",
            "messages": [
                {
                    "role": "user",
                    "content": prompt.trim()
                }
            ]
        },{
            headers:{
                "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                "Content-Type": "application/json"
            }
        });


        if (response.status != 200) {
            console.error("❌ API Error:", response.status, await response);
            return { error: "Gagal mendapatkan respons dari DeepSeek." };
        }

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error("⚠️ Error DeepSeek:", error);
        return { error: "Terjadi kesalahan dalam menghubungi DeepSeek." };
    }
};
