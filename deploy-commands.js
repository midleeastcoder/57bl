const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const TOKEN = "";

const commands = [
    {
        name: "cekilis",
        description: "Çekiliş sistemi"
    }
];

const rest = new REST({ version: "9" }).setToken(TOKEN);

(async () => {
    try {
        console.log("Yükleniyor...");

        await rest.put(
            Routes.applicationGuildCommands(
                "1512749043615404102",
                "1477423490285043769"
            ),
            { body: commands }
        );

        console.log("✔ Komut yüklendi!");
    } catch (err) {
        console.error(err);
    }
})();