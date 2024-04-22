import http from 'http';
import { Server } from "socket.io";
import express from 'express';

const app = express();
const server = http.createServer(app);
const socketIo = new Server(server, {
    cors: {
        origin: "*",
    }
});

socketIo.on("connection", (socket) => { 
    console.log("New client connected" + socket.id);

    socket.on("sendDataClient", function (data) { 
        socketIo.emit("sendDataServer", { data });
    })

    socket.on("disconnect", () => {
        console.log("Client disconnected"); 
    });
});

export {server};