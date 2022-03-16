import app from "./app_express.js";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT;
const host = process.env.HOST;

console.log(`Your port is ${port}`);

app.listen(process.env.PORT,()=>console.log(`Server is running on http://${host}:${port}`));

