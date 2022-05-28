const Main = require('./Main')
client = new Main({
    autoReconnect: true,
    disableEveryone: false,
    intents: ["GUILD_MESSAGES", 'GUILDS', 'GUILD_MESSAGE_REACTIONS', 'GUILD_INVITES', 'GUILD_VOICE_STATES', 'GUILD_MEMBERS', 'GUILD_PRESENCES', 'DIRECT_MESSAGES']
});

client.login("NzUyNjczMDkzNDY1NDA3NTE4.X1bDcQ.aMlanBHUGzjdg39BI6vf4rSExiw")