const mongoose = require("mongoose");
const { Bot, session } = require("grammy");
const config = require("../config");
const Home = require("./modules/router");
const Admin = require("./modules/admin")
const isChecked = require("./middleware/is-auth.middleware");
const { registerCommands } = require("./command/commands");

const bot = new Bot(config.CC_TOKEN);

mongoose.connect(config.CC_DB_URL);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

bot.use(session({initial: () => ({step: "home"})}))


bot.use(isChecked)
bot.use(Home);
bot.use(Admin);
registerCommands(bot)


bot.catch((e) => {
  console.error("Bot error:", e);
});

bot.start();
