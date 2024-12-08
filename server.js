const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const connectDB = require("./app/db/db");
const routes = require("./app/routes");

dotenv.config("./.env");

const port = process.env.PORT;
const app = express();
app.use(express.static('public'));

app.use("/login", function(req,res){
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
})

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

// Redirigir al menú principal al iniciar sesión correctamente


// Asegurar que recibe el puerto
app.listen(port, () => {
    console.log(`Server listening to port ${port}`)
})