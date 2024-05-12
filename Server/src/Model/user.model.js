const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userID: { type: Number, unique: true },
  age: { type: Number },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  dateOfBirth: { type: Date },
  profilePicture: { type: String },
  role: { type: String, enum: ["user", "admin", "eventPlanner"], default: "user" },
  eventsBooked: { type: [Number], default: [] },
  isDisabled: { type: Boolean, default:false}
});

const UserModel = mongoose.model("User", userSchema);

module.exports = {UserModel};

