
import fs from 'fs'
import { foodBuffGuide, menuText } from '../utils/menuData.js'

export const handleMenu = async (client, message) => {
    const chatId = message.key.remoteJid
    const imagePath = './src/assets/banner.jpg'

    await client.sendMessage(chatId,{
        image: fs.readFileSync(imagePath),
        caption: menuText
    })
}

export const handleFoodBuffMenu = async (client, message) => {
    const chatId = message.key.remoteJid
    const imagePath = './src/assets/banner.jpg'

    await client.sendMessage(chatId, {
        image: fs.readFileSync(imagePath),
        caption: foodBuffGuide
    })
}