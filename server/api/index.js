const http = require('http')
const express = require('express')
const WebSocketServer = require('ws').Server
const debug = require('debug')('app:bin:api')
const bcrypt = require('bcrypt')
const { user } = require('./db')

var app = express()

var server = http.createServer(app)

var wss = new WebSocketServer({ server: server, path: '/api' })

var breweries = require('./breweries.json')['breweries']

wss.on('connection', (ws) => {
  debug('ws connection made!')

  ws.on('message', (messageString) => {
    let message
    try {
      message = JSON.parse(messageString)
    } catch (e) {
      debug('received invalid json')
      return
    }

    debug('received %s', messageString)

    if (message.hasOwnProperty('action')) {
      let action = message.action

      debug('received %s action', action)

      if (action === 'login') {
        let username = message.params.username
        let password = message.params.password

        user.find(username, (err, user) => {
          let loginResponse = {
            action: 'loginResponse'
          }
          let result = {};
          loginResponse.loginResponse = result

          //  Error retriving user info from db
          if (err) {
            result.error = 'Sorry, something went wrong.'
          } else {
            if (!user) {
              result.error = {
                username: 'Username not found.'
              }

              ws.send(JSON.stringify(loginResponse))
            } else {
              debug('user: %s', JSON.stringify(user))

              bcrypt.compare(password, user.password, (err, res) => {
                if (err) {
                  debug('bcrypt error: ' + err)
                  result.error = 'Sorry, something went wrong.'
                }

                debug('bcrypt result: ' + res)

                if (!res) {
                  result.error = {
                    password: 'Incorrect password.'
                  }
                }

                ws.send(JSON.stringify(loginResponse))
              })
            }
          }
        })
      }
    }
  })

  let msg = {
    action: 'breweries',
    breweries: breweries
  }

  ws.send(JSON.stringify(msg))
})

module.exports = { server, app }
