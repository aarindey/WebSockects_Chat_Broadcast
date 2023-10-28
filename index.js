const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use("/", express.static(__dirname + "/public"));

io.on("connection", (socket) => {
  console.log("A  new user connected");
  socket.on("disconnect", (socket) => {
    console.log("A user has disconnected");
  });

  //   socket.on("from_client", () => {
  //     console.log("Received event from client");
  //   });

  //   setInterval(function f() {
  //     socket.emit("from_server"); // emits an event named 'from_server'
  //   }, 3000);

  socket.on("new_msg", (data) => {
    io.emit("msg_rcvd", data);
  });
});

server.listen(3000, () => {
  console.log("listening on port 3000");
});
