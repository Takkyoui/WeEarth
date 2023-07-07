import express from "express";
import commentController from "../controller/commentController.js";
import { isAuth } from "../utils/isAuth.js";

const commentRouter = express.Router();

commentRouter.post("/", isAuth, commentController.createComment);
commentRouter.get("/length/:id", commentController.getCommentLength);

commentRouter.get("/:id", commentController.getCommentById);

commentRouter.put("/:id", commentController.updateComment);
commentRouter.delete("/:id", commentController.deleteComment);
commentRouter.delete("/one/:id", commentController.deleteOneComment);

export default commentRouter;
