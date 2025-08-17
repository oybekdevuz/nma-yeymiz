const Users = require("../models/users");
const logger = require("../utils/logger");

const isChecked = async (ctx, next) => {
  try {
    const telegramId = ctx.from.id;
    const firstname = ctx.from.first_name;
    const username = ctx.from.username;
      const findUser = await Users.findOne({ telegramId });
      if (!findUser) {
        await Users.create({ telegramId, firstname, username });
      } else if (!findUser.status) {
        await Users.findOneAndUpdate({ telegramId }, { status: true });
      }
      await next();
    } catch (error) {
      logger.error(`USER: telegramId:${ctx.from.id} - ERROR: ${error.message}`);
    }
  };

module.exports = isChecked
  