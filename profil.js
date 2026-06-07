module.exports = {
    name: "profil",

    async run(client, message, args) {
        const user = message.mentions.users.first() || message.author;
        const member = message.guild.members.cache.get(user.id);

        message.channel.send(
            "👤 Kullanıcı: " + user.tag +
            "\n🆔 ID: " + user.id +
            "\n📅 Hesap Oluşturma: " + user.createdAt.toLocaleDateString("tr-TR") +
            "\n📥 Sunucuya Katılma: " + member.joinedAt.toLocaleDateString("tr-TR") +
            "\n🖼️ Avatar: " + user.displayAvatarURL({ dynamic: true, size: 1024 })
        );
    }
};