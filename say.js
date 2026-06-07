const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "say",
    description: "Sunucu istatistiklerini gösterir",
    alias: [],
    owneronly: 0,

    run: async (client, message, args) => {

        const guild = message.guild;

        const boost = guild.premiumSubscriptionCount || 0;

        const voiceCount = guild.members.cache.filter(m => m.voice.channel).size;

        const totalMembers = guild.memberCount;

        const embed = new MessageEmbed()
            .setColor("RED")
            .setTitle("Sunucu İstatistikleri")
            .setDescription(
                `⭐ Boost Sayısı: **${boost}**\n` +
                `⭐ Sesteki Üye Sayısı: **${voiceCount}**\n` +
                `⭐ Toplam Üye Sayısı: **${totalMembers}**`
            );

        message.channel.send({ embeds: [embed] });
    }
};
