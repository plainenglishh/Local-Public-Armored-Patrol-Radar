const ws = require("ws");
const fs = require("fs");
const WebSocket = ws.WebSocket;
const Express = require("express");
const ViewerServer = Express();
const Path = require("path");
const config = require("../config.json");

// Ports //

console.log(process.argv)
const PointerLocation = process.argv[2] || config.WorkspaceFolder;
const Port = process.argv[3] || config.SocketPort;

// Code //

const Server = new WebSocket.WebSocketServer({
	port: Port
});

Server.on("connection", function(Connection, Request) {
	setInterval(function() {
		const Data = fs.readFileSync(PointerLocation + "\\.ApMap", "utf-8");
		Connection.send(Data);
	}, 200);
});

// Pages //

ViewerServer.use(Express.static(Path.join(__dirname, "Templates")));

ViewerServer.get("/source", function(Req, Res) {
	Res.sendFile(Path.join(__dirname, "../source.lua"));
});

ViewerServer.listen(process.argv[4] || config.ViewerPort);