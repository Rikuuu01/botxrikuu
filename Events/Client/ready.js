const { Client } = require("discord.js");
const mongoose = require("mongoose");
const { Database } = require("../../Structures/config.json");

module.exports = {
    name: "ready",
    once: true,
    /**
    * @param {Client} client
     */ 
    execute(client) {
        client.user.setStatus(`dnd`);

        const arrayOfStatus = [
            `🚧 UNDER CONSTRUCTION`,
            `Wait until BOT ready!!!`,
            `MAKE SOME AWESOME FEATURE!`
        ];
    
        let index = 0;
        setInterval(() => {
            if (index === arrayOfStatus.length) index = 0;
            const status = arrayOfStatus[index];
            client.user.setActivity(status, { type: "WATCHING" });
            index++;
        }, 5000)

        if(!Database) return;
        mongoose.connect(Database, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("The client is now connected to the databse")
        }).catch((err) => {
            console.log(err)
        })
    }
}