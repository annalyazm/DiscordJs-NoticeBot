const { bot, messageEmbed, Ready, sendNotice, addChannel } = require('./Core.js')

Ready();

bot.on('message', async message => {

    if (message.content.startsWith(`${bot.configs[0]}공지 `)) {

        if (bot.configs[1].includes(message.author.id)) {

            message.channel.send(messageEmbed.setTitle(`🔍 ${bot.guilds.cache.size}개의 서버에 공지가 발신됩니다`).addField(`공지의 내용은 다음과 같습니다`, `\n${message.content.substring(`${bot.configs[0]}공지 `.length)}\n`).setColor("#47CDFF").setFooter('by Oasics#5074')).then((noticeEmbed) => {

                noticeEmbed.react('⭕'); noticeEmbed.react('❌'); noticeEmbed.awaitReactions((reaction, user) => (reaction.emoji.name === '⭕' || reaction.emoji.name === '❌') && user.id === message.author.id, { max: 1 }).then((collected) => {

                    if (collected.array()[0].emoji.name === '⭕') {

                        messageEmbed.fields = []; sendNotice(message, message.content.substring(`${bot.configs[0]}공지 `.length), noticeEmbed).catch(() => noticeEmbed.edit(messageEmbed.addField('⚠ 오류가 발생하였습니다', '코드에 손상이 있는지 확인해주세요.').setColor("#FFD500").setFooter('by Oasics#5074'))) 

                            let noticeResult = ``; bot.noticeGuilds.forEach(i => { if (!i[2]) return;  noticeResult += `${i[0]}: ${i[2]} \n` }); noticeResult += '위에 적혀있지 않은 서버는 정상적으로 발신되었습니다.'

                            noticeEmbed.edit(messageEmbed.setTitle('✅ 공지 발신이 완료되었습니다!').addField('결과:', `\`\`\`\n${noticeResult}\`\`\``).setColor("#83FF83").setFooter('by Oasics#5074')); messageEmbed.fields = [];

                    } else {

                        messageEmbed.fields = []; noticeEmbed.edit(messageEmbed.setTitle('❌ 공지 발신이 취소되었습니다').setColor("#FF4747").setFooter('by Oasics#5074'))

                    }

                })

            })

        } else {

            message.channel.send(messageEmbed.setTitle('⚠ 당신은 봇 관리자로 등록되어있지 않습니다.').setColor("#FFD500").setFooter('by Oasics#5074'))
    
        }

    } else if (message.content === `${bot.configs[0]}채널설정`) {

        addChannel(message).catch((e) => { if (e) return message.channel.send(e)}); message.channel.send(`✅ 공지를 수신할 채널이 <#${message.channel.id}> 로 설정되었습니다!`); 
        
    }

})