/* eslint-disable global-require */
const express = require('express')
const path = require('path')
const glob = require('glob')
const routerV1 = express.Router()

// Healthcheck
routerV1.get('/healthcheck', (req, res) => {
  res.status(200).send({ message: 'POC Generacion de Facturas - ACL', status: 'OK' })
})

// Cargar rutas desde app/Routes/*.route.js
const matches = glob.sync('app/Routes/*.route.js', { cwd: path.resolve(__dirname, '..') })

matches.forEach((relPath) => {
  const fullPath = path.resolve(path.join(__dirname, '..', relPath))
  const { name } = path.parse(relPath)
  const cleanRoute = name.replace('.route', '')
  routerV1.use(`/${cleanRoute}`, require(fullPath))
})

module.exports = { v1: routerV1 }
