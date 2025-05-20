function buildObjectForLogs(fullData) {
    return {
        country: fullData.country,
        customerId: fullData.customerId,
        environment: process.env.NODE_ENV,
        loggerName: fullData.file,
        timestamp: new Date().getTime(),
        level: fullData.level,
        message: fullData.message,
        resource: {
            'service.name': process.env.SERVICE_ACL,
            'service.version': process.env.VERSION
        }
    }
}

module.exports = {
    buildObjectForLogs
}
