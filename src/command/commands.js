const Users = require("../models/users");
const { admin_menu } = require("../helpers/buttons");
const logger = require("../utils/logger");
const { spices } = require("../helpers/constants");

function registerCommands(bot) {
  bot.command("start", async (ctx) => {
    try {
      if (ctx.from.id == 1744840050) {
        await ctx.reply(
          "<b>Siz adminsiz.</b>\n\nReklama jo'natish: /advert 'xabar raqami'\n\nMasalan: /advert 231",
          {
            parse_mode: "HTML",
            reply_markup: admin_menu,
          }
        );
        ctx.session.step = "admin";
        return;
      } else {
        logger.info(
          `User started: telegramId:${ctx.from.id} - firstname:${ctx.from.first_name}`
        );
        await ctx.reply(
          `Assalomu alaykum, yaxshimisiz? Tushunmovchiliklar bo'lsa <a href="https://telegra.ph/Nima-yeymiz-telegram-botidan-foydalanish-qollanmasi-08-17">foydalanish bo'yicha qo'llanmani o'qish.</a>`,
          {
            parse_mode: "HTML",
          }
        );
        return await ctx.reply(
          "Sevimli ovqatingizni qo'shish uchun /addmenu buyrug'ini yuboring."
        );
      }
    } catch (error) {
      logger.error(`USER: telegramId:${ctx.from.id} - ERROR: ${error.message}`);
    }
  });

  bot.command("nimayeymiz", async (ctx) => {
    try {
      const user = await Users.findOne({ telegramId: ctx.from.id });
      if(user.foods.length < 0) {
        return await ctx.reply("Sizda hali hech qanday sevimli taom mavjud emas.\n\nSevimli taomingizni qo'shish uchun /addmenu buyrug'ini yuboring.");
      }
      const randomFoodIndex = Math.floor(Math.random() * user.foods.length);
      const randomSpiceIndex = Math.floor(Math.random() * spices.length);
      const randomSpice = spices[randomSpiceIndex];
      const randomFood = user.foods[randomFoodIndex];
      await ctx.reply(
        `<i>${randomFood}</i>\n\n${randomSpice}`,
        {
          parse_mode: "HTML",
        }
      );
    } catch (error) {
      logger.error(`USER: telegramId:${ctx.from.id} - ERROR: ${error.message}`);
    }
  });

  bot.command("menu", async (ctx) => {
    try {
      const user = await Users.findOne({ telegramId: ctx.from.id });
      if (user.foods.length < 0) {
        return await ctx.reply(
          "Sizda hali hech qanday sevimli taom mavjud emas.\n\nSevimli taomingizni qo'shish uchun /addmenu buyrug'ini yuboring."
        );
      }
      let menu = ``;
      for (let i = 0; i < user.foods.length; i++) {
        const food = user.foods[i];
        menu += `<b>${i + 1}.</b> ${food}\n`;
      }
      await ctx.reply(`<b>Sevimli taomlar ro'yxati:</b>\n\n${menu}`, {
        parse_mode: "HTML",
      });
    } catch (error) {
      logger.error(`USER: telegramId:${ctx.from.id} - ERROR: ${error.message}`);
    }
  });

  bot.command("editmenu", async (ctx) => {
    try {
      await ctx.reply(
        `Sevilmi taomingizni o'chirish uchun taom nomini yuboring.\n\nMasalan: Beshbarmoq`,
        {
          parse_mode: "HTML",
        }
      );
      ctx.session.step = "editmenu";
    } catch (error) {
      logger.error(`USER: telegramId:${ctx.from.id} - ERROR: ${error.message}`);
    }
  });

  bot.command("addmenu", async (ctx) => {
    try {
      await ctx.reply(
        `Sevilmi taomingizni qo'shish uchun taom nomini yuboring.\n\nMasalan: Beshbarmoq`,
        {
          parse_mode: "HTML",
        }
      );
      ctx.session.step = "addmenu";
      return;
    } catch (error) {
      logger.error(`USER: telegramId:${ctx.from.id} - ERROR: ${error.message}`);
    }
  });

  bot.on("my_chat_member", async (ctx) => {
    const telegramId = ctx.from.id;
    try {
      const user = await Users.findOne({ telegramId });
      if (user) {
        await Users.findOneAndUpdate({ telegramId }, { status: !user.status });
      }
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  });
}

module.exports = { registerCommands };
