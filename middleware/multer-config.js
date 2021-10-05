// import multer
const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // indique a multer dans quel dossier enregistrer nos media
    callback(null, "image");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    // on definit l'extension en utlisant celle qui correspond , dans l'objet MIME_TYPES à celle renvoyé par le frontend "file.mimetype"
    const extension = MIME_TYPES[file.mimetype];
    // on definit un nom de fichier unique evitant ainsi les doublons
    callback(null, name + Date.now() + "." + extension);
  },
});

// on export multer en le configurant pour l'envoie de fichier de type images
module.exports = multer({ storage }).single("image");
