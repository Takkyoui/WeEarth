import express from "express";
import UserController from "../controller/userController.js";
import { isAuth } from "../utils/isAuth.js";
import upload from "../utils/multer.js";
export const userRouter = express.Router();

userRouter.get("/user", isAuth, UserController.getUser);
userRouter.post("/login", UserController.login);
userRouter.put(
  "/update",
  isAuth,
  upload.single("image"),
  UserController.updateUser
);

userRouter.patch("/update-password", isAuth, UserController.updatePassword);
userRouter.post("/register", UserController.register);

userRouter.delete("/user/delete", isAuth, UserController.deleteUser);
