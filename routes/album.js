const express = require("express");

const router = express.Router();

const albumController = require("../controllers/album");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

// attention a bien ajouter multer apres l'authentification
router.post("/", auth, multer, albumController.createAlbum);
router.put("/:id", auth, multer, albumController.modifyAlbum);
router.delete("/:id", auth, albumController.deleteAlbum);
router.get("/:id", auth, albumController.getOneAlbum);
router.get("/", auth, albumController.getAllAlbum);

module.exports = router;
