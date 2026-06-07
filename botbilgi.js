const Discord = require("discord.js");

module.exports = {
    name: "botbilgi",
    alias: ["hakkinda"],

    run: async (client, message, args) => {

        const embed = new Discord.MessageEmbed()
            .setColor("#ff0000")
            .setTitle("Bot Hakkında")
            .setDescription(`
**Geliştirici:** ardacan

Bu bot ardacan tarafından geliştirilmiştir.

France topluluğu için hazırlanmış deneme ve geliştirme amaçlı bir bottur.

• Moderasyon komutları
• Profil sistemi
• Sunucu istatistikleri
• Duyuru sistemleri

Sürüm: 1.0
            `);

        message.channel.send({ embeds: [embed] });
    }
};