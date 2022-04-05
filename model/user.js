const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: [true, "Le nom est obligatoire"]
    },
    lastName: {
      type: String,
      required: [true, "Le prénom est obligatoire"]
    },
    birthday :{
      type: Date,
      required: [false, "pas obligatoire"]
    },
    password :{
      type: String,
      required: [true, "Le mot de passe est obligatoire"]
    }
});

module.exports = mongoose.model("User", UsersSchema, "user");
