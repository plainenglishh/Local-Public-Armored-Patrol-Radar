const ws = require("ws");
const fs = require("fs");
const WebSocket = ws.WebSocket;

// Ports //

console.log(process.argv)
const PointerLocation = process.argv[2] || "C:\\Users\\matth\\Documents\\Exemption\\Synapse X\\workspace\\.ApMap";
const Port = process.argv[3] || 8111;

// Code //

const Server = new WebSocket.WebSocketServer({
	port: Port
});

Server.on("connection", function(Connection, Request) {
	setInterval(function() {
		const Data = fs.readFileSync(PointerLocation, "utf-8");
		Connection.send(Data);
	}, 200);
});