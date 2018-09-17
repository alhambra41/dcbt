const Discord = require("discord.js");
const client = new Discord.Client();
/*
http://github.com/arpelo
*/

function clean(text) {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}

var prefix = "/";
var token = "NDkwNTE5NTQ0MTE3NTkyMDc3.Dn6gFw.ZJZ_9D9zOcj32ddgMn03iwOIr5U";

client.on("ready", () => {
  console.log("bu bot www.alfa-hp.com/destek ekibi tarafından düzenlenmiştir");
  console.log("Bot Giriş Yaptı Şu Kadar Sunucuya Hizmet veriyorum:" + client.guilds.size);
  client.user.setGame(`ALFA-HP/DESTEK | ${prefix}yardım`);
});

client.on("guildCreate", (guild) => {
client.user.setGame(`ALFA-HP/DESTEK | ${prefix}yardım`);
    guild.owner.user.send(`Selam bu bot www.alfa-hp.com/destek ekibi tarafından düzenlenmiştir tamamen oyunculara daha hızlı destek vermek amacı ile kullanılmaktadır.`);
});

/*
http://github.com/arpelo
*/

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  if (message.content.toLowerCase().startsWith(prefix + `yardım`)) {
    const embed = new Discord.RichEmbed()
    .setTitle(`:mailbox_with_mail: ALFA-BOT Ticket System`)
    .setColor(0xCF40FA)
    .setDescription(`Selam! Ben www.alfa-hp.com/destek ekibi tarafından düzenlenmiş bir botum, sana yardımcı olmak için buradayım.`)
    .addField(`Tickets`, `[${prefix}ticketaç]() > Destek Bildirimi Oluşturur!\n[${prefix}ticketkapat]() > Ticket kapatır!`)
    .addField(`Diğer`, `[${prefix}yardım]() > yardım menüsünü gösterir.\n[${prefix}ping]() > Discord API ping değerini gösterir.`)
    message.channel.send({ embed: embed });
  }

  if (message.content.toLowerCase().startsWith(prefix + `ping`)) {
    message.channel.send(`İŞTE GELİYOR!`).then(m => {
    m.edit(`:ping_pong: Wow, Bu çok hızlı oldu dostum. **Pong!**\nMesaj Editleme zamanım ` + (m.createdTimestamp - message.createdTimestamp) + `ms, Discord API pingim ` + Math.round(client.ping) + `ms.`);
    });
}

/*
http://github.com/arpelo
*/

if (message.content.toLowerCase().startsWith(prefix + `ticketaç`)) {
    const reason = message.content.split(" ").slice(1).join(" ");
    if (!message.guild.roles.exists("name", "Destek Ekibi")) return message.channel.send(`Bu Sunucuda '**Destek Ekibi**' rolünü bulamadım bu yüzden ticket açamıyorum \nEğer sunucu sahibisen, Destek Ekibi Rolünü oluşturabilirsin.`);
    if (message.guild.channels.exists("name", "ticket-" + message.author.id)) return message.channel.send(`Zaten açık durumda bir ticketin var.`);
    message.guild.createChannel(`ticket-${message.author.id}`, "text").then(c => {
        let role = message.guild.roles.find("name", "Destek Ekibi");
        let role2 = message.guild.roles.find("name", "@everyone");
        c.overwritePermissions(role, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        c.overwritePermissions(role2, {
            SEND_MESSAGES: false,
            READ_MESSAGES: false
        });
        c.overwritePermissions(message.author, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        message.channel.send(`:white_check_mark: Ticket Kanalın oluşturuldu, #${c.name}.`);
        const embed = new Discord.RichEmbed()
        .setColor(0xCF40FA)
        .addField(`Hey ${message.author.username}!`, `Selam Başarılı bir Şekilde Ticket Açıldı, Lütfen bize yaşadığınız sorunu detaylı bir şekilde anlatın. www.alfa-hp.com`)
        .setTimestamp();
        c.send({ embed: embed });
        message.delete();
    }).catch(console.error);
}
if (message.content.toLowerCase().startsWith(prefix + `ticketkapat`)) {
    if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`Bu komutu kullanamazsın ticket kanalında olman gerekir.`);

    message.channel.send(`Destek Kanalını kapatmaya emin misin? kapatmak için **-kapat** yazman yeterli.`)
    .then((m) => {
      message.channel.awaitMessages(response => response.content === '-kapat.Talebiniz kapatıldı.', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
      .then((collected) => {
          message.channel.delete();
        })
        .catch(() => {
          m.edit('Ticket Kapatma isteğin zaman aşımına uğradı.').then(m2 => {
              m2.delete();
          }, 3000);
        });
    });
}
 
/*
http://github.com/arpelo
*/

});

client.login(token);
