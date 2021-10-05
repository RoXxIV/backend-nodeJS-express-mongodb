const mongoose = require("mongoose");
// import mongoose-unique-validator
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// on utilise unique-validator avant l'export du schema
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
