export const handleTagAll = async (client, groupId, participants, senderId) => {
    // Membuat array mentions dengan mengecualikan pengirim pesan
    const mentions = participants.filter(participant => participant.id !== senderId).map(participant => participant.id)

    // Membuat pesan yang akan dikirim
    const mentionMessage = `@everyone`

    // Mengirim pesan dengan mention ke semua anggota
    await client.sendMessage(groupId, { text: mentionMessage, mentions })
}
