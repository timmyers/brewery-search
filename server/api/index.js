const http = require('http')
const express = require('express')
const WebSocketServer = require('ws').Server
const debug = require('debug')('app:bin:api')

var app = express()

var server = http.createServer(app)

var wss = new WebSocketServer({ server: server, path: '/api' })

var breweries = [
  {
    name: 'Stem Ciders',
    lat: 39.761634,
    lng: -104.983790,
    imgSrc: 'https://pbs.twimg.com/profile_images/610549769245556736/2kIrKReO.jpg'
  },
  {
    name: 'Ratio Beerworks',
    lat: 39.761502,
    lng: -104.981076,
    imgSrc: 'https://pbs.twimg.com/profile_images/676481240795484160/F2PmYHEu.png'
  },
  {
    name: 'River North',
    lat: 39.806562,
    lng: -104.979076,
    imgSrc: 'https://pbs.twimg.com/profile_images/1866002149/barley-circle-6--black-_-white.gif'
  },
  {
    name: 'Epic Brewing Company',
    lat: 39.763172,
    lng: -104.981323,
    imgSrc: 'https://s3-us-west-2.amazonaws.com/homebrewassoc/wp-content/uploads/2016/04/Epic_Logofinal_R.jpg'
  },
  {
    name: 'Zephyr Brewing Company',
    lat: 39.759548,
    lng: -104.986378,
    imgSrc: 'http://www.therooster.com/sites/default/files/userfiles/images/ac575e43c1e9972b6d561bf67bc3e418.png'
  },
  {
    name: 'Our Mutual Friend Brewing',
    lat: 39.760485,
    lng: -104.982423,
    imgSrc: 'http://www.beersearchparty.com/wp-content/uploads/2014/10/Our-Mutual-Friend.jpg'
  },
  {
    name: 'C Squared Ciders',
    lat: 39.762812,
    lng:-104.984027,
    imgSrc: 'https://pbs.twimg.com/profile_images/575832191210364929/f0lJma3Z.png'
  },
  {
    name: 'Bierstadt Lagerhaus',
    lat: 39.762816,
    lng: -104.984037,
    imgSrc: 'https://pbs.twimg.com/profile_images/481191939409051649/ARqZUt5l.jpeg'
  },
  {
    name: '10 Barrel Brewing Company',
    lat: 39.759358,
    lng: -104.985527,
    imgSrc: 'https://pbs.twimg.com/profile_images/786231364127338496/VUL6k4o5.jpg'
  },
  {
    name: "Beryl's Beer Company",
    lat: 39.764710,
    lng: -104.980229,
    imgSrc: 'https://pbs.twimg.com/profile_images/472449961720676353/KrYg6ndn_400x400.png'
  }
]

wss.on('connection', (ws) => {
  debug('ws connection made!')

  ws.on('message', function incoming (message) {
    debug('received: %s', message)
  })

  let msg = {
    action: 'breweries',
    breweries: breweries
  }

  ws.send(JSON.stringify(msg))
})

module.exports = { server, app }
