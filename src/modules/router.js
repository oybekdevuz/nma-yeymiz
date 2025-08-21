const { Router } = require("@grammyjs/router");
const Users = require("../models/users");
const {
  startCommand,
  nimaYeymizCommand,
  addMenuCommand,
  editMenuCommand,
  menuCommand,
} = require("../functions/command");
const router = new Router((ctx) => ctx.session.step);

const addmenu = router.route("addmenu");
const editmenu = router.route("editmenu");

addmenu.command("start", startCommand);

addmenu.command("nimayeymiz", nimaYeymizCommand);

addmenu.command("menu", menuCommand);

addmenu.command("editmenu", editMenuCommand);

addmenu.command("addmenu", addMenuCommand);

editmenu.command("start", startCommand);

editmenu.command("nimayeymiz", nimaYeymizCommand);

editmenu.command("menu", menuCommand);

editmenu.command("editmenu", editMenuCommand);

editmenu.command("addmenu", addMenuCommand);


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
    return;
  } else {
    await ctx.reply(`"${food}" sevimlilar ro‘yxatida mavjud emas`);
  }
});

module.exports = router;
