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
      required: [true, "L'email est obligatoire"]
    }
});

module.exports = mongoose.model("User", UsersSchema, "user");
