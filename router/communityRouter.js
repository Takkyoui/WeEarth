import express from "express";
import communityController from "../controller/communityController.js";
import { isAuth } from "../utils/isAuth.js";

export const communityRouter = express.Router();

communityRouter.get("/search", communityController.searchCommunity);
communityRouter.post("/:id/like", isAuth, communityController.toggleLike);
communityRouter.get("/:id/likes/count", communityController.getLikesCount);
communityRouter.get(
  "/user",
  isAuth,
  communityController.getCommunitiesByUserId
);

communityRouter.post("/", isAuth, communityController.createCommunity);
communityRouter.get("/", communityController.getAllCommunities);
communityRouter.get("/:id", communityController.getCommunityById);
communityRouter.put("/:id", communityController.updateCommunity);
communityRouter.delete("/:id", communityController.deleteCommunity);
