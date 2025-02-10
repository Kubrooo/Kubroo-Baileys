export const handlePromote = async (client, update) => {
    const { id, participants, action } = update;

    if ( action === 'promote') {
        for (let participant of participants) { 
            const name = (await client.groupMetadata(id))?.subject || "Grup"
            const mention = `@${participant.split('@')[0]}`
            const congratsMessage = `Selamat ${mention} 🎉, kamu sekarang menjadi *admin* di grup *${name}*!\nSemoga bisa menjaga grup ini dengan baik ya!`

            await client.sendMessage(id, {text: congratsMessage, mention: [participant]})
        }   
    }
}