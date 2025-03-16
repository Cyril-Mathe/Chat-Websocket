// import express from 'express';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { Server } from 'socket.io';

// const app = express()

// const __filename = fileURLToPath(import.meta.url);
// const __direname = path.dirname(__filename);

// const server = app.listen(8080, () => {
//     console.log("Votre serveur en écoute sur le port 8080")
// })

// const io = new Server(server)

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__direname, "index.html"))
// })

// app.listen(3000, () => {
//     console.log("Le serveur est en écoute sur le port ")
// })