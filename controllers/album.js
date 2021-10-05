const Photo = require("../models/photo");
// import fs : file system
const fs = require("fs");

exports.createAlbum = (req, res, next) => {
  const photoObject = JSON.parse(req.body.photo);
  delete photoObject._id;
  const photo = new Photo({
    ...photoObject,
    imageUrl: `${req.protocol}://${req.get("host")}/image/${req.file.filename}`,
  });
  photo
    .save()
    .then(() => res.status(201).json({ message: "Photo enregistrer !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.modifyAlbum = (req, res, next) => {
  // si on trouve un objet on recupere la chaine puis on la parse en objet puis on modifie imageUrl
  // sinon, on recupere corp de la requete
  const photoObject = req.file
    ? {
        ...JSON.parse(req.body.photo),
        imageUrl: `${req.protocol}://${req.get("host")}/image/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Photo.updateOne(
    { _id: req.params.id },
    { ...photoObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteAlbum = (req, res, next) => {
  // on va d'abord chercher le fichier image afin de recuperer l'url (nom du fichier)
  Photo.findOne({ _id: req.params.id })
    .then((photo) => {
      const filename = photo.imageUrl.split("/image/")[1];
      // unlink supprime un fichier
      fs.unlink(`image/${filename}`, () => {
        Photo.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Objet supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getOneAlbum = (req, res, next) => {
  Photo.findOne({ _id: req.params.id })
    .then((photo) => res.status(200).json(photo))
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllAlbum = (req, res, next) => {
  Photo.find()
    .then((photos) => res.status(200).json(photos))
    .catch((error) => res.status(400).json({ error }));
};
