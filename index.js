require("dotenv").config();

const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");

const {
  Guilds,
  GuildMembers,
  GuildMessages,
  GuildMessageReactions,
  GuildPresences,
  MessageContent,
} = GatewayIntentBits;

const HitRoll = require("./Functions/HitRoll");
const RegRoll = require("./Functions/RegRoll");
const PottyWords = require("./Resources/PottyLanguage");

const prefix = "!";

const client = new Client({
  allowedMentions: {
    parse: ["users", "roles"],
    repliedUser: true,
  },
  intents: [
    Guilds,
    GuildMembers,
    GuildMessages,
    GuildMessageReactions,
    GuildPresences,
    MessageContent,
  ],
});

// client.on('messageDelete', message => {
//   if( message.) {return}
//   else {
//     message.channel.send("stop deleting messages")
//   }

// })

client.on("messageCreate", (message) => {
  if (!message.content.startsWith(prefix) && !message.author.bot) {
    let contentArr = message.content.toLowerCase().split(" ");

    const found = contentArr.some((r) => PottyWords.collection.includes(r));
    if (found === true) {
      message.delete();
      message.channel.send(
        `${message.author.tag.slice(
          0,
          -5
        )} said a potty word so I deleted their message.`
      );
    } else if (message.content.toLowerCase() === "i love this bot" || contentArr.includes('bot')) {
      message.react("💗") 
    } else return;
  }

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === "test") {
    message.channel.send(
      "Im working within acceptable parameters. If anything is amiss it must be due to human error."
    );
  }


  if (command === "roll") {
    if (args.length < 4) {
      message.channel.send(`${message.author.tag.slice(0, -5)} please pass all required parameters`)
      return
    }
    let diceSplit = args[0].toLowerCase().split("d")

    let result = RegRoll(parseInt(diceSplit[1]), parseInt(diceSplit[0]), args[1], args[2], args[3]);
    const embed = new EmbedBuilder()
        .setTitle(`Roll Result`)
        .setDescription(`${args[0]}`)
        .setColor(0x18e1ee)
        .setAuthor({
          iconUrl: message.author.avatarURL,
          name: message.author.tag.slice(0, -5),
        })
        .setThumbnail(
          "https://s1.1zoom.me/big0/942/Warriors_Fallout_4_Power_Armor_Brotherhood_of_536430_991x1024.jpg"
        )
        .addFields([
          {
            name: `Target`,
            value: `${result.targ}`,
            inline: false,
          },
          {
            name: `Critical Range`,
            value: `${result.critR}`,
            inline: false,
          },
          {
            name: `Complication Range`,
            value: `${result.compR}`,
            inline: false,
          },
          {
            name: `Raw Result`,
            value: `${result.res}`,
            inline: false,
          },
        
          {
            name: `Success(es)`,
            value: `${result.succ}`,
            inline: false,
          },
          {
            name: `Complications`,
            value: `${result.comps}`,
            inline: false,
          },
        ]);

      message.channel.send({ embeds: [embed] });

  }







  if (command === "attack") {
    
    if (args.length < 5) {
      message.channel.send(`${message.author.tag.slice(0, -5)} please pass all required parameters`)
      return
    }
    let diceSplit = args[0].toLowerCase().split("d")

    let result = HitRoll(parseInt(diceSplit[1]), parseInt(diceSplit[0]), args[1], args[2], args[3], args[4]);

    if (result === "error") {
      message.channel.send("Try inputting that again, little buddy");
      return;
    } else {
      const embed = new EmbedBuilder()
        .setTitle(`Roll Result`)
        .setDescription(`${args[0]}`)
        .setColor(0x18e1ee)
        .setAuthor({
          iconUrl: message.author.avatarURL,
          name: message.author.tag.slice(0, -5),
        })
        .setThumbnail(
          "https://s1.1zoom.me/big0/942/Warriors_Fallout_4_Power_Armor_Brotherhood_of_536430_991x1024.jpg"
        )
        .addFields([
          {
            name: `Target`,
            value: `${result.targ}`,
            inline: false,
          },
          {
            name: `Critical Range`,
            value: `${result.critR}`,
            inline: false,
          },
          {
            name: `Complication Range`,
            value: `${result.compR}`,
            inline: false,
          },
          {
            name: `Raw Result`,
            value: `${result.res}`,
            inline: false,
          },
          {
            name: `Hit Location`,
            value: `${result.hitloc}`,
            inline: false,
          },
          {
            name: `Success(es)`,
            value: `${result.succ}`,
            inline: false,
          },
          {
            name: `Complications`,
            value: `${result.comps}`,
            inline: false,
          },
        ]);

      message.channel.send({ embeds: [embed] });
    }
  }
});

client.on("ready", () => {
  console.log("DiceBotV2 is online.");
});

client.login(process.env.BOT_TOKEN);
