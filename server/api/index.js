const http = require('http')
const express = require('express')
const WebSocketServer = require('ws').Server
const debug = require('debug')('app:bin:api')

var app = express()

var server = http.createServer(app)

var wss = new WebSocketServer({ server: server, path: '/api' })

var breweries = require('./breweries.json')['breweries']

wss.on('connection', (ws) => {
  debug('ws connection made!')

  ws.on('message', (messageString) => {
    try {
      let message = JSON.parse(messageString)
      debug('received %s', messageString)
      if (message.hasOwnProperty('action')) {
        let action = message.action

        debug('received %s action', action)
      }
    } catch (e) {
      debug('received invalid json')
    }
  })

  let msg = {
    action: 'breweries',
    breweries: breweries
  }

  ws.send(JSON.stringify(msg))
})

module.exports = { server, app }
