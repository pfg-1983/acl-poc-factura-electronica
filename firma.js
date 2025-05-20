function firmarXML(xml) {
  return xml; // Mockeado, no se firma realmente
}

function generarFRMT(cadena) {
  return Buffer.from(cadena).toString('base64');
}

module.exports = { firmarXML, generarFRMT };