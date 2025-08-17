const { Keyboard } = require("grammy");


const admin_menu = new Keyboard()
  .text("Statistika")
  .resized()

module.exports = {
  admin_menu,
};
