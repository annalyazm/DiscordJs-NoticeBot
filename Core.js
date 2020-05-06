const { TOKEN, PREFIX, OWNERS, AllowPrefix, IgnorePrefix, NoticeMode } = require('./configs')
      fs = require('fs')
      Discord = require('discord.js')
      Client = new Discord.Client()
      MessageEmbed = new Discord.MessageEmbed()
      noticeEmbed = new Discord.MessageEmbed()
let channelData = require('./channels.json')

Client.login(TOKEN)

module.exports = {

    bot : Client, messageEmbed : MessageEmbed,

    Ready: async () => {

    Client.configs = [PREFIX, OWNERS]
    
    Client.on('ready', () => {
      console.log(`토큰: ${TOKEN} \n접두사: ${Client.configs[0]} \n관리자: ${Client.configs[1]}`)
      console.log('준비되었습니다!')
      })

    },

    sendNotice: async (message, contents) => {

      Client.noticeGuilds = []

      switch(NoticeMode) {
        case 1:
          Client.guilds.cache.forEach(gs => { findById(gs) });
          break;

        case 2:
          Client.guilds.cache.forEach(gs => { findByName(gs) });
          break;

        default:
          Client.guilds.cache.forEach(gs => { findById(gs) });

      }

      Client.noticeGuilds.forEach(i => { if (!i[1] || !Client.channels.cache.get(i[1])) return i.push('채널을 찾을 수 없음')
      try { if(!Client.channels.cache.get(i[1]).permissionsFor(Client.channels.cache.get(i[1]).guild.me).has('SEND_MESSAGES')) return i.push('메시지 발신 권한 없음 ');Client.channels.cache.get(i[1]).send(noticeEmbed.setTitle(`❗ ${Client.user.username} 공지`).setThumbnail(Client.user.avatarURL).setColor(Math.floor(Math.random() * 16777214) + 1).setDescription(contents).setFooter(`- ${message.member.user.tag}`, message.author.avatarURL))} catch { throw '코드에 손상이 있는지 확인해주세요.' }})

    },

    addChannel: async (message) => {

      channelData[message.guild.id] = message.channel.id
      fs.writeFile("./channels.json", JSON.stringify(channelData), (e) => { if (e) throw '⚠ 오류가 발생하였습니다. 코드에 손상이 있는지 확인해주세요.' });


    }

}


function findById (toFindGuilds) {

    if (!channelData[toFindGuilds.id] && NoticeMode == 0) return findByName(toFindGuilds)
    Client.noticeGuilds.push([toFindGuilds.name, channelData[toFindGuilds.id]])

}

function findByName (toFindGuilds) {
  
    let chid; toFindGuilds.channels.cache.forEach(ch => { if (AllowPrefix.some(awP => `${ch.name}`.includes(awP)) && !IgnorePrefix.some(igP => `${ch.name}`.includes(igP))) chid = ch.id } )
    Client.noticeGuilds.push([toFindGuilds.name, chid])

}

