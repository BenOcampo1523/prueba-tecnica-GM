const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./app/db/db");
const authRoutes = require("./app/routes/auth-routes");
const authRoutes2 = require("./app/routes");

dotenv.config("./.env");

const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", authRoutes2);

connectDB();

app.listen(port,() => {
    console.log(`Server listening to port ${port}`)
})