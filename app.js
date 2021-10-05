// gestion des imports
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const albumRoutes = require("./routes/album");
const userRoutes = require("./routes/user");

const secretFile = require("./secretFile");
// Run express
const app = express();

// connexion à la bdd
mongoose
  .connect(secretFile.credentials, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// on definit les headers afin d'eviter les erreurs de CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// on utilise body-parser afin d'extraire et gerer le JSON de nos requetes
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/image", express.static(path.join(__dirname, "image")));

app.use("/api/album", albumRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
