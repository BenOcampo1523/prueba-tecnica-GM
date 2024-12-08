// Importar dependencias de Node
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");

// Importar JS locales
const connectDB = require("./app/db/db");
const routes = require("./app/routes");

dotenv.config("./.env");

const port = process.env.PORT;
const app = express();
app.use(cookieParser());
app.use(express.static('public'));

app.use(cors({
    origin: 'http://localhost:4000',
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

// Redirigir al menú principal al iniciar sesión correctamente


// Asegurar que recibe el puerto
app.listen(port, () => {
    console.log(`Server listening to port ${port}`)
})