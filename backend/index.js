import express from 'express';
import routesChat from "./routes/routesChat.js";
import connectDB from './db/dbConnect.js';

const app = express();
const port = 3000;

connectDB();

app.use(express.json());


app.get('/', (req, res) => {
    res.send('chat en ligne')
});

app.use("/api/v1", routesChat)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});