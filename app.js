const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");
const axios = require("axios");
require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply("Welcome to the QR Code Bot!");
});

bot.help((ctx) =>
  ctx.reply("Send me a text and I will convert it to a QR Code!")
);

bot.command("qr", (ctx) =>
  ctx.reply("Please send me the text you want to convert to QR Code!")
);

bot.on("inline_query", async (ctx) => {
  const url = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${ctx.inlineQuery.query}`;
  try {
    await axios.get(url);
    const result = [
      {
        type: "photo",
        id: ctx.inlineQuery.id,
        photo_url: url,
        thumb_url: url,
      },
    ];
    ctx.answerInlineQuery(result);
  } catch (error) {
    ctx.reply(
      "An error occurred while creating the QR Code, please try again."
    );
  }
});

bot.hears("Generate QR Code", (ctx) => {
  ctx.reply("Please send me the text you want to convert to QR Code!");
});

bot.hears("QR Code", (ctx) => {
  ctx.reply("Please send me the text you want to convert to QR Code!");
});

bot.hears("QR", (ctx) => {
  ctx.reply("Please send me the text you want to convert to QR Code!");
});

bot.hears("Help", (ctx) => {
  ctx.reply("Send me a text and I will convert it to a QR Code!");
});

bot.on("text", async (ctx) => {
  const url = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${ctx.message.text}`;
  try {
    await axios.get(url);
    ctx.replyWithPhoto({ url });
  } catch (error) {
    ctx.reply(
      "An error occurred while creating the QR Code, please try again."
    );
  }
});

bot.launch();
