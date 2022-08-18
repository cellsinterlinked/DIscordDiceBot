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
const DamRoll = require("./Functions/DamageRoll");
const PottyWords = require("./Resources/PottyLanguage");




const dumbFunc = (num) => {
  let resultDamage = 0;
  let resultEffects = 0;
  let bigArr = [];

  for (let i = 1; i <= num; i++) {
    let current = 1 + Math.floor(Math.random() * 6);
    if (current === 1) {
      resultDamage = resultDamage + 1;
      bigArr.push[current];
    } else if (current === 2) {
      resultDamage = resultDamage + 2;
      bigArr.push[current];
    } else if (current === 3 || current === 4) {
      resultDamage = resultDamage;
      bigArr.push[current];
    } else if (current === 5 || current === 6) {
      resultDamage = resultDamage + 1;
      resultEffects = resultEffects + 1;
      bigArr.push[current];
    }
  }
  let result = bigArr.join(",");

  let bigResult = {
    res: result,
    dam: resultDamage,
    effect: resultEffects,
  };
  return bigResult;
}














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

  if (command === "damage") {
   
    
    if (args.length !== 1) {
      message.channel.send(`${message.author.tag.slice(0, -5)} please pass all required parameters`)
      return
    }
    let diceSplit = args[0].split("d") 
    let result = DamRoll(parseInt(diceSplit[0]))

  

    const embed = new EmbedBuilder()
        .setTitle(`Roll Result`)
        .setDescription(`${args[0]}`)
        .setColor(0x18e1ee)
        .setAuthor({
          iconUrl: message.author.avatarURL,
          name: message.author.tag.slice(0, -5),
        })
        .setThumbnail(
          "https://img2.gratispng.com/20180715/esf/kisspng-fallout-new-vegas-fallout-4-nuka-world-fallout-7-fallout-simbolo-5b4ae1b0a5c629.992022761531634096679.jpg"
        )
        .addFields([
          {
            name: `Raw Result`,
            value: `${result.res}`,
            inline: false,
          },
          {
            name: `Numeric Result`,
            value: `${result.dam}`,
            inline: false,
          },
          {
            name: `FX Result`,
            value: `${result.effect}`,
            inline: false,
          },
         
        ]);

      message.channel.send({ embeds: [embed] });

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
          "https://cdn.vox-cdn.com/thumbor/aW14Onh5GNg7qv_a5uC4a1w0wEY=/154x187:1261x810/1600x900/cdn.vox-cdn.com/uploads/chorus_image/image/47691707/brilliant-fallout-4-mod-shows-you-what-your-character-will-say-in-dialogue-144784782681.0.0.png"
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
          "https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2015/12/7/1449480610304/51d7cc03-472c-4450-91ca-28b7ff5cd9de-1020x612.jpeg?width=700&quality=85&auto=format&fit=max&s=2e6fe4a9ac74f3a69feb94267ca60e3a"
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
