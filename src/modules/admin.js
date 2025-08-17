const { Router } = require("@grammyjs/router")
const router = new Router((ctx) => ctx.session.step);
const Users = require("../models/users")


const admin = router.route("admin")

admin.command("advert", async (ctx) => {

  try {
    const channel_id = '-1002565988678';
    const messageId = ctx.message.text.split(" ")[1];
    const users = await Users.find({ status: true });
    let successCount = 0;
    let errorCount = 0;

    // Sekundiga 26 ta xabar jo‘natish uchun kechikish (1000ms / 26 ≈ 38msევ
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      try {
        await ctx.api.copyMessage(user.telegramId, channel_id, messageId);
        successCount++;
      } catch (error) {
        console.log("Reklom yuborishda xatolik:", error);

        try {
          errorCount++;
        } catch (deleteError) {
          console.error(`Foydalanuvchi o‘chirishda xato (ID: ${user.telegramId}):`, deleteError);
        }
      }

      // Sekundiga 26 ta xabar chegarasini ta'minlash uchun kechikish
      // 1000ms / 26 = taxminan 38ms kechikish
      if ((i + 1) % 26 === 0) {
        await delay(1000); // Har 26 ta xabardan keyin 1 soniya kutish
      }
    }

    await ctx.reply(`Reklama yuborilgan soni: ${successCount}`);
    if (errorCount > 0) {
      await ctx.reply(`Xatolik yuz berdi: ${errorCount}`);
    }
  } catch (error) {
    console.error("Reklama jo‘natishda umumiy xato:", error);
    await ctx.reply("Xato yuz berdi. Iltimos, qayta urinib ko‘ring.");
  }
});

admin.hears("Statistika", async (ctx) => {
  try {
    // Jami va aktiv bo'lmaganlar bir so'rovda
    const [users, nonActiveUsers] = await Promise.all([
      Users.find(),
      Users.find({ status: false }),
    ]);

    // Hozirgi vaqt (timestamp)
    const now = Date.now();

    // Oxirgi hafta (7 kun oldin) va oy (30 kun oldin) uchun vaqt oralig‘i
    const lastWeekFrom = now - 7 * 24 * 60 * 60 * 1000; // 7 kun oldin
    const lastMonthFrom = now - 30 * 24 * 60 * 60 * 1000; // 30 kun oldin

    // Vaqt oralig‘idagini hisoblash
    const [usersLastWeek, usersLastMonth] = await Promise.all([
      Users.countDocuments({
        created_at: {
          $gte: lastWeekFrom, // 7 kun oldindan
          $lte: now, // hozirgi vaqtgacha
        },
      }),
      Users.countDocuments({
        created_at: {
          $gte: lastMonthFrom, // 30 kun oldindan
          $lte: now, // hozirgi vaqtgacha
        },
      }),
    ]);

    // Statistika xabari
    await ctx.reply(
      `👥 Jami: ${users.length}\n` +
      `✅ Aktiv: ${users.length - nonActiveUsers.length}\n` +
      `❌ Aktiv bo'lmagan: ${nonActiveUsers.length}\n` +
      `📅 Oxirgi haftada qo'shilgan: ${usersLastWeek}\n` +
      `🗓️ Oxirgi oyda qo'shilgan: ${usersLastMonth}`

    );
  } catch (error) {
    console.error("Statistika olishda xato:", error);
    await ctx.reply("Xato yuz berdi. Iltimos, qayta urinib ko'ring.");
  }
});


module.exports = router;