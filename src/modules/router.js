const { Router } = require("@grammyjs/router");
const Users = require("../models/users");
const logger = require("../utils/logger");
const { spices } = require("../helpers/constants");
const router = new Router((ctx) => ctx.session.step);

const addmenu = router.route("addmenu");
const editmenu = router.route("editmenu");


addmenu.command("start", async (ctx) => {
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

addmenu.command("nimayeymiz", async (ctx) => {
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

addmenu.command("menu", async (ctx) => {
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

addmenu.command("editmenu", async (ctx) => {
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

addmenu.command("addmenu", async (ctx) => {
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

editmenu.command("start", async (ctx) => {
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

editmenu.command("nimayeymiz", async (ctx) => {
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

editmenu.command("menu", async (ctx) => {
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

editmenu.command("editmenu", async (ctx) => {
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

editmenu.command("addmenu", async (ctx) => {
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

addmenu.on("message:text", async (ctx) => {
  const food = ctx.message.text;
  if (food.length > 30) {
    return await ctx.reply(
      "Kechirasiz, bunday uzun nomli taomni uchratmagan ekanman shuning uchun qabul qila olmayman."
    );
  }
  await Users.findOneAndUpdate(
    { telegramId: ctx.from.id },
    { $push: { foods: food } }
  );
  await ctx.reply(`Yana bir sevimli taom qo'shildi`);
  ctx.session.step = "home";
});

editmenu.on("message:text", async (ctx) => {
  const user = await Users.findOne({ telegramId: ctx.from.id });

  const food = ctx.message.text;

  if (user.foods.includes(food)) {
    await Users.findOneAndUpdate(
      { telegramId: ctx.from.id },
      { $pull: { foods: food } }
    );
    await ctx.reply(`"${food}" sevimlilar ro‘yxatidan olib tashlandi`);
    ctx.session.step = "home";
    return
  }else {
    await ctx.reply(`"${food}" sevimlilar ro‘yxatida mavjud emas`);
  }
});


module.exports = router;
