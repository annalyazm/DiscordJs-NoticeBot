const Discord = require("discord.js");
const bot = new Discord.Client();
const { TOKEN, PREFIX, OWNERS } = require('./settings');
bot.login(TOKEN)

bot.on('ready', () => {
    console.log('토큰: ' + TOKEN)
    console.log('접두사: ' + PREFIX)
    console.log('관리자 : ' + OWNERS)
    console.log('준비되었습니다!')
});

let prefix = `${PREFIX}공지`
bot.on('message', async message => {
if (message.content.includes(prefix)) {
 let filter = (reaction, user) => (reaction.emoji.name === '❌' || reaction.emoji.name === '⭕') && user.id === message.author.id
 if (OWNERS.includes(message.author.id)) {
 let reason1 = message.content.replace(`${prefix} `, "")
 message.channel.send(`${bot.guilds.size}개의 서버에 공지가 발신됩니다. 공지 내용은 다음과 같습니다\n${reason1}`).then((th) => {
      th.react('❌')
      th.react('⭕')
      th.awaitReactions(filter, {
        max: 1
      }).then((collected) => {
         if (collected.array()[0].emoji.name === '⭕') {
		 let errors = ``
         bot.guilds.forEach(g => {
         let reason = message.content.replace(`${prefix} `, "")
         let gc;
	       g.channels.forEach(c => {
               let cname = `${c.name}`
                if (cname.includes('공지')) {
                  gc = `${c.id}`
                }
       });
  let ann  = new Discord.RichEmbed()
  .setTitle(`${bot.user.username} 공지`)
  .setThumbnail(bot.user.avatarURL)
  .setDescription(`${reason}`)
  .setColor(Math.floor(Math.random() * 16777214) + 1)
  .setFooter(`공지 발신자: ${message.member.user.tag} - 인증됨`, message.author.avatarURL)
  .setTimestamp()
   let Ch = bot.channels.get(gc)
   let ment;
   try {
   ment = `${g.name}: 발신 성공\n`
   if(!Ch.permissionsFor(g.me).has(`SEND_MESSAGES`)) { ment = `${g.name}: 발신 실패 (메시지 발신 권한 없음)\n` }
   Ch.send(ann)
   }
   catch(e) {
    ment = `${g.name}: 발신 실패 (채널 생성 권한 없음)\n`
    g.createChannel(`공지-자동생성됨`).then(channel => {
      channel.send(ann)
    })
    let tf = g.channels.find('name', '공지-자동생성됨')
    if (tf !== 'null' || tf !== 'undefined' || tf) {
      ment = `${g.name}: 채널 자동 생성 및 발신 성공\n`
    }
   }
   finally {
    errors += ment
   }
  }) 
   let reason = message.content.replace(`${prefix} `, "")
   message.channel.send(`
발신이 완료되었습니다!
공지 내용은 [ ${reason} ] 입니다.
-------------------------------
\`\`\`
${errors}
\`\`\`
`)
 } else { message.channel.send('공지 발신이 취소되었습니다.') }
});
});
} else {
	 message.channel.send('당신은 봇 관리자로 등록되어있지 않습니다.')
 }
}

});
