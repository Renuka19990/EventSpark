const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userID: {
    type: String,
    unique: true,
  },
  age: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  profilePicture: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  eventsBooked: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
});

const UserModel = mongoose.model("User", userSchema);

module.exports = User;
