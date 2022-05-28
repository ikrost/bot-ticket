module.exports = async function(interaction) {
    if(interaction.customId == 'close_ticket') {
        if(interaction.user.id == interaction.channel.topic) {
            const messages = await interaction.channel.messages.fetch({ limit: 100 })
            let messages_string = ''
            messages.forEach(msg => {
                if(msg.author.bot) return
                messages_string = messages_string + `[${this.moment(msg.createdAt).format('L')} ${this.moment(msg.createdAt).format('LTS')}] - ${msg.author.tag}\n${msg.content}\n\n`
            })
            if(messages_string !== "") {
            var bin = await this.sourcebin.create(
                [
                    {
                        content: messages_string,
                        language: 'js',
                    },
                ],
                {
                    title: `Logs ${interaction.channel.name}`
                },
            );
            } else {
                interaction.channel.delete()
                let embed = new this.Discord.MessageEmbed()
                .setTitle(`Seu ticket foi fechado`)
                .setColor('#36393F')
                .setDescription(`> Ticket: **${interaction.channel.name}**\n> Motivo: **Ticket fechado pelo usuario**\n> Fechado por: ${interaction.user}`)
                .setThumbnail(interaction.guild.iconURL())
                this.sendLog(interaction, "close", interaction.user, interaction.channel, "Ticket fechado pelo usuario", bin)
                return await interaction.member.send({embeds: [embed]}).catch(err => {return;})
            }
            interaction.channel.delete()
            let embed = new this.Discord.MessageEmbed()
            .setTitle(`Seu ticket foi fechado`)
            .setColor('#36393F')
            .setDescription(`> Ticket: **${interaction.channel.name}**\n> Motivo: **Ticket fechado pelo usuario**\n> Fechado por: ${interaction.user}\n> Logs: [Clique aqui](${bin.url})`)
            .setThumbnail(interaction.guild.iconURL())
            this.sendLog(interaction, "close", interaction.user, interaction.channel, "Ticket fechado pelo usuario")
            await interaction.member.send({embeds: [embed]}).catch(err => {return;})
        }
    }
    if (!interaction.isSelectMenu()) return;
    if (interaction.customId === 'menu') {
        await interaction.deferUpdate();
		if(interaction.values[0] == 'duvidas_menu') {
            const noSpecialCharacters = interaction.user.username.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '').replace(" ", "")
            if(interaction.member.guild.channels.cache.find(c => c.name === `duvidas-${noSpecialCharacters}${interaction.user.discriminator}`)) return interaction.channel.send(`${interaction.user}, você já possui um duvidas de parceria aberto`).then(msg => {setTimeout(() => msg.delete(), 5000)})
            let role = interaction.member.guild.roles.cache.get('915053360598626364')
            let channel = await interaction.member.guild.channels.create(`duvida-${interaction.user.tag}`, {
                type: 'GUILD_TEXT',
                permissionOverwrites: [{
                        id: interaction.member.guild.roles.everyone,
                        deny: ['MANAGE_MESSAGES', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'VIEW_CHANNEL'],
                        allow: []
                    },
                    {
                        id: interaction.user.id,
                        allow: ['SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'VIEW_CHANNEL', 'EMBED_LINKS', 'ATTACH_FILES'],
                        deny: []
                    },
                    {
                        id: role.id,
                        allow: ['SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'VIEW_CHANNEL', 'EMBED_LINKS', 'MANAGE_MESSAGES', 'ATTACH_FILES'],
                        deny: []
                    }
                ],
            });
            // try {
            //     var msg = await interaction.user.send(`Seu ticket foi criado ${channel}`)
            // } catch {
            //     return interaction.reply({
            //         content: `${interaction.user}, Sua DM está fechada, abra-a para prosseguir`,
            //         ephemeral: true
            //     }).then(msg => {
            //         msg.delete(1000 * 5)
            //     })
            // }
            await channel.setParent('915296227774595082', {
                lockPermissions: false
            })
            await channel.setTopic(interaction.user.id)
            let embed = new this.Discord.MessageEmbed()
            .setTitle('🎟️・Gerenciar Ticket')
            .setDescription(`Aguarde um instante que nossa equipe irá te responder!\nPara agilizar o atendimento, diga-nos o que você precisa!`)
            .setColor("#36393F")
            const row = new this.Discord.MessageActionRow()
            .addComponents(new this.Discord.MessageButton().setCustomId('close_ticket').setLabel('FECHAR').setStyle('DANGER').setEmoji('❌'))
        await channel.send(`${interaction.user}`)
        await channel.send({embeds: [embed], components: [row]})
        this.sendLog(interaction, "open", interaction.user, channel)
        }
        if(interaction.values[0] == 'tecnico_menu') {
            const noSpecialCharacters = interaction.user.username.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '').replace(" ", "")
            if(interaction.member.guild.channels.cache.find(c => c.name === `tecnico-${noSpecialCharacters}${interaction.user.discriminator}`)) return interaction.channel.send(`${interaction.user}, você já possui um ticket de tecnico aberto`).then(msg => {setTimeout(() => msg.delete(), 5000)})
            let role = interaction.member.guild.roles.cache.get('915053360598626364')
            let channel = await interaction.member.guild.channels.create(`tecnico-${interaction.user.tag}`, {
                type: 'GUILD_TEXT',
                permissionOverwrites: [{
                        id: interaction.member.guild.roles.everyone,
                        deny: ['MANAGE_MESSAGES', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'VIEW_CHANNEL'],
                        allow: []
                    },
                    {
                        id: interaction.user.id,
                        allow: ['SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'VIEW_CHANNEL', 'EMBED_LINKS', 'ATTACH_FILES'],
                        deny: []
                    },
                    {
                        id: role.id,
                        allow: ['SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'VIEW_CHANNEL', 'EMBED_LINKS', 'MANAGE_MESSAGES', 'ATTACH_FILES'],
                        deny: []
                    }
                ],
            });
            await channel.setParent('915296227774595082', {
                lockPermissions: false
            })
            await channel.setTopic(interaction.user.id)
            let embed = new this.Discord.MessageEmbed()
            .setTitle('🎟️・Gerenciar Ticket')
            .setDescription(`Aguarde um instante que nossa equipe irá te responder!\nPara agilizar o atendimento, diga-nos o que você precisa!`)
            .setColor("#36393F")
            const row = new this.Discord.MessageActionRow()
            .addComponents(new this.Discord.MessageButton().setCustomId('close_ticket').setLabel('FECHAR').setStyle('DANGER').setEmoji('❌'))
        await channel.send(`${interaction.user}`)
        await channel.send({embeds: [embed], components: [row]})
        this.sendLog(interaction, "open", interaction.user, channel)
        }
        if(interaction.values[0] == 'financeiro_menu') {
            const noSpecialCharacters = interaction.user.username.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '').replace(" ", "")
            if(interaction.member.guild.channels.cache.find(c => c.name === `financeiro-${noSpecialCharacters}${interaction.user.discriminator}`)) return interaction.channel.send(`${interaction.user}, você já possui um ticket de financeiro aberto`).then(msg => {setTimeout(() => msg.delete(), 5000)})
            let role = interaction.member.guild.roles.cache.get('915053360598626364')
            let channel = await interaction.member.guild.channels.create(`financeiro-${interaction.user.tag}`, {
                type: 'GUILD_TEXT',
                permissionOverwrites: [{
                        id: interaction.member.guild.roles.everyone,
                        deny: ['MANAGE_MESSAGES', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'VIEW_CHANNEL'],
                        allow: []
                    },
                    {
                        id: interaction.user.id,
                        allow: ['SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'VIEW_CHANNEL', 'EMBED_LINKS', 'ATTACH_FILES'],
                        deny: []
                    },
                    {
                        id: role.id,
                        allow: ['SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'VIEW_CHANNEL', 'EMBED_LINKS', 'MANAGE_MESSAGES', 'ATTACH_FILES'],
                        deny: []
                    }
                ],
            });
            await channel.setParent('915296227774595082', {
                lockPermissions: false
            })
            await channel.setTopic(interaction.user.id)
            let embed = new this.Discord.MessageEmbed()
            .setTitle('🎟️・Gerenciar Ticket')
            .setDescription(`Aguarde um instante que nossa equipe irá te responder!\nPara agilizar o atendimento, diga-nos o que você precisa!`)
            .setColor("#36393F")
            const row = new this.Discord.MessageActionRow()
            .addComponents(new this.Discord.MessageButton().setCustomId('close_ticket').setLabel('FECHAR').setStyle('DANGER').setEmoji('❌'))
        await channel.send(`${interaction.user}`)
        await channel.send({embeds: [embed], components: [row]})
        this.sendLog(interaction, "open", interaction.user, channel)
        }
        if(interaction.values[0] == 'parceria_menu') {
            const noSpecialCharacters = interaction.user.username.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '').replace(" ", "")
            if(interaction.member.guild.channels.cache.find(c => c.name === `parceria-${noSpecialCharacters}${interaction.user.discriminator}`)) return interaction.channel.send(`${interaction.user}, você já possui um ticket de parceria aberto`).then(msg => {setTimeout(() => msg.delete(), 5000)})
            let role = interaction.member.guild.roles.cache.get('915053360598626364')
            let channel = await interaction.member.guild.channels.create(`parceria-${interaction.user.tag}`, {
                type: 'GUILD_TEXT',
                permissionOverwrites: [{
                        id: interaction.member.guild.roles.everyone,
                        deny: ['MANAGE_MESSAGES', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'VIEW_CHANNEL'],
                        allow: []
                    },
                    {
                        id: interaction.user.id,
                        allow: ['SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'VIEW_CHANNEL', 'EMBED_LINKS', 'ATTACH_FILES'],
                        deny: []
                    },
                    {
                        id: role.id,
                        allow: ['SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'VIEW_CHANNEL', 'EMBED_LINKS', 'MANAGE_MESSAGES', 'ATTACH_FILES'],
                        deny: []
                    }
                ],
            });
            await channel.setParent('915296227774595082', {
                lockPermissions: false
            })
            await channel.setTopic(interaction.user.id)
            let embed = new this.Discord.MessageEmbed()
            .setTitle('🎟️・Gerenciar Ticket')
            .setDescription(`Aguarde um instante que nossa equipe irá te responder!\nPara agilizar o atendimento, diga-nos o que você precisa!`)
            .setColor("#36393F")
            const row = new this.Discord.MessageActionRow()
            .addComponents(new this.Discord.MessageButton().setCustomId('close_ticket').setLabel('FECHAR').setStyle('DANGER').setEmoji('❌'))
        await channel.send(`${interaction.user}`) 
        await channel.send({embeds: [embed], components: [row]})
        this.sendLog(interaction, "open", interaction.user, channel)
        }
	}
}