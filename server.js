const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./app/db/db");
const routes = require("./app/routes");

dotenv.config("./.env");

const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", routes);

app.listen(port, () => {
    console.log(`Server listening to port ${port}`)
})