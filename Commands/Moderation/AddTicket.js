const { command } = require('../../Modules');

module.exports = class extends command {
    constructor (name, client) {
        super (name, client)
        this.name = "addticket"
        this.aliases = ["adicionarticket", "addticke"]
    }
    async run ({message, args}) {
        if(!message.member.roles.cache.some(r => ["915053360598626364"].includes(r.id))) return message.channel.send(`Você não tem permissão para executar este comando.`)
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!args[0]) return message.channel.send(`Forneça o usuário. \`(@Menção/ID)\``)
        if(!user) return message.channel.send(`Usuário inválido.`)
        await message.channel.permissionOverwrites.edit(user, {
            SEND_MESSAGES: true,
            VIEW_CHANNEL: true,
            READ_MESSAGE_HISTORY: true,
            MANAGE_MESSAGES: true,
            ATTACH_FILES: true
        })
        message.channel.send(`🔓 Você adicionou ${user} no **ticket**, agora ele consegue visualizar e mandar mensagens.`)
    }
}