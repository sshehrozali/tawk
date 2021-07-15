const express = require("express");

const router = require("./router");
const http = require("http");

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});

// Server main app index file
app.use(router);

// Obj to store each users
users = {};

// Events Handling (Server-side)
io.on("connection", socket => {
    console.log("Connection created successfully!");
    socket.emit("newChat", "Chat connected!");

    // When new user is connected
    socket.on("newUserjoined", username => {
      users[socket.id] = username;                        // Store each user name as a unique socket id
      socket.broadcast.emit("newUseralert", username);    // Alert all clients
    });

    // When new msg is arrived
    socket.on("newMsg", msg => {
      socket.broadcast.emit("sendMsg", {message: msg, name: users[socket.id]});    // Send new msg to all the clients connected to the server
    });
});
 
// Listen to port
server.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`)
});
