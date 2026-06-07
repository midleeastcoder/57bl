module.exports = {
    name: "kick",

    async run(client, message, args) {
        const member = message.mentions.members.first();

        if (!member) {
            return message.reply("Bir kullanıcı etiketle.");
        }

        if (!member.kickable) {
            return message.reply("Bu kullanıcıyı atamıyorum.");
        }

        await member.kick();

        message.channel.send(member.user.tag + " sunucudan atıldı.");
    }
};