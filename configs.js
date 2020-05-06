exports.TOKEN = 'NzA1NTgyNTE2MzY2NzM3NDg4.XrASWw.KAqrSC-AD5gYPtKo0dmZ2hbvcJA' // 여기에 토큰을 적어주세요 (https://discordapp.com/developers/applications/ 에서 발급 가능)
exports.PREFIX = '공지야 ' // 여기에 접두사를 적어주세요 (예: '!') ** 절대 띄어쓰기를 "연속으로 2개 이상" 사용하지 마세요 **
exports.OWNERS = ['417571990820618250'] // 여기에 관리자 ID 를 적어주세요 (예: ['417571990820618250, 523282229397422081'])
exports.AllowPrefix = ['공지', '알림', 'notice', 'alarm', 'announce'] // 허용하는 채널 접두사 
exports.IgnorePrefix = ['길드', 'guild', '벤', 'ban', '경고', 'warn'] // 무시하는 채널 접두사
exports.NoticeMode = 0 // 아래의 도움말을 참고하세요

/*

공지 모드 (NoticeMode) 도움말
*기본값은 0 입니다*
*모드는 총 3개 (0, 1, 2) 가 있습니다*

----------------------------------------

0: 채널설정이 가능하지만, 채널설정이 되지 않은 서버는 AllowPrefix 가 포함된 채널을 찾아서 보냅니다.
1: 채널설정으로 지정된 채널에 보냅니다. AllowPrefix 가 포함된 채널을 찾지 않습니다.
2: AllowPrefix 가 포함되고 IgnorePrefix 가 포함되지 않은 채널을 찾아 공지를 보냅니다.

*/