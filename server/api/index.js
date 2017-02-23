const http = require('http')
const express = require('express')
const WebSocketServer = require('ws').Server
const debug = require('debug')('app:api')
const { APIConnection } = require('./connection')

let app = express()

let server = http.createServer(app)

let wss = new WebSocketServer({ server: server, path: '/api' })

wss.on('connection', ws => {
  let conn = new APIConnection(ws);

  // let msg = {
  //   action: 'breweries',
  //   breweries: breweries
  // }

  // ws.send(JSON.stringify(msg))
})

module.exports = { server, app }
