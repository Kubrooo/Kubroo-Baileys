export const handleWelcome = async (client, update) => {
    const { id, participants, action } = update

    if(action === 'add') {
        for( let participant of participants ) {
            const name = ( await client.groupMetadata(id)) ?.subject || "Grup"
            const mention = `@${participant.split('@')[0]}`
            const welcomeMessage = `Selamat datang di *${name}* 🎉, ${mention}!\n\nJangan lupa baca deskripsi grup ya! 😉`

            await client.sendMessage(id, {text: welcomeMessage, mention: [participant]})
        }
    }
}

