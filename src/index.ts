import express from 'express';
import http from 'http';
import path from 'path';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server)

// socket.io
io.on("connection", (socket) => {
    // console.log("User connected: " + socket.id);
    socket.on('chat message', (msg) => {
        console.log('message from ' + socket.id + " is " + msg);
        // io.emit('chat message', msg);
        socket.broadcast.emit("chat message", msg);
    });
    socket.on("disconnect", () => {
        console.log("User disconnected: " + socket.id);
    });
});

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
    return res.sendFile("/public/index.html");
})

server.listen(3000, () => {
    console.log('listening on PORT: 3000');
});