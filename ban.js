module.exports = {
    name: "ban",

    async run(client, message, args) {
        const member = message.mentions.members.first();

        if (!member) {
            return message.reply("Bir kullanıcı etiketle.");
        }

        await member.ban();

        message.channel.send(member.user.tag + " banlandı.");
    }
};