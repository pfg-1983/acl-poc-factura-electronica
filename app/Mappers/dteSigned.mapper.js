const { create , convert, fragment} = require('xmlbuilder2')
const  mapClaves = require('../Dictionaries/mapaClaves').mapClaves
const {generarFRMT} = require('../../firma')

/**
 * Convierte JSON con mapeo profundo, incluyendo arrays, renombrando claves
 * @param {*} json 
 * @param {*} keyMap 
 * @returns objeto con claves adaptadas
 */

function mapJsonRecursive(json, keyMap = {}) {
  const resultado = {}

  for (const key in json) {
    const nuevoKey = keyMap[key] || key
    const valor = json[key]

    if (Array.isArray(valor)) {
      resultado[nuevoKey] = valor.map(item =>
        typeof item === 'object' ? mapJsonRecursive(item, keyMap) : item
      )
    } else if (typeof valor === 'object' && valor !== null) {
      resultado[nuevoKey] = mapJsonRecursive(valor, keyMap)
    } else {
      resultado[nuevoKey] = valor
    }
  }

  return resultado
}
async  function jsonToXmlMappedRecursivo(data, keyMap = {}, rootName = "DD") {
  const mappedData = mapJsonRecursive(data, keyMap)
  const xmlObject = { [rootName]: mappedData }

  return create(xmlObject).end({ prettyPrint: true, headless: true })
}

/**
 * Convierte JSON con mapeo profundo, renombrando claves,
 * @param {*} json 
 * @param {*} keyMap 
 * @returns objeto con claves adaptadas
 */
async function jsonToXmlMappedCaf(data, keyMap, rootName = 'TED') {
  const mapped = {}
  for (const [jsonKey, xmlKey] of Object.entries(keyMap)) {
    if (data[jsonKey] !== undefined) {
      mapped[xmlKey] = data[jsonKey]
    }
  }
  const final = { [rootName]: mapped }

  return create(final).end({ prettyPrint: true, headless: true })
};

/**
 * Convierte JSON con mapeo profundo, renombrando claves y eliminado calves no incluidos para en el contrato XML
 * @param {*} json 
 * @param {*} keyMap 
 * @returns objeto con claves adaptadas
 */
async function jsonToXmlMapped(data, keyMap, rootName = 'TED') {
  const mapped = {}
  const arraySinClave = data.items.map(objeto => {
    const nuevoObjeto = { ...objeto }; 
    delete nuevoObjeto['detalleItem'];
    return nuevoObjeto;
  });
  data.items= arraySinClave
 
  for (const [jsonKey, xmlKey] of Object.entries(keyMap)) {
    if (data[jsonKey] !== undefined) {
      mapped[xmlKey] = data[jsonKey]
    }
  }

  const final = { [rootName]: mapped }

  return create(final).end({ prettyPrint: true, headless: true })
};

async function generarDTEConTED(data) {
    try {
  const [idDocString,emisorString, receptorString, totalesString, detalleString, cafString, foliosCafString] = await Promise.all([
        jsonToXmlMapped(data, mapClaves.idDoc, 'IdDoc'),
        jsonToXmlMappedRecursivo(data.emisor, mapClaves.emisor, 'Emisor'),
        jsonToXmlMappedRecursivo(data.receptor, mapClaves.receptor, 'Receptor'),
        jsonToXmlMappedRecursivo(data.totales, mapClaves.totales, 'Totales'),
        jsonToXmlMapped(data, mapClaves.detalle, 'Detalle'),
        jsonToXmlMappedCaf(data.CAF, mapClaves.cafCabecera, 'DD'),
        jsonToXmlMappedCaf(data.CAF.foliosCaf, mapClaves.caf, 'DA')
    ])
    const idDoc = fragment(convert(idDocString))
    const emisor = fragment(convert(emisorString))
    const receptor = fragment(convert(receptorString))
    const totales = fragment(convert(totalesString))
    const detalle = fragment(convert(detalleString))
    const caf = fragment(convert(cafString))
    const foliosCaf = fragment(convert(foliosCafString))



const ted = create().ele('DTE', { version: '1.0' })
    .ele('DD',{ version: '1.0' })
    .ele('Encabezado')
    .import(idDoc)
    .import(emisor)
    .import(receptor)
    .import(totales)
    .up()
    .import(detalle)
    .ele('TED',{ version: '1.0' })
    .import(caf)
    .ele('CAF',{ version: '1.0' })
    .import(foliosCaf)
    .up()
    .ele('FRMT', { algoritmo: 'SHA1withRSA' }).txt(generarFRMT('mockeddata')).up()
    .end({ prettyPrint: true, headless: true  });

  return ted;
  } catch (error) {
  console.error('Error en funcion generar cuerpo DTE:', error)
}
}

module.exports = {generarDTEConTED}