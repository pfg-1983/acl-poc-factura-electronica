exports.doc = {
    swagger: "3.0",
    info: {
        version: "1.0.0",
        title: "POC generar DTE",
        description: "ACL para POC de generacion de DTE",
        license: {
            "name": "MIT",
            "url": "https://opensource.org/licenses/MIT"
        }
    },
    host: "localhost:3001",
    basePath: "/api",
    schemes: [
        "http"
    ],
    consumes: [
        "application/json"
    ],
    produces: [
        "application/json"
    ],
    definitions:{
        ReqContract: {
            $tipoDocumento: 33,
            $fechaEmision: "2020-07-10T00:00:00.000Z",
            $emisor: {
                $rutEmisor: "",
                $razonSocial: "",
                $giroEmisor: "",
                $direccionOrigen: "",
                $comuna: "",
                $ciudad: ""
            },
            $receptor: {
                $rutReceptor: "",
                $razonSocial: "",
                $giroReceptor: "",
                $direccionOrigen: "",
                $comuna: "",
                $ciudad: ""
            },
            $totales: {
                $totales: 240,
                $iva: 47,
                $montoTotal: 247
            },
            $Detalle: [
                {
                    $nombreItem: "cubo",
                    detalleItem: "",
                    $catidadItem: 2,
                    $valorItem: 100,
                    $montoItem: 200
                },
                {
                    $nombreItem: "circulo",
                    detalleItem: "",
                    $catidadItem: 1,
                    $valorItem: 50,
                    $montoItem: 50
                }
            ]                
        },
        StatusOK: {
                    status: "ACEPTADO",
                    numeroFolio: 12
                }
        }        
    
}