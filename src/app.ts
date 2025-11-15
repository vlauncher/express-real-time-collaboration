import express,{ Application } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({
    extended:false
}))


export default app;

