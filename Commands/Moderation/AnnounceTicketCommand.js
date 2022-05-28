const { command } = require('../../Modules');

module.exports = class extends command {
    constructor (name, client) {
        super (name, client)
        this.name = "anunciarticket"
        this.aliases = ["anunciarticke", "anunciartick"]
    }
    async run ({message, args}) {
        if(!message.member.roles.cache.some(r => ["915053360598626364"].includes(r.id))) return message.channel.send(`Você não tem permissão para executar este comando.`)
        let embed = new this.client.Discord.MessageEmbed()
        .setTitle('🎟️・Central de Atendimento')
        .setDescription(`O sistema de tickets é reservado para membros que desejam: sanar suas dúvidas, solicitar suporte ou realizar uma compra. Usar esse sistema permite que você tenha contato direto com a nossa equipe, tornando o suporte muito mais rápido e eficiente.\n\nPara abrir um ticket, basta selecionar a categoria abaixo:`)
        .addField('⏰ Horários de atendimento:', '\`08:00 as 23:00 (UTC - 3)\`', true)
      //  .addField('🌐 Site:', '[Acesse agora](https://google.com)', true)
        .setColor("#36393F")
        // .setImage('https://cdn.discordapp.com/attachments/917585196088451122/938912687415517204/oioioi.png')
        const row = new this.client.Discord.MessageActionRow()
        .addComponents(new this.client.Discord.MessageSelectMenu().setCustomId('menu').setPlaceholder('Selecione a categoria').addOptions([
            {
                label: 'Dúvidas',
                description: 'Retire suas dúvidas com nossa equipe.',
                value: 'duvidas_menu',
                emoji: '❓'
            },
            {
                label: 'Técnico',
                description: 'Resolva seus problemas técnicos.',
                value: 'tecnico_menu',
                emoji: '🛠️'
            },
            {
                label: 'Financeiro',
                description: 'Realize compras de produtos rapidamente.',
                value: 'financeiro_menu',
                emoji: '🛒'
            },
            {
                label: 'Parceria',
                description: 'Realize uma parceria conosco!',
                value: 'parceria_menu',
                emoji: '👥'
            },
        ]))
        await message.channel.send({embeds: [embed], components: [row]})
    }
}