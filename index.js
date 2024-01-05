import express from "express";
import * as dotenv from 'dotenv';
import { MongoClient } from "mongodb";
import cors from 'cors';
import userRouter from './routes/user.route.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

//Mongodb connection

const MONGO_URL = process.env.MONGO_URL;
const client = new MongoClient(MONGO_URL);
await client.connect();
console.log('mongodb is connected');

app.use(express.json());
app.use(cors());

app.get("/", function (request, response) {
    response.send("The Server is Running😍😍😍");
});

app.use("/user", userRouter);

//insert mails to inbox
app.post("/inbox", async (request, response) => {
    const data = request.body;
    const result = await client.db('gmailClone')
        .collection('inbox')
        .insertMany(data);

    response.send(result);
});

//get mails for inbox
app.get("/inbox", async (request, response) => {
    const mails = await client.db('gmailClone')
        .collection('inbox')
        .find({})
        .toArray();

    response.send(mails);
});

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));

export { client };