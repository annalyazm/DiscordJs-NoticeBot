const Discord = require('discord.js')
const bot = new Discord.Client()
const { TOKEN, PREFIX, OWNERS } = require('./settings')
bot.login(TOKEN)

bot.on('ready', () => {
  console.log('토큰: ' + TOKEN)
  console.log('접두사: ' + PREFIX)
  console.log('관리자 : ' + OWNERS)
  console.log('준비되었습니다!')
})

let prefix = `${PREFIX}공지`
bot.on('message', async message => {
  if (message.content.includes(prefix)) {
    let filter = (reaction, user) => (reaction.emoji.name === '❌' || reaction.emoji.name === '⭕') && user.id === message.author.id
    if (OWNERS.includes(message.author.id)) {
      let reason = message.content.replace(`${prefix} `, '')
      let firstembed = new Discord.RichEmbed()
      .setTitle(`${bot.guilds.size}개의 서버에 공지가 발신됩니다`)
      .addField(`공지의 내용은 다음과 같습니다`, `\`\`\`\n${reason}\n\`\`\``)
      .setColor(Math.floor(Math.random() * 16777214) + 1)
      .setFooter('Discord.Js Notice Bot by 오아시스 (iOas // Oasics#5074)')
      message.channel.send(firstembed).then((th) => {
        th.react('❌')
        th.react('⭕')
        th.awaitReactions(filter, {
          max: 1
        }).then((collected) => {
          if (collected.array()[0].emoji.name === '⭕') {
		 let errors = ``
            bot.guilds.forEach(g => {
              let reason = message.content.replace(`${prefix} `, '')
              let gc
	       g.channels.forEach(c => {
                let cname = `${c.name}`
                if (cname.includes('공지') || cname.includes('notice') || cname.includes('알림') || cname.includes('announce')) {
                  if (!cname.includes('길드') && !cname.includes('벤') && !cname.includes('경고') && !cname.includes('guild') && !cname.includes('ban') && !cname.includes('warn')) {
                    gc = `${c.id}`
                  }
                }
              })
              let ann = new Discord.RichEmbed()
                .setTitle(`${bot.user.username} 공지`)
                .setThumbnail(bot.user.avatarURL)
                .setDescription(`${reason}`)
                .setColor(Math.floor(Math.random() * 16777214) + 1)
                .setFooter(`공지 발신자: ${message.member.user.tag} - 인증됨`, message.author.avatarURL)
                .setTimestamp()
              let Ch = bot.channels.get(gc)
              let ment
              try {
                if (!Ch.permissionsFor(g.me).has(`SEND_MESSAGES`)) {
                  ment = `${g.name}: 발신 실패 (메시지 발신 권한 없음)\n`
                } else { Ch.send(ann) }
              } catch (e) {
                if (!g.me.hasPermission("MANAGE_CHANNELS")) {
                ment = `${g.name}: 발신 실패 (채널 생성 권한 없음)\n`
                } else {
                ment = `${g.name}: 채널 자동 생성 및 발신 성공\n`
                g.createChannel(`공지-자동생성됨`).then(channel => {
                  channel.send(ann)
                })
              }
              } finally {
                if (ment) { errors += ment }
              }
            })
            if (errors === ``) { errors = '성공적으로 모든 서버에 발신되었습니다!' }
            let finalembed = new Discord.RichEmbed()
            .setTitle('발신이 완료되었습니다!')
            .addField('결과:', `\`\`\`\n${errors}\`\`\``)
            .setColor(Math.floor(Math.random() * 16777214) + 1)
            .setFooter('Discord.Js Notice Bot by 오아시스 (iOas // Oasics#5074)')
            th.edit(finalembed)
          } else {
            let cemb = new Discord.RichEmbed()
            .setTitle('공지 발신이 취소되었습니다')
            .setColor(Math.floor(Math.random() * 16777214) + 1)
            .setFooter('Discord.Js Notice Bot by 오아시스 (iOas // Oasics#5074)')
            th.edit(cemb)
          }
        })
      })
    } else {
	 let nope = new Discord.RichEmbed()
	 .setTitle('당신은 봇 관리자로 등록되어있지 않습니다.')
         .setColor(Math.floor(Math.random() * 16777214) + 1)
         .setFooter('Discord.Js Notice Bot by 오아시스 (iOas // Oasics#5074)')
	 message.channel.send(nope)
    }
  }
})
