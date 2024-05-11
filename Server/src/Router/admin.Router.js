const express = require("express");
const { deleteUser, updateUser, userData, getUsers, AddUser } = require("../Controller/admin.controller");


const adminRouter = express.Router();

adminRouter.post("/add", AddUser);

adminRouter.get("/users", getUsers);

adminRouter.get("/user/:id", userData);

adminRouter.patch("/users", updateUser);

adminRouter.delete("/users/:id", deleteUser);


module.exports = { adminRouter };
