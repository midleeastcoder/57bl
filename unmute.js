module.exports = {
    name: "unmute",

    async run(client, message, args) {
        const member = message.mentions.members.first();

        if (!member)
            return message.reply("Bir kullanıcı etiketle.");

        const muteRole = message.guild.roles.cache.find(
            r => r.name === "Muted"
        );

        if (!muteRole)
            return message.reply("Muted rolü bulunamadı.");

        if (!member.roles.cache.has(muteRole.id))
            return message.reply("Bu kullanıcı zaten muteli değil.");

        await member.roles.remove(muteRole);

        message.channel.send(
            member.user.tag + " kullanıcısının susturması kaldırıldı."
        );
    }
};