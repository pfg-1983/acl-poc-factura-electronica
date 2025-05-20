const router = require('express').Router()
const dteAclController = require('../Controller/dteAcl.controller')
const {validatDteEsquema} = require('../Validators/dte.validators')


router.post(
    '/',
    //[validatDteEsquema],
    //  #swagger.tags = ['DTE']
    //  #swagger.path = '/dte/facura
    /*  
    #swagger.parameters['service'] = {
          in: 'header',
          description: 'Código del servicio ACL POC',
          required: true,
     }
     #swagger.parameters['x-country'] = {
          in: 'header',
          description: 'Codigo del país bajo el estándar ISO 3166-1 alpha2',
          required: true,
          schema: {
               '@enum': ['CL', 'CO', 'PE']
          }
     }
     #swagger.parameters['x-commerce'] = {
          in: 'header',
          description: 'Comercio indicado por el consumidor del servicio',
          required: true,
          schema: {
               '@enum': ['ICONSTRUYE']
          }
     }
     #swagger.parameters['x-customerid'] = {
          in: 'header',
          description: 'Nombre asociado al comercio',
          required: true,
          schema: {
               '@enum': ['TOCTOC', 'IBUILDER']
          }
     }
     #swagger.parameters['x-channel'] = {
          in: 'header',
          description: 'Identificador del canal',
          required: true,
          schema: {
               '@enum': ['DiGITAL', 'FISICO']
          }
     }
     #swagger.parameters['x-api-version'] = {
            in: 'header',
            description: 'Representa la versión de la API - Ej: 1.',
            required: true
    }
    #swagger.requestBody = {
        required: true,
        schema: { $ref: "#/definitions/ReqContract" }
     }
    */
    //  #swagger.description = 'POC generación facturas electronica'
    /*  #swagger.responses[200] = { 
          content: {
               "application/json": {
                    schema:{
                         $ref: "#/definitions/StatusOK" 
                    }
               }
          },
        description: 'Respuesta en caso de creación correcta'
        }
    */
    dteAclController.generateDteSii
)

router.get('/', (req, res) => {
  res.send({ mensaje: 'Usuarios OK' })
})

module.exports = router
