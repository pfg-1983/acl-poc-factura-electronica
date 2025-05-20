const DEFAULT_CODE = 'E_DEFAULT'
require('dotenv').config()

exports.handlerErrors = (error, req, res, next) => {
    let statusCode = error.statusCode || 500
    if (process.env.NODE_ENV == 'local') {
        res.status(statusCode).send({
            userMessage: `${error.name} | ${error.message}`,
            internalMessage: 'ERROR CATALOG: ' + error.code || DEFAULT_CODE,
            moreInfo: error.stack
        })
    } else {
        res.status(statusCode).send({
            userMessage: `${error.name} | ${error.message}`,
            internalMessage: 'ERROR CATALOG: ' + error.code || DEFAULT_CODE,
            moreInfo: `${error._function} | Revisar logs del sistema para más detalle`
        })
    }
}
