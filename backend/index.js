import express from 'express';
import routesChat from "./routes/routesChat.js";
import connectDB from './db/dbConnect.js';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';
import { chat, chatValidation } from "./models/chat.js";

const app = express();
const port = 3000;

connectDB();

app.use(express.json());

app.use("/api/v1", routesChat)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});

const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, '../frontend/index.html'));
});

io.on("connection", (socket) => {
  console.log("Un utilisateur s'est connecté");

  chat.find().sort({ createdAt: 1 }).then((messages) => {
      socket.emit("chat-history", messages);
  });

  socket.on("send-chat-message", async (data) => {
      try {
          const { error } = chatValidation.validate(data);
          if (error) {
              return socket.emit("chat-error", error.details[0].message);
          }

          const newMessage = new chat({
              name: data.name,
              message: data.message
          });

          await newMessage.save();

          io.emit("chat-message", newMessage);
      } catch (err) {
          console.error("Erreur lors de l'enregistrement du message :", err);
      }
  });

  socket.on("disconnect", () => {
      console.log("Un utilisateur s'est déconnecté");
  });
});

server.listen(4000, () => {
  console.log('Server running at http://localhost:4000');
});