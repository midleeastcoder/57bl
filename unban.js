module.exports = {
  name: "unban",

  run: async (client, message, args) => {

    if (!message.member.permissions.has("BAN_MEMBERS")) {
      return message.reply("❌ BAN_MEMBERS yetkin yok!");
    }

    const userID = args[0];
    if (!userID) {
      return message.reply("❌ Kullanıcı ID gir!");
    }

    try {
      const bans = await message.guild.bans.fetch();
      const bannedUser = bans.get(userID);

      if (!bannedUser) {
        return message.reply("❌ Bu kullanıcı banlı değil!");
      }

      await message.guild.bans.remove(userID);

      message.channel.send(`✅ <@${userID}> ban kaldırıldı!`);
    } catch (err) {
      console.error(err);
      message.reply("❌ Hata oluştu!");
    }
  }
};