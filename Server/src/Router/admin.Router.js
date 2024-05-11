const express = require("express");
const { deleteUser, updateUser, userData, getUsers, AddUser } = require("../Controller/admin.controller");


const adminRouter = express.Router();

adminRouter.post("/add", AddUser);

adminRouter.get("/users", getUsers);

adminRouter.get("/user/:id", userData);

adminRouter.patch("/user", updateUser);

adminRouter.delete("/user", deleteUser);

module.exports = { adminRouter };

 