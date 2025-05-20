const winston = require('winston')
require('dotenv').config()
/*
Levels:
error   -> 0
warn    -> 1
info    -> 2
verbose -> 3
debug   -> 4
silly   -> 5
*/

const config = {
    console: {
        level: process.env.LOG_LEVEL_CONSOLE || 'debug',
        handleExceptions: true
    }
}

if (process.env.NODE_ENV == 'local') {
    const myCustomLevels = {
        levels: {
            error: 0,
            warn: 1,
            info: 2,
            debug: 3
        },
        colors: {
            error: 'redBG',
            warn: 'yellow',
            info: 'blue',
            debug: 'magenta'
        }
    }
    winston.addColors(myCustomLevels.colors)
    module.exports = winston.createLogger({
        levels: myCustomLevels.levels,
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.json(),
            winston.format.printf((msg) => ` ${msg.level}   service: ACL   ${msg.message}`)
        ),
        transports: [new winston.transports.Console(config.console)]
    })
} else {
    const myCustomLevels = {
        levels: {
            error: 0,
            warn: 1,
            info: 2,
            debug: 3
        }
    }
    module.exports = winston.createLogger({
        levels: myCustomLevels.levels,
        format: winston.format.combine(
            winston.format.json(),
            winston.format.printf((msg) => ` ${msg.level}   service: ACL   ${msg.message}`)
        ),
        transports: [new winston.transports.Console(config.console)]
    })
}
