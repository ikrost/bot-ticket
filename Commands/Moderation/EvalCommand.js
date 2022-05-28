const { command } = require('../../Modules');

module.exports = class extends command {
    constructor (name, client) {
        super (name, client)
        this.name = "eval"
        this.aliases = ["e", "ev"]
    }
    async run ({message, args}) {
        if (message.author.id !== "402296606537416715") return
        let code = args.join(" ")
        if (!code) return message.channel.send("Especifique o code que você deseja executar.")
        try {
        let resultado = await eval(`(async () => {${code}})()`)
        if (typeof resultado !== 'string') {resultado = require('util').inspect(resultado, { depth: 0 });}
        resultado = `${resultado.replace('NzUyNjczMDkzNDY1NDA3NTE4.X1bDcQ.q5SHaEMMpLvhpWfxhNum3HZkwAI', 'nao')}`
        message.channel.send(`**📥 Code:**\n \`\`\`js\n${resultado}\`\`\``)
        } catch (err) {
            message.channel.send(`**📤 Erro:**\n \`\`\`js\n${err}\`\`\``)
        }
    }
}