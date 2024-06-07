const {Client, PermissionsBitField,ChannelType} = require('discord.js');
const db = require('quick.db');
const client = new Client({
intents: 3276799
})
function createNumbers() {
let nums = '1234567890'.split('');
let newNums = ``;
    for (let i = 0; i < 5; i++) {
        let random = nums[Math.floor(Math.random() * nums.length)];
newNums += `${random}`
        
    }
return newNums;
}

client.on('messageCreate', async message => {
    if (!message.guild) return;
    if (message.author.bot) return;

    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return;

const args = message.content.split(' ');
if (args[0] === '#setup') {
let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
    let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2]);
    if (!channel) return message.reply(`**الرجاء استخدام الامر بالطريقة التالية: \n #setup channelId roleId**`);

if (channel.type !== ChannelType.GuildText) return message.reply(`**يجب عليك تحديد الرومات الكتابية فقط**`);

     if (!role) return message.reply(`**الرجاء استخدام الامر بالطريقة التالية: \n #setup channelId roleId**`);
if (role.managed) return message.reply(`**لا يمكن اعطاء رتبة يتم التحكم فيها بواسطة طرف ثالث للاعضاء**`)
await db.set(`main_${message.guild.id}`, channel.id);
await db.set(`role_${message.guild.id}`, role.id);
message.reply(`**تم حفظ المعلومات بنجاح**`)
}
})
client.on('ready', async () => {
          console.log('Logged in as ' + client.user.tag)
          })

client.on('guildMemberAdd', async member => {
if (member.user.bot) return;
let numbers = createNumbers()
let channel = await db.get(`main_${member.guild.id}`);
let role = await db.get(`role_${member.guild.id}`);
if (!role) return;
if (channel) {
try {
    channel = member.guild.channels.cache.get(channel);
if (channel) {
const canvas = require('./canvas.js');
    const file = await canvas(numbers);
    const msg = await channel.send({
        content: `**الرجاء ادخال الارقام التالية للتحقق من انك لست روبوت ${member}**`,
        files: [
            {
                attachment: file,
                name: 'verify.png'
            }
        ]
    })
const filter = res => res.author.id === member.user.id;
const col = await channel.createMessageCollector({
    
    filter,
    time: 60_000,
    errors: ['time']
});
col.on('collect', async message => {
    if (message.content === numbers) {
        
        await message.reply(`**تم التحقق منك**`);
      
       await member.roles.add(role);
       await msg.delete();
       col.stop('done')
    } else {
        message.reply(`**لقد ادخلت ارقاما خاطئة الرجاء المحاولة ثانية **`);
    }
    });
}
    
} catch (e) {
    
    console.log(e)
}
}
          })


client.login('')