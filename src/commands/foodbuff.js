import { getFoodBuffResponse } from "../utils/foodbuffData.js";

export async function handleFoodBuff(client, message) {
    let body = ''

    if (message.message?.conversation) {
        body = message.message.conversation.trim().toLowerCase()
    }else if (message.message?.extendedTextMessage?.text){
        body = message.message.extendedTextMessage.text.trim().toLowerCase()
    }else {
        return
    }

    const response = getFoodBuffResponse(body)
    if(response){
        await client.sendMessage(message.key.remoteJid, {text: response })
    }
}