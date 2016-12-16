const http = require("http");
const express = require("express");
const WebSocketServer = require("ws").Server;
const debug = require('debug')('app:bin:api')
const config = require('../../config')

var app = express();

var server = http.createServer(app);

var wss = new WebSocketServer({server: server, path: "/api"});

var breweries = [
	{
		name: "Stem Ciders",
		lat: 39.761634, 
		lng: -104.983790
	},
	{
		name: "Ratio Beerworks",
		lat: 39.761502, 
		lng: -104.981076
	},
	{
		name: "River North",
		lat: 39.806562, 
		lng: -104.979076
	}
];

wss.on("connection", (ws) => {
	debug("ws connection made!");
    
	ws.on('message', function incoming(message) {
	    debug('received: %s', message);
	});

    let msg = {
    	action: 'breweries',
    	breweries: breweries
    }

    ws.send(JSON.stringify(msg))
});

module.exports = {server, app};