const http = require('http');
const express = require('express');
const WebSocketServer = require('ws').Server;
// const debug = require('debug')('app:api');
const { APIConnection } = require('./connection');

const app = express();
const server = http.createServer(app);

const wss = new WebSocketServer({ server, path: '/api' });

wss.on('connection', (ws) => {
  ws.apiConnection = new APIConnection(ws); // eslint-disable-line no-param-reassign
});

module.exports = { server, app };
