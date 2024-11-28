const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, maxlength: 20, default: "Nameless" },
  hobbies: { type: [String] },
  role: {
    type: String,
    enum: ["System Administrator", "QA Engineer", "Designer", "Web Developer"],
  },
  isAdmin: { type: Boolean, default: false },
  email: { type: String, required: true },
  password: { type: String, required: [true, "THE PASSWORD IS REQUIRED"] },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
