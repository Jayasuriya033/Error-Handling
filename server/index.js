import express from "express";
import errorHandler from "./middleware/errorMiddleware.js";
import { user } from "./routes/user.js";
import { login } from "./routes/login.js";



const app = express();


app.use(express.json());
app.use("/user", user)
app.use("/getting", user)
app.use("/putting", user)
app.use("/login", login)
app.use(errorHandler)


app.listen(8008, () => {
  console.log("Server is running on port", 8008);
});





