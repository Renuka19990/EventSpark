const express = require("express");
const { SignUp, logIn } = require("../Controller/Authorization.controller");

const authRouter = express.Router();

authRouter.post("/register", SignUp);

authRouter.post("/login", logIn);

module.exports = { authRouter };
