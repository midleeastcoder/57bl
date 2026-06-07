module.exports = {
    name: "mute",

    async run(client, message, args) {
        const member = message.mentions.members.first();

        if (!member)
            return message.reply("Bir kullanıcı etiketle.");

        const muteRole = message.guild.roles.cache.find(
            r => r.name === "Muted"
        );

        if (!muteRole)
            return message.reply("Muted rolü bulunamadı.");

        const sure = parseInt(args[1]);

        if (!sure)
            return message.reply("Örnek kullanım: .mute @kişi 10");

        await member.roles.add(muteRole);

        message.channel.send(
            member.user.tag + " " + sure + " dakika susturuldu."
        );

        setTimeout(async () => {
            if (member.roles.cache.has(muteRole.id)) {
                await member.roles.remove(muteRole);
            }
        }, sure * 60 * 1000);
    }
};