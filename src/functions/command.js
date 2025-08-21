const Users = require("../models/users");
const { admin_menu } = require("../helpers/buttons");
const logger = require("../utils/logger");
const { spices } = require("../helpers/constants");
const lastChoices = new Map(); // userId -> { foods: [], spices: [] }

async function startCommand(ctx) {
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
}

async function nimaYeymizCommand(ctx) {
  try {
    const user = await Users.findOne({ telegramId: ctx.from.id });

    if (!user || !Array.isArray(user.foods) || user.foods.length === 0) {
      return ctx.reply(
        "Sizda hali hech qanday sevimli taom mavjud emas.\n\nSevimli taomingizni qo'shish uchun /addmenu buyrug'ini yuboring."
      );
    }

    // Oldingi tanlovlar (bir foydalanuvchi uchun)
    const prev = lastChoices.get(ctx.from.id) || { foods: [], spices: [] };

    // Tanlovlar
    const foodPick = pickWithHistory(user.foods, prev.foods, 2);
    const spicePick = pickWithHistory(spices, prev.spices, 2);

    await ctx.reply(`<i>${foodPick.choice}</i>\n\n${spicePick.choice}`, {
      parse_mode: "HTML",
    });

    // Yangi tarixni saqlab qo'yamiz
    lastChoices.set(ctx.from.id, {
      foods: foodPick.history,
      spices: spicePick.history,
    });
  } catch (e) {
    logger.error(`USER: telegramId:${ctx.from.id} - ERROR: ${e.message}`);
  }
}

async function menuCommand(ctx) {
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
}

async function editMenuCommand(ctx) {
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
}

async function addMenuCommand(ctx) {
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
}

function pickWithHistory(arr, history = [], maxHistory = 2) {
  if (!Array.isArray(arr) || arr.length === 0) {
    return { choice: null, history };
  }

  // Takrorlarni yo'qotib, toza ro'yxat bilan ishlaymiz
  const uniq = Array.from(new Set(arr));

  // 1) butun history'dan qochish
  let pool = uniq.filter((x) => !history.includes(x));

  // 2) agar bo'sh bo'lsa, faqat oxirgi bitta natijadan qochish
  if (pool.length === 0 && history.length > 0) {
    pool = uniq.filter((x) => x !== history[0]);
  }

  // 3) baribir bo'sh bo'lsa (masalan, 1 ta elementli ro'yxat) - hammasi bo'ladi
  if (pool.length === 0) pool = uniq;

  const choice = pool[Math.floor(Math.random() * pool.length)];
  // Tanlanganini tarixga qo'shamiz (dupni oldini olish uchun filter)
  const newHistory = [choice, ...history.filter((x) => x !== choice)].slice(
    0,
    maxHistory
  );

  return { choice, history: newHistory };
}

module.exports = {
  startCommand,
  nimaYeymizCommand,
  addMenuCommand,
  editMenuCommand,
  menuCommand,
};
