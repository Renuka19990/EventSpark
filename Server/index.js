const express = require("express");
const cors = require("cors");

const { connectToDb } = require("./src/Config/config");
const { userRouter } = require("./src/Router/user.route");
const { authRouter } = require("./src/Router/authorization.router");
const { auth } = require("./src/middleware/auth.middleare");
const { access } = require("./src/middleware/rolebased.middleware");

const PORT = 8080 || process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());

app.use("/", authRouter);

app.use("/admin", authRouter);

app.get("/get", auth, access("user"), async (req, res) => {
  // const books=await bookModel.find();
  res.send("let it go");
  // const{userId,role}=req;
  // console.log(userId,role);
});

app.listen(PORT, async () => {
  await connectToDb();
  console.log(`Your server is running on http://localhost:${PORT}`);
});
