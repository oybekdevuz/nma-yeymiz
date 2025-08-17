require("dotenv/config")

const {env} = process

const config = {
    CC_TOKEN: env.CC_TOKEN,
    CC_DB_URL: env.CC_DB_URL,
}

module.exports = config