const logger = require('./config/logger')
const app = require('./app')
const http = require('http')

const PORT = process.env.PORT || 3000
app.set('port', PORT)

const server = http.createServer(app)

server.listen(PORT)
server.on('error', onError)
server.on('listening', onListening)

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error
    }

    switch (error.code) {
        case 'EACCES':
            logger.error(`Port ${PORT} requiere privilegios elevados.`)
            process.exit(1)
        // eslint-disable-next-line no-fallthrough
        case 'EADDRINUSE':
            logger.error(`Puerto ${PORT} ya se encuentra en uso`)
            process.exit(1)
        // eslint-disable-next-line no-fallthrough
        default:
            logger.error(JSON.stringify(error))
            throw error
    }
}

function onListening() {
    logger.info(`Escuchando en el puerto ${PORT}`)
}