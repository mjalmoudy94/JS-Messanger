// const {MSGERServer} = require("./MSGERServer");
//
// const Server = new MSGERServer();
// Server.Start(8080);


const {CoreServer} = require("./ServerCore")

const Server = new CoreServer();
Server.Start(8080);
