const Users = require("../models/users");
const {
  startCommand,
  nimaYeymizCommand,
  addMenuCommand,
  editMenuCommand,
  menuCommand,
} = require("../functions/command");

function registerCommands(bot) {
  bot.command("start", startCommand);

  bot.command("nimayeymiz", nimaYeymizCommand);

  bot.command("menu", menuCommand);

  bot.command("editmenu", editMenuCommand);

  bot.command("addmenu", addMenuCommand);

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
