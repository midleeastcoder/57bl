const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "botbilgi",
    description: "Bot hakkında bilgi verir.",
    alias: ["hakkinda"],
    owneronly: 0,

    run: async (client, message, args) => {

        const embed = new MessageEmbed()
            .setColor("RED")
            .setTitle("Bot Hakkında")
            .setDescription(
                `Bu bot **ardacan** tarafından geliştirilmiştir.\n\n` +
                `France TAG sistemi için hazırlanmış deneme ve yönetim amaçlı bir bottur.\n\n` +
                `**Özellikler**\n` +
                `• Moderasyon komutları\n` +
                `• Profil sistemi\n` +
                `• Sunucu istatistikleri\n` +
                `• Duyuru sistemleri\n\n` +
                `**Sürüm:** 1.0`
            );

        message.channel.send({ embeds: [embed] });
    }
};