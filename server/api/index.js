const http = require("http");
const express = require("express");
const WebSocketServer = require("ws").Server;
const debug = require('debug')('app:bin:api')
const config = require('../../config')

var app = express();

var server = http.createServer(app);

var wss = new WebSocketServer({server: server, path: "/api"});

debug("api test!");
wss.on("connection", (ws) => {
	debug("connection made!");
	ws.on('message', function incoming(message) {
    debug('received: %s', message);
    ws.send('hello world');
  });
});

module.exports = {server, app};