const Discord = require("discord.js");

module.exports = {
    name: "yardim",
    alias: ["help"],

    run: async (client, message, args) => {

        const embed = new Discord.MessageEmbed()
            .setColor("#ff0000")
            .setTitle("Yardım Menüsü")
            .setDescription(`
**.ping**
Botun gecikmesini gösterir.

**.botbilgi**
Bot hakkında temel bilgileri gösterir.

**.profil**
Kullanıcı ID'si, hesap oluşturma tarihi ve sunucu bilgilerini gösterir.

**.mute**
Belirtilen kullanıcıyı susturur.

**.unmute**
Susturulan kullanıcının susturmasını kaldırır.

**.ban**
Belirtilen kullanıcıyı sunucudan yasaklar.

**.unban**
Yasaklanan kullanıcının banını kaldırır.

**.kick**
Belirtilen kullanıcıyı sunucudan atar.

**.sil**
Sohbetteki mesajları siler.

**.lock**
Kanalı mesaj yazmaya kapatır.

**.cekilis**
Sunucuda çekiliş başlatır.

**.ceri**
Özel bir mesaj gönderir / etiketli yanıt verir.
`);

        message.channel.send({ embeds: [embed] });
    }
};