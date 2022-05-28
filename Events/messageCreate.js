module.exports = async function (message) {
    
    const prefix = '.'

    if (message.channel.type === 'dm' || message.author.bot) return
    if (!message.content.startsWith(prefix)) return
    let args = message.content.split(' ').slice(1)

    let command = message.content.slice(prefix.length).trim().split(' ')[0].toLowerCase()
    let commandRun = this.commands.find(c => c.name === command || c.aliases.includes(command) || c.aliases.includes(`$HIDE${command}`));
    if(commandRun) {
        commandRun.process({message, args})
    }

}