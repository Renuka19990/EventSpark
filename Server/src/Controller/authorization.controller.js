const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../Model/user.model");
require("dotenv").config();

const SignUp = async (req, res) => {
  const {
    userID,
    username,
    email,
    role,
    password,
    dateOfBirth,
    profilePicture,
    eventsBooked,
  } = req.body;
  try {
    // Checking if user already exists
    const user = await UserModel.findOne({ email });
    if (user) {
      return res
        .status(401)
        .json({ msg: "User is already registered. Please try to login." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const dob = new Date(dateOfBirth);
    const age = Math.floor((new Date() - dob) / (365.25 * 24 * 60 * 60 * 1000));
    const newUserFields = {
      userID,
      username,
      email,
      role,
      password: hashedPassword,
      dateOfBirth: dob,
      profilePicture,
      age,
    };
    if (role) {
      newUserFields.role = role;
    }
    if (eventsBooked && eventsBooked.length > 0) {
      newUserFields.eventsBooked = eventsBooked;
    }
    const newUser = new UserModel(newUserFields);
    // Saving the new user
    await newUser.save();
    return res.status(201).json({ msg: "User registered successfully." });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      msg: "Failed to register user. Please provide correct details.",
    });
  }
};

const logIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ msg: "user not found please provide correct credential" });
    }
    bcrypt.compare(password, user.password, async (err, result) => {
      if (err) throw new Error(err);
      if (result) {
        const token = jwt.sign(
          { email, role: user.role, userID: user.userID },
          process.env.SECRET_KEY,
          { expiresIn: "1h" }
        );
        res.status(200).json({ token });
      } else {
        return res
          .status(401)
          .json({ msg: "please provide correct credential" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Please provide correct details" });
  }
};

const veriFyOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found. Please try to log in.",
        verified: false,
        otpMatched: true,
      });
    }
    if (req.body.otp === otp) {
      return res.status(200).json({
        message: "User verified and OTP matched successfully",
        verified: true,
        otpMatched: true,
      });
    } else {
      return res.status(404).json({
        message: "OTP not matched",
        verified: false,
        otpMatched: false,
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: "Failed to verify OTP. Please try again later." });
  }
};

const forgotPassword = async (req, res) => {
  const { email, otp, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        message: "User not found Please try to logIn",
        verified: false,
        OtpMatched: true,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await UserModel.findOneAndUpdate({ email }, { password: hashedPassword });
    res.status(200).send({
      msg: "Password Updated SuccessFully try to login",
      Updated: true,
    });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Failed to update password. Please try again later." });
  }
};

module.exports = { SignUp, logIn, veriFyOtp, forgotPassword };


