// import mongoose
const mongoose = require("mongoose");

// creation du schema
const photoSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
});

// export le schema le rendant disponible pour notre application Express
module.exports = mongoose.model("Photo", photoSchema);
