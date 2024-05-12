const express = require("express");
const { deleteUser, updateUser, userData, getUsers, AddUser } = require("../Controller/admin.controller");
const { access } = require("../middleware/rolebased.middleware");
const { auth } = require("../middleware/auth.middleare");


const adminRouter = express.Router();
adminRouter.post('/users', auth, access('admin'), AddUser);

adminRouter.get("/users",auth,access("admin"), getUsers);

adminRouter.get("/user/:id",auth,access("admin"), userData);

adminRouter.patch("/users/:id", auth, access("admin"), updateUser);


adminRouter.delete("/users/:id", deleteUser);


adminRouter.delete("/delete/:id",auth,access("admin"), deleteUser);
//auth,access("admin")
module.exports = { adminRouter };

 