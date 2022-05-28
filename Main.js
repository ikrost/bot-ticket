const { Client, Collection } = require('discord.js')
const { readdirSync, statSync, readFile } = require('fs')
module.exports = class Main extends Client {
    constructor (options = {}) {
        super (options)
        this.fs = require("fs")
        this.path = require('path')
        this.commands = new Collection()
        this.Discord = require('discord.js')
        this.initializeCommands('./Commands')
        console.log('[INFO] Comandos carregados')
        this.initializeEvents('./Events')
        console.log('[INFO] Eventos carregados')
        this.fetch = require("node-fetch")
        this.moment = require("moment")
        this.moment.locale('pt-br')
        this.sourcebin = require("sourcebin")
    }

    initializeCommands (path) {
        readdirSync(path).forEach(file => {
            try {
                const filePath = path + '/' + file
                if (file.endsWith('.js')) {
                    const Command = require(filePath)
                    const commandName = file.replace(/.js/g,'').toLowerCase()
                    const command = new Command(commandName, this, filePath)
                    this.commands.set(commandName, command, filePath)
                } else if (statSync(filePath).isDirectory()) { 
                    this.initializeCommands(filePath)
                }
            } catch (error) {
                console.log(error)
            }
        })
    };

    initializeEvents (path) {
        readdirSync(path).forEach(file => {
            try {
                let filePath = path + '/' + file
                if (file.endsWith('.js')) {
                    let Listener = require(filePath)
                    this.on(file.replace(/.js/g, ''), Listener)
                } else if (statSync(filePath).isDirectory()) {
                    this.initializeEvents(filePath)
                }
            } catch (error) {
                console.log(error)
            }
        })
    };

    async sendLog (message, type, user, _channel, reason, logs) {
        let channel = message.guild.channels.cache.get('915295571206606858')
        if(type == "close") {
            if(logs) {
                let embed = new this.Discord.MessageEmbed()
                .setTitle(`Um ticket foi fechado`)
                .setColor('#36393F')
                .setDescription(`> Ticket: **${_channel.name}**\n> Motivo: **${reason}**\n> Fechado por: ${user}\n> Logs: [Clique aqui](${logs.url})`)
                //.setThumbnail(message.guild.iconURL())
                await channel.send({embeds: [embed]})
            } else {
                let embed = new this.Discord.MessageEmbed()
                .setTitle(`Um ticket foi fechado`)
                .setColor('#36393F')
                .setDescription(`> Ticket: **${_channel.name}**\n> Motivo: **${reason}**\n> Fechado por: ${user}`)
                //.setThumbnail(message.guild.iconURL())
                await channel.send({embeds: [embed]})
            }
        }
        if(type == "open") {
            if(logs) {
                let embed = new this.Discord.MessageEmbed()
                .setTitle(`Um novo ticket aberto`)
                .setColor('#36393F')
                .setDescription(`> Ticket: **${_channel.name}**\n> Aberto por: ${user}`)
               // .setThumbnail(message.guild.iconURL())
                await channel.send({embeds: [embed]})
            } else {
                let embed = new this.Discord.MessageEmbed()
                .setTitle(`Um novo ticket foi aberto`)
                .setColor('#36393F')
                .setDescription(`> Ticket: **${_channel.name}**\n> Aberto por: ${user}`)
                //.setThumbnail(message.guild.iconURL())
                await channel.send({embeds: [embed]})
            }
        }
    }
}