const logger = require('../../config/logger')
const {buildObjectForLogs} = require('./buildObjectForLogs')

function logFormat(type, file, _function, headers, message, data = '') {
    let formatHeaders
    if (Object.keys(headers).length === 0) {
        formatHeaders = 'No aplican headers'
    } else {
        formatHeaders = `${headers['x-usrtx']}-${headers['x-country']}-${headers['x-customerid']}-${headers['x-commerce']}-${headers['x-api-version']}`
    }
    switch (type) {
        case 'info':
            if (typeof data !== 'string') {
                logger.info(
                    `type: info   headers: ${formatHeaders}   file: ${file}   function: ${_function}    detail: ${JSON.stringify(
                        buildObjectForLogs({
                            loggerName: file,
                            level: 'INFO',
                            country: headers['x-country'],
                            customerId: headers['x-customerid'],
                            message
                        })
                    )}   data: ${JSON.stringify(data)}`
                )
            } else {
                logger.info(
                    `type: info   headers: ${formatHeaders}   file: ${file}   function: ${_function}    detail: ${JSON.stringify(
                        buildObjectForLogs({
                            loggerName: file,
                            level: 'INFO',
                            country: headers['x-country'],
                            customerId: headers['x-customerid'],
                            message
                        })
                    )}   data: ${data}`
                )
            }
            break
        case 'error':
            logger.error(
                `type: error   headers: ${formatHeaders}   file: ${file}   function: ${_function}   errorDetail: ${JSON.stringify(
                    buildObjectForLogs({
                        loggerName: file,
                        level: 'ERROR',
                        country: headers['x-country'],
                        customerId: headers['x-customerid'],
                        message
                    })
                )}   error: ${JSON.stringify(data)}`
            )
            break
    }
}


module.exports= {logFormat}