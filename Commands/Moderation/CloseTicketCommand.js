const { command } = require('../../Modules');

module.exports = class extends command {
    constructor (name, client) {
        super (name, client)
        this.name = "fecharticket"
        this.aliases = ["fecarticke", "closeticket"]
    }
    async run ({message, args}) {
        if(!message.member.roles.cache.some(r => ["915053360598626364"].includes(r.id))) return message.channel.send(`Você não tem permissão para executar este comando.`)
        let reason = args.join(" ")
        if(!reason) return message.channel.send(`${message.author} Informe o motivo para deletar o ticket`).then(msg => {setTimeout(() => msg.delete(), 5000)})
        let user = message.guild.members.cache.get(message.channel.topic)
        if(!user) return message.channel.send(`Não foi possivel encontrar o usuário`).then(msg => {setTimeout(() => msg.delete(), 5000)})
        const messages = await message.channel.messages.fetch({ limit: 100 })
        let messages_array = []
        let messages_string = ''
        messages.forEach(msg => {
            if(msg.author.bot) return
            messages_array.push(`[${this.client.moment(msg.createdAt).format('L')} ${this.client.moment(msg.createdAt).format('LTS')}] - ${msg.author.tag}\n${msg.content}\n\n`)
            //messages_string = messages_string + `[${this.client.moment(msg.createdAt).format('L')} ${this.client.moment(msg.createdAt).format('LTS')}] - ${msg.author.tag}\n${msg.content}\n\n`
        })
        messages_array.reverse()
        messages_array.map(m => messages_string = messages_string + m)
        if(messages_string !== "") {
        var bin = await this.client.sourcebin.create(
            [
                {
                    content: messages_string,
                    language: 'js',
                },
            ],
            {
                title: `Logs ${message.channel.name}`
            },
        );
        } else {
            message.channel.delete()
            let embed = new this.client.Discord.MessageEmbed()
            .setTitle(`Seu ticket foi fechado`)
            .setColor('#36393F')
            .setDescription(`> Ticket: **${message.channel.name}**\n> Motivo: **${reason}**\n> Fechado por: ${message.author}`)
            .setThumbnail(message.guild.iconURL())
            this.client.sendLog(message, "close", message.author, message.channel, reason)
            return await message.member.send({embeds: [embed]}).catch(err => {return;})
        }
        message.channel.delete()
        let embed = new this.client.Discord.MessageEmbed()
        .setTitle(`Seu ticket foi fechado`)
        .setColor('#36393F')
        .setDescription(`> Ticket: **${message.channel.name}**\n> Motivo: **${reason}**\n> Fechado por: ${message.author}\n> Logs: [Clique aqui](${bin.url})`)
        .setThumbnail(message.guild.iconURL())
        this.client.sendLog(message, "close", message.author, message.channel, reason, bin)
        await message.member.send({embeds: [embed]}).catch(err => {return;})
    }
}