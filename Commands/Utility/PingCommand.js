const { command } = require('../../Modules');

module.exports = class extends command {
    constructor (name, client) {
        super (name, client)
        this.name = "ping"
        this.aliases = ["latencia"]
    }
    async run ({message, args}) {
        let ping = Date.now() - message.createdAt,
        api = this.client.ws.ping
        message.channel.send(`Ping: **${parseInt(ping)}ms**\nWebSocket: **${parseInt(api)}ms**`)
    }
}