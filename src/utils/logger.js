// logger.js
const pino = require('pino');

const logger = pino({
  transport: {
    targets: [
      {
        target: 'pino/file',
        options: {
          destination: 'logs/app.log',
          mkdir: true // kerak bo‘lsa katalogni avtomatik yaratadi
        }
      },
      {
        target: 'pino-pretty', // faqat dev holatda chiroyli ko‘rsatish
        options: {
          colorize: true
        },
        level: 'debug'
      }
    ]
  }
});

module.exports = logger;
