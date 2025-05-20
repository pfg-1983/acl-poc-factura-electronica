const axiosConf = (url, serviceH, country, customerId, commerce, channel, apiVersion, route, language) => {
    const headers = {
        'Content-Type': 'application/json',
        service: process.env[serviceH],
        'x-country': country,
        'x-customerId': customerId,
        'x-commerce': commerce,
        'x-channel': channel,
        'x-api-version': apiVersion
    }

    if (route === 'login/session' && language) {
        headers['x-language'] = language
    }

    return {
        baseUrl: `${process.env[url]}/${route}`,
        option: {
            headers: headers
        }
    }
}

module.exports = {axiosConf}
