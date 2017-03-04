const http = require('http');
const express = require('express');
const WebSocketServer = require('ws').Server;
// const debug = require('debug')('app:api');
const { APIConnection } = require('./connection');

const app = express();
const server = http.createServer(app);

const wss = new WebSocketServer({ server, path: '/api' });

const connections = [];

wss.on('connection', (ws) => {
  connections.push(new APIConnection(ws));
});

module.exports = { server, app };
