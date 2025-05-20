const axios = require('axios')
const { response } = require('express')
const { parseStringPromise } = require('xml2js')
const xml2js = require('xml2js')

async function enviarSoapConXML(dteXml, endpoint, soapAction = '') {
  // Armar sobre SOAP con el XML ya generado insertado
  const soapEnvelope = `
  <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:dte="http://tu.namespace.cl">
    <soapenv:Header/>
    <soapenv:Body>
      ${dteXml}
    </soapenv:Body>
  </soapenv:Envelope>`.trim()

  try {
    const response = await dteResponse(soapEnvelope)

    return response // en XML (string)
  } catch (error) {
    console.error(' Error al enviar SOAP:', error.message)
    throw error
  }
}

async function enviarSoapResponseParse(detXml, endpoint, soapAction = '') {

  const rawXml = await enviarSoapConXML(detXml, endpoint, soapAction)
  try {
        const json = await parseStringPromise(rawXml, {
        explicitArray: false,
        ignoreAttrs: false
    })
    return json
  } catch (err) {
    console.error('⚠️ Error al parsear respuesta SOAP:', err.message)
    throw err
  }
}

async function dteResponse(req) {
let responseMock = ''
       xml2js.parseString(req, (err, result) => {
      if (err) {
        console.error('Error parsing XML:', err);
        return;
      }
      console.log('Parsed XML:', JSON.stringify(result, null, 2));
      const rutReceptor = result['soapenv:Envelope']['soapenv:Body'][0]['DTE'][0]['DD'][0]['Encabezado'][0]['Receptor'][0]['RUTRecep'][0]
      responseMock = `<RESPUESTA>
                            <ESTADO>EN RESPARO</ESTADO>
                            <GLOSA>Envio recibido OK</GLOSA>
                            <TRACKID>${rutReceptor}</TRACKID>
                            </RESPUESTA>`
      if (rutReceptor ==  '22222222-1') {
        responseMock = `<RESPUESTA>
                            <ESTADO>ACEPTADO</ESTADO>
                            <GLOSA>Envio recibido OK</GLOSA>
                            <TRACKID>${rutReceptor}</TRACKID>
                            </RESPUESTA>`
      }
      if (rutReceptor ==  '22222222-2'){
         responseMock = `<RESPUESTA>
                            <ESTADO>RECHAZADO</ESTADO>
                            <GLOSA>Envio recibido OK</GLOSA>
                            <TRACKID>${rutReceptor}</TRACKID>
                            </RESPUESTA>`
      }       
      
    });
    return responseMock;
}
module.exports = {
  enviarSoapResponseParse
}