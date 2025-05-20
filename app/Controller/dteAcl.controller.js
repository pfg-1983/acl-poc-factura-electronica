const  {logFormat}  = require('../Helpers/Utils')
const msDtaSii = require('../Services/dteSiiSoap.service')
const jsonToXml = require('../Mappers/dteSigned.mapper')


async function generateDteSii(req, res, next) 
{    try {
            logFormat('info', 'dteACl.controller', 'generateDteSii', req.headers, `Se recibe los encabezados (headers) desde la solicitud (request)`, JSON.stringify(req.headers))

            const dtsXml = await jsonToXml.generarDTEConTED(req.body)
            const dteResponseData = await msDtaSii.enviarSoapResponseParse(dtsXml)
            logFormat('info', 'dte.controller', 'generateDte', req.headers, `Desde la función createDteService se obtiene el estado de la creación de una DTE`, dteResponseData)
            res.status(200).send(dteResponseData) 
    } catch (error) {
            logFormat('error', error.file, error._function, req.headers, error?.message, error.stack)
            next(error)
    }
   

}
module.exports = {generateDteSii}