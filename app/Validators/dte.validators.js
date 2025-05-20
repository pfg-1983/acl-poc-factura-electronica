const Joi = require('joi')
const {CustomValidatorError} = require('../../config/Errors/validator.error') 

 const postDteSchema = Joi.object()
    .keys({
        tipoDocumento: Joi.number().integer().required().min(1).max(100).message({
            'numero.maximo':'tipoDocumento no puede superar un largo de 2',
            'numero.minimo':'tipoDocuemnto debe ser mayor a 0'
        }),
        fechaEmision: Joi.string().max(30).required(),
        emisor: Joi.object()
            .keys({
                rutEmisor: Joi.string().min(9).max(15).required().messages({
                        'string.min': 'El "rutEmisor" no puede tene menos de 9 caracteres',
                        'string.max': 'El "rutEmisor" no puede tener mas de 15 caracteres'
                    }),
                razonSocial: Joi.string().min(2).max(48).required().messages({
                        'string.min': 'El "razonSocial" no puede tene menos de 9 caracteres',
                        'string.max': 'El "razonSocial" no puede tener mas de 15 caracteres'
                    }),
                giroEmisor: Joi.string().min(2).max(30).required().messages({
                        'string.min': 'El "giroEmisor" no puede tene menos de 2 caracteres',
                        'string.max': 'El "giroEmisor" no puede tener mas de 30 caracteres'
                    }),
                direccionOrigen: Joi.string().min(2).max(59).required().messages({
                        'string.min': 'El "direccionOrigen" no puede tene menos de 2 caracteres',
                        'string.max': 'El "direccionOrigen" no puede tener mas de 50 caracteres'
                    }),
                comuna: Joi.string().min(2).max(30).required().messages({
                        'string.min': 'El "comuna" no puede tene menos de 2 caracteres',
                        'string.max': 'El "comuna" no puede tener mas de 30 caracteres'
                    }),
                ciudad: Joi.string().min(2).max(30).required().messages({
                        'string.min': 'El "cuidad" no puede tene menos de 2 caracteres',
                        'string.max': 'El "ciudad" no puede tener mas de 30 caracteres'
                    })
        }).required(),
        receptor: Joi.object()
            .keys({
                rutReceptor:Joi.string().min(9).max(15).required().messages({
                        'string.min': 'El "rutReceptor" no puede tene menos de 9 caracteres',
                        'string.max': 'El "rutReceptor" no puede tener mas de 15 caracteres'
                    }),
                razonSocial: Joi.string().min(2).max(48).required().messages({
                        'string.min': 'El "razonSocial" no puede tene menos de 9 caracteres',
                        'string.max': 'El "razonSocial" no puede tener mas de 15 caracteres'
                    }),
                giroReceptor: Joi.string().min(2).max(30).required().messages({
                        'string.min': 'El "giroReceptor" no puede tene menos de 2 caracteres',
                        'string.max': 'El "giroReceptor" no puede tener mas de 30 caracteres'
                    }),
                direccionOrigen: Joi.string().min(2).max(59).required().messages({
                        'string.min': 'El "direccionOrigen" no puede tene menos de 2 caracteres',
                        'string.max': 'El "direccionOrigen" no puede tener mas de 50 caracteres'
                    }),
                comuna: Joi.string().min(2).max(30).required().messages({
                        'string.min': 'El "comuna" no puede tene menos de 2 caracteres',
                        'string.max': 'El "comuna" no puede tener mas de 30 caracteres'
                    }),
                ciudad: Joi.string().min(2).max(30).required().messages({
                        'string.min': 'El "cuidad" no puede tene menos de 2 caracteres',
                        'string.max': 'El "ciudad" no puede tener mas de 30 caracteres'
                    })

             }).required(),
        totales: Joi.object()
            .keys({
            totales: Joi.number().integer().min(1).required(),
            iva:Joi.number().integer().min(1).required(),
                montoTotal:Joi.number().integer().min(1).required()
            }).required(),
        items: Joi.array().items(
            Joi.object({
                nombreItem:  Joi.string().max(253).truncate().required().prefs({convert: true}),
                detalleItem:Joi.string().max(253).truncate().allow(null, '').prefs({convert: true}),
                cantidadItem: Joi.number().max(2147483647).integer().required(),
                valorItem: Joi.number().max(2147483647).integer().required(),
                montoItem: Joi.number().max(2147483647).integer().required()
            })
        )


    }).required()

    const validatDteEsquema = (req, res, next) =>{
        const result = postDteSchema.validate(req.body, {abortEarly: false, convert: false})
        if (result.error === null || result.error === undefined) {
            next()
        } else {
            throw new CustomValidatorError(result.error, 'dte.validator', 'validatDteEsquema')
        }
    }

    module.exports = {validatDteEsquema}