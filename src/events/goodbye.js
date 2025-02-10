export const handleGoodBye = async (client, update) => {
    const { id, participants, action } = update
    
    if(action === 'remove') {
        for (let participant of participants) {
            const goodbyeMessage = `Sampai jumpa, @${participant.split('@')[0]}! Semoga sukses di luar sana! 👋`;
            await client.sendMessage(id, { text: goodbyeMessage, mentions: [participant] });
        }
    }
}